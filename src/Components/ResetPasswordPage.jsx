import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';

function ResetPasswordPage() {
    const navigate = useNavigate();
    const params = useParams();

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            let errors = {};

            if (!values.password) {
                errors.password = "Required *";
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = "Required *";
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Password Mismatch ";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                const userData = await axios.put(`https://nodejs-inventory-management.onrender.com/user-creation/forgetPassword/resetPassword/${params.id}`, values);

                alert("Password Reset Successfully !");
                navigate(`/login`);
                formik.handleReset();
            } catch (error) {
                console.log("error", error.response);
                alert("Something went wrong");
            }
        },
    });

    return (
        <div class="container forgetPassword-page forgetPassword-container">
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-2">
                    <div class="row">
                        <div class="col-lg">
                            <div class="p-5">
                                <div class="text-center">
                                    <h2 className='h5'><i class="bi bi-bank2"> FOAP </i></h2>
                                    <h1 class="h4 text-gray-900 mb-4">Reset Your Password Here !</h1>
                                </div>
                                <form class="user" onSubmit={formik.handleSubmit}>
                                    <div class="form-group">
                                        <input
                                            type="password"
                                            class="form-control form-control-user"
                                            placeholder="new Password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.getFieldMeta("password").touched && formik.errors.password ? (
                                            <span style={{ color: "red" }}>{formik.errors.password}</span>
                                        ) : null}
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="password"
                                            class="form-control form-control-user"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.getFieldMeta("confirmPassword").touched && formik.errors.confirmPassword ? (
                                            <span style={{ color: "red" }}>{formik.errors.confirmPassword}</span>
                                        ) : null}
                                    </div>
                                    <hr />
                                    <div className="text-center h4 ">
                                        <button type='submit' class="btn  btn-user btn-block">
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                                <hr />
                                <div class="text-center">
                                    <Link className='small' to={"/register"}>
                                        Create a new Account!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
