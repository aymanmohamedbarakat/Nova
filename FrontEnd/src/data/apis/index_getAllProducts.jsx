import axios from "axios";
import { domain } from "../../store";

export const getAllProducts = async () => {
  const response = await axios.get(domain + "/products");
  // console.log(response)
  return response.data;
};
