import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewSupplier() {
    const params = useParams();
    const [state,setState]=useState();

    let getinfo= async () => {
         try {
             const statee = await axios.get(`https://nodejs-inventory-management.onrender.com/supplier/view-supplier/${params.id}`,
             {
                
              headers:{
               Authorization: localStorage.getItem("token")
              }});
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
      state? <ul>
    <li>
    <h3 className='h4 view-content'>Supplier Name</h3>
    <span className='view'>{state?.supplierName}</span>  
    </li>
    <li>
      <h3 className='h4 view-content'>Supplier Address</h3>
      <span className='view'>{state?.supplierAddress}</span>
    </li>
  
    <li>
      <h3 className='h4 view-content'>Supplier Phone</h3>
      <span className='view'>{state?.supplierPhone}</span>
    </li>
    
    <li>
      <h3 className='h4 view-content'>Supplier Email</h3>
      <span className='view'>{state?.supplierEmail}</span>
    </li>
   
    <li>
      <h3 className='h4 view-content'>Contact Person</h3>
      <span className='view'>{state?.contactPerson}</span>
    </li>
     
   </ul>:<div>
    <h1>loading.....</h1>
    </div>

}
</div>
</div>
</div>


  )
}

export default ViewSupplier