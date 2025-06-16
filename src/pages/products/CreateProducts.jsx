import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormInputProduct from "../../components/fragments/FormInputProduct";
import useCategoryStore from "../../stores/useCategoryStore";
import useSupplierStore from "../../stores/useSupplierStore";
import { useEffect, useState } from "react";
import useProductStore from "../../stores/useProductStore";
import { ArrowLeft } from "lucide-react";
import AppLayouts from "../../components/layouts/AppLayouts";
import { toast } from "react-toastify";

export default function CreateProductsPage() {
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const loadingCategories = useCategoryStore((state) => state.loading);

  const suppliers = useSupplierStore((state) => state.suppliers);
  const fetchSuppliers = useSupplierStore((state) => state.fetchSuppliers);
  const loadingSuppliers = useSupplierStore((state) => state.loading);

  const addProduct = useProductStore((state) => state.addProduct);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
    if (suppliers.length === 0) {
      fetchSuppliers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (data) => {
    setLoadingSubmit(true);
    const result = await addProduct(data, setLoadingSubmit);

    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoadingSubmit(false);
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoadingSubmit(false);
    }
  };

  return (
    <AppLayouts title={"Create Product"}>
      <div className="p-8 m-4 md:m-10 border rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-7 gap-2">
          <h1 className="text-2xl font-semibold">Create Product</h1>
        </div>

        <Link to={"/dashboard/products"}>
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <div className="flex flex-col">
          <div className="w-full py-6">
            <FormInputProduct
              categories={categories}
              suppliers={suppliers}
              onSubmit={handleSubmit}
              loadingCategories={loadingCategories}
              loadingSuppliers={loadingSuppliers}
              loadingSubmit={loadingSubmit}
            />
          </div>
        </div>
      </div>
    </AppLayouts>
  );
}
