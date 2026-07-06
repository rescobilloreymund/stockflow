import { z } from "zod";
import { ProductStatus } from "@/generated/prisma/enums";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Product name is required."),
  sku: z.string().trim().min(1, "SKU is required."),
  categoryId: z.number().positive("Please select a category."),
  supplierId: z.number().positive("Please select a supplier."),
  cost: z.number().nonnegative("Please enter a valid cost."),
  price: z.number().nonnegative("Please enter a valid price."),
  status: z.enum(ProductStatus),
});

export type CreateProductRequest = z.infer<typeof createProductSchema>;
