
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import React from 'react'
import { CSVLink } from 'react-csv';

function DownloadProduct({ productDetails }) {



    const handleDownloadPdf = () => {

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Product Details", 14, 22);

        const tableColumn = ["S.No", "Product Id", "Product Name", "productMaterial", "Product Base Price",
             "Product Selling Price", "Quantity"];
        const tableRows = [];

        productDetails.forEach((item, index) => {
            const productData = [index + 1, item.productId, item.productName, item.productMaterial, item.productBasePrice, 
                item.productSellingPrice, item.quantity];
            tableRows.push(productData);
        })
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30


        });

        doc.save("productDetails.pdf");
    }


    const csvHeader = [
        { label: "S.No", key: "sno" },
        { label: "Product Id", key: "productId" },
        { label: "Product Name", key: "productName" },
        { label: "productMaterial", key: "productMaterial" },
        { label: "Product Base Price", key: "productBasePrice" },
        { label: "Product Selling Price", key: "productSellingPrice" },
        { label: "Quantity", key: "quantity" },
    ]

    const csvData = productDetails.map((item, index) => ({
        sno: index + 1,
        productId: item.productId,
        productName: item.productName,
        productMaterial: item.productMaterial,
        productBasePrice: item.productBasePrice,
        productSellingPrice: item.productSellingPrice,
        quantity: item.quantity,
    }))

    return (
        <>
            <div className="col-lg-4 dropdown" >
                <button className='btn btn-primary dropdown-toggle'
                    data-bs-toggle="dropdown" aria-expanded="false"
                    type='button'
                // onClick={handleDownloadPdf}
                >Download
                    <i class="bi bi-arrow-down-square ms-2"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-info">
                    <li><button className="dropdown-item"
                        onClick={handleDownloadPdf}
                    >Pdf</button></li>

                    <li>
                        <CSVLink data={csvData}
                            headers={csvHeader}
                            className="dropdown-item"
                            filename='productDetails.csv'
                        >
                            Excel Csv
                        </CSVLink>
                    </li>



                    {/* <li><button className="dropdown-item" >Something else here</button></li> */}

                </ul>
            </div>



        </>
    )
}

export default DownloadProduct















