import { Navigate, RouterProvider } from "react-router-dom";
import router from "./routes/route";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";

const App = () => {
  const token = useAuthStore((state) => state.token);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    const fetch = async () => {
      await fetchUser();
    };

    fetch();
  }, [token]);

  return <RouterProvider router={router} />;
};

export default App;
