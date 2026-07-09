import { CreateSupplierRequest, Supplier } from "@/types/supplier";
import { useEffect } from "react";
import { supplierToFormData } from "@/utils/mappers/suppliers/supplier-form.mapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSupplierSchema,
  SupplierFormData,
} from "@/schemas/supplier.schema";

const initialForm: SupplierFormData = {
  name: "",
  contactName: "",
  phone: "",
  email: "",
  address: "",
};

interface UseSupplierFormProps {
  editingSupplier: Supplier | null;
}

export function useSupplierForm({ editingSupplier }: UseSupplierFormProps) {
  const form = useForm<SupplierFormData>({
    resolver: zodResolver(createSupplierSchema),
    defaultValues: editingSupplier
      ? supplierToFormData(editingSupplier)
      : initialForm,
  });

  useEffect(() => {
    form.reset(
      editingSupplier ? supplierToFormData(editingSupplier) : initialForm,
    );
  }, [editingSupplier, form]);

  return form;
}
