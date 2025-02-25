import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CurrencyState {
  currency: string | null;
  code: string | null;
  setCurrency: (currency: string, code: string) => void;
}

const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "INR",
      code: "IN",
      setCurrency: (currency, code) => set({ currency, code }),
    }),
    {
      name: "currency-store", // Storage key
      storage: createJSONStorage(() => localStorage), // Ensure persistence across refreshes
    }
  )
);

export default useCurrencyStore;