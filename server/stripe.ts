import Stripe from "stripe";
import { ENV } from "./_core/env";

export const stripe = new Stripe(ENV.stripeSecretKey, {
  apiVersion: "2025-01-27-ac",
});

export const TIER_PRICES: Record<string, string> = {
  basic: "price_basic_id", // Replace with real Stripe Price IDs
  pro: "price_pro_id",
  elite: "price_elite_id",
};

export async function createCheckoutSession(userId: number, email: string, tierId: string) {
  const priceId = TIER_PRICES[tierId];
  if (!priceId) throw new Error("Invalid tier ID");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${ENV.appUrl}/vault/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ENV.appUrl}/vault/get-started`,
    customer_email: email,
    client_reference_id: userId.toString(),
    metadata: {
      userId: userId.toString(),
      tierId: tierId,
    },
  });

  return session;
}
