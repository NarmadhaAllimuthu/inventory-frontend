
import React from 'react';
import './assets/sideBar.css';
import { Link, useLocation } from 'react-router-dom';

import "bootstrap-icons/font/bootstrap-icons.css";

function SideBar() {

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (

    <div className="sidebar">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " id="accordionSidebar">

        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3 my-3">

          <h2 className='h2'><i class="bi bi-bank2"> <span>FOAP </span></i></h2>

        </div>


        <hr className="sidebar-divider my-0" />

        <li className="nav-item nav-link mx-2 mt-3">
          {/* <Link className="nav-link" to="" aria-disabled="false"> */}
          <i className="bi bi-house-door-fill "></i>
          <span>  Home</span>
          {/* </Link> */}
        </li>
        <hr className="sidebar-divider" />

        <li className={`nav-item ${isActive('/portal/dashboard') ? 'active' : ''}`}>
          <Link className="nav-link" to="/portal/dashboard">
            <i class="bi bi-bookmark"></i>

            <span>  Dashboard</span>
          </Link>
        </li>


        <hr className="sidebar-divider" />
        <li className={`nav-item ${isActive('/portal/inventoryCatlog') ? 'active' : ''}`}>
          <Link className="nav-link" to="inventoryCatlog">
            <i className="bi bi-basket3-fill"></i>
            <span>  Inventory Catalog</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <li className={`nav-item ${isActive('/portal/suppliers') ? 'active' : ''}`}>
          <Link className="nav-link" to="suppliers">
            <i className="bi bi-truck"></i>
            <span>  Suppliers</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <li className={`nav-item ${isActive('/portal/purchaseOrder') ? 'active' : ''}`}>
          <Link className="nav-link" to="purchaseOrder">
            <i className="bi bi-journal-check"></i>
            <span>  Purchase Order</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <li className={`nav-item ${isActive('/portal/receipt') ? 'active' : ''}`}>
          <Link className="nav-link" to="receipt">
            <i class="bi bi-receipt"></i>
            <span>  Receipt/Billing</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <li className={`nav-item ${isActive('/portal/createCustomer') ? 'active' : ''}`}>
          <Link className="nav-link" to="createCustomer">
            <i class="bi bi-people"></i>
            <span>  Create Customer</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className={`nav-item ${isActive('/portal/salesOrder') ? 'active' : ''}`}>
          <Link className="nav-link" to="salesOrder">
            <i className="fbi bi-check-circle-fill"></i>
            <span>  Sales Order</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
      </ul>
    </div>
  )
}

export default SideBar









