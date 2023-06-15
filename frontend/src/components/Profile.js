// eslint-disable-next-line
import React, { component, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';


function Profile() {
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();

        logout();
        {
            window.location.href = '/';
        }
    }

    useEffect(()=>{
        console.log(isLoggedIn);
        if(isLoggedIn)
            {
                window.location.href='/'
            }
    },[isLoggedIn])
    return (
        <>
            <div className="form-wrap border rounded p-4">
                <form className="container">
                    <div className='mb-3'>
                        <h3>Hi, you are now logged in</h3>
                    </div>
                    <div className='mb-3'>
                        <button type="submit" className="btn btn-primary form-control" onClick={handleClick}>Log out </button>
                    </div>
                </form>
            </div>
        </> 
    );
}
export default Profile;