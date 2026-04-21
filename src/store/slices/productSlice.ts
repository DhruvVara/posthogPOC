import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
}

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Astral Minimalist Watch',
    description: 'A sleek, titanium-bodied timepiece with a sapphire crystal face. Perfect for those who value elegance and precision.',
    price: 249.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Nebula Noise-Cancelling Headphones',
    description: 'Immerse yourself in pure sound with our flagship active noise-cancelling headphones. 40-hour battery life and premium leather cushions.',
    price: 349.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Zenith Porcelain Vase',
    description: 'Handcrafted ceramic vase with a textured matte finish. A centerpiece that brings serenity to any room.',
    price: 89.00,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
    reviews: 56,
  },
  {
    id: '4',
    name: 'Equinox Leather Backpack',
    description: 'Full-grain Italian leather backpack with a dedicated laptop compartment. Built to last a lifetime of adventures.',
    price: 189.50,
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6,
    reviews: 210,
  },
  {
    id: '5',
    name: 'Solaris Smart Lamp',
    description: 'Adaptive lighting that mimics the natural path of the sun to improve your circadian rhythm and focus.',
    price: 129.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop',
    rating: 4.5,
    reviews: 45,
  },
  {
    id: '6',
    name: 'Vertex Mechanical Keyboard',
    description: 'Custom mechanical keyboard with hot-swappable switches and a solid aluminum frame for the ultimate typing experience.',
    price: 159.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    reviews: 320,
  }
];

const initialState: ProductState = {
  items: mockProducts,
  filteredItems: mockProducts,
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    filterByCategory(state, action: PayloadAction<string>) {
      if (action.payload === 'All') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(item => item.category === action.payload);
      }
    },
    searchProducts(state, action: PayloadAction<string>) {
      const term = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
      );
    }
  },
});

export const { setProducts, filterByCategory, searchProducts } = productSlice.actions;
export default productSlice;
