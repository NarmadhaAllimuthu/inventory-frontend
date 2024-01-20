
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./assets/viewProductPage.css"

function ViewProduct() {

  const params = useParams();
  const [state, setState] = useState();

  let getinfo = async () => {
    try {
      const statee = await axios.get(`https://nodejs-inventory-management.onrender.com/inventoryProduct/viewProduct/${params.id}`,
        {

          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
      setState(statee.data)
      // console.log(statee.data[0].username);
    } catch (error) {
      console.log("error")
    }
  }
  useEffect(() => {
    getinfo();
  }, []);


  return (


    <div>
      <div className='container-fluid view-container'>
        <div className='col-lg-4 view-cart'>
          {
            state ? <ul>
              <li>
                <h3 className='h4 view-content'>Product Name</h3>
                <span className='view'> {state?.productName}</span>
              </li>
              <li>
                <h3 className='h4 view-content'>Material</h3>
                <span className='view'> {state?.productMaterial}</span>
              </li>
              <li>
                <h3 className='h4 view-content'>Product Base Price</h3>
                <span className='view'> {state?.productBasePrice}</span>
              </li>
              <li>
                <h3 className='h4 view-content'>Product Selling Price</h3>
                <span className='view'>  {state?.productSellingPrice}</span>
              </li>
              <li>
                <h3 className='h4 view-content'>Product Id</h3>
                <span className='view'> {state?.productId}</span>
              </li>
              <li>
                <h3 className='h4 view-content'>Quantity</h3>
                <span className='view'> {state?.quantity}</span>
              </li>
              <li>
                <h3 className='h4 view-content'>GST </h3>
                <span className='view'>   {state?.productGst}</span>

              </li>
            </ul> : <div>
              <h1>loading.....</h1>
            </div>

          }
        </div>
      </div>
    </div>


  )
}


export default ViewProduct


