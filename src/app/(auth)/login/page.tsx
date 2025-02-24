"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Link from 'next/link';
import Google from '@/components/Google';
import { popping } from '@/utils/fonts';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 


// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(25, 'Password is too long'),
});



// TypeScript type for form values
type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter()



  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values) => {
      try {
        console.log('Form submitted:', values);
        // Add your login logic here
        try {
          await axios.post("http://localhost:3000/api/auth/login" , values)
          console.log(values)
          alert("Registered Successfully")
          router.push("/")


        } catch (error) {
          console.log(error)
          alert("error while login")
        }

      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  });

  return (
<div className="min-h-screen flex items-center justify-center">
  <div className="max-w-[45%] w-full px-6 py-8 rounded-lg shadow-lg bg-white">
    {/* Logo - Centered and Larger */}
    <div className="flex justify-center mb-4">
      <Image
        src="/images/logos/Logo.svg"
        alt="Logo"
        width={350}
        height={350}
        className="w-48 h-auto" // Adjusted size for better visibility
      />
    </div>

    {/* Welcome Text */}
    <div className="flex flex-col items-center mb-8">
      <h2 className={`text-4xl ${popping.className} text-center text-[#8B5E3C] font-bold`}>
        Welcome to Rudraksh
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Sign in to access your spiritual journey, orders, and favorites
      </p>
    </div>

    {/* Google Sign-In Button */}
    <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center mb-4">
      <Google />
      <span className="ml-2">Continue with Google</span>
    </button>

    {/* Divider */}
    <div className="relative mb-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">
          or Sign in with email
        </span>
      </div>
    </div>

    {/* Form */}
    <form onSubmit={formik.handleSubmit}>
      {/* Email Input */}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-lg font-poppins font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className={`w-full px-4 py-2 border ${
            formik.touched.email && formik.errors.email
              ? 'border-red-500'
              : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent`}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="mt-1 text-sm text-red-600">
            {formik.errors.email}
          </div>
        )}
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-lg font-poppins font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...formik.getFieldProps('password')}
            className={`w-full px-4 py-2 border ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="mt-1 text-sm text-red-600">
            {formik.errors.password}
          </div>
        )}
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-end mb-6">
        <Link
          href="/forgot-password"
          className="text-sm text-[#8B5E3C] hover:text-[#6B4C3C] font-poppins"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-[#8B5E3C] text-white rounded-md shadow-sm hover:bg-[#6B4C3C] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:ring-offset-2 font-poppins font-medium"
      >
        Sign in to Rudraksh
      </button>
    </form>

    {/* Sign-Up Link */}
    <div className="mt-6 text-center">
      <span className="text-sm text-gray-600 font-poppins">New to Rudraksh?</span>
      <Link
        href="/register"
        className="ml-1 text-sm text-[#8B5E3C] hover:text-[#6B4C3C] font-poppins"
      >
        Create an account
      </Link>
    </div>
  </div>
</div>
  );
};

export default Login;