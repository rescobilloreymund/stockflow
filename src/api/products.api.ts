import { BaseApi } from "@/api/BaseApi";
import {
  GetProductsRequest,
  GetProductsResponse,
  Product,
  UpdateProductRequest,
} from "@/types/product";
import { CreateProductRequest } from "@/types/product";
export class ProductApi extends BaseApi {
  getProducts(filters: GetProductsRequest): Promise<GetProductsResponse> {
    const params = new URLSearchParams();
    const {
      search,
      categoryId,
      page,
      pageSize,
      sortBy,
      sortDirection,
      status,
    } = filters;
    if (search) {
      params.set("search", search);
    }

    if (categoryId) {
      params.set("categoryId", categoryId.toString());
    }

    if (status) {
      params.set("status", status);
    }

    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    params.set("sortBy", sortBy);
    params.set("sortDirection", sortDirection);
    const query = params.toString();

    return this.fetchRequest<GetProductsResponse>(
      `/api/products${query ? `?${query}` : ""}`,
    );
  }

  createProduct(data: CreateProductRequest): Promise<Product> {
    return this.fetchRequest<Product>("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  updateProduct(id: number, data: UpdateProductRequest): Promise<Product> {
    return this.fetchRequest<Product>(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  deleteProduct(id: number): Promise<void> {
    const deleteRequest = this.fetchRequest<void>(`/api/products/${id}`, {
      method: "DELETE",
    });

    return deleteRequest;
  }
}
