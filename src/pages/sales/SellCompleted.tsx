import { Navigate, useLocation } from "react-router-dom";
import { formattedDate } from "../../utils/formattedDate";
import PdfDownloadButton from "../../components/PdfDownloadButton/PdfDownloadButton";

const SellCompleted = () => {
  const data = useLocation().state;

  if (!data) {
    return <Navigate to="/" />;
  }

  const date = formattedDate(data?.saleDate);

  return (
    <div>
      <h2 className="text-xl font-bold text-center my-5 text-green-500">
        Product Successfully Sold
      </h2>
      <div
        className="max-w-lg mx-auto p-3 rounded-md border flex flex-col gap-4 justify-center"
        id="pdf-content"
      >
        <p className="text-gray-600 font-bold text-base text-center">
          Sold Product Details
        </p>
        <p className="font-bold">
          <span className="text-gray-500 mr-4">Product Name:</span>
          {data?.productName}
        </p>
        <p className="font-bold">
          <span className="text-gray-500 mr-4">Quantity:</span>
          {data?.quantity}
        </p>
        <p className="font-bold">
          <span className="text-gray-500 mr-4">Buyer Name:</span>
          {data?.buyerName}
        </p>
        <p className="font-bold">
          <span className="text-gray-500 mr-4">Date of the Sale:</span>
          {date}
        </p>
      </div>
      <div className="max-w-lg mx-auto my-3">
        <PdfDownloadButton />
      </div>
    </div>
  );
};

export default SellCompleted;
