
import axios from 'axios';

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import "./assets/supplierPage.css"
import AllSuppliersData from './AllSuppliersData';

function Suppliers() {
    const params = useParams()
    const [state, setState] = useState();

    const [data, setData] = useState([]);

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
                const supplierData = await axios.get(`http://localhost:3005/supplier/get-supplier/${values.supplierName}`,
                {
                
                    headers:{
                     Authorization: localStorage.getItem("token")
                    }});
                console.log(supplierData.data);
                setData(supplierData.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    formik.setFieldError("supplierName", "Supplier not found & enter valid name");
                    console.log("Supplier not found");
                } else {
                    alert("something went wrong in supplier api")
                }
            }
        }
    });

    const handleSupplierDelete = async (id) => {
        try {
            const deletee = await axios.delete(` http://localhost:3005/supplier/delete-supplier/${id}`,
            {
                
                headers:{
                 Authorization: localStorage.getItem("token")
                }});
            setState(deletee.data)
            alert("Supplier deleted successfully  ❗❗❗!")

            console.log("User deleted successfully");
            // You can navigate to another page or perform other actions after successful deletion.
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("User not found");
                // Handle the case where the user is not found (e.g., show a message to the user)
            } else {
                console.error("Error deleting user:", error);
                // Handle other errors
            }
        }

    }
    return (
        <div className='container mt-5'>
            <h1 className='h1  heading mt-3 text-center supplier-heading'>Suppliers</h1>
            <div className="row mt-4">
                <div className="col-lg-12">
                    <h3 className='h4 heading mx-4'>
                        Supplier's in inventory
                    </h3>
                </div>
            </div>
            <div className='row'>
                <div className="col-lg-8">
                    <p className='para'>  Suppliers are the people who supply the products to the customers.
                        Suppliers can be identified by their name, address, contact number, and email address.</p>
                </div>
                <div className='col-lg-3 text-end'>
                    <Link to='/portal/create-supplier' className='btn btn-createSupplier '> + Create a new Supplier <i class="bi bi-person-circle"></i></Link>

                </div>
            </div>
            <div className="row mx-2">
                <div className="col-lg">

                    <h2 className='h4 heading mb-3'>Supplier Details</h2>
                    < p className='para'>You can edit , view , delete supplier datas by getting in search result !</p>

                </div>
            </div>

            <div className='row mb-4 mx-3 mt-3 mb-4 '>
                <div className='col-md-7 searchBox  mb-4 mx-4  '>
                    <form onSubmit={formik.handleSubmit} className='form-group border-primary'>

                        <div className=' form-group mx-4 p-3 '>
                            <label className='label fs-4 mt-3'> Search Supplier <sup style={{ color: "red" }}> *</sup> </label>
                            <input type='search'
                                className='form-control mt-3 mb-2'
                                id='supplierName'
                                placeholder='Search Supplier by name'
                                name="supplierName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting} />
                            {
                                (formik.getFieldMeta("supplierName").touched && formik.errors.supplierName) ?
                                    <span style={{ color: "red" }}>{formik.errors.supplierName}</span> : null
                            }
                            <div className='form-group d-grid gap-2 col-6 mx-auto mt-3 mb-4'>
                                <button type='submit' 
                                className='btn btn-lg btn-supplierSearch'
                                disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0} > 
                                Search </button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>


            <div className='col-md-12 mt-4'>
                <table className='table table-bordered table-primary table-hover'>
                    <thead>
                        <tr>
                            <th>S.No</th>

                            <th>Supplier Name</th>
                            <th>Supplier Address</th>
                            <th>Supplier Contact</th>
                            <th>Supplier Email</th>
                            <th>Contact Person</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.length > 0 ?
                                data.map((supplier) => (

                                    <tr key={supplier._id} >
                                        <td>1.</td>
                                        <td>{supplier.supplierName}</td>
                                        <td>{supplier.supplierAddress}</td>
                                        <td>{supplier.supplierPhone}</td>
                                        <td>{supplier.supplierEmail}</td>
                                        <td>{supplier.contactPerson}</td>
                                        <td>
                                            <Link to={`/portal/view-supplier/${supplier._id}`}>
                                                <button className='btn btn-info mx-2 '> <i class="bi bi-eye"></i></button>
                                            </Link>
                                            <Link to={`/portal/edit-supplier/${supplier._id}`}>
                                                <button className='btn  btn-warning mx-2'> <i class="bi bi-pencil-square"></i></button>
                                            </Link>
                                            <button className='btn btn-danger mx-2' onClick={() => { handleSupplierDelete(supplier._id) }}><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>

                                ))

                                :
                                <tr className='table-danger'>
                                    <td colSpan={7}>Search supplier by their created name !</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>


            <div className='row mx-2'>
                <div className='col-lg'>
                    <h3 className='h4 heading'>why suppliers ?</h3>
                </div>
            </div>
            <div className='row mx-2'>
                <div className='col-lg'>
                    <p className='para'>Supplies are the most wanted for run the daily operations of a your
                        business (such as paper, labels, or boxes) and improve your products 🎉 stock 📃 profit 📶</p>
                </div>
            </div>
            <AllSuppliersData />
            <div className="row mx-2">
                <div className="col-lg-12">
                    <div className="h4 heading">
                        About suppliers
                    </div>
                </div>
            </div>
            <div className="row mx-2">
                <div className="col-lg-12">
                    <p className='para'> Suppliers are individuals or organizations who supply goods or services to businesses.
                        They can be individuals or companies. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals. Suppliers can be registered with the company or can be registered as individuals.

                    </p>
                </div>
            </div>

        </div>
    )
}

export default Suppliers





