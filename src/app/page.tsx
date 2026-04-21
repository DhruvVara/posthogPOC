'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap, Truck } from 'lucide-react';

export default function Home() {
  const products = useSelector((state: RootState) => state.products.items).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
            <Zap className="w-4 h-4" />
            <span>New Collection 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            REDEFINE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">LIFESTYLE.</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-muted-foreground text-lg md:text-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Experience the perfect blend of minimalist design and high-performance technology. Elevate your everyday with EZIBIZI!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link 
              href="/products" 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop the Collection</span>
            </Link>
            <Link 
              href="#featured" 
              className="px-8 py-4 rounded-full font-bold text-lg border border-border hover:bg-accent transition-all"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-2xl mx-auto text-primary">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">Free worldwide shipping on all orders over $150. Tracked and insured.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-2xl mx-auto text-primary">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Secure Payment</h3>
              <p className="text-muted-foreground text-sm">Every transaction is fully encrypted. We support all major credit cards and digital wallets.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-2xl mx-auto text-primary">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">We only source the finest materials and partner with world-class manufacturers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 italic uppercase">Trending Now</h2>
              <p className="text-muted-foreground">Most popular items from our latest drop.</p>
            </div>
            <Link 
              href="/products" 
              className="group flex items-center space-x-2 text-primary font-bold hover:opacity-80 transition-all underline decoration-2 underline-offset-4"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories / Grid Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
            <div className="group relative overflow-hidden rounded-3xl cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" 
                alt="New Era" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10 space-y-4">
                <h3 className="text-4xl font-black italic tracking-tighter">PERFORMANCE GEAR</h3>
                <p className="max-w-xs text-sm text-gray-300">Push your limits with our new elite athletic collection.</p>
                <div className="inline-block bg-white text-black px-6 py-2 rounded-full font-bold text-sm tracking-widest hover:bg-primary hover:text-white transition-colors uppercase">
                  Discover
                </div>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-8 h-full">
              <div className="group relative overflow-hidden rounded-3xl cursor-pointer">
                <Image 
                  src="https://images.unsplash.com/photo-1512446816042-444d641267d4?q=80&w=1000&auto=format&fit=crop" 
                  alt="Minimal" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                   <h3 className="text-2xl font-black italic tracking-tighter">ESSENTIALS</h3>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-3xl cursor-pointer">
                <Image 
                  src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tech" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                   <h3 className="text-2xl font-black italic tracking-tighter">WORKSTATIONS</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
