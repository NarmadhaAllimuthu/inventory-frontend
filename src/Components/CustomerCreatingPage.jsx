
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./assets/customerPage.css"

function CustomerCreatingPage() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {

            // here we get the form values by same name and intially empty
            customerName: "",
            customerContact: "",

            customerAddress: "",

        },
        validate: (values) => {



            let errors = {}


            if (!values.customerName) {
                errors.customerName = "Required *"
            } else if (!/^[a-zA-Z ]*$/.test(values.customerName)) {
                errors.customerName = "Special characters are not allowed"
            }

            if (!values.customerContact) {
                errors.customerContact = "Required *"
            } else if (!/^[0-9]{10}/.test(values.customerContact)) {
                errors.customerContact = 'Invalid contact number';
            } else if (values.customerContact.length > 12 && values.customerContact.length > 10) {
                errors.customerContact = 'Invalid contact number';
            }

            if (!values.customerAddress) {
                errors.customerAddress = "Required *"
            }


            return errors;
        },
        onSubmit: async (values) => {

            //on submit it will proceess the data and create a object in api

            try {
                const customerCreatedData = await axios.post("http://localhost:3005/customer/createCustomer", values, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                alert("Customer created  successfully !");
                navigate("/portal/dashboard");
                formik.handleReset();

                console.log(customerCreatedData.data)

            } catch (error) {

                if (error.response && error.response.data && error.response.data.message === "Customer already exists") {

                    formik.setFieldError('customerName', 'Customer already exists');
                    formik.setFieldError('customerContact', 'Customer already exists');
                } else {
                    console.log("error", error);
                    alert("Error creating customer!");
                }


            }
        }
    })



    return (

        <div className='container mt-5'>
            <div className='row text-center'>
                <div className='col-lg-12'>
                    <h1 className='text-center  customer-heading'>Create New Customer </h1>
                    <p className='text-muted'>fill the form to add new customer informations</p>

                </div>
            </div>
            <hr></hr>
            <div className='row align-items-center justify-content-center mt-4 mb-4'>
                <div className='col-lg-10 form-column' >

                    {/* formik package defaultly gave us the handleSubmit and handleChange,handleBlur functions we use then to handle the form easyly */}

                    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                        <div className='row'>
                            <div className='col-md-8'>
                                <label className='label fs-4' >Customer Name : <sup style={{ color: "red" }}> *</sup> </label>

                                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                                <input className='form-control'
                                    type='text'
                                    name="customerName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} >

                                </input>

                                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                                {(formik.getFieldMeta("customerName").touched && formik.errors.customerName)
                                    ? <span style={{ color: "red" }}>{formik.errors.customerName}</span> : null}

                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-8'>
                                <label className='label fs-4' >Contact Number : <sup style={{ color: "red" }}> *</sup>  </label>

                                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                                <input className='form-control mt-3'
                                    type='text'
                                    name="customerContact"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder='+91'>

                                </input>

                                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                                {(formik.getFieldMeta("customerContact").touched && formik.errors.customerContact)
                                    ? <span style={{ color: "red" }}>{formik.errors.customerContact}</span> : null}
                            </div>

                        </div>
                        {/* <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label' >Mail Id : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                        {/* <input className='form-control mt-3'
                  type="mail"
                  name="supplierEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='abc@gmail.com'>

                </input> */}

                        {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                        {/* 
                {(formik.getFieldMeta("supplierEmail").touched && formik.errors.supplierEmail)
                  ? <span style={{ color: "red" }}>{formik.errors.supplierEmail}</span> : null}

              </div>

            </div> */}
                        <div className='row mt-2'>
                            <div className='col-md-8'>
                                <label className='label fs-4' >Customer Address : <sup style={{ color: "red" }}> *</sup> </label>

                                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                                <input className='form-control mt-3'
                                    type="text"
                                    name="customerAddress"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >

                                </input>

                                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                                {(formik.getFieldMeta("customerAddress").touched && formik.errors.customerAddress)
                                    ? <span style={{ color: "red" }}>{formik.errors.customerAddress}</span> : null}

                            </div>

                        </div>





                        <button className='btn btn-createCustomer mb-5 mt-4 p-2' type="submit" >Create customer</button>
                    </form>
                </div>
            </div>

            <div className='row mx-2 mb-5 mt-4'>
                <div className='col-lg-12 '>
                    <p className='text-muted  ' >* Create  as many as customer it helps you to have profit and benefits !</p>
                </div>
                <hr></hr>
                <div className='col-lg-12'>
                    <p className='text-muted'>* Special characters are not allowed and Invalid contact number,Customer already exists are checked while creating a customer</p>
                </div>
                <hr></hr>
                <div className='col-lg-12'>
                    <p className='text-muted'>* Customer managed inventory (CMI) is a supply chain management strategy that shifts the responsibility for inventory management from the supplier to the customer </p>
                </div>
                <hr></hr>
                <div className='col-lg-12'>
                    <p className='text-muted'>* Inventory management is a technique of controlling, storing, and keeping track of your inventory items. </p>
                </div>
                <hr></hr>
                <div className='col-lg-12'>
                    <p className='text-muted'>* Customer's are backbone of our profit ! Build  more customer and maintain your profit with FOAP inventory system</p>
                </div>
                <hr></hr>
                {/* <div className='col-lg-12'>
                    <p className='text-muted'>* Customer created successfully</p>
                </div>
<hr></hr> */}
            </div>

            <div className="row text-center mx-2 mb-5">
                <div className="col-lg">
                    <h6 className='h4'> *****----- INCREASE YOUR CLIENT INCREASE YOUR PROFIT LEVEL -----***** </h6>
                </div>
            </div>

        </div>


    )
}

export default CustomerCreatingPage











