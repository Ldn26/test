
import { create } from "zustand";
import { persist } from "zustand/middleware";


const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      openPopUp: false,
      setOpenPopUp: (open) => set({ openPopUp: open }),
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      accessToken: null,
      SetAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),

      cart: [],

      addTocart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);

          const updatedCart = existing
            ? state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            : [...state.cart, item];

          return {
            cart: updatedCart,
            cartCount: updatedCart.reduce((t, i) => t + i.quantity, 0),
          };
        }),

      cartCount: 0,

      removeFromCart: (itemId) =>
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== itemId);
          return {
            cart: updatedCart,
            cartCount: updatedCart.reduce((t, i) => t + i.quantity, 0),
          };
        }),
      clearCart: () => set({ cart: [], cartCount: 0 }),
      updateQuantity: (itemId, newQuantity) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );

          return {
            cart: updatedCart,
            cartCount: updatedCart.reduce((t, i) => t + i.quantity, 0),
          };
        }),
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
