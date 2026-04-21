'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearCart } from '@/store/slices/cartSlice';
import CartItem from '@/components/CartItem';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, Truck } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { PH_EVENTS } from '@/lib/posthog-events';
import { useEffect } from 'react';

const CartPage = () => {
  const posthog = usePostHog();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const shipping = totalAmount > 150 ? 0 : 15;
  const tax = totalAmount * 0.08;
  const grandTotal = totalAmount + shipping + tax;
  
  useEffect(() => {
    posthog.capture(PH_EVENTS.CART_VIEWED, {
      item_count: items.length,
      total_amount: totalAmount
    });
  }, [posthog, items.length, totalAmount]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-muted flex items-center justify-center rounded-full text-muted-foreground animate-bounce">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Your Bag is Empty</h1>
          <p className="text-muted-foreground max-w-sm">Looks like you haven't added anything to your cart yet. Let's find something perfect for you.</p>
        </div>
        <Link 
          href="/products" 
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left: Cart Items */}
        <div className="flex-grow space-y-8">
          <div className="flex justify-between items-end border-b border-border pb-8">
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter uppercase">Shopping Bag</h1>
              <p className="text-muted-foreground mt-2">You have {items.length} items in your bag.</p>
            </div>
            <button 
              onClick={() => {
                dispatch(clearCart());
                posthog.capture('cart_cleared', { item_count: items.length });
              }}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-destructive transition-colors font-bold uppercase tracking-wider"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Bag</span>
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {items.map((item: any) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="pt-8 flex items-center justify-between text-muted-foreground">
             <Link href="/products" className="flex items-center space-x-2 hover:text-foreground transition-colors font-bold">
               <ArrowRight className="w-4 h-4 rotate-180" />
               <span>Continue Shopping</span>
             </Link>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-card rounded-3xl border border-border p-8 sticky top-24 shadow-2xl">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-8">Order Summary</h2>
            
            <div className="space-y-4 pb-8 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-bold">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="py-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black italic tracking-tighter">${grandTotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground text-center uppercase font-bold tracking-widest">
                Installment options available at checkout
              </p>
            </div>

            <Link 
              href="/checkout"
              onClick={() => posthog.capture(PH_EVENTS.CHECKOUT_STARTED, { 
                total_amount: grandTotal,
                item_count: items.length
              })}
              className="w-full bg-primary text-primary-foreground h-14 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              <span>Go to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-8 pt-8 border-t border-border space-y-4">
              <div className="flex items-center space-x-3 text-xs text-muted-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Secure Checkout powered by EZIBIZI Pay</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-muted-foreground font-medium">
                <Truck className="w-4 h-4 text-primary" />
                <span>Standard Arrival: Next business day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
