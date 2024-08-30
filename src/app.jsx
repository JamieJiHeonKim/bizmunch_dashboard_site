import AdminSignin from "./pages/Admin/Sign";
import AdminMain from "./pages/Admin/main";
import AdminCompanies from "./pages/Admin/companies";
import AdminUsers from "./pages/Admin/user";
import AdminNotifications from "./pages/Admin/notifications";

import ManagerSignin from "./pages/Manager/Signin";
import ManagerDashboard from "./pages/Manager/dashboard";
import ManagerNotifications from "./pages/Manager/notifications";
import ManagerUsers from "./pages/Manager/user";
import ManagerSettings from "./pages/Manager/settings";

import EmployeeDashboard from "./pages/Employee/dashboard";
import EmployeeNotification from "./pages/Employee/notifications";
import EmployeeSettings from "./pages/Employee/settings";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import PasswordReset from "./pages/App/Password";
import PasswordChange from "./pages/App/PasswordChange";
// import Signup from "./pages/Employee/Signup";
import Signin from "./pages/Employee/Signin";
import CompanyDetails from "./pages/Admin/company_details";
import Restaurants from "./pages/Admin/restaurants";
import RestaurantDetails from "./pages/Admin/restaurant_details";
import Homepage from "./pages/Home/Homepage";

const App = () => {
  const isAdmin = () => {
    const t = sessionStorage.getItem("Token");
    const a = sessionStorage.getItem("Admin");
    return t !== undefined && a;
  };
  const isManager = () => {
    const t = sessionStorage.getItem("Token");
    const a = sessionStorage.getItem("Manager");
    return t !== undefined && a;
  };
  const isEmployee = () => {
    const t = sessionStorage.getItem("Token");
    const a = sessionStorage.getItem("Employee");
    return t !== undefined && a;
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/passwordchange" element={<PasswordChange />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Homepage />} />
            <Route
              path="/admin/signin"
              element={
                isAdmin() ? (
                  <Navigate to="/admin/companies" />
                ) : isEmployee() ? (
                  <Navigate to="/employee/dashboard" />
                ) : isManager() ? (
                  <Navigate to="/manager/dashboard" />
                ) : (
                  <AdminSignin />
                )
              }
            />
            <Route
              path="/admin/main"
              element={
                isAdmin() ? <AdminMain /> : <Navigate to={"/admin/signin"} />
              }
            />
            <Route
              path="/admin/restaurants"
              element={
                isAdmin() ? <Restaurants /> : <Navigate to={"/admin/restaurants"} />
              }
            />
            <Route
              path={"/admin/restaurant/:id/:name"}
              element={
                isAdmin() ? <RestaurantDetails /> : <Navigate to={"/admin/signin"} />
              }

            />
            <Route
              path={"/admin/company/:id/:name"}
              element={
                isAdmin() ? <CompanyDetails /> : <Navigate to={"/admin/signin"} />
              }
            />
            <Route
              path="/admin/companies"
              element={
                isAdmin() ? <AdminCompanies /> : <Navigate to={"/admin/signin"} />
              }
            />
            <Route
              path="/admin/users"
              element={
                isAdmin() ? <AdminUsers /> : <Navigate to={"/admin/signin"} />
              }
            />
            <Route
              path="/admin/notifications"
              element={
                isAdmin() ? (
                  <AdminNotifications />
                ) : (
                  <Navigate to={"/admin/signin"} />
                )
              }
            />
            <Route
              path="/manager/signin"
              element={
                isAdmin() ? (
                  <Navigate to={"/admin/companies"} />
                ) : isEmployee() ? (
                  <Navigate to={"/employee/dashboard"} />
                ) : isManager() ? (
                  <Navigate to={"/manager/dashboard"} />
                ) : (
                  <ManagerSignin />
                )
              }
            />
            <Route
              path="/manager/dashboard"
              element={
                isManager() ? (
                  <ManagerDashboard />
                ) : (
                  <Navigate to={"/manager/signin"} />
                )
              }
            />
            <Route
              path="/manager/users"
              element={
                isManager() ? (
                  <ManagerUsers />
                ) : (
                  <Navigate to={"/manager/signin"} />
                )
              }
            />
            <Route
              path="/manager/notifications"
              element={
                isManager() ? (
                  <ManagerNotifications />
                ) : (
                  <Navigate to={"/manager/signin"} />
                )
              }
            />
            <Route
              path="/manager/settings"
              element={
                isManager() ? (
                  <ManagerSettings />
                ) : (
                  <Navigate to={"/manager/signin"} />
                )
              }
            />
            {/* <Route path="/employee/signup" element={<Signup />} /> */}
            <Route
              path="/employee/signin"
              element={
                isAdmin() ? (
                  <Navigate to={"/admin/companies"} />
                ) : isEmployee() ? (
                  <Navigate to={"/employee/dashboard"} />
                ) : isManager() ? (
                  <Navigate to={"/manager/dashboard"} />
                ) : (
                  <Signin />
                )
              }
            />{" "}
            <Route
              path="/employee/dashboard"
              element={
                !isEmployee() ? (
                  <Navigate to={"/employee/signin"} />
                ) : (
                  <EmployeeDashboard />
                )
              }
            />
            <Route
              path="/employee/dashboard"
              element={
                !isEmployee() ? (
                  <Navigate to={"/employee/signin"} />
                ) : (
                  <EmployeeDashboard />
                )
              }
            />
            <Route
              path="/employee/notifications"
              element={
                !isEmployee() ? (
                  <Navigate to={"/employee/signin"} />
                ) : (
                  <EmployeeNotification />
                )
              }
            />
            <Route
              path="/employee/settings"
              element={
                !isEmployee() ? (
                  <Navigate to={"/employee/signin"} />
                ) : (
                  <EmployeeSettings />
                )
              }
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
