import axios from "axios";
import { domain } from "../../store";

export const indexProductDetails = async (product_id) => {

  const response = await axios.get(`${domain}/products/${product_id}`);
  return response.data;
};
