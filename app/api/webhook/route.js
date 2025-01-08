// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import Stripe from "stripe";
// import connectMongo from "@/libs/mongoose";
// import User from "@/models/User";

// export async function POST(req) {
//   try {
//     // 1. Verify the webhook event is from Stripe

//     const stripe = new Stripe(process.env.STRIPE_API_KEY);

//     const body = await req.text();
//     const signature = headers().get("stripe-signature");
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//     const event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       webhookSecret
//     );

//     if (type === "checkout.session.completed") {
//       //Grant access to the product

//       //database connection
//       await connectMongo();

//       const user = await User.findById(data.object.client_reference_id);

//       user.hasAccess = true;
//       user.customerId = data.object.customer;

//       await user.save();
//     } else if (type === "customer.subscription.deleted") {
//       // ❌ Revoke access to the product (subscription cancelled or non-payment)

//       await connectMongo();

//       const user = await User.findOne({
//         customerId: data.object.customer,
//       });

//       user.hasAccess = false;

//       await user.save();
//     }
//   } catch (e) {
//     console.error("Stripe error:" + e?.message);
//   }

//   return NextResponse.json({});
// }

// // webhook: send the notifications everytime something happens in an account ex: completed checkCustomRoutes, take a subscription

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const body = await req.text();
    const signature = headers().get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    console.log("🔔 Webhook received"); // Debug log

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("✅ Webhook verified:", event.type); // Debug log
    } catch (err) {
      console.error(`⚠️ Webhook verification failed:`, err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // Get the type and data from the event
    const { type, data } = event;

    console.log("Event type:", type); // Debug log
    console.log("Event data:", data.object); // Debug log

    // Handle the event
    if (type === "checkout.session.completed") {
      const session = data.object;
      console.log(
        "💳 Checkout completed for user:",
        session.client_reference_id
      );

      await connectMongo();
      const user = await User.findById(session.client_reference_id);

      if (!user) {
        console.error("❌ User not found:", session.client_reference_id);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Update user access
      user.hasAccess = true;
      user.customerId = session.customer;
      await user.save();

      console.log("✅ User updated:", {
        id: user._id,
        hasAccess: user.hasAccess,
        customerId: user.customerId,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
