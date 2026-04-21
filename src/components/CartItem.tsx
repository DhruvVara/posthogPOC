'use client';

import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity, CartItem as CartItemType } from '@/store/slices/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { PH_EVENTS } from '@/lib/posthog-events';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const posthog = usePostHog();
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-6 p-4 bg-card rounded-2xl border border-border shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-border">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover"
        />
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-lg leading-tight line-clamp-1">{item.name}</h4>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          <button 
            onClick={() => {
              dispatch(removeItem(item.id));
              posthog.capture(PH_EVENTS.REMOVED_FROM_CART, {
                product_id: item.id,
                name: item.name,
                price: item.price
              });
            }}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center bg-background border border-border rounded-lg overflow-hidden">
            <button 
              onClick={() => {
                const newQty = item.quantity - 1;
                dispatch(updateQuantity({ id: item.id, quantity: newQty }));
                posthog.capture(PH_EVENTS.CART_QUANTITY_UPDATED, {
                  product_id: item.id,
                  old_quantity: item.quantity,
                  new_quantity: newQty
                });
              }}
              className="p-1.5 hover:bg-accent transition-colors disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
            <button 
              onClick={() => {
                const newQty = item.quantity + 1;
                dispatch(updateQuantity({ id: item.id, quantity: newQty }));
                posthog.capture(PH_EVENTS.CART_QUANTITY_UPDATED, {
                  product_id: item.id,
                  old_quantity: item.quantity,
                  new_quantity: newQty
                });
              }}
              className="p-1.5 hover:bg-accent transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-right">
            <span className="text-lg font-black">${(item.price * item.quantity).toFixed(2)}</span>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Price each: ${item.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
