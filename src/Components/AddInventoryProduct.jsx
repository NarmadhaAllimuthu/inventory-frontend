
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

function AddInventoryProduct() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {

      // here we get the form values by same name and intially empty
      productName: "",
      productMaterial: "",
      quantity: "",
      productBasePrice: "",
      productSellingPrice: "",
      productGst: "",
      productImage: "",
      productDescription: ""
    },
    validate: (values) => {

      //validation take place here for every input box based on the conditions it will through error
      // if error occur it will update on object and submit button not work 
      //no error error then only form procced to submit

      let errors = {}


      if (!values.productName) {
        errors.productName = "Please Enter Product Name *"
      }

      if (!values.productMaterial) {
        errors.productMaterial = "Required *"
      } else if (values.productMaterial.length > 12 && values.productMaterial.length < 3) {
        errors.productMaterial = 'Invalid contact number';
      }
      if (!values.quantity) {
        errors.quantity = "Required *"
      }
      if (!values.productBasePrice) {
        errors.productBasePrice = "Required *"
      }
      if (!values.productSellingPrice) {
        errors.productSellingPrice = "Required *"
      }
      if (!values.productGst) {
        errors.productGst = "Required *"
      }



      return errors;
    },
    onSubmit: async (values) => {

      //on submit it will proceess the data and create a object in api

      try {
        const productCreated = await axios.post("http://localhost:3005/inventoryProduct/createProduct", values,
          {

            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
        alert(" New Product created successfully !");
        navigate("/portal/inventoryCatlog");
        formik.handleReset();

        console.log(productCreated.data)

      } catch (error) {
        console.log("error", error);
      }
    }
  })


  return (

    <div className='container mt-5'>
      <div className='row text-center'>
        <div className='col-lg-12'>
          <h1 className='text-center crud-heading '>Create New product </h1>
          <p className='text-muted para'> add new product informations 📃</p>

        </div>
      </div>
      <hr></hr>
      <div className='row align-items-center justify-content-center'>
        <div className='col-lg-11  '>

          {/* formik package defaultly gave us the handleSubmit and handleChange,handleBlur functions we use then to handle the form easyly */}

          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} >
            <div className='row'>
              <div className='col-md-8'>
                <label className='label fs-5' >Product Name : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                <input className='form-control'
                  type='text'
                  name="productName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='eg:pen' >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                {(formik.getFieldMeta("productName").touched && formik.errors.productName)
                  ? <span style={{ color: "red" }}>{formik.errors.productName}</span> : null}

              </div>

            </div>

            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >Product Material : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                <input className='form-control mt-3'
                  type='text'
                  name="productMaterial"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='eg:steel'
                >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("productMaterial").touched && formik.errors.productMaterial)
                  ? <span style={{ color: "red" }}>{formik.errors.productMaterial}</span> : null}
              </div>

            </div>
            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >Initial Quantity : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="text"
                  name="quantity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='10'>

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("quantity").touched && formik.errors.quantity)
                  ? <span style={{ color: "red" }}>{formik.errors.quantity}</span> : null}

              </div>

            </div>
            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >Product Base Price(per/unit) : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="text"
                  name="productBasePrice"
                  value={formik.values.productBasePrice}
                  onChange={(e) => formik.handleChange(e) && formik.setFieldValue('productBasePrice', "₹" + e.target.value)}
                  onBlur={formik.handleBlur}
                  placeholder='eg:8'
                >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("productBasePrice").touched && formik.errors.productBasePrice)
                  ? <span style={{ color: "red" }}>{formik.errors.productBasePrice}</span> : null}

              </div>

            </div>

            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >Product Selling Price(per/unit) : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="text"
                  name="productSellingPrice"
                  value={formik.values.productSellingPrice}
                  onChange={(e) => formik.handleChange(e) && formik.setFieldValue('productSellingPrice', "₹" + e.target.value)}
                  onBlur={formik.handleBlur}
                  placeholder='eg:10'
                >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("productSellingPrice").touched && formik.errors.productSellingPrice)
                  ? <span style={{ color: "red" }}>{formik.errors.productSellingPrice}</span> : null}

              </div>

            </div>
            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' > GST Of Product : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <input className='form-control mt-3'
                  type="text"
                  name="productGst"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='eg:2.5%'
                >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("productGst").touched && formik.errors.productGst)
                  ? <span style={{ color: "red" }}>{formik.errors.productGst}</span> : null}

              </div>

            </div>
            {/* <div className='row mt-2'>
            <div className='col-md-8'>
              <label className='label fs-5'> Product Image : </label>

              {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


            {/* <input className='form-control mt-3'
                type="url"
                name="productImage"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='https://www.example.com/image.jpg'
              >

              </input> */}

            {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

            {/* 
              {(formik.getFieldMeta("contactPerson").touched && formik.errors.contactPerson)
                ? <span style={{ color: "red" }}>{formik.errors.contactPerson}</span> : null} */}

            {/* </div>

          </div> */}

            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label fs-5' >Description : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <textarea className='form-control mt-3'
                  type="text"
                  name="productDescription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='write note'>

                </textarea>



              </div>

            </div>

            <div className='d-inline-flex gap-1 mb-5'>
              <button className='btn btn-AddNew-Product mb-5 mt-4 p-3' type="submit" >Add New Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>


  )
}

export default AddInventoryProduct

















