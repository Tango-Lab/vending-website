import { IPagination } from '@/models/Pagination';
import {
  IProductFilterParam,
  IProductForm,
  IProductFormDetail,
  Product,
  ProductAutoComplete,
} from '@/models/Product';
import { GET, POST, PUT } from '@Core';

export function getAllProduct(
  params: IProductFilterParam
): Promise<IPagination<Product>> {
  const API_URL = '/api/products/v1/admin/list';
  return GET<IPagination<Product>, IProductFilterParam>(API_URL, params);
}

export function getProductAutoComplete(): Promise<ProductAutoComplete[]> {
  const API_URL = '/api/products/v1/autocomplete';
  return GET<ProductAutoComplete[]>(API_URL, {});
}

export function createProduct(product: IProductForm): Promise<IProductForm> {
  const API_URL = '/api/products/v1/create';
  return POST<IProductForm, IProductForm>(API_URL, product);
}

export function updateProductById(
  id: string,
  product: IProductForm
): Promise<IProductFormDetail> {
  const API_URL = '/api/products/v1/' + id;
  return PUT<IProductFormDetail, IProductForm>(API_URL, product, {});
}

export function getProductById(id: string): Promise<IProductFormDetail> {
  const API_URL = '/api/products/v1/' + id;
  return GET<IProductFormDetail, {}>(API_URL);
}
