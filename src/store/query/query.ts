import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api', // Default to localhost if not set
  }),
  tagTypes: [], // Define any tags for cache invalidation here
  endpoints: () => ({}), // Start with an empty set of endpoints
});
