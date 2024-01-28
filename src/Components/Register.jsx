
import React from 'react';
import "./assets/registerPage.css";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Register() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {

      // here we get the form values by same name and intially empty
      userFirstName: "",
      userLastName: "",
      emailId: "",
      password: "",
      confirmPassword: ""

    },
    validate: (values) => {

      //validation take place here for every input box based on the conditions it will through error
      // if error occur it will update on object and submit button not work 
      //no error error then only form procced to submit

      let errors = {}


      if (!values.userFirstName) {
        errors.userFirstName = "Required "
      } else if (values.userFirstName.length < 3 && values.userFirstName.length >= 15) {
        errors.userFirstName = "Name must be between 3 to 15 characters"
      } else if (!/^[a-zA-Z ]*$/.test(values.userFirstName)) {
        errors.userFirstName = "Special characters are not allowed"
      }


      if (!values.userLastName) {
        errors.userLastName = "Required *"
      } else if (!/^[a-zA-Z ]*$/.test(values.userLastName)) {
        errors.userLastName = "Special characters are not allowed"
      }

      if (!values.emailId) {
        errors.emailId = "Required *"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailId)) {
        errors.emailId = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = "Required *"
      } else if (values.password.length < 6) {
        errors.password = "Password must be atleast 6 characters"
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required *"
      } else if (values.confirmPassword.length < 6) {
        errors.confirmPassword = "Password must be atleast 6 characters"
      }
      else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Mismatch Password *"
      }


      return errors;
      
    },
    onSubmit: async (values) => {

      //on submit it will proceess the data and create a object in api

      try {
        const authorData = await axios.post("https://nodejs-inventory-management.onrender.com/user-creation/register", values);
        alert("Registered Data Posted successfully !");

        navigate("/login");
        formik.handleReset();
        console.log(authorData.data);
      } catch (error) {
        console.log("error", error.response);
        if (error.response.status === 401) {
          alert("User already exists. Change data to register.");
        } else {
          alert("Something went wrong");
        }
      }

    }
  })


  return (

    <div className="container register-container register-page" >

      <div className="card o-hidden border-0 shadow-lg my-5 ">
        <div className="card-body p-2">

          <div className="row">

            <div className="col-lg">
              <div className="p-5">
                <div className="text-center">
                  <h2 className='h1'><i class="bi bi-bank2"> FOAP </i></h2>
                  <h4 className='h5'>Inventory Management System</h4>
                  <h1 className="h3 text-white-900 mb-4">Create an Account !</h1>
                </div>
                <form className="user" onSubmit={formik.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="text"
                        className="form-control form-control-user"
                        id="exampleFirstName"
                        placeholder="First Name"
                        name="userFirstName"
                        onClick={formik.handleChange}
                        onBlur={formik.handleBlur} />

                      {(formik.getFieldMeta("userFirstName").touched && formik.errors.userFirstName)
                        ? <span style={{ color: "red" }}>{formik.errors.userFirstName}</span> : null}


                    </div>
                    <div className="col-sm-6">
                      <input type="text"
                        className="form-control form-control-user"
                        id="exampleLastName"
                        placeholder="Last Name"
                        name="userLastName"
                        onClick={formik.handleChange}
                        onBlur={formik.handleBlur} />

                      {(formik.getFieldMeta("userLastName").touched && formik.errors.userLastName)
                        ? <span style={{ color: "red" }}>{formik.errors.userLastName}</span> : null}

                    </div>


                  </div>
                  <div className="form-group">
                    <input type="email"
                      className="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Email Address"
                      name="emailId"
                      onClick={formik.handleChange}
                      onBlur={formik.handleBlur} />

                    {(formik.getFieldMeta("emailId").touched && formik.errors.emailId)
                      ? <span style={{ color: "red" }}>{formik.errors.emailId}</span> : null}

                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="password"
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        name="password"
                        onClick={formik.handleChange}
                        onBlur={formik.handleBlur} />

                      {(formik.getFieldMeta("password").touched && formik.errors.password)
                        ? <span style={{ color: "red" }}>{formik.errors.password}</span> : null}


                    </div>
                    <div className="col-sm-6">
                      <input type="password"
                        className="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onClick={formik.handleChange}
                        onBlur={formik.handleBlur} />

                      {(formik.getFieldMeta("confirmPassword").touched && formik.errors.confirmPassword)
                        ? <span style={{ color: "red" }}>{formik.errors.confirmPassword}</span> : null}

                    </div>
                  </div>
                  <hr />
                  <div className="text-center">
                    <button type="submit" className="btn btn-danger btn-user btn-block">
                      Register Account
                    </button>
                  </div>

                  {/* <a href="index.html" className="btn btn-google btn-danger btn-user btn-block">
                    <i className="fab fa-google fa-fw"></i> Register with Google
                  </a> */}
                  {/* <a href="index.html" className="btn btn-facebook btn-warning btn-user btn-block">
                                <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                            </a> */}
                </form>
                <hr />

                <div className="text-center">
                  <Link className="small" to={"/login"}>Already have an account? Login!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>




  )
}

export default Register






