import Stripe from "stripe";
import { ENV } from "./_core/env";

export const stripe = new Stripe(ENV.stripeSecretKey, {
  apiVersion: "2025-01-27-ac",
});

export const getPriceId = (tierId: string) => {
  switch (tierId) {
    case "basic": return ENV.stripePriceBasic;
    case "pro": return ENV.stripePricePro;
    case "elite": return ENV.stripePriceElite;
    default: return null;
  }
};

export async function createCheckoutSession(userId: number, email: string, tierId: string) {
  const priceId = getPriceId(tierId);
  if (!priceId) throw new Error(`Invalid or missing Stripe Price ID for tier: ${tierId}`);

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
