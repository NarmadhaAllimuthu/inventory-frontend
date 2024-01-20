import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PurchaseOrderDetailPage() {

  const params = useParams();
  console.log(params);

  const [purchaseOrder, setPurchaseOrder] = useState();

  const getPurchaseOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/purchaseOrder/getPurchaseOrder/${params.id}`,
        {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        });

      setPurchaseOrder(response.data);

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    getPurchaseOrder();
  }, []);

  return (
    <div className='container mt-5'>

      {purchaseOrder &&
        <div>
          <div className='row'>
            <div className='col-12'>
              <h1 className='text-center mt-3 mb-3 heading'>Purchase Order Details</h1>
            </div>
          </div>
          <hr></hr>
          <div className='row mt-2 mb-3'>
            <div className='col mt-4'>
              <h6>You can check your order details here and note your PO number for receipting purpose .</h6>
            </div>
            <div className='col text-end'>
              <h3 className='h4 fs-2'>Ordered Date : {new Date(purchaseOrder.orderDate).toLocaleDateString()}</h3>

              <h1 className='h4 fs-2'>Order Id : {purchaseOrder.orderId}</h1>
              <div className='row'>
                <p style={{ color: "red" }}>Note :save order Id it will help you in billing *</p>
              </div>
            </div>
          </div>

          <div class="row mx-2 mb-3">
            <div class="col-lg mb-3 mb-sm-0 purchaseDetailCard">
              {
                purchaseOrder.orderTo.map((item, index) => (

                  <div class="card" key={index}>
                    <div class="card-body">
                      <h3 class="card-title heading mb-3">From</h3>
                      <h4 className='details-heading mb-2'>Name :
                        <span className='details'>{item.supplierName}</span></h4>

                      <h4 className='details-heading mb-2'>Address :
                        <span className='details'> {item.supplierAddress}</span></h4>


                      <h4 className='details-heading mb-2'>Phone :
                        <span className='details'> {item.supplierPhone}</span></h4>


                    </div>

                  </div>
                ))
              }
            </div>
            <div class="col purchaseDetailCol mx-2">
              {
                purchaseOrder.orderBy.map((item, index) => (

                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title heading mb-3">To</h5>
                      <h4 className='details-heading mb-2'>Name :
                        <sapn className="details">  {item.userFirstName}{item.userLastName}</sapn>  </h4>

                      <h4 className='details-heading mb-2'>Address :
                        <span className='details'> {item.address}</span></h4>


                      <h4 className='details-heading mb-2'>Phone :
                        <span className='details'> {item.contactNumber}</span></h4>

                      <p class="card-text"></p>
                    </div>
                  </div>

                ))
              }
            </div>
          </div>


          <div className="row mt-3 mb-3 mx-2">
            <div className="col-12">
              <h1 className='heading fs-2'>Order Details</h1>
            </div>
          </div>
          <div className="row mx-2 mb-5">
            {purchaseOrder.orderItem.map((item, index) => (
              <div key={index}>
                <table className='table table-bordered table-hover table-warning border-dark p-2'>
                  <thead>
                    <tr className='text-center'>
                      <th>Item Name</th>
                      <th>Tax</th>
                      <th>Unit Of Measure</th>
                      <th>Quantity</th>
                      <th>Price per unit</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={index} className='text-center'>
                      <td className='px-4'>{item.itemName}</td>
                      <td className='px-4'>{item.tax}</td>
                      <td className='px-4'>{item.unitOfMeasure}</td>
                      <td className='px-4'>{item.quantity}</td>
                      <td className='px-4'>{item.pricePerUnit}</td>
                      <td className='px-4'>{item.total}</td>
                    </tr>


                    <tr>
                      <td colSpan={6} className='text-end fs-5'>Subtotal Amount : ₹ {item.total} </td></tr>
                    <tr>
                      <td colSpan={6} className='text-end fs-5'>Shipping Amount : ₹ 0.00 </td>
                    </tr>
                    <tr>
                      <td colSpan={6} className='text-end fs-3 table-dark'>Total Amount : ₹ {item.total} </td>
                    </tr>
                  </tbody>
                </table>


              </div>
            ))}
          </div>
        </div>


      }
    </div>
  );
}

export default PurchaseOrderDetailPage;
