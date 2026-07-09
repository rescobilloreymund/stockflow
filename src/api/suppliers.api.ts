import {
  CreateSupplierRequest,
  GetSuppliersRequest,
  GetSuppliersResponse,
  Supplier,
  SupplierOption,
} from "@/types/supplier";
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
      `/api/suppliers${query ? `?${query}` : ""}`,
    );
  }

  createSupplier(data: CreateSupplierRequest): Promise<Supplier> {
    return this.fetchRequest<Supplier>("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  updateSupplier(id: number, data: CreateSupplierRequest): Promise<Supplier> {
    return this.fetchRequest<Supplier>(`/api/suppliers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  deleteSupplier(id: number): Promise<void> {
    return this.fetchRequest<void>(`/api/suppliers/${id}`, {
      method: "DELETE",
    });
  }

  getSupplierOptions(): Promise<SupplierOption[]> {
    return this.fetchRequest<SupplierOption[]>("/api/suppliers/options");
  }
}
