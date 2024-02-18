/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Input } from "antd";
import { FormEvent, useEffect, useState } from "react";
import SalesOverviewTable from "../../components/sales/SalesOverviewTable";
import { useGetSalesQuery } from "../../redux/features/sales/salesApi";
import { setPriority } from "../../redux/features/sales/salesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TSaleProductResponse } from "../../types";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const SalesOverview = () => {
  const [searchDate, setSearchDate] = useState("");
  const { priority } = useAppSelector((state) => state.sales);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch, error } = useGetSalesQuery({
    priority,
    searchDate,
  });

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dateValue = formData.get("date") as string;
    setSearchDate(dateValue);
  };

  useEffect(() => {
    refetch();
  }, [priority, dispatch, refetch]);

  if (isLoading) {
    return <h1 className="text-xl font-bold text-center my-4">Loading...</h1>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center my-4">
        {user?.role !== "seller" ? "Sales Overview" : "My Sold Items"}
      </h1>
      <div className="flex flex-col md:flex-row gap-2 justify-end">
        <form onSubmit={handleSearch} className="flex gap-2 items-center mr-4">
          <Input name="date" type="date" size="small" />
          <Button
            htmlType="submit"
            size="small"
            type="primary"
            className="bg-blue-500"
          >
            Search
          </Button>
        </form>
        <div className="flex md:justify-end">
          <div className="relative group">
            <Button size="small" type="primary" className="bg-blue-500">
              Filter
            </Button>
            <div className="absolute hidden group-hover:flex flex-col gap-1 min-w-[100px] right-0 text-center bg-gray-200 z-10 p-3 rounded-md font-semibold text-gray-600">
              <p
                onClick={() => dispatch(setPriority("daily"))}
                className="p-1 hover:bg-blue-200 cursor-pointer rounded-md text-sm font-semibold"
              >
                Daily
              </p>
              <p
                onClick={() => dispatch(setPriority("weekly"))}
                className="p-1 hover:bg-blue-200 cursor-pointer rounded-md text-sm font-semibold"
              >
                Weekly
              </p>
              <p
                onClick={() => dispatch(setPriority("monthly"))}
                className="p-1 hover:bg-blue-200 cursor-pointer rounded-md text-sm font-semibold"
              >
                Monthly
              </p>
              <p
                onClick={() => dispatch(setPriority("yearly"))}
                className="p-1 hover:bg-blue-200 cursor-pointer rounded-md text-sm font-semibold"
              >
                Yearly
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              dispatch(setPriority(""));
              setSearchDate("");
            }}
            size="small"
            className="bg-red-400 ml-2 text-white"
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Branch
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Buyer
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Sale
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Sale Date
                    </th>
                    {user?.role !== "seller" && (
                      <th
                        scope="col"
                        className="px-6 py-4 text-gray-700 text-sm"
                      >
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map(
                    (item: TSaleProductResponse, index: number) => (
                      <SalesOverviewTable
                        key={index}
                        item={item}
                        index={index}
                      />
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {data?.data?.length > 0 && (
        <div className="flex justify-center my-3">
          <Link
            to={`/${user?.role}/sales-pdf-report`}
            state={{ data: data?.data }}
            className="p-2 rounded-md w-full max-w-xl bg-blue-500 text-white font-bold text-center"
          >
            Generate Pdf Report
          </Link>
        </div>
      )}
    </div>
  );
};

export default SalesOverview;
