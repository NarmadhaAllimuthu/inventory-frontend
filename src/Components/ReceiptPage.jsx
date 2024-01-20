

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function ReceiptPage() {

    const [supplierData, setSupplierData] = useState([]);
    const [purchaseOrderData, setPurchaseOrderData] = useState([]);
    const [total, setTotal] = useState();


    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {

            supplierName: "",
            supplierId: "",
            supplierContact: "",
            invoiceNumber: "",
            invoiceDate: "",
            productName: "",
            // productId: "",
            quantity: "",
            basePrice: "",
            tax: "",
            purchaseOrderId: "",
            receivingPersonName: "",
            totalAmount: ""

        },

        validate: async (values) => {
            let errors = {}



            if (!values.productName) {
                errors.productName = "Please Enter Product Name *"
            } else {
                const isProductNameValid = purchaseOrderData.orderItem.find(item => item.itemName === values.productName);
                if (!isProductNameValid) {
                    errors.productName = "Invalid Product Name "
                }
            }

            if (!values.quantity) {
                errors.quantity = "Please Enter Quantity *"
            } else {
                const toQuantityValid = purchaseOrderData.orderItem.find(item => item.quantity >= values.quantity);
                if (!toQuantityValid) {
                    errors.quantity = "Invalid Quantity"
                }
            }

            if (!values.basePrice) {
                errors.basePrice = "Please Enter Base Price *"
            } else {
                const isBasePriceValid = purchaseOrderData.orderItem.find(item => parseInt(item.pricePerUnit) === parseInt(values.basePrice));

                if (!isBasePriceValid) {

                    errors.basePrice = "Invalid Base Price"
                    // console.log(errors.basePrice)
                }
            }

            if (!values.tax) {
                errors.tax = "Please Enter Tax *"
            } else {
                const isTaxValid = purchaseOrderData.orderItem.some(item => item.tax === values.tax);
                if (!isTaxValid) {
                    errors.tax = "Invalid Tax"
                }
            }

            if (!values.receivingPersonName) {
                errors.receivingPersonName = "Please Enter Receiving Person Name *"
            } else if (values.receivingPersonName.length > 15 && values.receivingPersonName.length < 3) {
                errors.receivingPersonName = "Name should have character between 4 to 15"
            }
            if (!values.invoiceDate) {
                errors.invoiceDate = "Date required *"
            }
            if (!values.invoiceNumber) {
                errors.invoiceNumber = "Invoice Number required *"
            }


            return errors;
        },
        onSubmit: async (values) => {


            try {
                console.log(values)
                const receiptedData = await axios.post("https://nodejs-inventory-management.onrender.com/purchaseOrder/storeReceiptDatas", values,
                    {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    });
                alert("  created successfully !");
                navigate("/portal/dashboard");
                formik.handleReset();

                //   console.log(productCreated.data)

            } catch (error) {
                console.log("error", error);
                alert("Something went wrong in storeReceipt api call 😣😣!");
            }
        }
    })

    console.log(supplierData)

    const handleSupplierName = async (e) => {

        let enteredSupplierName = e.target.value;
        // console.log(enteredSupplierName);
        if (enteredSupplierName) {
            try {
                const getSupplierData = await axios.get(`https://nodejs-inventory-management.onrender.com/purchaseOrder/getSupplierData/${enteredSupplierName}`,
                    {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    });
                const supplierData = getSupplierData.data;

                if (Array.isArray(supplierData) && supplierData.length > 0) {
                    const firstSupplier = supplierData[0];

                    // Update Formik values
                    formik.setValues({
                        ...formik.values,
                        supplierName: firstSupplier.supplierName,
                        supplierId: firstSupplier.supplierId,
                        supplierContact: firstSupplier.supplierPhone,
                    });
                }
                // console.log(getSupplierData.data);
                setSupplierData(getSupplierData.data);

            } catch (error) {
                console.log(error);
                formik.setFieldError("supplierName", "InValid Supplier Name");

            }
        }
    }



    const handlePurchaseId = async (e) => {
        const enteredPurchaseId = e.target.value;

        // console.log(enteredPurchaseId);
        if (enteredPurchaseId) {
            try {
                const getPurchaseData = await axios.get(`https://nodejs-inventory-management.onrender.com/purchaseOrder/getPurchaseOrderData/forReceipt/${enteredPurchaseId}`,
                    {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    });
                console.log(getPurchaseData.data);
                setPurchaseOrderData(getPurchaseData.data);

                formik.setFieldValue("purchaseOrderId", getPurchaseData.data.orderId);


                // console.log(setPurchaseOrderData.orderItem[0].itemName)

            } catch (error) {
                formik.setFieldError("purchaseOrderId", "Invalid Purchase Order Id")

            }
        }

    }




    const handleQuantityChange = (e) => {
        formik.handleChange(e);
        updateTotalAmount();
    };

    const handleBasePriceChange = (e) => {
        formik.handleChange(e);
        updateTotalAmount();
    };

    const handleTaxChange = (e) => {
        formik.handleChange(e);
        updateTotalAmount();
    };

    const updateTotalAmount = () => {
        const quantity = parseInt(formik.values.quantity) || 0;
        const basePrice = parseInt(formik.values.basePrice) || 0;
        const tax = parseInt(formik.values.tax) || 0;
        const total = "₹" + (quantity * basePrice + (quantity * basePrice * tax) / 100);

        formik.setFieldValue("totalAmount", total);
    };




    return (
        <div className='container  mt-5 mx-2'>
            <div className='text-center row'>
                <h1 className='heading'>Receipt
                </h1>
                <p className='text-muted mt-3'> receipt your bill here  </p>
            </div>
            <hr></hr>
            <div className='row mt-4 mb-4 mx-2'>
                <div className="col-lg mx-2">
                    <h5 className='h5' style={{ color: "  #00e600", textShadow: "2px 2px white" }}>
                        * Note : purchase order id is must and proper *
                    </h5>
                </div>
                <div className='col-lg text-end'>

                    <h6 className='h4'>Receipt Date : {new Date().toLocaleDateString()}</h6>
                </div>
            </div>


            <div className='row'>
                <div className='col-md-8 mx-5'>
                    <form onSubmit={formik.handleSubmit}>
                        <label className='label fs-4'>Supplier Name
                            <sup style={{ color: "red" }}> *</sup>
                        </label>


                        <input className='form-control'
                            type='text'
                            name="supplierName"
                            onChange={(e) => { handleSupplierName(e) }}
                            onBlur={formik.handleBlur}
                        >

                        </input>
                        {formik.getFieldMeta("supplierName").touched && formik.errors.supplierName ?
                            <span style={{ color: "red" }}>{formik.errors.supplierName}</span> : null}


                        {supplierData.length > 0 && (
                            <>
                                <label className='label fs-4'>Supplier Id</label>
                                <input
                                    type='text'
                                    name='supplierId'
                                    value={(supplierData[0]?.supplierId || '')}
                                    onChange={formik.handleChange}
                                    className='form-control'
                                    readOnly
                                />

                                <label className='label fs-4'>Contact Number</label>
                                <input
                                    type='text'
                                    name='supplierNumber'
                                    value={(supplierData[0]?.supplierPhone || '')}
                                    onChange={formik.handleChange}
                                    className='form-control'
                                    readOnly
                                />
                            </>
                        )}


                        <label className='label fs-4'>Purchase Order Id
                            <sup style={{ color: "red" }}> *</sup></label>
                        <input
                            type="text"
                            name="purchaseOrderId"
                            onChange={(e) => { handlePurchaseId(e) }}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {
                            formik.getFieldMeta("purchaseOrderId").touched && formik.errors.purchaseOrderId ?
                                <span style={{ color: "red" }}>{formik.errors.purchaseOrderId}</span> : null
                        }

                        <label className='label fs-4'>Product Name
                            <sup style={{ color: "red" }}> *</sup></label>
                        <input
                            type="text"
                            name="productName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {
                            formik.getFieldMeta("productName").touched && formik.errors.productName ?
                                <span style={{ color: "red" }}>{formik.errors.productName}</span> : null
                        }
                        <label className='label fs-4'>Quantity
                            <sup style={{ color: "red" }}> *</sup></label>
                        <input
                            type="text"
                            name="quantity"
                            onChange={handleQuantityChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {formik.getFieldMeta("quantity").touched && formik.errors.quantity ?
                            <span style={{ color: "red" }}>{formik.errors.quantity}</span> : null}

                        <label className='label fs-4'>Base Price
                            <sup style={{ color: "red" }}> *</sup></label>
                        <input
                            type="text"
                            name="basePrice"
                            onChange={handleBasePriceChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {
                            formik.getFieldMeta("basePrice").touched && formik.errors.basePrice ?
                                <span style={{ color: "red" }}>{formik.errors.basePrice}</span> : null
                        }
                        <label className='label fs-4'>Tax  <sup style={{ color: "red" }}> *</sup></label>
                        <input
                            type="text"
                            name="tax"
                            onChange={handleTaxChange}
                            onBlur={formik.handleBlur}

                            className="form-control"
                        />
                        {
                            formik.getFieldMeta("tax").touched && formik.errors.tax ?
                                <span style={{ color: "red" }}>{formik.errors.tax}</span> : null
                        }
                        <label className='label fs-4'>Receiving Person Name
                            <sup style={{ color: "red" }}> *</sup></label>
                        <input
                            type="text"
                            name="receivingPersonName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {formik.getFieldMeta("receivingPersonName").touched && formik.errors.receivingPersonName ?
                            <span style={{ color: "red" }}>{formik.errors.receivingPersonName}</span> : null}

                        <label className='label fs-4'>Invoice Date  <sup style={{ color: "red" }}> *</sup></label>
                        <input
                            type="date"
                            name="invoiceDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {formik.getFieldMeta("invoiceDate").touched && formik.errors.invoiceDate ?
                            <span style={{ color: "red" }}>{formik.errors.invoiceDate}</span> : null}
                        <label className='label fs-4'>Invoice Number  <sup style={{ color: "red" }}> *</sup></label>
                        <input
                            type="text"
                            name="invoiceNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                        />
                        {formik.getFieldMeta("invoiceNumber").touched && formik.errors.invoiceNumber ?
                            <span style={{ color: "red" }}>{formik.errors.invoiceNumber}</span> : null}

                        <label className='label fs-4'>Total Amount  </label>
                        <input
                            type="text"
                            name="totalAmount"
                            value={formik.values.totalAmount}
                            className="form-control"
                            readOnly />
                        <div className="d-grid  gap-1">
                            <button className='btn btn-received mt-3 mb-5'
                                type='submit'
                            >Recieved</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default ReceiptPage














































