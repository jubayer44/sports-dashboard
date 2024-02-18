import { Link, useLocation } from "react-router-dom";
import { TSaleProductResponse } from "../../types";
import { DeleteFilled } from "@ant-design/icons";
import { useDeleteSaleMutation } from "../../redux/features/sales/salesApi";
import { formattedDate } from "../../utils/formattedDate";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

type TSaleProps = {
  item: TSaleProductResponse;
  index: number;
};

const SalesOverviewTable = ({ item, index }: TSaleProps) => {
  const pathName = useLocation()?.pathname;
  const [deleteSale] = useDeleteSaleMutation();
  const user = useAppSelector(selectCurrentUser);

  const date = formattedDate(item?.saleDate);

  return (
    <tr
      key={index}
      className="border-b transition duration-300 ease-in-out hover:bg-neutral-300"
    >
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {item?.product?._id ? (
          user?.role !== "seller" ? (
            <Link to={`/${user?.role}/manage-product/${item?.product?._id}`}>
              {item?.product?.name || "N/A"}
            </Link>
          ) : (
            <span>{item?.product?.name || "N/A"}</span>
          )
        ) : (
          "N/A"
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {`${item?.product?.price ? `$${item?.product?.price}` : "N/A"}`}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {item?.branch || "N/A"}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {item?.buyerName}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {item?.quantity}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
        {date}
      </td>
      {pathName.includes("sales-pdf-report") ||
        (user?.role !== "seller" && (
          <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
            <DeleteFilled
              onClick={() => deleteSale(item?._id)}
              className="text-red-500 text-xl cursor-pointer"
            />
          </td>
        ))}
    </tr>
  );
};

export default SalesOverviewTable;
