"use client";
import { useEffect } from "react";
import ProductsTable from "@/components/products/ProductsTable";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import ProductDialog from "@/components/products/ProductDialog";
import { useProductsPage } from "@/hooks/useProductsPage";
import PageHeader from "@/components/layout/PageHeader";
import ProductsToolbar from "@/components/products/ProductsToolbar";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/shared/EmptyState";
import { PackageOpen, Search } from "lucide-react";
import ProductsTableSkeleton from "@/components/products/ProductsTableSkeleton";
import Pagination from "@/components/shared/Pagination";

export default function ProductsPage() {
  const {
    loadReferenceData,

    loadProducts,

    categories,
    products,
    pagination,
    suppliers,

    query,
    handleSearchChange,
    handlePageChange,
    debouncedSearch,

    editingProduct,

    handleAddProductClick,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,

    handleCategoryChange,

    isDialogOpen,
    handleEditProduct,

    handleDialogChange,

    isLoadingProducts,

    isFirstTime,
    isEmptySearchResult,
    shouldShowToolbar,
    shouldShowPagination,
  } = useProductsPage();

  useEffect(() => {
    void loadReferenceData();
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [debouncedSearch, query.categoryId, query.page, query.pageSize]);

  return (
    <div className="space-y-1 px-5">
      <PageHeader title={"Products"} description={"Manage your products"} />
      <Card>
        <CardContent className="space-y-6">
          {shouldShowToolbar && (
            <ProductsToolbar
              search={query.search || ""}
              onSearchChange={handleSearchChange}
              selectedCategory={query.categoryId || 0}
              onCategoryChange={handleCategoryChange}
              categories={categories}
              onAddProduct={handleAddProductClick}
            />
          )}

          {isLoadingProducts ? (
            <ProductsTableSkeleton />
          ) : isFirstTime ? (
            <EmptyState
              title="No products found"
              description="Get started by creating your first product."
              action={
                <Button onClick={handleAddProductClick}>Add product</Button>
              }
              icon={<PackageOpen />}
            />
          ) : isEmptySearchResult ? (
            <EmptyState
              title="No products found"
              description="Try adjusting your search or filters.."
              action={
                <Button onClick={handleAddProductClick}>Add product</Button>
              }
              icon={<Search />}
            />
          ) : (
            <ProductsTable
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}

          {shouldShowPagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <ProductDialog
            open={isDialogOpen}
            onOpenChange={handleDialogChange}
            product={editingProduct}
            categories={categories}
            suppliers={suppliers}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          />
        </CardContent>
      </Card>
    </div>
  );
}
