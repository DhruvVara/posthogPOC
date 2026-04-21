'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setAddress, setPaymentMethod } from '@/store/slices/checkoutSlice';
import { ShieldCheck, MapPin, CreditCard, CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
import { PH_EVENTS } from '@/lib/posthog-events';

const CheckoutPage = () => {
  const posthog = usePostHog();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const { addresses, selectedAddressId, paymentMethods, selectedPaymentMethodId } = useSelector((state: RootState) => state.checkout);
  
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  
  const subtotal = totalAmount;
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  const currentAddress = addresses.find((a: any) => a.id === selectedAddressId);
  const currentPayment = paymentMethods.find((p: any) => p.id === selectedPaymentMethodId);

  const handlePlaceOrder = () => {
    setStep(3);
    posthog.capture(PH_EVENTS.ORDER_COMPLETED, {
      total_amount: grandTotal,
      item_count: items.length,
      payment_method: currentPayment?.provider,
      shipping_city: currentAddress?.city
    });
  };

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-500/10 flex items-center justify-center rounded-full text-green-500">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Thank you for your purchase. Your order <span className="text-foreground font-bold font-mono">#EBZ-2026-X81</span> is being processed and will be shipped shortly.
          </p>
        </div>
        <div className="bg-card border border-border rounded-3xl p-8 max-w-md w-full text-left space-y-4 shadow-xl">
           <div className="flex justify-between text-sm">
             <span className="text-muted-foreground">Shipping to:</span>
             <span className="font-bold">{currentAddress?.fullName}</span>
           </div>
           <div className="flex justify-between text-sm">
             <span className="text-muted-foreground">Estimated Delivery:</span>
             <span className="font-bold">Next Tuesday</span>
           </div>
        </div>
        <button className="bg-primary text-primary-foreground px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20">
          Track Your Order
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left: Forms */}
        <div className="flex-grow space-y-12">
          {/* Progress Header */}
          <div className="flex items-center space-x-4 mb-8">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Checkout</h1>
            <div className="h-0.5 flex-grow bg-border" />
          </div>

          {/* Section 1: Shipping Address */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-2xl font-black italic uppercase tracking-tighter">
              <MapPin className="w-6 h-6 text-primary" />
              <h2>Shipping Address</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr: any) => (
                <div 
                  key={addr.id}
                  onClick={() => {
                    dispatch(setAddress(addr.id));
                    posthog.capture(PH_EVENTS.SHIPPING_ADDRESS_SELECTED, {
                      address_id: addr.id,
                      city: addr.city,
                      state: addr.state
                    });
                  }}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedAddressId === addr.id 
                    ? 'border-primary bg-primary/5 shadow-lg' 
                    : 'border-border hover:border-muted-foreground bg-card'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold">{addr.fullName}</p>
                    {selectedAddressId === addr.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{addr.street}</p>
                  <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} {addr.zipCode}</p>
                  <p className="text-sm text-muted-foreground font-medium mt-2">{addr.country}</p>
                </div>
              ))}
              <div className="flex items-center justify-center p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary transition-all cursor-pointer group">
                 <p className="text-sm font-bold text-muted-foreground group-hover:text-primary">+ Add New Address</p>
              </div>
            </div>
          </section>

          {/* Section 2: Payment Method */}
          <section className="space-y-6 pt-12 border-t border-border">
            <div className="flex items-center space-x-3 text-2xl font-black italic uppercase tracking-tighter">
              <CreditCard className="w-6 h-6 text-primary" />
              <h2>Payment Method</h2>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((pm: any) => (
                <div 
                  key={pm.id}
                  onClick={() => {
                    dispatch(setPaymentMethod(pm.id));
                    posthog.capture(PH_EVENTS.PAYMENT_METHOD_SELECTED, {
                      payment_id: pm.id,
                      provider: pm.provider,
                      type: pm.type
                    });
                  }}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPaymentMethodId === pm.id 
                    ? 'border-primary bg-primary/5 shadow-lg' 
                    : 'border-border hover:border-muted-foreground bg-card'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center font-bold text-[10px] uppercase">
                      {pm.provider}
                    </div>
                    <div>
                      <p className="font-bold capitalize">{pm.type}</p>
                      {pm.lastFour && <p className="text-xs text-muted-foreground">Ending in •••• {pm.lastFour}</p>}
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethodId === pm.id ? 'border-primary bg-primary' : 'border-border'}`}>
                    {selectedPaymentMethodId === pm.id && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Sticky Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-card rounded-3xl border border-border p-8 sticky top-24 shadow-2xl">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-8">Review Order</h2>
            
            {/* Mini Item List */}
            <div className="max-h-48 overflow-y-auto pr-2 space-y-4 mb-8">
              {items.map((item: any) => (
                <div key={item.id} className="flex space-x-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.quantity} × ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pb-8 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-bold">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="py-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black italic tracking-tighter">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-primary text-primary-foreground h-14 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              <span>Place Order</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Encrypted & Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
