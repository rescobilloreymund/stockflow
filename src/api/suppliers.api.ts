import { Supplier } from "@/types/supplier";
import { BaseApi } from "@/api/BaseApi";
export class SupplierApi extends BaseApi {
  getSuppliers(): Promise<Supplier[]> {
    return this.fetchRequest<Supplier[]>("/api/suppliers");
  }
}
