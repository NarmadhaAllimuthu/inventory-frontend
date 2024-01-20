import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Suppliers from './Suppliers';
import SuplierDetail from './SuplierDetail';
import ViewSupplier from './ViewSupplier';
import InventoryProduct from './InventoryProduct';
import PurchaseOrderPage from './PurchaseOrderPage';
import PurchaseOrderDetailPage from './PurchaseOrderDetailPage';
import ReceiptPage from './ReceiptPage';
import CustomerCreatingPage from './CustomerCreatingPage';
import SalesOrder from './SalesOrder';
import SalesOrderBillPage from './SalesOrderBillPage';
import Footer from './Footer';
import AddInventoryProduct from './AddInventoryProduct';
import ViewProduct from './ViewProduct';
import EditInventoryProduct from './EditInventoryProduct';
import EditSupplier from './EditSupplier';


function Portal() {
  return (
    <div >
      <NavBar></NavBar>
      <div className='container'>
        <div className='row'>
          <div className='col-md'>
            <SideBar></SideBar>
          </div>
          <div className='col-md-11 container-fluid'>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/suppliers" element={<Suppliers />} />

              <Route path="/inventoryCatlog" element={<InventoryProduct />} />
              <Route path="/purchaseOrder" element={<PurchaseOrderPage />} />
              <Route path="/createPurchaseOrder/:id" element={<PurchaseOrderDetailPage />} />
              <Route path="/receipt" element={<ReceiptPage />} />
              <Route path="/createCustomer" element={<CustomerCreatingPage />} />
              <Route path="/salesOrder" element={<SalesOrder />} />
              <Route path="/salesOrderBillingPage/:id" element={<SalesOrderBillPage />} />
              <Route path="/addInventoryProduct" element={<AddInventoryProduct />} />
              <Route path='/viewProduct/:id' element={<ViewProduct />} />
              <Route path="/editProduct/:id" element={<EditInventoryProduct />} />

              <Route path="/create-supplier" element={<SuplierDetail />} />
              <Route path="/view-supplier/:id" element={<ViewSupplier />} />

              <Route path="/edit-supplier/:id" element={<EditSupplier />} />

            </Routes>
          </div>
        </div>

      </div>

      {/* <Footer/> */}

    </div>
  )
}

export default Portal