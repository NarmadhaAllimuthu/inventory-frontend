

import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AllSuppliersData() {

    const [suppliersData, setSuppliersData] = useState([]);

    const getSuppliersData = async () => {
        try {
            const response = await axios.get('https://nodejs-inventory-management.onrender.com/supplier/getAllSuppliersData', {

                headers: {
                    Authorization: localStorage.getItem("token")
                }

            });


            setSuppliersData(response.data);

        } catch (err) {
            console.error(err.message);

        }
    }

    useEffect(() => {
        getSuppliersData();
    }, [])

    return (
        <div className='row mt-2 mb-3 mx-2'>
            <div className="col-lg-12">
                <div className="h4 heading">
                    Existing Supplier's data
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-12'>
                    <table className='table table-bordered border-primary table-hover'>
                        <thead>
                            <tr>
                                <th> S.No</th>
                                <th>  Supplier Id</th>
                                <th> Name</th>
                                <th> Email</th>

                                <th> contact</th>




                            </tr>
                        </thead>
                        <tbody>

                            {suppliersData.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.supplierId}</td>
                                    <td>{item.supplierName}</td>
                                    <td>{item.supplierEmail}</td>
                                    <td>{item.supplierPhone}</td>
                                </tr>

                            ))
                            }
                        </tbody>


                    </table>

                </div></div>

        </div>
    )
}

export default AllSuppliersData










