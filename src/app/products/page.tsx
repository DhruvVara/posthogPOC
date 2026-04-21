'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { filterByCategory, searchProducts } from '@/store/slices/productSlice';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { PH_EVENTS } from '@/lib/posthog-events';

const ProductListing = () => {
  const posthog = usePostHog();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.filteredItems);
  const categories = ['All', 'Accessories', 'Electronics', 'Home Decor', 'Travel'];
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(filterByCategory(activeCategory));
    posthog.capture(PH_EVENTS.PRODUCT_LIST_VIEWED, {
      category: activeCategory,
      product_count: products.length
    });
  }, [activeCategory, dispatch, posthog, products.length]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(searchProducts(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0 border-b border-border pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">The Collection</h1>
            <p className="text-muted-foreground mt-2">Explore our range of meticulously crafted products.</p>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full bg-card border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
             </div>
             <button className="p-2 border border-border rounded-full hover:bg-accent transition-colors">
               <SlidersHorizontal className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Categories</h3>
              <div className="flex flex-wrap md:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'hover:bg-accent text-muted-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Sort By</h3>
              <select 
                onChange={(e) => posthog.capture(PH_EVENTS.SORTING_APPLIED, { sort_by: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none"
              >
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-card rounded-3xl border border-dashed border-border">
                <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-full text-muted-foreground">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                </div>
                <button 
                  onClick={() => { setActiveCategory('All'); setSearchTerm(''); dispatch(searchProducts('')); }}
                  className="text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
