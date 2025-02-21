import client from "./apolloClient";
import { gql } from "@apollo/client";

export interface Category {
 id: number;
 name: string;
 url_key: string;
 children?: Category[];
}

export interface CategoriesData {
 categories: {
  items: Category[];
 };
}

export const GET_CATEGORIES = gql`
 query GetCategories($categoryId: String!) {
  categories(
   filters: {
    parent_id: {
     in: [$categoryId]
    }
   }
  ) {
   items {
    id
    name
    url_key
    children {
     id
     name
     url_key
     children {
      id
      name
      url_key
      children {
       id
       name
       url_key
      }
     }
    }
   }
  }
 }
`;

export const getCategories = async (categoryId: string = "3"): Promise<CategoriesData> => {
 const { data } = await client.query({
  query: GET_CATEGORIES,
  variables: { categoryId },
 });
 return data;
};