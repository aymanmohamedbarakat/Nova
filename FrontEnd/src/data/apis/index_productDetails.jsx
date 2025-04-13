// import axios from "axios";
// import { domain } from "../../store";

// export const indexProductDetails = async (product_id) => {

//   const response = await axios.get(`${domain}/products/${product_id}`);
//   return response.data;
// };

import axios from "axios";
import { domain } from "../../store";

export const indexProductDetails = async (product_id) => {
  try {
    if (!product_id || product_id === "undefined") {
      throw new Error("Invalid Product ID: value is undefined");
    }

    const parsedId = Number(product_id);
    if (isNaN(parsedId)) {
      throw new Error("Invalid Product ID: must be a number");
    }

    const response = await axios.get(`${domain}/products/${parsedId}`);
    return response;
  } catch (error) {
    console.error("Full API Error:", error);
    throw error;
  }
};
