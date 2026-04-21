'use client';

import React, { use, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addItem } from '@/store/slices/cartSlice';
import { ShoppingCart, Star, Heart, Share2, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { notFound } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { PH_EVENTS } from '@/lib/posthog-events';

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDescription = ({ params }: Props) => {
  const posthog = usePostHog();
  const { id } = use(params);
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => 
    state.products.items.find((p: any) => p.id === id)
  );
  
  useEffect(() => {
    if (product) {
      posthog.capture(PH_EVENTS.PRODUCT_VIEWED, {
        product_id: product.id,
        name: product.name,
        price: product.price,
        category: product.category
      });
    }
  }, [product, posthog]);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
      posthog.capture(PH_EVENTS.ADDED_TO_CART, {
        product_id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        source: 'pdp'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Product Images */}
        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border cursor-pointer hover:border-primary transition-colors">
                <Image src={product.image} alt="Thumbnail" fill className="object-cover opacity-60" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div>
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {product.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
                <span className="ml-2 text-foreground font-bold">{product.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm font-medium">| {product.reviews} Customer Reviews</span>
            </div>
          </div>

          <p className="text-3xl font-black">${product.price.toFixed(2)}</p>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {product.description}
          </p>

          {/* Configuration / Options (Placeholder) */}
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-widest">Select Color</p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-black border-2 border-primary cursor-pointer shadow-md" />
              <div className="w-8 h-8 rounded-full bg-slate-400 border border-border cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-white border border-border cursor-pointer" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleAddToCart}
              className="flex-grow bg-primary text-primary-foreground h-14 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button className="h-14 w-14 border border-border rounded-2xl flex items-center justify-center hover:bg-accent transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="h-14 w-14 border border-border rounded-2xl flex items-center justify-center hover:bg-accent transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="p-2 bg-muted rounded-full text-foreground">
                <Truck className="w-4 h-4" />
              </div>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="p-2 bg-muted rounded-full text-foreground">
                <RefreshCcw className="w-4 h-4" />
              </div>
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="p-2 bg-muted rounded-full text-foreground">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products / Tabs placeholder */}
      <div className="mt-20 pt-20 border-t border-border">
         <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-12">Related Products</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 opacity-40 grayscale pointer-events-none">
           {/* Placeholder for related products */}
            <div className="aspect-[4/5] bg-card rounded-2xl border border-border border-dashed flex items-center justify-center">More coming soon...</div>
            <div className="aspect-[4/5] bg-card rounded-2xl border border-border border-dashed flex items-center justify-center">More coming soon...</div>
            <div className="aspect-[4/5] bg-card rounded-2xl border border-border border-dashed flex items-center justify-center">More coming soon...</div>
            <div className="aspect-[4/5] bg-card rounded-2xl border border-border border-dashed flex items-center justify-center">More coming soon...</div>
         </div>
      </div>
    </div>
  );
};

export default ProductDescription;
