import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import {
  CreateSupplierRequest,
  GetSuppliersRequest,
  GetSuppliersResponse,
  SupplierOption,
  UpdateSupplierRequest,
} from "@/types/supplier";
import { toSuppliers } from "@/utils/mappers/suppliers/supplier.mapper";

export class SupplierService {
  async getSuppliers(
    filters: GetSuppliersRequest,
  ): Promise<GetSuppliersResponse> {
    const { search, page, pageSize, sortBy, sortDirection } = filters;

    const where: Prisma.SupplierWhereInput = {};
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    const [totalItems, supplierEntities] = await Promise.all([
      prisma.supplier.count({
        where,
      }),
      prisma.supplier.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortBy]: sortDirection,
        },
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const data = toSuppliers(supplierEntities);

    return {
      data,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  }

  async createSupplier(data: CreateSupplierRequest) {
    return prisma.supplier.create({
      data: {
        name: data.name.trim(),
        contactName: data.contactName.trim(),
        address: data.address.trim(),
        email: data.email ? data.email.trim() : undefined,
        phone: data.phone.trim(),
      },
    });
  }

  async updateSupplier(id: number, data: UpdateSupplierRequest) {
    return prisma.supplier.update({
      where: {
        id,
      },
      data: {
        name: data.name.trim(),
        contactName: data.contactName.trim(),
        address: data.address.trim(),
        email: data.email ? data.email.trim() : undefined,
        phone: data.phone.trim(),
      },
    });
  }

  async deleteSupplier(id: number) {
    return prisma.supplier.delete({
      where: {
        id,
      },
    });
  }

  async getSupplierOptions(): Promise<SupplierOption[]> {
    const suppliers = await prisma.supplier.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return suppliers;
  }
}
