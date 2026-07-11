"use client";
import { useEffect } from "react";
import SuppliersTable from "@/components/suppliers/SuppliersTable";
import { Card, CardContent } from "@/components/ui/Card";
import SupplierDialog from "@/components/suppliers/SupplierDialog";
import { useSuppliersPage } from "@/hooks/useSuppliersPage";
import PageHeader from "@/components/layout/PageHeader";
import SuppliersToolbar from "@/components/suppliers/SuppliersToolbar";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/shared/EmptyState";
import { Plus, Search, Truck } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import PageContainer from "@/components/layout/PageContainer";
import SuppliersTableSkeleton from "@/components/suppliers/SuppliersTableSkeleton";

export default function SuppliersPage() {
  const {
    suppliers,
    pagination,
    query,

    editingSupplier,
    isDialogOpen,

    isLoadingSuppliers,

    loadSuppliers,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    debouncedSearch,
    handleAddSupplierClick,
    handleAddSupplier,
    handleUpdateSupplier,
    handleDeleteSupplier,
    handleEditSupplier,
    handleDialogChange,

    isFirstTime,
    isEmptySearchResult,
    shouldShowToolbar,
    shouldShowPagination,
  } = useSuppliersPage();

  useEffect(() => {
    void loadSuppliers();
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
        title={"Suppliers"}
        description={"Manage suppliers, contacts and procurement partners."}
        action={
          <Button onClick={handleAddSupplierClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        }
      />
      <Card className="bg-background">
        <CardContent className="space-y-6">
          {shouldShowToolbar && (
            <SuppliersToolbar
              search={query.search || ""}
              onSearchChange={handleSearchChange}
            />
          )}

          {isLoadingSuppliers ? (
            <SuppliersTableSkeleton />
          ) : isFirstTime ? (
            <EmptyState
              title="No suppliers found"
              description="Get started by creating your first supplier."
              action={
                <Button onClick={handleAddSupplierClick}>Add supplier</Button>
              }
              icon={<Truck />}
            />
          ) : isEmptySearchResult ? (
            <EmptyState
              title="No suppliers found"
              description="Try adjusting your search or filters.."
              action={
                <Button onClick={handleAddSupplierClick}>Add supplier</Button>
              }
              icon={<Search />}
            />
          ) : (
            <SuppliersTable
              suppliers={suppliers}
              onEdit={handleEditSupplier}
              onDelete={handleDeleteSupplier}
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

          <SupplierDialog
            open={isDialogOpen}
            onOpenChange={handleDialogChange}
            supplier={editingSupplier}
            onSubmit={
              editingSupplier ? handleUpdateSupplier : handleAddSupplier
            }
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
