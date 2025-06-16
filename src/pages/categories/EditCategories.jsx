import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import FormEditCategories from "../../components/fragments/FormEditCategories";
import useCategoryStore from "../../stores/useCategoryStore";
import AppLayouts from "../../components/layouts/AppLayouts";
import { toast } from "react-toastify";

export default function EditCategoriesPage() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const {
    notFound,
    categories,
    editCategory,
    findCategoryById,
    fetchCategories,
  } = useCategoryStore();

  useEffect(() => {
    async function loadData() {
      if (categories.length === 0) {
        await fetchCategories();
      }
      const cat = findCategoryById(id);
      setCategory(cat);
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (data) => {
    setLoadingSubmit(true);
    const result = await editCategory(id, data);

    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoadingSubmit(false);
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 5000,
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
    <AppLayouts title={"Edit Category"}>
      <div className="p-8 m-4 md:m-10 border rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-7 gap-2">
          <h1 className="text-2xl font-semibold">Edit Category</h1>
        </div>

        <Link to={"/dashboard/categories"}>
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <div className="flex flex-col">
          <div className="w-full py-6">
            <FormEditCategories
              category={category}
              loadingSubmit={loadingSubmit}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </AppLayouts>
  );
}
