"use client";
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../utils/firebaseConfig';
import Link from 'next/link';

export default function LoginForm() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        setAlert({ type: "success", message: "Login successful. Redirecting..." });
        setTimeout(() => {
          router.push('/shop');
        }, 1500);
      }catch (error) {
        const code = error.response?.data?.error?.message;

        if (
          code === "EMAIL_NOT_FOUND" ||
          code === "INVALID_PASSWORD" ||
          code === "INVALID_LOGIN_CREDENTIALS"
        ) {
          setAlert({ type: "danger", message: "Invalid email or password" });
        } else {
          setAlert({ type: "danger", message: `Login failed: ${code || "Unknown error"}` });
        }

        console.error("Login error →", code);
      }

    }
  });

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Image src='/signin-g.svg' alt='sign in' width={500} height={300} priority />
        </div>

        <form className='col-6 p-3 m-3' onSubmit={formik.handleSubmit}>
          {alert.message && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              {alert.message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          <h2>Sign in to Shopping</h2>
          <p>Welcome back! Enter your email to get started</p>

          <ul className='list-unstyled'>
            <li>
              <input
                name='email'
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='form-control m-1 p-1'
                placeholder='Email'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='text-danger'>{formik.errors.email}</div>
              )}
            </li>
            <li>
              <input
                name='password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='form-control m-1 p-1'
                placeholder='Password'
              />
              {formik.touched.password && formik.errors.password && (
                <div className='text-danger'>{formik.errors.password}</div>
              )}
            </li>
          </ul>

          <button type='submit' className='btn btn-primary w-100'>Sign in</button>
        </form>

        <Link href="/signup" className='text-center text-decoration-none'>
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
