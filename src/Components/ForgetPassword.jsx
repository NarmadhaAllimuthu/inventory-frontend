
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./assets/forgetPassword.css"

function ForgetPassword() {

    const navigate = useNavigate();
    const [selectedEmail, setSelectedEmail] = useState();

    const formik = useFormik({
        initialValues: {
            // here we get the form values by same name and intially empty

            emailId: "",
        },
        validate: (values) => {

            //validation take place here for every input box based on the conditions it will through error
            // if error occur it will update on object and submit button not work 
            //no error error then only form procced to submit

            let errors = {}

            if (!selectedEmail) {
                errors.emailId = "Required *"
            }

            return errors;
        },
        onSubmit: async (values) => {

            //on submit it will proceess the data and create a object in api

            try {
                const userData = await axios.get(`http://localhost:3005/user-creation/forgetPassword/checkEmail/${selectedEmail}`);
                navigate(`/resetPassword/${userData.data._id}`);
                formik.handleReset();
                // console.log(userData.data);
            } catch (error) {
                console.log("error", error.response);
                formik.setFieldError("emailId", " Invalid Email Id");

            }
        }
    })


    return (

        <div class="container forgetPassword-page forgetPassword-container">
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-2">

                    <div class="row">

                        <div class="col-lg">
                            <div class="p-5">
                                <div class="text-center">
                                    <h2 className='h5'><i class="bi bi-bank2"> FOAP </i></h2>
                                    <h2 className="h1"> Forget Password!</h2>
                                    <h1 class="h4 text-gray-900 mb-4">Enter your mail id!</h1>
                                </div>
                                <form class="user" onSubmit={formik.handleSubmit}>
                                    <div class="form-group">
                                        <input type="email"
                                            class="form-control form-control-user"
                                            id="exampleInputEmail"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Email Address..."
                                            name="emailId"
                                            onChange={e => setSelectedEmail(e.target.value)}
                                            onBlur={formik.handleBlur} />

                                        {(formik.getFieldMeta("emailId").touched && formik.errors.emailId)
                                            ? <span style={{ color: "red" }}>{formik.errors.emailId}</span> : null}


                                    </div>

                                    <hr />
                                    <div className="text-center h4 ">
                                        <button type='submit' href="index.html" class="btn  btn-user btn-block">
                                            Login
                                        </button>
                                    </div>
                                    {/* <a href="index.html" class="btn btn-google btn-danger btn-user btn-block">
                                                <i class="fab fa-google fa-fw"></i> Login with Google
                                            </a> */}

                                </form>
                                <hr />
                                <div class="text-center">
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

export default ForgetPassword

























