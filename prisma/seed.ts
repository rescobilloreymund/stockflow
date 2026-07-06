import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ProductStatus } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  { name: "Electronics" },
  { name: "Furniture" },
  { name: "Books" },
];

const suppliers = [
  {
    name: "Logitech",
    phone: "0999999999",
    contactName: "sample test",
    email: "sample_test@gmail.com",
    address: "Manila",
  },
  {
    name: "DIY",
    phone: "3345667",
    contactName: "samp ako",
    email: "samp@gmail.com",
    address: "Cebu",
  },
  {
    name: "Jollibee",
    phone: "3452000",
    contactName: "bee ako",
    email: "bee@gmail.com",
    address: "Makati",
  },
];

const products = [
  {
    name: "Mechanical Keyboard",
    sku: "KB-001",
    category: "Electronics",
    supplier: "Logitech",
    cost: 100.0,
    price: 1400.0,
    status: ProductStatus.ACTIVE,
  },
  {
    name: "Gaming Mouse",
    sku: "GM-001",
    category: "Electronics",
    supplier: "Logitech",
    cost: 1500.0,
    price: 2000.0,
    status: ProductStatus.DISCONTINUED,
  },
  {
    name: "Sofa",
    sku: "SOFA001",
    category: "Furniture",
    supplier: "DIY",
    cost: 300.0,
    price: 4000.0,
    status: ProductStatus.INACTIVE,
  },
];

async function seedCategories() {
  console.log("🌱 Seeding categories...");
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
  console.log("✅ Categories seeded successfully.");
}

async function seedSuppliers() {
  console.log("🌱 Seeding suppliers...");
  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: {},
      create: supplier,
    });
  }
  console.log("✅ Suppliers seeded successfully.");
}

async function seedProducts() {
  console.log("🌱 Seeding products...");
  for (const product of products) {
    const { category, supplier, ...productData } = product;

    const categoryData = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!categoryData) {
      throw new Error("Category not found.");
    }

    const supplierData = await prisma.supplier.findUnique({
      where: { name: supplier },
    });

    if (!supplierData) {
      throw new Error("Supplier not found.");
    }

    const createProduct = {
      ...productData,
      categoryId: categoryData.id,
      supplierId: supplierData.id,
    };

    await prisma.product.upsert({
      where: { sku: createProduct.sku },
      update: {},
      create: createProduct,
    });
  }
  console.log("✅ Products seeded successfully.");
}
async function main() {
  await seedCategories();
  await seedSuppliers();
  await seedProducts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
