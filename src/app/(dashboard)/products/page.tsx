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
import { PackageOpen, Plus, Search } from "lucide-react";
import ProductsTableSkeleton from "@/components/products/ProductsTableSkeleton";
import Pagination from "@/components/shared/Pagination";
import PageContainer from "@/components/layout/PageContainer";
import { ProductStatus } from "@/types/product";

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
    handleSort,

    handleCategoryChange,
    handlePageSizeChange,
    debouncedSearch,
    handleStatusChange,

    editingProduct,

    handleAddProductClick,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,

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
  }, [
    debouncedSearch,
    query.categoryId,
    query.page,
    query.pageSize,
    query.sortBy,
    query.sortDirection,
    query.status,
  ]);

  return (
    <PageContainer>
      <PageHeader
        title={"Products"}
        description={"Manage your products"}
        action={
          <Button type="button" onClick={handleAddProductClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add product
          </Button>
        }
      />
      <Card>
        <CardContent className="space-y-6">
          {shouldShowToolbar && (
            <ProductsToolbar
              search={query.search || ""}
              onSearchChange={handleSearchChange}
              selectedCategory={query.categoryId || 0}
              onCategoryChange={handleCategoryChange}
              categories={categories}
              status={query.status ?? "all"}
              onStatusChange={handleStatusChange}
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
              sortBy={query.sortBy}
              sortDirection={query.sortDirection}
              onSort={handleSort}
            />
          )}

          {shouldShowPagination && (
            <Pagination
              totalItems={pagination.totalItems}
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              pageSize={query.pageSize}
              onPageSizeChange={handlePageSizeChange}
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
    </PageContainer>
  );
}
