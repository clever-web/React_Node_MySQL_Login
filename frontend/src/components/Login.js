// eslint-disable-next-line
import React, { component, useState, useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';

function Login( ) {
    const [ employeeID, setEmployeeID ] =  useState("");

    const [logginIn, setLoggedIn] = useState(false);

    const { isLoggedIn, login } = useContext(AuthContext);
    
    const [result, setResult] = useState("");

    useEffect(()=>{
        if(isLoggedIn){
            window.location.href = '/profile';
        }
    },[logginIn])

    useEffect(()=>{
        if(logginIn){
            login();
            window.location.href='/profile';
        }
            
    },[logginIn])

    const validateForm = () => {
        return true;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log();
            try {
                const response = await fetch ('http://127.0.0.1:8000/api/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({employeeID}),
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setResult(data.result);
                    login();
                    setLoggedIn(data.loggedIn);
                });
            } catch (error) {
                
            }
        } else {

        }
        
    }

    return (
        <>
            <div className="form-wrap border rounded p-4">
                {
                    result && (
                        <div className='alert alert-warning'>{result}</div>
                    )
                }
                <form className="container" onSubmit={onSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="employeeID" className="form-label">Enter your ID</label>
                        <input type="text"  className="form-control" name="employeeId" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} required/>
                    </div>
                    <div className='mb-3'>
                        <input type="submit" className="btn btn-primary form-control" value="Login" />
                    </div>
                </form>
            </div>
        </> 
    );
}
export default Login;