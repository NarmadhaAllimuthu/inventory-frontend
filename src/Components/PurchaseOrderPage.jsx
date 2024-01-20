
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./assets/purchaseOrderPage.css"


function PurchaseOrderPage() {

    // const [selectedProducts ,setSelectedProducts]=()
    const navigate = useNavigate();
    const [data, setData] = useState();

    const [userData, setUserData] = useState();
    const [productData, setProductData] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedProductData, setSelectedProductData] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [rowCount, setRowCount] = useState(1);


    const formik = useFormik({
        initialValues: {
            supplierName: ''
        }, validate: (values) => {
            let errors = {};

            if (!values.supplierName) {
                errors.supplierName = 'Supplier Name is required';
            }
            return errors
        }, onSubmit: async (values) => {
            // console.log(values);
            try {
                const supplierData = await axios.get(`http://localhost:3005/supplier/get-supplier/${values.supplierName}`,{
                    headers:{
                        "Authorization": localStorage.getItem("token")
                    }
                });
                console.log(supplierData.data);
                setData(supplierData.data);
            } catch (error) {
                console.log(error);
                if (error.response.status === 404) {

                    formik.setFieldError("supplierName", "Supplier not found");
                    setData();
                }
                else {
                    alert("Something went wrong !");
                }


            }

        }
    });

    const getProfile = async () => {
        try {
            const userDataResponse = await axios.get(
                `http://localhost:3005/user-creation/userData`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            );
            console.log(userDataResponse.data);
            setUserData(userDataResponse.data);
        } catch (error) {
            console.log(error);
            alert("Something went wrong !");
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    const getProductDetails = async () => {
        try {
            const response = await axios.get("http://localhost:3005/inventoryProduct/getAllProducts", {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            setProductData(response.data);

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    const getselectedProductData = async () => {
        try {
            const selectedProductDataResponse = await axios.get(`http://localhost:3005/inventoryProduct/getProduct/${selectedProduct.productName}`,{
                headers:{
                    "Authorization": localStorage.getItem("token")
                }
            });

            if (selectedProductDataResponse.data) {

                // console.log(selectedProductDataResponse.data)
                setSelectedProductData(selectedProductDataResponse.data);
            } else {
                alert("Product not found")
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong !");
        }
    }

    useEffect(() => {
        if (selectedProduct) {
            getselectedProductData();
        }
    }, [selectedProduct]);


    const handleQuantityIncrease = () => {
        setQuantity(quantity + 1);
    }
    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }


    const calculateTotal = () => {
        const pricePerUnit = parseInt(selectedProductData?.productBasePrice || 0);
        // console.log((pricePerUnit));

        const totalBeforeTax = pricePerUnit * quantity;
        // console.log((totalBeforeTax));
        const gst = parseInt(selectedProductData?.productGst || 0);
        // console.log((gst));
        const totalWithTax = totalBeforeTax + (totalBeforeTax * (gst / 100));
        // console.log((totalWithTax))
        return totalWithTax.toFixed(2);
    };

    const handleAddRow = () => {
        setRowCount(rowCount + 1);
    };

    const renderTableRows = () => {
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
            rows.push(
                <tr key={i}>

                    <td>{i + 1}</td>
                    <td>

                        <select
                            name="itemName"
                            onChange={(e) => {
                                const selectedProduct = productData.find(product => product.productName === e.target.value);
                                setSelectedProduct(selectedProduct);
                            }}
                            className="form-control"
                        >
                            <option value="">Select Item</option>
                            {productData &&
                                productData.map((product, index) => (
                                    <option key={index} value={product.productName}>
                                        {product.productName}
                                    </option>
                                ))}
                        </select>
                    </td>

                    <td>
                        <input
                            type='text'
                            name="tax"
                            value={(selectedProductData?.productGst || "0")}
                            className="form-control"
                        >

                        </input>
                    </td>

                    <td>
                        <input
                            type="text"
                            name="unitOfMeasure"
                            value={(selectedProductData?.quantity || '0')}
                            readOnly
                            className="form-control"
                        />
                    </td>


                    <td>
                        <button className='btn fw-bolder btn-outline'
                            onClick={handleQuantityIncrease}>+ </button>
                        <span> {quantity} </span>
                        <button className='btn fw-bolder btn-outline'
                            onClick={handleQuantityDecrease}> -</button>
                    </td>


                    <td>
                        <input
                            type="text"
                            name="pricePerUnit"
                            value={"₹ " + (selectedProductData?.productBasePrice || '0')}
                            readOnly
                            className="form-control"
                        />
                    </td>

                    <td>
                        <input
                            type="text"
                            name="total"
                            value={"₹ " + calculateTotal()}
                            readOnly
                            className="form-control"
                        />


                    </td>

                </tr>
            );
        }
        return rows;
    };


    const handlePurchaseOrder = async () => {
        try {
            // console.log(userData);
            // console.log(data);
            // console.log(selectedProductData);

            const purchaseOrderItems = [];
            for (let i = 0; i < rowCount; i++) {
                purchaseOrderItems.push({
                    itemName: selectedProduct.productName,
                    tax: selectedProductData.productGst,
                    unitOfMeasure: selectedProductData.quantity,
                    quantity: quantity,
                    pricePerUnit: selectedProductData.productBasePrice,
                    total: calculateTotal(),
                });
            }
            // console.log(purchaseOrderItems);

            if (purchaseOrderItems.length === 0) {
                alert("Please select atleast one item")

            } else if (!userData || !data || !selectedProductData) {
                alert("Please fill all the fields and datas")
            } else {
                const purchaseOrderPayload = {
                    orderBy: userData,
                    orderTo: data,
                    orderDate: new Date().toISOString(),
                    orderItem: purchaseOrderItems,
                };

                // Send the payload to the API
                const response = await axios.post('http://localhost:3005/purchaseOrder/createPurchaseOrder'
                    , purchaseOrderPayload,
                    {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    })
                console.log(response.data.message);
                if (response.data.message == "Already Exists") {
                    console.log("Show Popup")


                    alert("Purchase Order Already Exists")
                } else {

                    console.log('Purchase order created successfully:');
                    alert('Purchase order created successfully!');

                    navigate(`/portal/createPurchaseOrder/${purchaseOrderPayload.orderDate}`)
                }

            }


        }
        catch (error) {

            console.error('Error creating purchase order:', error);
            alert('Something went wrong!');


        }
    };




    return (
        <div className="container mt-5">
            <div className="row text-center ">
                <div className="col-12">
                    <h1 className='purchase-heading mt-3'>Purchase Order</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className='para'>
                        You can place a purchase order just in a few clicks using the purchase history, unless you plan to
                        choose another supplier.
                    </p>
                </div>
            </div>
            <hr></hr>
            <div className="row mt-4 mx-2 text-end">
                <div className="col-lg">
                    <h3 className='h4 heading'>Date : {new Date().toLocaleDateString()}</h3>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg purchaseOrderCreatedCol">
                    <div className='row mt-3 mb-2'>
                        <h5 className='h5'>
                            Details
                        </h5>
                        <p className='para mx-0'>
                            your details will be updated by default !
                        </p>

                    </div>
                    {userData &&
                        userData.map((user, index) => (
                            <div key={index}>
                                <h4 className='details-heading'>Created By : <span className='details'>
                                    {user.userFirstName + " " + user.userLastName} </span></h4>
                                {/* <h4 className='details-heading'>Address :  <span className='details'>
                                    {user.address}</span></h4>
                                <h4 className='details-heading'>Contact Number : <span className='details'>
                                    {user.contactNumber}  </span> </h4> */}
                                {user.address && user.contactNumber ? (
                                    <div>
                                        <h4 className='details-heading'>Address: <span className='details'>{user.address}</span></h4>
                                        <h4 className='details-heading'>Contact Number: <span className='details'>{user.contactNumber}</span></h4>
                                    </div>
                                ) : (
                                    <p className='h4 mt-2 mb-3' style={{ color: "	 #ff1a75" }}> !! Please update your address and contact in the profile. !!</p>
                                )}
                                <h4 className='details-heading'>Email : <span className='details'>
                                    {user.emailId}</span></h4>
                            </div>
                        ))}
                </div>
                <div className="col-lg purchaseOrderCreatedToCol">
                    <div className='row'>
                        <form onSubmit={formik.handleSubmit} className='form-group row'>


                            <label className='label fs-5'>Search supplier <sup style={{ color: "red" }}> *</sup>  </label>

                            <div className="col-lg-4 ">
                                <input
                                    type="text"
                                    name="supplierName"
                                    onChange={formik.handleChange}
                                    placeholder="Search supplier by name"
                                    className="form-control mb-2 col-md-3"
                                />

                            </div>
                            {(formik.getFieldMeta("supplierName").touched && formik.errors.supplierName ?
                                <span style={{ color: "red" }}>{formik.errors.supplierName}</span> : null)}
                            <div className="col-md mt-2">
                                <button type="submit" className="btn btn-info p-2">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>

                        </form>
                    </div>
                    {data ?
                        data.map((supplier, index) => (
                            <div className="" key={index}>

                                <h4 className='details-heading'>Name :
                                    <span className='details'> {supplier.supplierName}</span></h4>
                                <h4 className='details-heading'>Address :
                                    <span className='details'> {supplier.supplierAddress}</span></h4>
                                <h4 className='details-heading'> Contact :
                                    <span className='details'> {supplier.supplierPhone}</span></h4>
                                <h4 className='details-heading'>Email :
                                    <span className='details'> {supplier.supplierEmail}</span></h4>
                                <h4 className='details-heading'>GSTIN :
                                    <span className='details'>  {supplier.gst}</span></h4>

                            </div>
                        ))
                        :
                        <div>
                            <h4 className='details-heading'> Name :</h4>
                            <h4 className='details-heading'>Address :</h4>
                            <h4 className='details-heading'>Contact Number :</h4>
                            <h4 className='details-heading'>Email :</h4>
                            <h4 className='details-heading'>GSTIN :</h4>
                        </div>
                    }
                </div>
            </div>





            <div className="row mt-4">
                <div className="col-6">
                    <h3 className='h4 heading mb-3'>Item Details</h3>
                </div>
                {/* <div className="col-6">
                              <button className='btn' onClick={handleAddRow}>  + New Item</button> 
                                </div> */}

                <div className='row '>
                    <p className="para">You can able select item by below table ! and before read note to underStand process and execute .</p>
                    <p className='para' style={{ color: "  #00e600", textShadow: "2px 2px white" }}>Note : one product  purchase order is placed at once !</p>
                    <p className='para' style={{ color: "  #00e600", textShadow: "2px 2px white" }}>
                        By selecting product name itself other's will fill defaultly !</p>
                    <p className='para' style={{ color: "  #00e600", textShadow: "2px 2px white" }}>
                        Also you can able to add quantity count !
                    </p>

                </div>
                <div className="row mx-2">
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr className='table-info'>
                                <th>S.No</th>
                                <th>
                                    Item Name
                                </th>
                                <th>Tax</th>
                                <th>Unit Of Measure</th>
                                <th>Quantity</th>
                                <th>Price per unit</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}

                        </tbody>

                    </table>
                    <button className='btn btn-purchaseOrderCreation mb-5 mt-4'
                        onClick={handlePurchaseOrder}>
                        Create purchase order</button>
                </div>
            </div>

        </div>




    )
}

export default PurchaseOrderPage













