import { RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/auth";
import BaseProvider from "./providers/base";
import MyRoutes from "./routes";

function App() {
  return (
    <BaseProvider>
      <AuthProvider>
        <RouterProvider router={MyRoutes} />
      </AuthProvider>
    </BaseProvider>
  );
}

export default App;
