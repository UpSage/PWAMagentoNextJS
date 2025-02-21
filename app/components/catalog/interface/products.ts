export interface Product {
 id: string;
 name: string;
 sku: string;
 type_id: string;
 thumbnail: {
  url: string;
  label: string;
 };
 small_image: {
  url: string;
  label: string;
 };
 image: {
  url: string;
  label: string;
 };
}