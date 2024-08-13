import axios from 'axios';
import React, { useEffect, useState } from 'react'

function InfoPopup() {

    const [productDetails, setProductDetails] = useState([]);
    const [state, setState] = useState();

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
    }, []);


  


  return (
    <>
{
    productDetails.map((item, index) => {
        return (<div className="modal fade" id={`infoPopup${index}`}
            tabIndex='-1' 
            aria-labelledby={`infoPopupLabel${index}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title" id={`infoPopupLabel${index}`}>
                                <h4 className='h4'>Product Information</h4>
                            </div>
                            <button type='button' className='btn-close' 
                            data-bs-dismiss='modal' aria-label='close'></button>
                        </div>
                        <div className="modal-body modal-dialog-scrollable">
                            <form >
                           
                               <div className="form-group">
                                  <label className='productId'>Product Id:

                                  </label>
                                  <input
                                  className='form-control'
                                  type="text"
                                  value={item.productId}
                                  disabled
                                  >
                                  </input>
                          
                                  </div>
                                  <div className="form-group">
                                  <label className='productName'>Product Name:

                                  </label>
                                  <input
                                  className='form-control'
                                  type="text"
                                  value={item.productName}
                                  disabled
                                  >
                                  </input>

                                  </div>
                                  <div className="form-group">
                                  <label className='productMaterial'>Product Material:

                                  </label>
                                  <input
                                  className="form-control"
                                  type="text"
                                  value={item.productMaterial}
                                  disabled
                                  >
                                  </input>

                                  </div>
                                  <div className="form-group">
                                  <label className='productBasePrice'>Product Base Price:

                                  </label>
                                  <input
                                  className="form-control"
                                  type="text"
                                  value={item.productBasePrice}
                                  disabled
                                  >
                                  </input>

                                  </div>
                                  <div className="form-group">
                                  <label className='productSellingPrice'>Product Selling Price:

                                  </label>
                                  <input

                                  className="form-control"
                                  type="text"
                                  value={item.productSellingPrice}
                                  disabled
                                  >
                                  </input>

                                  </div>
                                  <div className="form-group">
                                  <label className='quantity'>Quantity:

                                  </label>
                                  <input
                                  className="form-control"
                                  type="text"
                                  value={item.quantity}
                                  disabled
                                  >
                                  </input>

                                  </div>
    
                            </form>
                            <div className="modal-footer">
                                <button type='button' className='btn btn-primary'
                                data-bs-dismiss='modal'
                                // onClick={()=>{handleDownload(item.index)}}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
          
    
    )}
)}
        </>
  )
}

export default InfoPopup











