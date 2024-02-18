/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteFilled } from "@ant-design/icons";
import {
  useDeleteSellerMutation,
  useGetAllSellersQuery,
} from "../../redux/features/userManagement/userManagementApi";
import { toast } from "sonner";
import { useEffect } from "react";

const AllSeller = () => {
  const { data, isLoading, refetch } = useGetAllSellersQuery("");
  const [deleteSeller] = useDeleteSellerMutation();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting...");
    const res = (await deleteSeller(id)) as any;

    if (res?.data?.statusCode === 200) {
      toast.success("Seller deleted successfully", { id: toastId });
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch, data]);

  if (isLoading) {
    return (
      <div className="text-lg font-bold text-center my-10">Loading...</div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-center my-5">All Seller</h2>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Branch
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-300"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
                        {<p>{item?.name}</p>}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
                        {item?.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
                        {item?.branch}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-600 text-xs">
                        <DeleteFilled
                          onClick={() => handleDelete(item?._id)}
                          className="text-red-500 text-xl cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSeller;
