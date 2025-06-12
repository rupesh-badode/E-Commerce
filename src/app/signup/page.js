"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Head from 'next/head';
import { auth } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

export default function Signup() {
  const router = useRouter();
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const { fullName, email, password } = values;

      // 🔐 Firebase Signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 👤 Update display name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      alert('Signup successful!');;
      setTimeout(()=>{
        router.push('/shop');
      })
      resetForm();
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className="container mt-5 p-5">
        <h2 className="text-center mb-4">Sign Up</h2>
        <Formik
          initialValues={{ fullName: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mx-auto" style={{ maxWidth: '400px' }}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Name</label>
                <Field name="fullName" className="form-control" />
                <div className="text-danger small">
                  <ErrorMessage name="fullName" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <div className="text-danger small">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <div className="text-danger small">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
              <Link  href="/signin" >Already  have an account ?</Link>
            </Form>
          )}
        </Formik>
        
      </div>
    </>
  );
}
