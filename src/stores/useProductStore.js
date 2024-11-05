import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../libs/axios";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  loading: false,

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products/create", productData);
      toast.success(res.data.message);
      set((prevState) => ({
        products: [...prevState.products, res.data],
      }));
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/all");
      set({ products: res.data.products });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${productId}`);
      toast.success(res.data.message);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id == productId
            ? {
                ...product,
                isFeatured: res.data.product.isFeatured,
              }
            : product
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/products/delete/${productId}`);
      toast.success(res.data.message);
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },
}));
