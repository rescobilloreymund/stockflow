import { Category } from "@/types/category";
import { BaseApi } from "@/api/BaseApi";
export class CategoryApi extends BaseApi {
  getCategories(): Promise<Category[]> {
    return this.fetchRequest<Category[]>("/api/categories");
  }
}
