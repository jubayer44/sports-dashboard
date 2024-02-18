/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarGenerator } from "../../utils/sidebarGenerator";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { managerPaths } from "../../routes/manager.routes";
import { sellerPaths } from "../../routes/seller.routes";

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  const userRole = {
    superAdmin: "superAdmin",
    branchManager: "branchManager",
    seller: "seller",
  };

  let sidebarItems;

  switch (user?.role) {
    case userRole.superAdmin:
      sidebarItems = sidebarGenerator(adminPaths, userRole.superAdmin);
      break;
    case userRole.branchManager:
      sidebarItems = sidebarGenerator(managerPaths, userRole.branchManager);
      break;
    case userRole.seller:
      sidebarItems = sidebarGenerator(sellerPaths, userRole.seller);
      break;
    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0" style={{ background: "#7c3aed" }}>
      <div
        className="flex justify-center items-center p-2 m-2 text-white font-bold text-lg"
        style={{
          padding: "8px",
          margin: "8px",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          font: "3rem",
        }}
      >
        <h1 className="text-xl font-bold">Sports Pulse</h1>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        // @ts-ignore next-line
        items={sidebarItems}
        style={{ background: "#7c3aed", color: "white", fontWeight: "bold" }}
      />
    </Sider>
  );
};

export default Sidebar;
