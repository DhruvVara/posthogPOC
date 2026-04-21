'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/slices/cartSlice';
import { Product } from '@/store/slices/productSlice';
import { ShoppingCart, Star } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { PH_EVENTS } from '@/lib/posthog-events';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const posthog = usePostHog();
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    posthog.capture(PH_EVENTS.ADDED_TO_CART, {
      product_id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      source: 'product_card'
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            {product.category}
          </div>
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-center space-x-1 mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-black">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
