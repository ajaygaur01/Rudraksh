"use client";

import { useState } from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Link from 'next/link';
import Image from 'next/image';
import { popping } from '@/utils/fonts';
import axios from 'axios';

// Define the validation schema using Zod
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// TypeScript type for form values
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  
  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/auth/forgot-password', values);
        setMessage(res.data.message || "Password reset link has been sent to your email.");
        console.log('Reset email sent');
      } catch (error) {
        console.error('Reset request failed:', error);
        if (axios.isAxiosError(error) && error.response) {
          setMessage(error.response.data.error);
        } else {
          setMessage('An error occurred. Please try again later.');
        }
      }
    },
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
            Forgot Your Password?
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Enter your email address below and we will send you a link to reset your password
          </p>
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

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-3 rounded-md ${message.includes("error") ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#8B5E3C] text-white rounded-md shadow-sm hover:bg-[#6B4C3C] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:ring-offset-2 font-poppins font-medium"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600 font-poppins">Remember your password?</span>
          <Link
            href="/login"
            className="ml-1 text-sm text-[#8B5E3C] hover:text-[#6B4C3C] font-poppins"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}