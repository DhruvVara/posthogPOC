import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      );
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Here you would typically update your database to mark the order as paid
      return NextResponse.json({
        message: 'Payment verified successfully',
        success: true
      });
    } else {
      return NextResponse.json(
        { message: 'Invalid signature', success: false },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}
