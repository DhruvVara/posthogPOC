'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { PH_EVENTS } from '@/lib/posthog-events';

const Navbar = () => {
  const posthog = usePostHog();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => posthog.capture(PH_EVENTS.LOGO_CLICKED)}
          className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
        >
          EZIBIZI<span className="text-primary font-black italic">!</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            onClick={() => posthog.capture(PH_EVENTS.NAVIGATION_CLICKED, { label: 'Home' })}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            onClick={() => posthog.capture(PH_EVENTS.NAVIGATION_CLICKED, { label: 'Shop' })}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <Link 
            href="/categories" 
            onClick={() => posthog.capture(PH_EVENTS.NAVIGATION_CLICKED, { label: 'Categories' })}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Categories
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => posthog.capture(PH_EVENTS.SEARCH_CLICKED)}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/cart" className="relative p-2 hover:bg-accent rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>

          <button className="hidden sm:flex p-2 hover:bg-accent rounded-full transition-colors">
            <User className="w-5 h-5" />
          </button>

          <button className="md:hidden p-2 hover:bg-accent rounded-full transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
