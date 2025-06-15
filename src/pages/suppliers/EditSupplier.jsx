import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import FormEditSuppliers from "../../components/fragments/FormEditSuppliers";
import useSupplierStore from "../../stores/useSupplierStore";
import AppLayouts from "../../components/layouts/AppLayouts";
import { toast } from "react-toastify";

export default function EditSuppliersPage() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState({});

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const suppliers = useSupplierStore((state) => state.suppliers);
  const editSupplier = useSupplierStore((state) => state.editSupplier);
  const fetchSuppliers = useSupplierStore((state) => state.fetchSuppliers);
  const findSupplierById = useSupplierStore((state) => state.findSupplierById);
  const loading = useSupplierStore((state) => state.loading);
  const notFound = useSupplierStore((state) => state.notFound);

  useEffect(() => {
    if (suppliers.length === 0) {
      fetchSuppliers();
    } else {
      const cat = findSupplierById(id);
      setSupplier(cat);
    }
  }, [suppliers, fetchSuppliers, findSupplierById, id]);

  const handleSubmit = async (data) => {
    setLoadingSubmit(true);

    const result = await editSupplier(id, data);
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

  if (notFound) {
    return <Navigate to={"/NotFound"} />;
  }

  return (
    <AppLayouts title={"Edit Supplier"}>
      <div className="p-8 m-4 md:m-10 border rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-7 gap-2">
          <h1 className="text-2xl font-semibold">Edit Supplier</h1>
        </div>

        <Link to={"/suppliers"}>
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <div className="flex flex-col">
          <div className="w-full py-6">
            <FormEditSuppliers
              supplier={supplier}
              loading={loading}
              handleSubmit={handleSubmit}
              loadingSubmit={loadingSubmit}
            />
          </div>
        </div>
      </div>
    </AppLayouts>
  );
}
