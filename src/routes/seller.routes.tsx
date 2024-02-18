import SalesReportPdf from "../components/sales/SalesReportPdf";
import SellerDashboard from "../pages/dashboards/SellerDashboard";
import AllProduct from "../pages/product/AllProduct";
import ProductDetails from "../pages/product/ProductDetails";
import SalesOverview from "../pages/sales/SalesOverview";
import SellCompleted from "../pages/sales/SellCompleted";
import UserProfile from "../pages/userManagement/UserProfile";

export const sellerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <SellerDashboard />,
  },
  {
    name: "",
    path: "product/:id",
    element: <ProductDetails />,
  },
  {
    name: "",
    path: "/seller/sales-pdf-report",
    element: <SalesReportPdf />,
  },
  {
    name: "",
    path: "completed-sell",
    element: <SellCompleted />,
  },
  {
    name: "All Products",
    path: "all-products",
    element: <AllProduct />,
  },
  {
    name: "My Sold Items",
    path: "my-sold-items",
    element: <SalesOverview />,
  },
  {
    name: "My Profile",
    path: "my-profile",
    element: <UserProfile />,
  },
];
