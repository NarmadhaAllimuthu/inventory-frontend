import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

function CardComponent() {

  const [customerCount, setCustomerCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0.00);
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0.00);



  const handleCustomerCount = async () => {
    try {
      const response = await axios.get("https://nodejs-inventory-management.onrender.com/customer/getCustomerCount", {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log(response.data);
      setCustomerCount(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

  }


  const handleSupplierCount = async () => {
    try {
      const response = await axios.get("https://nodejs-inventory-management.onrender.com/supplier/getSupplierCount", {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log(response.data);
      setSupplierCount(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

  }

  const handlePurchaseCount = async () => {
    try {
      const response = await axios.get("https://nodejs-inventory-management.onrender.com/purchaseOrder/getPurchaseInvoiceCount", {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log(response.data);
      setPurchaseCount(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

  }

  const handleSalesCount = async () => {
    try {
      const response = await axios.get("https://nodejs-inventory-management.onrender.com/salesOrder/getSalesOrderCount", {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log(response.data);
      setSalesCount(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

  }


  const handleTotalSales = async () => {
    try {
      const response = await axios.get("https://nodejs-inventory-management.onrender.com/salesOrder/getTotalSalesAmount", {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log(response.data);
      setTotalSales(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

  }



  const handleTotalPurchaseAmount = async () => {
    try {
      const response = await axios.get("https://nodejs-inventory-management.onrender.com/purchaseOrder/getTotalPurchaseAmount", {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log(response.data);
      setTotalPurchaseAmount(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }


  }





  useEffect(() => {
    handleCustomerCount();
    handleSupplierCount();
    handlePurchaseCount();
    handleSalesCount();
    handleTotalSales();
    handleTotalPurchaseAmount();

  }, [])

  return (
    <>
      <div className="row mb-4">
        <div className='col-md-2 mx-4 customer-card mb-3'>
          <Card >
            <Card.Body>
              <div className="text-xs font-weight-bold text-uppercase mb-1">
                Total Customer <i class="bi bi-people mx-5"></i>
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800"><h2 className=' text-count'>  {customerCount.customerCount}   </h2>      </div>

            </Card.Body>
          </Card>
        </div>
        <div className="col-md-2  mx-4 supplier-card  mb-3">
          <Card>
            <Card.Body>
              <div className="text-xs font-weight-bold  text-uppercase mb-1">
                Total Suppliers    <i class="bi bi-people-fill mx-5"></i>
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800 ">
                <h2 className=' text-count'>
                  {supplierCount.supplierCount}
                </h2></div>

            </Card.Body>

          </Card>
        </div>
        <div className="col-md-2  mx-4 purchase-invoiceCard  mb-3">
          <Card>
            <Card.Body>
              <div className="text-xs font-weight-bold  text-uppercase mb-1">
                Purchase Invoice  <i class="bi bi-journal-check mx-5"></i>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-auto">
                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                    <h2 className=' text-count'>
                      {purchaseCount.purchaseInvoiceCount}</h2>
                  </div>

                </div>

              </div>
            </Card.Body>
          </Card>

        </div>
        <div className="col-md-2 mx-4 salesOrderCard  mb-3">
          <Card>
            <Card.Body>

              <div className="text-xs font-weight-bold  text-uppercase mb-1">
                Sales Invoice     <i class="bi bi-check-circle-fill mx-5"></i>
              </div>
              <div className="h5 mb-0 font-weight-bold ">
                <h2 className=' text-count'>
                  {salesCount.salesOrderCount}
                </h2></div>

            </Card.Body>
          </Card>

        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md totalSales-card  mb-3'>
          <Card>
            <Card.Body>
              <div className="text font-weight-bold   mb-1">
                <h3 className='h3'><i class="bi bi-bar-chart"></i>  Sales  </h3>
                <h6 className='h5 mt-3 mb-2'>TOTAL sales in recent days is Rs.
                  <span className='h4'>
                    {Math.round(totalSales.totalSalesAmount).toFixed(2)}/-</span> </h6>

                <h6 className='h6 mb-3'>Increase your sales increase your profit ! <i class="bi bi-bag-check"></i></h6>
              </div>
              {/* <div className="h5 mb-0 font-weight-bold text-gray-800">0</div> */}

            </Card.Body>
          </Card>
        </div>
        <div className='col-md  totalPurchase-card mx-2  mb-3'>
          <Card>
            <Card.Body>
              <div className="text font-weight-bold   mb-1">
                <h3 className='h3'><i class="bi bi-building-fill-down"></i>  Purchase/Receipt</h3>
                <h6 className='h5 mt-3 mb-2'>TOTAL purchase in recent days is Rs. <span className='h4'>
                  {Math.round(totalPurchaseAmount.totalPurchaseAmount).toFixed(2)}/-</span> </h6>

                <h6 className='h6 mb-3'>Over purchase increase our burden reduce our profit ! <i class="bi bi-graph-up-arrow"></i></h6>
              </div>


            </Card.Body>
          </Card>

        </div>


      </div>
    </>
  )
}

export default CardComponent