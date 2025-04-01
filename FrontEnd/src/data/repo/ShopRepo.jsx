import { indexCategories } from "../apis/index_categories";
import { getAllProducts } from "../apis/index_getAllProducts";
import { indexProduct } from "../apis/index_product";
import { indexProductDetails } from "../apis/index_productDetails";

export const ShopRepo = {
  categories_index: async () => {
    return await indexCategories();
  },

  products_index: async (page = 1, perPage = 5) => {
    return await indexProduct(page, perPage);
  },


  getAllProducts: async () => {
    return await getAllProducts();
  },

  productDetails: (id) => {
    return indexProductDetails(id);
  },
};

