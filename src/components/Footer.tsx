'use client';

import React from 'react';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { PH_EVENTS } from '@/lib/posthog-events';

const Footer = () => {
  const posthog = usePostHog();
  return (
    <footer className="w-full bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">EZIBIZI!</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curating the finest minimalist products for your modern lifestyle. Quality meets aesthetic perfection.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" onClick={() => posthog.capture(PH_EVENTS.FOOTER_LINK_CLICKED, { section: 'Shop', label: 'All Products' })} className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/categories" onClick={() => posthog.capture(PH_EVENTS.FOOTER_LINK_CLICKED, { section: 'Shop', label: 'Categories' })} className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/featured" onClick={() => posthog.capture(PH_EVENTS.FOOTER_LINK_CLICKED, { section: 'Shop', label: 'Featured' })} className="hover:text-primary transition-colors">Featured</Link></li>
              <li><Link href="/new-arrivals" onClick={() => posthog.capture(PH_EVENTS.FOOTER_LINK_CLICKED, { section: 'Shop', label: 'New Arrivals' })} className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button 
                onClick={() => posthog.capture(PH_EVENTS.NEWSLETTER_SUBSCRIBED)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © 2026 EZIBIZI! Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" onClick={() => posthog.capture(PH_EVENTS.FOOTER_LINK_CLICKED, { section: 'Legal', label: 'Privacy Policy' })} className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="#" onClick={() => posthog.capture(PH_EVENTS.FOOTER_LINK_CLICKED, { section: 'Legal', label: 'Terms of Service' })} className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
