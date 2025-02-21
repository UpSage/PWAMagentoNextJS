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
  $sort: ProductAttributeSortInput
 ) {
  products(
   filter: { 
    category_id: { in: $categoryIds }
   },
   currentPage: $currentPage,
   pageSize: $pageSize,
   sort: $sort
  ) {
   items {
    id
    name
    sku
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
 sort?: { field: string; direction: string }
): Promise<ProductsResponse["products"]> => {
    
 let sortInput = sort ? { [sort.field]: sort.direction } : undefined;
 
 const { data } = await client.query({
  query: GET_PRODUCTS,
  variables: {
   categoryIds, 
   currentPage,
   pageSize,
   sort: sortInput
  },
  fetchPolicy: "network-only",
 });
 
 return data.products;
};
  
  