

import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import "./assets/salesOrderPage.css"


function SalesOrder() {

  const navigate = useNavigate()

  const [productData, setProductData] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [productDetails, setSelectedProductDetails] = useState({});
  const [enteredQuantity, setEnteredQuantity] = useState('');
  const [productOptions, setProductOptions] = useState([]);
  const [total, setTotal] = useState(0.00);
  const [userData, setUserData] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  // console.log(productDetails)


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

      const options = response.data.map(product => ({
        value: product.productName,
        label: product.productName,
      }));
      setProductOptions(options);

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
      if (selectedProduct && selectedProduct.value) {
        const selectedProductDataResponse = await axios.get(`http://localhost:3005/inventoryProduct/getProduct/${selectedProduct.value}`,{
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        });

        if (selectedProductDataResponse.data) {
          setSelectedProductDetails(selectedProductDataResponse.data);
        } else {
          alert("Product not found");
        }
      } else {
        console.log("please select or enter a product name")
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };




  useEffect(() => {
    if (selectedProduct) {
      getselectedProductData();
    }
  }, [selectedProduct]);


  const handleProductChange = (selectedOption) => {

    if (selectedOption) {
      setSelectedProduct(selectedOption);
      getselectedProductData(selectedOption.value);
    } else {
      // Reset product details when no product is selected
      setSelectedProductDetails(null);
    }
  };


  const handleQuantityChange = (e) => {
    setEnteredQuantity(e.target.value);
    console.log(e.target.value);

  };
  // console.log(enteredQuantity)




  const handleSalesOrder = async () => {
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }

    if (!enteredQuantity || isNaN(parseInt(enteredQuantity))) {

      alert("Please enter a valid quantity.");
      return;
    }

    try {
      await getselectedProductData();

      // Check if productDetails is defined before accessing its properties
      if (productDetails) {
        const quantity = parseInt(enteredQuantity);
        if (quantity > 0 && quantity <= parseInt(productDetails?.quantity || 0)) {

          const salesOrderPayLoad = {
            productName: selectedProduct.value,
            productQuantity: enteredQuantity,
            productBasePrice: productDetails.productBasePrice,
            productSellingPrice: productDetails.productSellingPrice,
            productTax: productDetails.productGst,

            totalAmount: handleProductTotal(),
            salesOrderDate: new Date().toISOString(),
            userShopDetails: userData,
            customerDetails: selectedCustomer,
          }

          const response = await axios.post("http://localhost:3005/salesOrder/createSalesOrder", salesOrderPayLoad, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
          // console.log(response.data.message);
          alert("Sales Order created successfully!");

          navigate(`/portal/salesOrderBillingPage/${salesOrderPayLoad.salesOrderDate}`)

        } else {
          alert(`Invalid quantity. Available stock is ${productDetails?.quantity}.`);
        }
      } else {
        alert("Product details not available.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };


  const handleProductTotal = () => {

    if (productDetails && enteredQuantity) {
      const pricePerUnit = parseInt(productDetails.productSellingPrice || 0);
      const totalBeforeTax = pricePerUnit * parseInt(enteredQuantity);
      const gst = parseInt(productDetails.productGst || 0);
      const totalWithTax = (totalBeforeTax + (totalBeforeTax * (gst / 100))).toFixed(2);
      console.log(totalWithTax);
      return totalWithTax;

    }


    return 0.00;
  };

  const formik = useFormik({
    initialValues: {
      customerContact: ''
    }, validate: (values) => {
      let errors = {};

      if (!values.customerContact) {
        errors.customerContact = 'customer Contact is required';
      } else if (!/^[0-9]{10}/.test(values.customerContact)) {
        errors.customerContact = 'Invalid contact number';
      }
      return errors
    }, onSubmit: async (values) => {
      // console.log(values);
      try {
        const supplierData = await axios.get(`http://localhost:3005/customer/getCustomerInfo/${values.customerContact}`,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
        console.log(supplierData.data);
        const customerArray = Array.isArray(supplierData.data) ? supplierData.data : [supplierData.data];
        setSelectedCustomer(customerArray);
      } catch (error) {
        console.log(error);
        alert("Something went wrong in customer data getting!");
      }

    }
  });

  return (
    <div className="container mt-5">
      <div className='row mb-3 text-center'>
        <div className='col-12 mt-3 mb-2'>
          <h1 className='h1 heading'>Sales Order</h1>
        </div>

      </div>
      <hr></hr>
      {/* <div className="row">
        <div className="col-lg-12">
          <button className='btn' >+ New Item</button>
        </div>
      </div> */}
      <div className="row mt-4 mx-2 mb-2">
        <div className="col-6">
          <h3 className='h4 heading mb-3'>Item Details</h3>
        </div>
      </div>
      <div className='row '>
        <p className="para">You can able select item by below table ! and before read note to underStand process and execute .</p>
        <p className='para' style={{ color: "  #00e600", textShadow: "2px 2px white" }}>Note : one product  order is placed at once !</p>
        <p className='para' style={{ color: "  #00e600", textShadow: "2px 2px white" }}>
          By selecting product name itself other's will fill defaultly !</p>
        <p className='para' style={{ color: "  #00e600", textShadow: "2px 2px white" }}>
          Also you can able to add quantity count ONLY !
        </p>

      </div>



      <div className='row mx-2 mb-3'>
        <div className="col-lg">
          <table className='table table-bordered border-dark table-hover'>
            <thead >
              <tr className='table-dark text-center'>
                <th>S.No</th>

                <th>Item Name</th>
                <th>Product Id</th>

                <th>Quantity</th>
                <th>Base/Fixed Price</th>
                <th>Selling Price</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td>1.</td>

                <td>
                  <Select
                    options={productOptions}
                    onChange={handleProductChange}
                    value={selectedProduct}
                    className="custom-select"
                  />
                </td>
                <td>
                  <input
                    type='text'
                    name="tax"
                    value={(productDetails?.productId || "")}
                    className="form-control"
                    readOnly
                  />
                </td>
                <td>

                  <input
                    type="text"
                    name="quantity"
                    value={enteredQuantity}
                    onChange={handleQuantityChange}
                    style={{ width: '80px' }}
                    className="custom-input mt-2"
                  />

                </td>
                <td>
                  <input
                    type='text'
                    name="tax"
                    // value={"₹" + (productDetails?.productBasePrice && !isNaN(parseInt(productDetails.productBasePrice))) ? (parseInt(productDetails.productBasePrice) + 3).toFixed(2) : ""}
                    value={(productDetails?.productBasePrice && !isNaN(parseInt(productDetails.productBasePrice))) ? (parseInt(productDetails.productBasePrice)).toFixed(2) : ""}
                    className="form-control"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type='text'
                    name="tax"
                    // value={"₹" + (productDetails?.productSellingPrice && !isNaN(parseInt(productDetails.productSellingPrice))) ? (parseInt(productDetails.productSellingPrice)).toFixed(2) : ""}
                    value={(productDetails?.productSellingPrice && !isNaN(parseInt(productDetails.productSellingPrice))) ? (parseInt(productDetails.productSellingPrice)).toFixed(2) : ""}
                    className="form-control"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type='text'
                    name="tax"
                    value={(productDetails?.productGst || "")}
                    className="form-control"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="total"
                    value={"₹ "+handleProductTotal()}
                    className='form-control'
                    readOnly
                  />
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row mx-2 mb-4 mt-3">

        {userData &&
          userData.map((user, index) => (
            <div className="col-lg purchaseOrderCreatedCol" key={index}>
              <div className='row mt-3 mb-2'>
                <h5 className='h5 mb-3'>
                  Seller Details
                </h5>


              </div>
              <h4 className='details-heading'>Seller Name :
                <span className='details'> {user.userFirstName + " " + user.userLastName}</span></h4>
              <h4 className='details-heading'>Address :
                <span className='details'> {user.address}</span></h4>

              <h4 className='details-heading'>Contact Number :
                <span className='details'> {user.contactNumber}</span></h4>
              <h4 className='details-heading'>Email :
                <span className='details'> {user.emailId}</span></h4>
              <p className='para'>**Trusted Updates of Seller**</p>
            </div>
          ))}

        <div className="col-lg purchaseOrderCreatedToCol mx-2">
          <form onSubmit={formik.handleSubmit}>
            <div className='row'>

              <label className='label fs-5 '>Search existing customer </label>

              <div className="col-md-5">
                <input
                  type="text"
                  name="customerContact"
                  onChange={formik.handleChange}
                  placeholder="Search by number"
                  className="form-control mb-3 "
                />
                {formik.errors.customerContact && formik.touched.customerContact ? (
                  <div className="text-danger">{formik.errors.customerContact}</div>
                ) : null}

              </div>
              <div className="col-md-2 mt-2">
                <button type="submit" className="btn btn-primary">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </form>
          {Array.isArray(selectedCustomer) && selectedCustomer.length > 0 ?
            selectedCustomer.map((cust, index) => (
              <div className="row mt-3" key={index}>
                <div className="col-md">
                  <h4 className='details-heading'>Customer Id:
                    <span className='details'> {cust.customerId}</span></h4>
                  <h4 className='details-heading'>Name:
                    <span className='details'> {cust.customerName}</span></h4>

                  <h4 className='details-heading'>Address:
                    <span className='details'> {cust.customerAddress}</span></h4>

                  <h4 className='details-heading'>Contact:
                    <span className='details'> {cust.customerContact}</span></h4>




                </div>
              </div>


            )
            )
            :
            <div className='col-md'>
              <h4 className='details-heading'>Customer Id :</h4>
              <h4 className='details-heading'>Name :</h4>
              <h4 className='details-heading'>Address :</h4>
              <h4 className='details-heading'>Contact :</h4>
            </div>
          }
        </div>
      </div>
      <div className="row mt-5 mb-5">
        <button className='btn  btn-salesOrder' onClick={handleSalesOrder}>Save Sales Order</button>
      </div>
      <div className="row text-center mb-4">
        <div className="col-lg">
          <h5 className='h5' style={{ color: "red" }}><i class="bi bi-asterisk"></i>
            <i class="bi bi-asterisk"></i>
            <i class="bi bi-asterisk"></i>
            <i class="bi bi-asterisk"></i>

            <i class="bi bi-asterisk"></i>
            <i class="bi bi-asterisk"></i>
            <i class="bi bi-asterisk"></i></h5>
        </div>
      </div>
    </div>
  )
}

export default SalesOrder













