import { useEffect } from "react";
import { FaClipboardList, FaSellsy } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import SalesChart from "../../components/SalesChart";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { useGetSalesQuery } from "../../redux/features/sales/salesApi";
import { TResponseProduct } from "../../types";
import {
  calculateRevenue,
  calculateTotalSale,
} from "../../utils/dashboardCalculateUtils";

const SellerDashboard = () => {
  const { data, refetch: refetchSales } = useGetSalesQuery("");
  const { data: products, refetch: refetchProducts } = useGetProductsQuery("");

  const recentProducts = products?.data?.slice(0, 10);

  const totalProducts = products?.data?.length || 0;

  // calculate total revenue
  const revenue = calculateRevenue(data?.data);

  // calculate total sale items
  const totalSaleItems = calculateTotalSale(data?.data);

  useEffect(() => {
    refetchSales();
    refetchProducts();
  }, [refetchProducts, refetchSales]);

  return (
    <div className="mb-10">
      <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
        Seller Dashboard
      </h1>
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <FaSellsy className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{totalSaleItems}</span>
            <span className="block text-gray-500">My Sold Items</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <FaSackDollar className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-block text-xl text-gray-700 font-semibold">
              $
            </span>
            <span className="inline-block text-2xl font-bold">
              {revenue?.toFixed(2)}
            </span>
            <span className="block text-gray-500">Total Revenue</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <FaClipboardList className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{totalProducts}</span>
            <span className="block text-gray-500">Total Products</span>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 xl:grid-cols-3 xl:grid-flow-col gap-6 my-4">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            Last 5 sales date statistics
          </div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-6 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <SalesChart data={data?.data} />
            </div>
          </div>
        </div>
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <p className="px-6 py-5 font-semibold border-b border-gray-100">
            Recently Added Products
          </p>

          <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
            <ul className="p-6 space-y-6">
              {recentProducts?.map(
                (product: TResponseProduct, index: number) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 mr-3 flex justify-center items-center">
                        <img src={product?.image} alt="product image" />
                      </div>
                      <span className="text-gray-600">{product?.name}</span>
                    </div>
                    <span className="text-gray-600">${product?.price}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;
