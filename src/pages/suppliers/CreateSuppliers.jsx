import { Link } from "react-router-dom";
import FormInputSuppliers from "../../components/fragments/FormInputSuppliers";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import useSupplierStore from "../../stores/useSupplierStore";
import AppLayouts from "../../components/layouts/AppLayouts";
import { toast } from "react-toastify";

export default function CreateSuppliersPage() {
  const loading = useSupplierStore((state) => state.loading);
  const addSupplier = useSupplierStore((state) => state.addSupplier);

  const handleSubmit = async (data) => {
    const result = await addSupplier(data);

    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <AppLayouts title={"Create Supplier"}>
      <div className="p-8 m-4 md:m-10 border rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-7 gap-2">
          <h1 className="text-2xl font-semibold">Create Supplier</h1>
        </div>

        <Link to={"/dashboard/suppliers"}>
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <div className="flex flex-col">
          <div className="w-full py-6">
            <FormInputSuppliers
              loadingSubmit={loading}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </AppLayouts>
  );
}
