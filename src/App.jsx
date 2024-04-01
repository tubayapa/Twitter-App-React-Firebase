import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        {/* kullanicinin erisimi icin hesabina giiris yapmasi gereken sayfalari kapsayici route icine aliyoruz */}

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<FeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
