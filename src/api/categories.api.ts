import {
  Category,
  CreateCategoryRequest,
  GetCategoriesRequest,
  GetCategoriesResponse,
  UpdateCategoryRequest,
} from "@/types/category";
import { Option } from "@/types/option";
import { BaseApi } from "@/api/BaseApi";
export class CategoryApi extends BaseApi {
  getCategories(filters: GetCategoriesRequest): Promise<GetCategoriesResponse> {
    const params = new URLSearchParams();
    const { search, page, pageSize, sortBy, sortDirection } = filters;
    if (search) {
      params.set("search", search);
    }

    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    params.set("sortBy", sortBy);
    params.set("sortDirection", sortDirection);
    const query = params.toString();

    return this.fetchRequest<GetCategoriesResponse>(
      `/categories${query ? `?${query}` : ""}`,
    );
  }

  createCategory(data: CreateCategoryRequest): Promise<Category> {
    return this.fetchRequest<Category>("/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  updateCategory(id: number, data: UpdateCategoryRequest): Promise<Category> {
    return this.fetchRequest<Category>(`/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  deleteCategory(id: number): Promise<void> {
    return this.fetchRequest<void>(`/categories/${id}`, {
      method: "DELETE",
    });
  }

  getCategoryOptions(): Promise<Option<number>[]> {
    return this.fetchRequest<Option<number>[]>("/categories/options");
  }
}
