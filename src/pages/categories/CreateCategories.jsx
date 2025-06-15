import { Link, useNavigate } from "react-router-dom";
import FormInputCategories from "../../components/fragments/FormInputCategories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import useCategoryStore from "../../stores/useCategoryStore";
import AppLayouts from "../../components/layouts/AppLayouts";
import { toast } from "react-toastify";

export default function CreateCategoriesPage() {
  const navigate = useNavigate();

  const { loading, addCategory } = useCategoryStore();

  const handleSubmit = async (data) => {
    const result = await addCategory(data);

    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <AppLayouts title={"Create Category"}>
      <div className="p-8 m-4 md:m-10 border rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-7 gap-2">
          <h1 className="text-2xl font-semibold">Create Category</h1>
        </div>

        <Link
          onClick={() => {
            navigate(-1);
          }}
        >
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <div className="flex flex-col">
          <div className="w-full py-6">
            <FormInputCategories
              loading={loading}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </AppLayouts>
  );
}
