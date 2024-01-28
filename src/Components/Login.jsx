import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./assets/loginPage.css"

function Login() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            // here we get the form values by same name and intially empty

            emailId: "",
            password: "",
            confirmPassword: ""

        },
        validate: (values) => {

            //validation take place here for every input box based on the conditions it will through error
            // if error occur it will update on object and submit button not work 
            //no error error then only form procced to submit

            let errors = {}

            if (!values.emailId) {
                errors.emailId = "Required *"
            }

            if (!values.password) {
                errors.password = "Required *"
            }

            return errors;
        },
        onSubmit: async (values) => {

            //on submit it will proceess the data and create a object in api

            try {
                const userData = await axios.post("https://nodejs-inventory-management.onrender.com/user-creation/login" , values);
                localStorage.setItem("token", userData.data.token);
                localStorage.setItem("user", JSON.stringify(userData.data.user));
                alert("Logined successfully !");
                navigate("/portal/dashboard");
                formik.handleReset();
                // console.log(userData.data);
            } catch (error) {
                console.log("error", error.response);
                if (error.response.status === 401) {
                    // alert("User already exists. Change data to register.");
                } else {
                    alert("Something went wrong");
                }
            }

        }
    })

    return (
        <div class="container login-page login-container">



                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-2">

                            <div class="row">

                                <div class="col-lg">
                                    <div class="p-5">
                                        <div class="text-center">
                                        <h2 className='h5'><i class="bi bi-bank2"> FOAP </i></h2>
                                            <h2 className="h1"> Login !</h2>
                                       
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back !</h1>
                                        </div>
                                        <form class="user" onSubmit={formik.handleSubmit}>
                                            <div class="form-group">
                                                <input type="email"
                                                    class="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    name="emailId"
                                                    onClick={formik.handleChange}
                                                    onBlur={formik.handleBlur} />

                                                {(formik.getFieldMeta("emailId").touched && formik.errors.emailId)
                                                    ? <span style={{ color: "red" }}>{formik.errors.emailId}</span> : null}


                                            </div>
                                            <div class="form-group">
                                                <input type="password"
                                                    class="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    placeholder="Password"
                                                    name="password"
                                                    onClick={formik.handleChange}
                                                    onBlur={formik.handleBlur} />

                                                {(formik.getFieldMeta("password").touched && formik.errors.password)
                                                    ? <span style={{ color: "red" }}>{formik.errors.password}</span> : null}


                                            </div>

                                          
                                            <hr />
                                            <div className="text-center h4 ">
                                            <button type='submit' href="index.html" class="btn  btn-user btn-danger btn-block">
                                                Login
                                            </button>
                                            </div>
                                            {/* <a href="index.html" class="btn btn-google btn-danger btn-user btn-block">
                                                <i class="fab fa-google fa-fw"></i> Login with Google
                                            </a> */}

                                        </form>
                                        <hr />
                                        <div class="text-center">
                                            <Link className="small" to={"/forget-password"} > Forgot Password ?</Link>
                                        </div>
                                        <div class="text-center">
                                            <Link className='small' to={"/register"}> Create an Account !</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

          

        </div>
    )
}

export default Login