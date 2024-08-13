import React from 'react';
import "./assets/homePage.css";
import { Link } from 'react-router-dom';
// import { signInWithGoogle } from '../../firebase';

function HomePage() {

    // const triggerGoogle =async()=>{
    //     try{
    //         const {user} = await signInWithGoogle();
    //         console.log(user.token);

    //     }catch(error){
    //         console.log(error);
    //     }

    // }

    return (
        <>

            <div className="container-fluid homepage homepage-background">
                <nav className="navbar navbar-homepage">
                    <div className="container-fluid">
                        <a className="navbar-brand">
                            <h1><i class="bi bi-bank2"></i> FOAP</h1>
                        </a>
                        <form className="d-flex" role="search">
                            <Link to={"register"}>
                            <button className="btn btn-dark me-2" type="submit">Register</button></Link>
                            <Link to={"login"}> <button className="btn btn-dark me-4" type="submit">login</button></Link>
                        </form>
                    </div>
                </nav>
                <div className='row'>
                    
                    <div className='col-md-6'>

                        <h1>Welcome to our FOAP Inventory Management System</h1>
                        <p>This is a website where you can manage your inventory. You can add, edit, delete and view your inventory.</p>


                        <p>You can also add, edit, delete and view your inventory.</p>
                       
                        <Link to={"register"}> <button className="btn btn-primary  me-2" type="submit">Get Started</button></Link>

                    </div>


                </div>

            </div>
        </>
    )
}

export default HomePage













