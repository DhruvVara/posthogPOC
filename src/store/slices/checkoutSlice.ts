import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet';
  lastFour?: string;
  provider?: string;
  isSelected: boolean;
}

interface CheckoutState {
  addresses: Address[];
  selectedAddressId: string | null;
  paymentMethods: PaymentMethod[];
  selectedPaymentMethodId: string | null;
}

const mockAddresses: Address[] = [
  {
    id: 'a1',
    fullName: 'John Doe',
    street: '123 E-commerce Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    isDefault: true,
  },
  {
    id: 'a2',
    fullName: 'John Doe',
    street: '456 Tech Boulevard',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
    isDefault: false,
  }
];

const mockPayments: PaymentMethod[] = [
  { id: 'p1', type: 'card', lastFour: '4242', provider: 'Visa', isSelected: true },
  { id: 'p2', type: 'upi', provider: 'Google Pay', isSelected: false },
  { id: 'p3', type: 'wallet', provider: 'Apple Pay', isSelected: false }
];

const initialState: CheckoutState = {
  addresses: mockAddresses,
  selectedAddressId: 'a1',
  paymentMethods: mockPayments,
  selectedPaymentMethodId: 'p1',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<string>) {
      state.selectedAddressId = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {
      state.selectedPaymentMethodId = action.payload;
      state.paymentMethods = state.paymentMethods.map(p => ({
        ...p,
        isSelected: p.id === action.payload
      }));
    },
    addAddress(state, action: PayloadAction<Address>) {
        state.addresses.push(action.payload);
    }
  },
});

export const { setAddress, setPaymentMethod, addAddress } = checkoutSlice.actions;
export default checkoutSlice;
