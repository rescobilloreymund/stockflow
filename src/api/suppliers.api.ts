import {
  CreateSupplierRequest,
  GetSuppliersRequest,
  GetSuppliersResponse,
  Supplier,
} from "@/types/supplier";
import { Option } from "@/types/option";
import { BaseApi } from "@/api/BaseApi";
export class SupplierApi extends BaseApi {
  getSuppliers(filters: GetSuppliersRequest): Promise<GetSuppliersResponse> {
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

    return this.fetchRequest<GetSuppliersResponse>(
      `/suppliers${query ? `?${query}` : ""}`,
    );
  }

  createSupplier(data: CreateSupplierRequest): Promise<Supplier> {
    return this.fetchRequest<Supplier>("/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  updateSupplier(id: number, data: CreateSupplierRequest): Promise<Supplier> {
    return this.fetchRequest<Supplier>(`/suppliers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  deleteSupplier(id: number): Promise<void> {
    return this.fetchRequest<void>(`/suppliers/${id}`, {
      method: "DELETE",
    });
  }

  getSupplierOptions(): Promise<Option<number>[]> {
    return this.fetchRequest<Option<number>[]>("/suppliers/options");
  }
}
