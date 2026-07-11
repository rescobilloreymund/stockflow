"use client";
import { useEffect } from "react";
import CategoriesTable from "@/components/categories/CategoriesTable";
import { Card, CardContent } from "@/components/ui/Card";
import CategoryDialog from "@/components/categories/CategoryDialog";
import { useCategoriesPage } from "@/hooks/useCategoriesPage";
import PageHeader from "@/components/layout/PageHeader";
import CategoriesToolbar from "@/components/categories/CategoriesToolbar";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/shared/EmptyState";
import { FolderTree, Plus, Search } from "lucide-react";
import CategoriesTableSkeleton from "@/components/categories/CategoriesTableSkeleton";
import Pagination from "@/components/shared/Pagination";
import PageContainer from "@/components/layout/PageContainer";

export default function CategoriesPage() {
  const {
    // data
    categories,
    pagination,
    query,

    // loading
    isLoadingCategories,

    // dialog
    editingCategory,
    isDialogOpen,

    // actions
    loadCategories,
    handleSearchChange,
    handlePageChange,
    handleSort,
    handlePageSizeChange,
    handleAddCategoryClick,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleEditCategory,
    handleDialogChange,
    debouncedSearch,

    // derived states
    isFirstTime,
    isEmptySearchResult,
    shouldShowToolbar,
    shouldShowPagination,
  } = useCategoriesPage();

  useEffect(() => {
    void loadCategories();
  }, [
    debouncedSearch,
    query.page,
    query.pageSize,
    query.sortBy,
    query.sortDirection,
  ]);

  return (
    <PageContainer>
      <PageHeader
        title={"Categories"}
        description={"Manage your categories"}
        action={
          <Button type="button" onClick={handleAddCategoryClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add category
          </Button>
        }
      />
      <Card>
        <CardContent className="space-y-6">
          {shouldShowToolbar && (
            <CategoriesToolbar
              search={query.search || ""}
              onSearchChange={handleSearchChange}
            />
          )}

          {isLoadingCategories ? (
            <CategoriesTableSkeleton />
          ) : isFirstTime ? (
            <EmptyState
              title="No categories found"
              description="Get started by creating your first category."
              action={
                <Button onClick={handleAddCategoryClick}>Add category</Button>
              }
              icon={<FolderTree />}
            />
          ) : isEmptySearchResult ? (
            <EmptyState
              title="No categories found"
              description="Try adjusting your search or filters.."
              action={
                <Button onClick={handleAddCategoryClick}>Add category</Button>
              }
              icon={<Search />}
            />
          ) : (
            <CategoriesTable
              categories={categories}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
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

          <CategoryDialog
            open={isDialogOpen}
            onOpenChange={handleDialogChange}
            category={editingCategory}
            onSubmit={
              editingCategory ? handleUpdateCategory : handleAddCategory
            }
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
