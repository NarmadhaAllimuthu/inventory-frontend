
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
      }

      if (!values.userLastName) {
        errors.userLastName = "Required *"
      }
      if (!values.emailId) {
        errors.emailId = "Required *"
      }

      if (!values.password) {
        errors.password = "Required *"
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required *"
      }

      if (!values.password || !values.confirmPassword) {
        errors.confirmPassword = "Mismatch Password *"
      }

      return errors;
    },
    onSubmit: async (values) => {

      //on submit it will proceess the data and create a object in api

      try {
        const authorData = await axios.post("http://localhost:4000/register", values);
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
  const triggerSignIn = () => {
    const main = document.getElementById("main");
    main.classList.add("right-panel-active");
    console.log("Sign In clicked");
  }
  const triggerSignUp = () => {
    const main = document.getElementById("main");
    main.classList.remove("right-panel-active");
    console.log("Sign Up clicked");
  }

  return (

    <div className='container register-container register-page' id="main">
      <div className="row autho-container">
        <div className="sign-up col-6 mb-3">

          <form className='form' >

            <h1 className='heading mb-4'>Create Account</h1>
            <div className="social-container mb-4">
              <FaGoogle className="mx-2" />
              <FaFacebook className="mx-2" />
              <FaLinkedin className="mx-2" />
            </div>
            <p className="mb-4">or use your email for registration</p>
            <div className="row">

              <div className="col-6 mb-3">

                <input
                  type="text"
                  className="form-control"
                  id="exampleFirstName"
                  placeholder="First Name"
                  name="userFirstName"
                  onClick={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {(formik.getFieldMeta("userFirstName").touched && formik.errors.userFirstName)
                  ? <span style={{ color: "red" }}>{formik.errors.userFirstName}</span> : null}
              </div>
              <div className="col-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleLastName"
                  placeholder="Last Name"
                  name="userLastName"
                  onClick={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {(formik.getFieldMeta("userLastName").touched && formik.errors.userLastName)
                  ? <span style={{ color: "red" }}>{formik.errors.userLastName}</span> : null}
              </div>
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail"
                placeholder="Email Address"
                name="emailId"
                onClick={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.getFieldMeta("emailId").touched && formik.errors.emailId)
                ? <span style={{ color: "red" }}>{formik.errors.emailId}</span> : null}
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword"
                  placeholder="Password"
                  name="password"
                  onClick={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {(formik.getFieldMeta("password").touched && formik.errors.password)
                  ? <span style={{ color: "red" }}>{formik.errors.password}</span> : null}
              </div>
              <div className="col-6 mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="exampleRepeatPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onClick={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {(formik.getFieldMeta("confirmPassword").touched && formik.errors.confirmPassword)
                  ? <span style={{ color: "red" }}>{formik.errors.confirmPassword}</span> : null}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-info btn-block"
              onClick={formik.handleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="sign-in col-6 mb-3">
          <form className='form'>
            <h1 className='heading mb-4'>Welcome Back!</h1>
            <div className="social-container mb-4">
              <FaGoogle className="mx-2 " />
              <FaFacebook className="mx-2" />
              <FaLinkedin className="mx-2" />
            </div>
            <p className="mb-4">or use your account</p>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail"
                placeholder="Email Address"
                name="emailId"
                onClick={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.getFieldMeta("emailId").touched && formik.errors.emailId)
                ? <span style={{ color: "red" }}>{formik.errors.emailId}</span> : null}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword"
                placeholder="Password"
                name="password"
                onClick={formik.handleChange}
                onBlur={formik.handleBlur}

              />
              {(formik.getFieldMeta("password").touched && formik.errors.password)
                ? <span style={{ color: "red" }}>{formik.errors.password}</span> : null}
            </div>
            <Link className='forget-password mb-3'>Forget Password</Link>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={formik.handleSubmit}
            >
              Sign In
            </button>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className='heading mb-4'>Welcome Back!</h1>
                  <p>To keep connected with us, please login with your personal info</p>
                  <button className="btn btn-outline-info" id="signIn" onClick={triggerSignIn}>
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1 className='heading mb-4'>Hello, Friend!</h1>
                  <p>Enter your personal details and start your journey with us</p>
                  <button className="btn btn-outline-info" id="signUp" onClick={triggerSignUp}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>





  )
}

export default Register






