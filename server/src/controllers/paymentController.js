import Razorpay from "razorpay";
import crypto from "node:crypto";
import Booking from "../models/Booking.js";

export async function createOrder(req, res) {
  const { amount } = req.body;
  
  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    if (process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_SECRET) {
      console.warn("Razorpay Key ID present but Secret missing. Falling back to Mock Mode.");
    }
    const mockOrder = {
      id: "order_mock_" + Date.now(),
      amount: Number(amount) * 100,
      currency: "INR",
      status: "created",
      notes: { mock: true },
      mock: true,
      keyId: process.env.RAZORPAY_KEY_ID || "none"
    };
    try {
      await Booking.create({
        orderId: mockOrder.id,
        amount: mockOrder.amount,
        currency: mockOrder.currency,
        status: "created",
        mock: true
      });
    } catch (e) {
      // ignore persistence errors in mock mode
    }
    return res.json(mockOrder);
  }

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).json({ message: "Some error occured" });
    }

    await Booking.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: "created"
    });

    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (razorpay_order_id.startsWith("order_mock_")) {
    console.log("Verifying mock payment");
    await Booking.create({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: 50000,
      status: "paid",
      mock: true
    });
    return res.json({ message: "Mock payment verified", success: true });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ message: "Razorpay secret missing" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Booking.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { paymentId: razorpay_payment_id, status: "paid" },
      { upsert: true }
    );
    res.json({ message: "Payment verified successfully", success: true });
  } else {
    res.status(400).json({ message: "Invalid signature", success: false });
  }
}


