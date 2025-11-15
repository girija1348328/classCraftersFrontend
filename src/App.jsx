import AppRouter from "@/router/index";
import AuthRoutes from "./router/auth";

function App() {
  return (
    <>
      <AuthRoutes />
      <AppRouter />
    </>
  );
}

export default App;