import { configureStore, Slice } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './query/query';
import userSlice from './slices/userSlice';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import checkoutSlice from './slices/checkoutSlice';

const apis = [baseApi];
const slices: Slice[] = [userSlice, productSlice, cartSlice, checkoutSlice]; // Import and add your slices here

export const store = configureStore({
    reducer: {
        ...apis.reduce((acc, api) => ({ ...acc, [api.reducerPath]: api.reducer }), {}),
        ...slices.reduce((acc, slice) => ({ ...acc, [slice.name]: slice.reducer }), {}),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(...apis.map((api) => api.middleware)),
});

// Optional: Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
