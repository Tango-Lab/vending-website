import { IPaginationParam } from './Pagination';

export type ProductList = Product[];

export interface IProductFilterParam extends IPaginationParam {
  name?: string;
  type?: string;
}

export interface Product {
  machines: any[];
  name: string;
  code: string;
  type: string;
  barCode: string;
  imageUrl?: string;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IProductForm {
  name: string;
  code: string;
  type: string;
  barCode: string;
  price: number;
  isActive: boolean;
  imageUrl: string;
}

export interface IProductFormDetail extends IProductForm {
  machines: any[];
  createdAt: string;
  updatedAt: string;
  id: string;
  _id: string;
}

export interface ProductAutoComplete {
  name: string;
  id: string;
  imageUrl: string | null;
}

