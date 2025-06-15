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
        path: "/categories",
        element: <CategoriesListPage />,
      },
      {
        path: "/categories",
        element: <CategoriesListPage />,
      },
      {
        path: "/categories/create",
        element: <CreateCategoriesPage />,
      },
      {
        path: "/categories/:id",
        element: <EditCategoriesPage />,
      },
      {
        path: "/suppliers",
        element: <ListSuppliersPage />,
      },
      {
        path: "/suppliers/create",
        element: <CreateSuppliersPage />,
      },
      {
        path: "/suppliers/:id",
        element: <EditSuppliersPage />,
      },
      {
        path: "/products",
        element: <ListProductsPage />,
      },
      {
        path: "/products/create",
        element: <CreateProductsPage />,
      },
      {
        path: "/products/:id",
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
