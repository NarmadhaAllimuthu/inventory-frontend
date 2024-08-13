
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from './Components/HomePage';
import Register from './Components/Register';
import Login from './Components/Login';
import SuplierDetail from './Components/SuplierDetail';
import Portal from './Components/Portal';
import Dashboard from './Components/Dashboard';
import Suppliers from './Components/Suppliers';
import ViewSupplier from './Components/ViewSupplier';
import EditSupplier from './Components/EditSupplier';
import InventoryProduct from './Components/InventoryProduct';
import AddInventoryProduct from './Components/AddInventoryProduct';
import EditInventoryProduct from './Components/EditInventoryProduct';
import ViewProduct from './Components/ViewProduct';
import AddProfileInfo from './Components/AddProfileInfo';
import PurchaseOrderPage from './Components/PurchaseOrderPage';
import PurchaseOrderDetailPage from './Components/PurchaseOrderDetailPage';
import ReceiptPage from './Components/ReceiptPage';
import CustomerCreatingPage from './Components/CustomerCreatingPage';
import SalesOrder from './Components/SalesOrder';
import SalesOrderBillPage from './Components/SalesOrderBillPage';
import ForgetPassword from './Components/ForgetPassword';
import ResetPasswordPage from './Components/ResetPasswordPage';
import GroupUsers from './Components/GroupUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}  ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/resetPassword/:id" element={<ResetPasswordPage />} />
        <Route path='/addProfileInfo/:id' element={<AddProfileInfo />} />
        <Route path="group" element={<GroupUsers/>}/>
        <Route path="/portal" element={<Portal />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="inventoryCatlog" element={<InventoryProduct />} />
          <Route path="purchaseOrder" element={<PurchaseOrderPage />} />
          <Route path="createPurchaseOrder/:id" element={<PurchaseOrderDetailPage />} />
          <Route path="receipt" element={<ReceiptPage />} />
          <Route path="createCustomer" element={<CustomerCreatingPage />} />
          <Route path="salesOrder" element={<SalesOrder />} />
          <Route path="salesOrderBillingPage/:id" element={<SalesOrderBillPage />
        } />


          <Route path="addInventoryProduct" element={<AddInventoryProduct />} />
          <Route path='viewProduct/:id' element={<ViewProduct />} />
          <Route path="editProduct/:id" element={<EditInventoryProduct />} />

          <Route path="create-supplier" element={<SuplierDetail />} />
          <Route path="view-supplier/:id" element={<ViewSupplier />} />

          <Route path="edit-supplier/:id" element={<EditSupplier />} />
         
        </Route>






      </Routes>
    </BrowserRouter>
  );
}

export default App;






