
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import InfoPopup from './InfoPopup';
import DownloadProduct from './DownloadProduct';
import CheckBoxSelect from './CheckBoxSelect';
// import "font-awesome-icons/data/icons.json"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function InventoryProduct() {

    const [productDetails, setProductDetails] = useState([]);
    const [state, setState] = useState();
    const [selectedProducts, setSelectedProducts] = useState([]);

    const getProductDetails = async () => {
        try {
            const response = await axios.get("https://nodejs-inventory-management.onrender.com/inventoryProduct/getAllProducts", {

                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setProductDetails(response.data);

        } catch (error) {
            console.log(error);
            // alert("Something went wrong");
        }
    }

    useEffect(() => {
        getProductDetails();
    }, [])

    const handleitemDelete = async (id) => {
        try {
            const deleteProduct = await axios.delete(`https://nodejs-inventory-management.onrender.com/inventoryProduct/deleteProduct/${id}`,
                {

                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
            setState(deleteProduct.data);
            alert("Product deleted successfully  ❗❗❗!");

        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Product not found Something went wrong !");

            } else {
                console.error("Error deleting Product:", error);
            }
        }
    }



    const handleCheckboxChange = (productId) => {
        setSelectedProducts(prevSelectedProducts => {
            if (prevSelectedProducts.includes(productId)) {
                return prevSelectedProducts.filter(id => id !== productId);
            } else {
                return [...prevSelectedProducts, productId];
            }
        })

    }




    return (
        <div className='container mt-5'>
            <div className="row mt-5">
                <div className="col">
                    <h1 className='h2 main mx-5 mt-4 text-center mb-5'>Simplify inventory control with <i class="bi bi-bank2"></i> FOAP Inventory.</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='h4 heading'>Inventory Product</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-7'>
                    <p className='para'> Inventory refers to all the items, goods, merchandise, and materials held by a business for selling in the market to earn a profit.</p>
                </div>
                <div className='col-lg-5'>
                    <Link to='/portal/addInventoryProduct' className='btn btn-addInventory'>+<span>Add New Items</span></Link>

                </div>

            </div>

            <div className="row ">
                <div className="col-lg-7">
                    <h2 className="h4 heading mb-3">Product Details</h2>

                </div>
                <DownloadProduct productDetails={productDetails.filter((product) => selectedProducts.includes(product._id))}></DownloadProduct>
            </div>

            <div className='row'>
                <div className='col-md-12'>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th>✅</th>
                                <td>S.No</td>

                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Product Base Price</th>

                                <th>Product Selling Price</th>
                                <th>Quantity</th>
                                {/* <th>Product Image</th>

                                <th>Description</th> */}
                                <th>Info</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {productDetails.map((item, index) => (
                                <tr key={item._id}>
                                    <td>
                                        <CheckBoxSelect
                                            className='text-center'
                                            productId={item._id}
                                            isChecked={selectedProducts.includes(item._id)}
                                            onCheckboxChange={handleCheckboxChange}
                                        />
                                    </td>
                                    <td>{index + 1} .</td>

                                    <td>{item.productId}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.productMaterial}</td>
                                    <td>{item.productBasePrice}</td>
                                    <td>{item.productSellingPrice}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button className='btn btn-primary'
                                            data-bs-toggle="modal"
                                            data-bs-target={`#infoPopup${index}`}
                                        >
                                            <i class="bi bi-info-circle" />
                                        </button>

                                        <InfoPopup></InfoPopup>
                                    </td>


                                    <td>
                                        <Link to={`/portal/viewProduct/${item._id}`}>

                                            <button className='btn btn-info '
                                                data-bs-toggle="tooltip"

                                                data-placement='bottom'
                                                title='view'>
                                                <i class="bi bi-eye"></i>
                                            </button>

                                        </Link>

                                        <Link to={`/portal/editProduct/${item._id}`}>
                                            <button className='btn mx-2  btn-warning tooltip-test'
                                                // data-bs-toggle="tooltip"

                                                data-placement='bottom'
                                                title='edit'> <i class="bi bi-pencil-square"></i></button>
                                        </Link>
                                        <button className='btn btn-danger' data-bs-toggle="tooltip"

                                            data-placement='bottom'
                                            title='delete'
                                            onClick={() => { handleitemDelete(item._id) }}><i class="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>
            <div className='row mt-4'>
                <div className='col-md-12'>
                    <h2 className='h4 heading text-center'>
                        -----***** Add your products add your profits *****-----
                    </h2>
                </div>
            </div>
        </div>
    )
}



export default InventoryProduct










