import SalesReportPdf from "../components/sales/SalesReportPdf";
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import AddProduct from "../pages/product/AddProduct";
import AllProduct from "../pages/product/AllProduct";
import CreateVariant from "../pages/product/CreateVariant";
import EditProduct from "../pages/product/EditProduct";
import ManageProduct from "../pages/product/ManageProduct";
import ManageProductDetails from "../pages/product/ManageProductDetails";
import ProductDetails from "../pages/product/ProductDetails";
import SalesOverview from "../pages/sales/SalesOverview";
import SellCompleted from "../pages/sales/SellCompleted";
import AllBranchManager from "../pages/userManagement/AllBranchManager";
import AllSeller from "../pages/userManagement/AllSeller";
import CreateBranchManager from "../pages/userManagement/CreateBranchManager";
import CreateSeller from "../pages/userManagement/CreateSeller";
import UserProfile from "../pages/userManagement/UserProfile";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "",
    path: "product/:id",
    element: <ProductDetails />,
  },
  {
    name: "",
    path: "/superAdmin/sales-pdf-report",
    element: <SalesReportPdf />,
  },
  {
    name: "",
    path: "completed-sell",
    element: <SellCompleted />,
  },
  {
    name: "Sales Overview",
    path: "sales-overview",
    element: <SalesOverview />,
  },
  {
    name: "Products",
    children: [
      {
        name: "Add a Product",
        path: "add-product",
        element: <AddProduct />,
      },
      {
        name: "All Products",
        path: "all-products",
        element: <AllProduct />,
      },
      {
        name: "Mange Products",
        path: "manage-products",
        element: <ManageProduct />,
      },
      {
        path: "manage-product/:id",
        element: <ManageProductDetails />,
      },
      {
        path: "create-variant/:id",
        element: <CreateVariant />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Manager",
        path: "create-branch-manager",
        element: <CreateBranchManager />,
      },
      {
        name: "All Managers",
        path: "branch-managers",
        element: <AllBranchManager />,
      },
      {
        name: "Create Seller",
        path: "create-seller",
        element: <CreateSeller />,
      },
      {
        name: "All Seller",
        path: "sellers",
        element: <AllSeller />,
      },
    ],
  },
  {
    name: "My Profile",
    path: "my-profile",
    element: <UserProfile />,
  },
];
