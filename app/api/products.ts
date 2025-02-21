import client from "./apolloClient";
import { gql } from "@apollo/client";

interface ProductImage {
 url: string;
 label: string;
}

interface Product {
 id: string;
 name: string;
 sku: string;
 thumbnail: ProductImage;
 small_image: ProductImage;
 image: ProductImage;
}

interface PageInfo {
 current_page: number;
 total_pages: number;
}

interface ProductsResponse {
 products: {
  items: Product[];
  total_count: number;
  page_info: PageInfo;
 };
}

export const GET_PRODUCTS = gql`
 query GetProducts(
  $categoryIds: [String!],
  $currentPage: Int,
  $pageSize: Int,
  $sort: ProductAttributeSortInput,
  $minPrice: String,
  $maxPrice: String
 ) {
  products(
   filter: { 
    category_id: { in: $categoryIds },
    price: { from: $minPrice, to: $maxPrice }
   },
   currentPage: $currentPage,
   pageSize: $pageSize,
   sort: $sort
  ) {
   items {
    id
    name
    sku
    price {
      regularPrice {
        amount {
          value
          currency
        }
      }
    }
    thumbnail { url label }
    small_image { url label }
    image { url label }
   }
   total_count
   page_info {
    current_page
    total_pages
   }
  }
 }
`;

export const getProducts = async (
 categoryIds: string[],
 currentPage: number,
 pageSize: number,
 sort?: { field: string; direction: string },
 priceRange?: { min: number, max: number }
): Promise<ProductsResponse["products"]> => {
    
 let sortInput = sort ? { [sort.field]: sort.direction } : undefined;

 const minPriceString = priceRange?.min !== undefined ? priceRange.min.toString() : "";
 const maxPriceString = priceRange?.max !== undefined ? priceRange.max.toString() : "";
 
 const { data } = await client.query({
  query: GET_PRODUCTS,
  variables: {
   categoryIds, 
   currentPage,
   pageSize,
   sort: sortInput,
   minPrice: minPriceString,
   maxPrice: maxPriceString
  },
  fetchPolicy: "network-only",
 });
 
 return data.products;
};