import axios from "axios";
import { domain } from "../../store";

export const indexProduct = async (page = 1, perPage = 5) => {
  // let final = [];

  const response = await axios.get(domain + "/products"); 
  console.log("API Response Data:", response.data); // Log the API response data
  const allProducts = response.data;
  const total = allProducts.length;
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, total);
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  return {
    data: paginatedProducts,
    total: total,
    currentPage: page,
    perPage: perPage,
    lastPage: Math.ceil(total / perPage),
  };
};

// import axios from "axios";
// import { domain } from "../../store";

// export const indexProduct = async (pageNo = 1, pageSize = 5, sortBy = "name", sortOrder = "asc", filters = []) => {
//   let final = {total: 0, data: []};

//   try {
//     // Build query parameters
//     const params = new URLSearchParams();
//     params.append("page", pageNo);
//     params.append("pageSize", pageSize);
//     params.append("sort", sortBy);
//     params.append("order", sortOrder);

//     // Add category filters if any exist
//     if (filters && filters.length > 0) {
//       filters.forEach(filter => {
//         params.append("category", filter);
//       });
//     }

//     const response = await axios.get(`${domain}/products?${params.toString()}`);

//     final = {
//       total: response.data.meta?.pagination?.total || response.data.total || 0,
//       data: response.data.products || response.data.data || response.data
//     };

//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }

//   return final;
// };
