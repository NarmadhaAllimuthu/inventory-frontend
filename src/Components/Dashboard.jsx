

import React, { useEffect, useState } from 'react';

import CardComponent from './CardComponent';
import axios from 'axios';
import DashboardReportComponent from './DashboardReportComponent';
import "./assets/dashboardPage.css"
import Footer from './Footer';

function Dashboard() {

  const [lessStockProducts, setLessStockProducts] = useState([]);



  const getLessStockProducts = async () => {
    try {
      const response = await axios.get('https://nodejs-inventory-management.onrender.com/inventoryProduct/getLessStockAlert', {
        headers: {

          Authorization: localStorage.getItem('token')
        }
      });
      console.log(response.data);
      setLessStockProducts(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        alert("Unauthorized");
      } else if (error.response.status === 404) {
        setLessStockProducts();
      } else {
        alert("Something went wrong in stock alert api");
      }

    }

  }

  useEffect(() => {
    getLessStockProducts();
  }, [])


  return (
    <>
      <div className='dashboard-container container mt-5'>
        <div className='row'>
          <div className='col-md-12 mx-0'>
            <h1 className='mb-5 heading'>Welcome to Inventory Dashboard !</h1>
          </div>
        </div>


        <CardComponent />

        <div className='row mt-4'>
          <div className='col-md-12 mx-0'>
            <h3 className='mb-4 topic'>Product stock Alert !</h3>
          </div>
        </div>
        <div className="col-lg ml-2">
          <table className="table table-bordered table-hover  border-primary">
            <thead>
              <tr>
                <th> #</th>
                <th>Product Id</th>
                <th>Product name</th>
                <th>Category</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>

              {
                lessStockProducts != undefined && lessStockProducts.length > 0 ? lessStockProducts.map((item, index) => (
                  <tr key={item._id} className='table-danger'  >
                    <td >{index + 1}</td>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.productMaterial}</td>
                    <td>{item.quantity}</td>

                  </tr>
                )) : <tr className='table-danger'><td colSpan={5}>All Products are in stock with available quantity  ! 📶 📶 📶</td></tr>
              }
            </tbody>
          </table>

        </div>
        <DashboardReportComponent />

      </div>


    </>
  );
}

export default Dashboard;

















