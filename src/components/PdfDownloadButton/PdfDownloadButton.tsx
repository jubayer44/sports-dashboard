import { Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfDownloadButton = () => {
  const handleDownloadPdf = () => {
    const input = document.getElementById("pdf-content") as HTMLElement;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("sales_report.pdf");
    });
  };

  return (
    <Button
      type="primary"
      className="bg-blue-500 w-full max-w-xl font-bold"
      onClick={handleDownloadPdf}
    >
      Download as PDF
    </Button>
  );
};

export default PdfDownloadButton;
