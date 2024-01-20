

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function SalesOrderBillPage() {

    const params = useParams();
    // console.log(params);

    const [salesOrderData, setSalesOrderData] = useState();

    const getPurchaseOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/salesOrder/getSalesOrderDatas/${params.id}`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });

            setSalesOrderData(response.data);

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    useEffect(() => {
        getPurchaseOrder();
    }, []);

    return (
        <div className='container mt-5'>
            <div className="row text-center mb-4 mt-3 text-decoration-underline">
                <h1 className='heading'> Sales Billing Page</h1>

            </div>

            {salesOrderData ? (
                <>
                    <div className="row mx-2">
                        <div className='col-lg mt-3 mb-3 salesBill mx-2 px-4'>
                            <h4>{salesOrderData.userShopDetails[0].address},</h4>
                            <h4> {salesOrderData.userShopDetails[0].state},</h4>
                            <h5>PH : {salesOrderData.userShopDetails[0].contactNumber}.</h5>
                            <h5>Email : {salesOrderData.userShopDetails[0].emailId}.</h5>
                        </div>

                        <div className='col-lg text-end mt-2 salesBill my-2 py-1 mb-3'>
                            <h4>Sales Invoice</h4>
                            <h4>Invoice No : {salesOrderData.salesOrderId}</h4>
                            <h4>Date : {new Date(salesOrderData.salesOrderDate).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })}</h4>
                            <h4>Time : {new Date(salesOrderData.salesOrderDate).toLocaleTimeString()}</h4>
                        </div>

                    </div>

                    <hr></hr>

                    <div className='row mx-2 mt-4 mb-2'>
                        <div className='col-lg'>
                            <h4 className='details-heading'>Customer Id : {salesOrderData.customerDetails[0].customerId}</h4>
                        </div>
                        <div className="col-lg text-end">
                            <h4 className='details-heading'>Customer Name : {salesOrderData.customerDetails[0].customerName}</h4>

                        </div>


                    </div>
                    <div className="row mb-3 mx-2">
                        <div className="col-lg-12">
                            <h1 className='heading h4'>
                                Purchased Item Info
                            </h1>
                        </div>
                    </div>
                    <div className='row mx-2 mb-4'>
                        <div className='col-lg-12'>
                            <table className='table table-bordered table-hover border-dark'>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Item Name</th>

                                        <th>Quantity</th>
                                        <th>Base/Fixed Price</th>
                                        <th>Selling Price</th>
                                        <th>Tax</th>
                                        <th>Total</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    <tr >
                                        <td>1.</td>
                                        <td>{salesOrderData.productName}</td>
                                        <td>{salesOrderData.productQuantity}</td>
                                        <td>{salesOrderData.productBasePrice}</td>
                                        <td>{salesOrderData.productSellingPrice}</td>
                                        <td>{salesOrderData.productTax}</td>
                                        <td>{salesOrderData.totalAmount}</td>
                                    </tr>

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={7} className='text-end'><h3>Total :Rs.{salesOrderData.totalAmount}</h3></td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>


                    </div>
                    <div className='row text-center'>
                        <div className='col-lg-12'>
                            <h4 className='h4 heading'>***Make your product with less amount and best quality with us***</h4>


                            <h4 className='h4 heading'>*** Thank you !! visit again ***</h4>
                            <h4 className='h4 heading'>*****</h4>

                        </div>



                    </div>

                </>
            ) : (
                <p>Loading...</p>
            )}


        </div>
    )
}

export default SalesOrderBillPage












