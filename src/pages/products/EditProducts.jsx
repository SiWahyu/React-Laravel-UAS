import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import useCategoryStore from "../../stores/useCategoryStore";
import useSupplierStore from "../../stores/useSupplierStore";
import { useEffect, useState } from "react";
import useProductStore from "../../stores/useProductStore";
import { ArrowLeft } from "lucide-react";
import FormEditProduct from "../../components/fragments/FormEditProducts";
import AppLayouts from "../../components/layouts/AppLayouts";
import { toast } from "react-toastify";

export default function EditProductsPage() {
  const { id } = useParams();

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const loadingCategories = useCategoryStore((state) => state.loading);

  const suppliers = useSupplierStore((state) => state.suppliers);
  const fetchSuppliers = useSupplierStore((state) => state.fetchSuppliers);
  const loadingSuppliers = useSupplierStore((state) => state.loading);

  const notFound = useProductStore((state) => state.notFound);
  const products = useProductStore((state) => state.products);
  const findProductById = useProductStore((state) => state.findProductById);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const editProduct = useProductStore((state) => state.editProduct);

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
    if (suppliers.length === 0) {
      fetchSuppliers();
    }

    if (products.length === 0) {
      fetchProducts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const prod = findProductById(id);

      setProduct(prod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, id]);

  const handleSubmit = async (data) => {
    setLoadingSubmit(true);
    const result = await editProduct(id, data);

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

  if (notFound) return <Navigate to="/NotFound" />;

  return (
    <AppLayouts title="Edit Product">
      <div className="p-8 m-4 md:m-10 border rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-7 gap-2">
          <h1 className="text-2xl font-semibold">Edit Product</h1>
        </div>

        <Link to={"/dashboard/products"}>
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <div className="flex flex-col">
          <div className="w-full py-6">
            <FormEditProduct
              categories={categories}
              suppliers={suppliers}
              onSubmit={handleSubmit}
              loadingCategories={loadingCategories}
              loadingSuppliers={loadingSuppliers}
              loadingSubmit={loadingSubmit}
              product={product}
            />
          </div>
        </div>
      </div>
    </AppLayouts>
  );
}
