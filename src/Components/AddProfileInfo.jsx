import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function AddProfileInfo() {

  const params = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  console.log(userData);
  const [edit, setEdit] = useState(false);


  const getProfile = async () => {
    try {
      const userDataResponse = await axios.get(
        `https://nodejs-inventory-management.onrender.com/user-creation/userData/${params.id}`,
        {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }
      );
      formik.setValues(userDataResponse.data);
      setUserData(userDataResponse.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong !");
    }
  }

  useEffect(() => {
    getProfile()

  }, []);


  const handleEditProfile = () => {
    setEdit(!edit);
  };

  const formik = useFormik({
    initialValues: {
      userFirstName: "",
      userLastName: "",
      emailId: "",
      bio: "",
      photo: "",
      address: "",
      city: "",
      state: "",
      contactNumber: ""
    },
    onSubmit: async (e) => {

      if (edit) {
        try {
          await axios.put(`https://nodejs-inventory-management.onrender.com/user-creation/updateUser/${params.id}`, formik.values, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          })
          alert("Profile Updated Successfully");
          getProfile();
          navigate("/portal/dashboard")
          setEdit(false);

        } catch (error) {
          console.log(error);
          alert("Something went wrong !");
        }


      }
    }
  }
  );




  return (
    <div className='container profile-container mt-4'>
      <div className="row mt-4 mb-5">
        <div className="col-lg">
          <h1 className='text-center heading'>your Account Details </h1>
        </div>
      </div>
      <div className="row mb-5 mx-5 text-center justify-content-center">

        {userData !== null ? (
          <div class="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="col-md">
              <img src={userData.photo} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md">
              <div className="card-body">
                <h5 className="card-title details-heading">Name :
                  <span className='details'>  {userData.userFirstName} {userData.userLastName}</span>
                </h5>
                <h5 className="card-text details-heading">Email :
                  <span className='details'> {userData.emailId}</span>
                </h5>

                <h5 className='details-heading'>Bio :
                  <span className='details'> {userData.bio}</span>
                </h5>


                <button className='btn btn-primary' onClick={handleEditProfile}>Update Profile</button>'
              </div>
            </div>
          </div>
        ) : (
          <h3 className='heading text-center'>No Account ❗ <Link to={"/register"}> <button className='btn btn-success' >Create an Account</button> </Link></h3>
        )}



      </div>

      {edit && (
        <>
          <hr></hr>
          <div className='row mt-2'>
            <div className="row mb-3">
              <div className="col-lg">
                <h1 className='text-center heading'>Update your Account Details </h1>

              </div>
            </div>
            <hr></hr>
            <div className='row mx-5'></div>
            <form onSubmit={formik.handleSubmit} className='form-group mx-5'>

              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label fs-4'>User First Name :</label>
                  <input type="text"
                    value={formik.values.userFirstName}
                    disabled
                    className='form-control' />
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label fs-4'>Last Name:</label>
                  <input type="text"
                    value={formik.values.userLastName}
                    disabled
                    className='form-control' />
                </div>
              </div>
              <div className='row mt-2'>
                <div className="col-md-8">

                  <label className='label fs-4'>Email :</label>


                  <input type="text"
                    value={formik.values.emailId}
                    disabled
                    className='form-control' />
                </div>
              </div>
              <div className='row mt-2'>
                <div className="col-md-8">

                  <label className='label fs-4'>Bio :</label>

                  <input type="text"
                    value={formik.values.bio}
                    name="bio"
                    onChange={formik.handleChange}
                    className='form-control' />
                </div>
              </div>
              <div className='row mt-2'>
                <div className="col-md-8">

                  <label className='label fs-4'>Photo :</label>

                  <input type="text"
                    value={formik.values.photo}
                    name='photo'
                    onChange={formik.handleChange}
                    className='form-control'
                    disabled />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-8">

                  <label className='label fs-4'>Address :</label>

                  <input type="text"
                    name='address'
                    onChange={formik.handleChange}

                    value={formik.values.address}
                    className='form-control'
                  />


                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-8">
                  <label className='label fs-4'>City :</label>

                  <input type="text"
                    value={formik.values.city}
                    name='city'
                    onChange={formik.handleChange}
                    className='form-control' />

                </div>

              </div>
              <div className="row mt-2">
                <div className="col-md-8">
                  <label className='label fs-4'>State :</label>

                  <input type="text"
                    value={formik.values.state}
                    name='state'
                    onChange={formik.handleChange}
                    className='form-control' />

                </div>


              </div>
              <div className="row mt-2">
                <div className="col-md-8">
                  <label className='label fs-4'>Contact Number :</label>


                  <input type="text"
                    value={formik.values.contactNumber}
                    name='contactNumber'
                    onChange={formik.handleChange}
                    className='form-control' />

                </div>



              </div>


              <button className='btn btn-supplierSearch mt-3 mb-5' type='submit' >Save Changes</button>

            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default AddProfileInfo

















