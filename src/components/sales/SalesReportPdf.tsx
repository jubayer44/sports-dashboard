import { useLocation } from "react-router-dom";
import { TSaleProductResponse } from "../../types";
import SalesOverviewTable from "./SalesOverviewTable";
import PdfDownloadButton from "../PdfDownloadButton/PdfDownloadButton";

const SalesReportPdf = () => {
  const data = useLocation()?.state;

  return (
    <div>
      <div className="flex flex-col" id="pdf-content">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table
                className="min-w-full text-left text-sm font-light"
                id="pdf-content"
              >
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-gray-700 text-sm">
                      Product Name
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
      <div className="flex justify-center my-3">
        <PdfDownloadButton />
      </div>
    </div>
  );
};

export default SalesReportPdf;
