"use client";

import { useState } from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Link from 'next/link';
import Image from 'next/image';
import { popping } from '@/utils/fonts';
import { Eye, EyeOff } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

// Define the validation schema using Zod
const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(25, 'Password is too long'),
  confirmPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// TypeScript type for form values
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: async (values) => {
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({ token, newPassword: values.password }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        setMessage(data.message || data.error);
        
        if (res.ok) {
          // If successful, redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error) {
        console.error('Password reset failed:', error);
        setMessage('An error occurred. Please try again later.');
      }
    }
  });

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-[45%] w-full px-6 py-8 rounded-lg shadow-lg bg-white text-center">
          <h2 className={`text-4xl ${popping.className} text-center text-[#8B5E3C] font-bold mb-4`}>
            Invalid Reset Link
          </h2>
          <p className="text-gray-600 mb-6">
            The password reset link is invalid or has expired.
          </p>
          <Link
            href="/forgot-password"
            className="py-2 px-4 bg-[#8B5E3C] text-white rounded-md shadow-sm hover:bg-[#6B4C3C] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:ring-offset-2 font-poppins font-medium"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

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
            Reset Your Password
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Please enter your new password below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-poppins font-medium text-gray-700 mb-2"
            >
              New Password
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
                placeholder="Enter your new password"
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

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-poppins font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...formik.getFieldProps('confirmPassword')}
                className={`w-full px-4 py-2 border ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent`}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="mt-1 text-sm text-red-600">
                {formik.errors.confirmPassword}
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
            Reset Password
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