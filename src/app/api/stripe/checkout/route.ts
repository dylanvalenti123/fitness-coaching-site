import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import { stripe, LOW_TICKET_PRICE_ID } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

// Self-serve checkout for the core plan only. 1-on-1 coaching is sold via a
// fit call at a custom price, not through this endpoint.
export async function POST(request: Request) {
  const session = await verifySession();
  const { tier } = await request.json();

  if (tier !== "low_ticket") {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("client_id", session.userId)
    .maybeSingle();

  let customerId = existing?.stripe_customer_id ?? undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.email,
      metadata: { supabase_user_id: session.userId },
    });
    customerId = customer.id;
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: LOW_TICKET_PRICE_ID, quantity: 1 }],
    success_url: `${siteUrl}/dashboard/billing?checkout=success`,
    cancel_url: `${siteUrl}/dashboard/billing?checkout=canceled`,
    metadata: { supabase_user_id: session.userId, tier },
    subscription_data: {
      metadata: { supabase_user_id: session.userId, tier },
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
