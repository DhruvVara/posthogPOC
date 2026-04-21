export const PH_EVENTS = {
  // Navigation
  LOGO_CLICKED: 'logo_clicked',
  SEARCH_CLICKED: 'search_clicked',
  NAVIGATION_CLICKED: 'navigation_clicked',
  FOOTER_LINK_CLICKED: 'footer_link_clicked',

  // Discovery
  PRODUCT_LIST_VIEWED: 'product_list_viewed',
  PRODUCT_VIEWED: 'product_viewed',
  SORTING_APPLIED: 'sorting_applied',

  // Cart
  ADDED_TO_CART: 'added_to_cart',
  REMOVED_FROM_CART: 'removed_from_cart',
  CART_VIEWED: 'cart_viewed',
  CART_QUANTITY_UPDATED: 'cart_quantity_updated',

  // Checkout
  CHECKOUT_STARTED: 'checkout_started',
  SHIPPING_ADDRESS_SELECTED: 'shipping_address_selected',
  PAYMENT_METHOD_SELECTED: 'payment_method_selected',
  ORDER_COMPLETED: 'order_completed',

  // Retention
  NEWSLETTER_SUBSCRIBED: 'newsletter_subscribed',
} as const;

export type PhEventName = typeof PH_EVENTS[keyof typeof PH_EVENTS];
