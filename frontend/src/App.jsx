import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import router from "./router/routes";

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
