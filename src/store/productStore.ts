import { create } from "zustand";

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  createdAt: string
  updatedAt: string
  image: string[]
  category: string[]
  rating: number
  isConsecrated: boolean
  reviews: { rating: number }[]
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  getProductById: (id: string) => Product | undefined;
  filterByCategory: (category: string) => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),

  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),

  getProductById: (id) => get().products.find((product) => product.id === id),

  filterByCategory: (category) =>
    get().products.filter((product) => product.category.includes(category)),
}));
