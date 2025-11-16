import { create } from "zustand";
import { PRODUCTDATA } from "../utils";

export const useProductStore = create(() => ({
  products: PRODUCTDATA,
}));
