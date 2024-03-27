


import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./assets/forgetPassword.css";
import Swal from 'sweetalert2';

function ForgetPassword() {
    const navigate = useNavigate();
    const [selectedEmail, setSelectedEmail] = useState();
    const [alertMessage, setAlertMessage] = useState("");

    const handleAlert =()=>{
        Swal.fire({
            icon: 'success',
            title: 'Reset link Sent to your mail Successfully ! Please check your mail !',
            showConfirmButton: false,
            timer: 9000
          })
    }
    

    const formik = useFormik({
        initialValues: {
            emailId: "",
        },
        validate: (values) => {
            let errors = {}

            if (!selectedEmail) {
                errors.emailId = "Required *"
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                const userData = await axios.get(`https://nodejs-inventory-management.onrender.com/user-creation/forgetPassword/checkEmail/${selectedEmail}`, values);
                if (userData.status === 200) {
                    // setAlertMessage("Email sent successfully by check mail. You can reset your password.");
                    handleAlert();
                    formik.handleReset();
                }
            } catch (error) {
                console.log("error", error.response);
                if (error.response.status === 404) {
                    formik.setFieldError("emailId", "Email Id not found");
                }
            }
        }
    });

    return (
        <div className="container forgetPassword-page forgetPassword-container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-2">
                    <div className="row">
                        <div className="col-lg">
                            <div className="p-5">
                                {alertMessage && (
                                    <div className="alert alert-success" role="alert">
                                        {alertMessage}
                                    </div>
                                )}
                                <div className="text-center">
                                    <h2 className='h5'><i className="bi bi-bank2"> FOAP </i></h2>
                                    <h2 className="h1"> Forget Password!</h2>
                                    <h1 className="h4 text-gray-900 mb-4">Enter your mail id!</h1>
                                </div>
                                <form className="user" onSubmit={formik.handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-user"
                                            id="exampleInputEmail"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Email Address..."
                                            name="emailId"
                                            onChange={e => setSelectedEmail(e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                        {(formik.getFieldMeta("emailId").touched && formik.errors.emailId) ?
                                            <span style={{ color: "red" }}>{formik.errors.emailId}</span> : null}
                                    </div>
                                    <hr />
                                    <div className="text-center h4 ">
                                        <button type='submit' href="index.html" className="btn  btn-user btn-block">
                                            Login
                                        </button>
                                    </div>
                                </form>
                                <hr />
                                <div className="text-center">
                                    <Link className='small' to={"/register"}> Create an New Account !</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;





































