import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Only the core plan is self-serve checkout. 1-on-1 coaching is sold via a
// fit call at a custom price ($1k-2k), set up manually in Stripe afterward —
// the webhook still syncs it as long as the subscription's metadata carries
// supabase_user_id + tier: "high_ticket".
export const LOW_TICKET_PRICE_ID = process.env.STRIPE_PRICE_ID_LOW_TICKET!;
