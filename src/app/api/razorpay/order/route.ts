import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR' } = await request.json();

    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    // Initialize inside the handler to catch initialization errors
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    console.log('Initializing Razorpay with Key ID:', key_id ? 'Found' : 'Missing');

    if (!key_id || !key_secret) {
      throw new Error('Razorpay API keys are missing in environment variables');
    }

    const razorpay = new Razorpay({
      key_id: key_id,
      key_secret: key_secret,
    });

    // Amount should be in paise (smallest currency unit)
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    console.log('Creating order with options:', options);

    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order.id);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('RAZORPAY_ERROR:', error);
    
    // Return a JSON response so the browser doesn't get HTML
    return NextResponse.json(
      { 
        error: 'Failed to create order', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
