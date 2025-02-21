import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Category } from "../interface/category";

interface UseCategoryResult {
 categoryId: number | null;
 categories: Category[];
 currentCategory: Category | undefined;
 currentPage: number;
 setCurrentPage: (page: number) => void;
}

const findCategoryBySlugs = (slugs: string[], categories: Category[]): Category | undefined => {
 let currentCategories = categories;
 let foundCategory = undefined;
 for (const slug of slugs) {
  foundCategory = currentCategories.find((cat) => cat.url_key === slug);
  if (!foundCategory) return undefined;
  currentCategories = foundCategory.children || [];
 }
 return foundCategory;
};

const findCategoryById = (id: number, categories: Category[]): Category | undefined => {
 for (const cat of categories) {
  if (cat.id === id) return cat;
  if (cat.children && cat.children.length > 0) {
   const found = findCategoryById(id, cat.children);
   if (found) return found;
  }
 }
 return undefined;
};

export const useCategory = (
 fetchCategoriesFunc: () => Promise<{ categories: { items: Category[] } }>
): UseCategoryResult => {
 const params = useParams();
 const categoryPath = params?.categoryPath || [];
 const categorySlugs = Array.isArray(categoryPath) ? categoryPath : [categoryPath];
 const [categoryId, setCategoryId] = useState<number | null>(null);
 const [currentCategory, setCurrentCategory] = useState<Category | undefined>(undefined);
 const [categories, setCategories] = useState<Category[]>([]);
 const [currentPage, setCurrentPage] = useState<number>(1);
 
 const fetchCategories = useCallback(async () => {
  try {
   const { categories } = await fetchCategoriesFunc();
   if(JSON.stringify(categories.items) !== JSON.stringify(categories)) {
    setCategories(categories.items);
   }
   if(categorySlugs.length > 0) {
    const category = findCategoryBySlugs(categorySlugs, categories.items);
    if(category && category.id !== categoryId) {
     setCategoryId(category.id);
     setCurrentCategory(category);
    }
   }
  } catch (error) {
   console.error("Failed to fetch categories:", error);
  }
 }, [fetchCategoriesFunc, categorySlugs, categoryId]);
 
 useEffect(() => {
  if (categoryId && categories.length > 0) {
   const category = findCategoryById(categoryId, categories);
   setCurrentCategory(category);
  } else {
   setCurrentCategory(undefined);
  }
 }, [categoryId, categories]);
 
 useEffect(() => {
  fetchCategories();
 }, [fetchCategories]);
 
 return {
  categoryId,
  categories,
  currentCategory,
  currentPage,
  setCurrentPage,
 };
 
};