import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const admin = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      const tier = session.metadata?.tier as "low_ticket" | "high_ticket" | undefined;
      if (userId && tier) {
        await syncSubscription(admin, userId, tier, "active", session.customer as string, session.subscription as string);
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.supabase_user_id;
      const tier = subscription.metadata?.tier as "low_ticket" | "high_ticket" | undefined;
      if (userId && tier) {
        const status = mapStripeStatus(subscription.status, event.type);
        await syncSubscription(
          admin,
          userId,
          tier,
          status,
          subscription.customer as string,
          subscription.id
        );
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

function mapStripeStatus(
  stripeStatus: Stripe.Subscription.Status,
  eventType: string
): "active" | "past_due" | "canceled" {
  if (eventType === "customer.subscription.deleted") return "canceled";
  if (stripeStatus === "active" || stripeStatus === "trialing") return "active";
  if (stripeStatus === "past_due" || stripeStatus === "unpaid") return "past_due";
  return "canceled";
}

async function syncSubscription(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  tier: "low_ticket" | "high_ticket",
  status: "active" | "past_due" | "canceled",
  customerId: string,
  subscriptionId: string
) {
  await admin.from("subscriptions").upsert(
    {
      client_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      tier,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "client_id" }
  );

  await admin
    .from("profiles")
    .update({ subscription_tier: status === "canceled" ? "none" : tier, subscription_status: status })
    .eq("id", userId);
}
