import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ProtectedPath from "./layout/ProtectedPath";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import ManagePatients from "./pages/ManagePatients";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

import { AuthProvider } from "./context/AuthProvider";
import { PatientsProvider } from "./context/PatientsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            {/* Public routes, anyone has access to enter these pages */}
            <Route path="/" element={<AuthLayout />}> {" "} {/* Main design, master page*/}
              <Route index element={<Login />} /> {/* Main page */}
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            {/* Private routes, you need to be registered to enter here */}
            <Route path="/admin" element={<ProtectedPath />}> {" "} {/* Main design, master page*/}
              <Route index element={<ManagePatients />} /> {/* Main page */}
              <Route path="profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
