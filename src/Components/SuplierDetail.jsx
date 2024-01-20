import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SuplierDetail() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {

      // here we get the form values by same name and intially empty
      supplierName: "",
      supplierPhone: "",
      supplierEmail: "",
      supplierAddress: "",
      gst: "",
      contactPerson: "",
      supplierInfo: ""
    },
    validate: (values) => {

      //validation take place here for every input box based on the conditions it will through error
      // if error occur it will update on object and submit button not work 
      //no error error then only form procced to submit

      let errors = {}


      if (!values.supplierName) {
        errors.supplierName = "Please Enter Supplier Name"
      } else if (!/^[a-zA-Z ]*$/.test(values.supplierName)) {
        errors.supplierName = "Special characters are not allowed"
      }

      if (!values.supplierPhone) {
        errors.supplierPhone = "Required *"
      } else if (!/^[0-9]{10}/.test(values.supplierPhone)) {
        errors.supplierPhone = 'Invalid contact number';
      } else if (values.supplierPhone.length > 12 && values.supplierPhone.length > 10) {
        errors.supplierPhone = 'Invalid contact number';
      }
      if (!values.supplierEmail) {
        errors.supplierEmail = "Required *"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.supplierEmail)) {
        errors.supplierEmail = 'Invalid email supplierAddress';
      }
      if (!values.supplierAddress) {
        errors.supplierAddress = "Required *"
      }
      if (!values.gst) {
        errors.gst = "Required *"
      } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(values.gst)) {
        errors.gst = 'Invalid GST Number';
      }
      if (!values.contactPerson) {
        errors.contactPerson = "Required *"
      }


      return errors;
    },
    onSubmit: async (values) => {

      //on submit it will proceess the data and create a object in api

      try {
        const supplierCreatedData = await axios.post("http://localhost:3005/supplier/create-supplier", values,
        {
                
          headers:{
           Authorization: localStorage.getItem("token")
          }});
        alert("supplier created  successfully !");
        navigate("/portal/suppliers");
        formik.handleReset();

        console.log(supplierCreatedData.data)

      } catch (error) {
        console.log("error", error);
      }
    }
  })


  return (
    <div className='container mt-5 createSupplier-container'>
      <div className='row text-center'>
        <div className='col-lg-12'>
          <h1 className='text-center crud-heading'>Create New Supplier </h1>
          <p className='text-muted'>fill the form to add supplier informations</p>

        </div>
      </div>
      <hr></hr>
      <div className='row align-items-center justify-content-center'>
        <div className='col-lg-8  '>

          {/* formik package defaultly gave us the handleSubmit and handleChange,handleBlur functions we use then to handle the form easyly */}

          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} >
            <div className='row'>
              <div className='col-md-8'>
                <label className='label fs-5' >Supplier Name : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                <input className='form-control'
                  type='text'
                  name="supplierName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                {(formik.getFieldMeta("supplierName").touched && formik.errors.supplierName)
                  ? <span style={{ color: "red" }}>{formik.errors.supplierName}</span> : null}

              </div>

            </div>

            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5 ' >Contact Number : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                <input className='form-control mt-3'
                  type='text'
                  name="supplierPhone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='+91'>

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("supplierPhone").touched && formik.errors.supplierPhone)
                  ? <span style={{ color: "red" }}>{formik.errors.supplierPhone}</span> : null}
              </div>

            </div>
            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >Mail Id : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="mail"
                  name="supplierEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='abc@gmail.com'>

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("supplierEmail").touched && formik.errors.supplierEmail)
                  ? <span style={{ color: "red" }}>{formik.errors.supplierEmail}</span> : null}

              </div>

            </div>
            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >supplierAddress : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="text"
                  name="supplierAddress"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("supplierAddress").touched && formik.errors.supplierAddress)
                  ? <span style={{ color: "red" }}>{formik.errors.supplierAddress}</span> : null}

              </div>

            </div>

            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >GST : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="text"
                  name="gst"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("gst").touched && formik.errors.gst)
                  ? <span style={{ color: "red" }}>{formik.errors.gst}</span> : null}

              </div>

            </div>
            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >Contact Person : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="text"
                  name="contactPerson"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("contactPerson").touched && formik.errors.contactPerson)
                  ? <span style={{ color: "red" }}>{formik.errors.contactPerson}</span> : null}

              </div>

            </div>

            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >Supplier Info : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="text"
                  name="supplierInfo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='write note'>

                </input>



              </div>

            </div>
            <div className='d-inline-flex gap-1 mb-5'>

              <button className='btn  btn-createSupplier mb-5 mt-4 p-3' type="submit" >Create Supplier <i class="bi bi-person-circle"></i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SuplierDetail