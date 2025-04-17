"use client"
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';  
import Cookies from 'js-cookie';
import axios from 'axios';

export default function LoginForm(){

  const[alert,setAlert] = useState({type:"",message:""});
  const[users, setUsers] = useState([]);
  const router = useRouter();
  
  const formik = useFormik({
    initialValues:{
      Email:'',
      Password:''
  },
  onSubmit:values =>{
    const match = users.find(user => user.email.toLowerCase() === values.Email.toLowerCase() && user.password === values.Password
    );
    
    if(match){
      setAlert({type:"success",message:"Login successfully redirecting...."});
      setTimeout(() => {
        router.push('/dashboard');
        Cookies.set('isLoggedIn', 'true', { expires: 7 });
      }, 1500);
    }else{
      setAlert({type:"danger",message:"Invalid email or password"});
    }
  }
})


  useEffect(()=>{
    axios.get("https://fakestoreapi.com/users")
    .then(res=>{
      setUsers(res.data);
    })
  },[]);


  return (
    <div className='row'>
      <div className='col'>
        <Image src='/signin-g.svg' alt='sign in' width={500} />
      </div>
      <form className='col-6 p-3 m-3' onSubmit={formik.handleSubmit} >
        {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
          )}
        <h2>Sign in to Shoping </h2>
        <p>Welcome back to Shopping  Enter your email to get started</p>
        <ul className='list-unstyled'>
          <li><input name='Email' type='email'  value={formik.values.Email} onChange={formik.handleChange} className='form-control m-1 p-1' placeholder='Email' required/></li>

          <li><input  name="Password" type='password' value={formik.values.Password} onChange={formik.handleChange} className='form-control m-1 p-1' placeholder='*****' required/> </li>
          <li className='d-flex flex-wrap'><input type='checkbox' className='form-check'/>Remember me <span className='ms-3'>Forget Password? <a href='#'>Reset it</a> </span></li>
        </ul>
        <button type='submit' className='btn btn-primary w-100'>Sign in</button>
      </form>

    </div>
  );
}
