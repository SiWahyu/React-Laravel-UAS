import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import NotFound from "../pages/errors/NotFound";
import CategoriesListPage from "../pages/categories/ListCategories";
import EditCategoriesPage from "../pages/categories/EditCategories";
import CreateCategoriesPage from "../pages/categories/CreateCategories";
import ListSuppliersPage from "../pages/suppliers/ListSupliers";
import CreateSuppliersPage from "../pages/suppliers/CreateSuppliers";
import EditSuppliersPage from "../pages/suppliers/EditSupplier";
import ListProductsPage from "../pages/products/ListProducts";
import CreateProductsPage from "../pages/products/CreateProducts";
import EditProductsPage from "../pages/products/EditProducts";
import LoginPage from "../pages/auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardPage from "../pages/dashboard/Data";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/categories",
        element: <CategoriesListPage />,
      },
      {
        path: "/dashboard/categories",
        element: <CategoriesListPage />,
      },
      {
        path: "/dashboard/categories/create",
        element: <CreateCategoriesPage />,
      },
      {
        path: "/dashboard/categories/:id",
        element: <EditCategoriesPage />,
      },
      {
        path: "/dashboard/suppliers",
        element: <ListSuppliersPage />,
      },
      {
        path: "/dashboard/suppliers/create",
        element: <CreateSuppliersPage />,
      },
      {
        path: "/dashboard/suppliers/:id",
        element: <EditSuppliersPage />,
      },
      {
        path: "/dashboard/products",
        element: <ListProductsPage />,
      },
      {
        path: "/dashboard/products/create",
        element: <CreateProductsPage />,
      },
      {
        path: "/dashboard/products/:id",
        element: <EditProductsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
