export interface Category {
 id: number;
 name: string;
 url_key: string;
 children?: Category[];
}