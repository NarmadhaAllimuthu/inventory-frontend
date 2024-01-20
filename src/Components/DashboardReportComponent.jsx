
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'

function DashboardReportComponent() {

    const [salesOrderDetails, setSalesOrderDetails] = useState();
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState();


    const formik = useFormik({
        initialValues: {
            salesOrderFromDate: "",
            salesOrderToDate: ""
        },
        validate: (values) => {

            let errors = {}
            if (!values.salesOrderFromDate) {
                errors.salesOrderFromDate = "Required *"
            }
            if (!values.salesOrderToDate) {
                errors.salesOrderToDate = "Required *"
            }
            if (values.salesOrderFromDate === values.salesOrderToDate) {
                errors.salesOrderToDate = "Same dates are entered"
            }
            return errors;

        },
        onSubmit: async () => {
            try {

                const response = await axios.get("https://nodejs-inventory-management.onrender.com/salesOrder/getSalesOrderReport", {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    },
                    params: {
                        salesOrderFromDate: formik.values.salesOrderFromDate,
                        salesOrderToDate: formik.values.salesOrderToDate
                    }
                });



                console.log(response.data);
                setSalesOrderDetails(response.data);

            } catch (error) {
                console.log(error);
                if (error.response.status === 404) {
                    formik.setFieldError("salesOrderFromDate", "check date");
                    formik.setFieldError("salesOrderToDate", "check date");
                    setSalesOrderDetails();
                } else {
                    alert("Something went wrong in sales Order report api");
                }


            }

        }
    })

    const handleSalesOrderReportSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit();
    }


    const formikPurchaseOrder = useFormik({
        initialValues: {
            purchaseOrderFromDate: "",
            purchaseOrderToDate: ""
        },
        validate: (values) => {
            let errors = {}
            if (!values.purchaseOrderFromDate) {
                errors.purchaseOrderFromDate = "Required *"
            }
            if (!values.purchaseOrderToDate) {
                errors.purchaseOrderToDate = "Required *"
            }
            if (values.purchaseOrderFromDate === values.purchaseOrderToDate) {
                errors.purchaseOrderToDate = "Same dates are entered"
            }
            return errors;

        },
        onSubmit: async () => {
            try {

                const response = await axios.get("https://nodejs-inventory-management.onrender.com/purchaseOrder/getPurchaseOrderReport", {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    },
                    params: {
                        purchaseOrderFromDate: formikPurchaseOrder.values.purchaseOrderFromDate,
                        purchaseOrderToDate: formikPurchaseOrder.values.purchaseOrderToDate
                    }
                });

                console.log(response.data);
                setPurchaseOrderDetails(response.data);

            } catch (error) {
                console.log(error);
                if (error.response.status === 404) {
                    formikPurchaseOrder.setFieldError("purchaseOrderFromDate", "check date");
                    formikPurchaseOrder.setFieldError("purchaseOrderToDate", "check date");
                    setPurchaseOrderDetails();
                } else {
                    alert("Something went wrong in purchase Order report api");
                }
            }

        }

    })

    useFormik((e) => {
        e.preventDefault();
        formikPurchaseOrder.handleSubmit();
    })

    return (
        <>
            <div className="row mt-4 ">
                <div className="col-md-12  mx-0">
                    <h3 className='mb-4 topic'>Report</h3>
                    <h6 className='para'> Inventory reports are documents that provide detailed information about a company's stock of goods, materials, or products. These reports serve as a snapshot of your current inventory and are crucial for keeping track of what you have on hand, where it is located, and its value</h6>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg">
                    <h5 className='h4 heading'>Sales report :</h5>
                    <div className="row mt-2">
                        <div className="col-md-12 salesReport mb-5">
                            <form className='row g-3 mt-3' onSubmit={handleSalesOrderReportSubmit}>
                                <div className="form-group col-auto mx-5">
                                    <label className='label' htmlFor="fromDate">
                                        From :
                                    </label>
                                    <input type="date"
                                        id="fromDate"
                                        className='form-control'
                                        name="salesOrderFromDate"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.getFieldMeta("salesOrderFromDate").touched && formik.errors.salesOrderFromDate)
                                        ? <span style={{ color: "red" }}>{formik.errors.salesOrderFromDate}</span> : null}
                                </div>

                                <div className="form-group col-auto mx-5">
                                    <label className='label' htmlFor="toDate">
                                        To :
                                    </label>
                                    <input type="date"
                                        id="toDate"
                                        className='form-control'
                                        name="salesOrderToDate"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.getFieldMeta("salesOrderToDate").touched && formik.errors.salesOrderToDate)
                                        ? <span style={{ color: "red" }}>{formik.errors.salesOrderToDate}</span> : null}
                                </div>
                                <div className="text-center">
                                    <button type="submit" className='btn btn-warning mt-4 mb-4'>
                                        Generate Report
                                    </button>
                                </div>
                            </form>
                            <div className="col-lg ml-2">
                                <table className="table table-bordered table-hover  border-primary">
                                    <thead>
                                        <tr>
                                            <th> #</th>
                                            <th>Date</th>
                                            <th>SO Id</th>
                                            <th>Name</th>

                                            <th>Quantity</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            salesOrderDetails != undefined && salesOrderDetails.length > 0 ?
                                                salesOrderDetails.map((item, index) => (
                                                    <tr key={item._id} className='table-info'>
                                                        <td>{index + 1}</td>
                                                        <td>{new Date(item.salesOrderDate).toLocaleDateString()}</td>
                                                        <td>{item.salesOrderId}</td>
                                                        <td>{item.productName}</td>

                                                        <td>{item.productQuantity}</td>
                                                        <td>{item.totalAmount}</td>

                                                    </tr>
                                                )) : <tr className='table-danger'><td colSpan={6}>Select proper date's for generate reports !</td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="col-lg">
                    <h5 className='h4 heading'>Purchase report :</h5>
                    <div className="row mt-2">
                        <div className="col-md purchaseOrderReport">
                            <form className='row g-3 mt-3' onSubmit={formikPurchaseOrder.handleSubmit}>
                                <div className="form-group col-auto mx-5">
                                    <label className='label' htmlFor="fromDate">
                                        From :
                                    </label>
                                    <input type="date"
                                        id="fromDate"
                                        className='form-control'
                                        name="purchaseOrderFromDate"
                                        onChange={formikPurchaseOrder.handleChange}
                                        onBlur={formikPurchaseOrder.handleBlur} />
                                    {(formikPurchaseOrder.getFieldMeta("purchaseOrderFromDate").touched && formikPurchaseOrder.errors.purchaseOrderFromDate)
                                        ? <span style={{ color: "red" }}>{formikPurchaseOrder.errors.purchaseOrderFromDate}</span> : null}
                                </div>

                                <div className="form-group col-auto mx-5">
                                    <label className='label' htmlFor="toDate">
                                        To :
                                    </label>
                                    <input type="date"
                                        id="toDate"
                                        className='form-control'
                                        name="purchaseOrderToDate"
                                        onChange={formikPurchaseOrder.handleChange}
                                        onBlur={formikPurchaseOrder.handleBlur} />
                                    {(formikPurchaseOrder.getFieldMeta("purchaseOrderToDate").touched && formikPurchaseOrder.errors.purchaseOrderToDate)
                                        ? <span style={{ color: "red" }}>{formikPurchaseOrder.errors.purchaseOrderToDate}</span> : null}
                                </div>
                                <div className="text-center">
                                    <button type="submit" className='btn btn-danger mt-4 mb-4'>
                                        Generate Report
                                    </button>
                                </div>
                            </form>

                            <div className="col-lg ml-2">
                                <table className="table table-bordered table-hover  border-primary">
                                    <thead>
                                        <tr>
                                            <th> #</th>
                                            <th>Date</th>
                                            <th>RC Id</th>
                                            <th>PO Id</th>

                                            <th>Quantity</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchaseOrderDetails != undefined && purchaseOrderDetails.length > 0 ?
                                                purchaseOrderDetails.map((item, index) => (

                                                    <tr key={item._id} className='table-info'>
                                                        <td>{index + 1}</td>
                                                        <td>{new Date(item.invoiceDate).toLocaleDateString()}</td>
                                                        <td>{item.receiptId}</td>
                                                        <td>{item.purchaseOrderId}</td>

                                                        <td>{item.quantity}</td>
                                                        <td>{item.totalAmount}</td>

                                                    </tr>
                                                )) : <tr className='table-danger'><td colSpan={6}>Select proper date's for generate reports !</td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default DashboardReportComponent







