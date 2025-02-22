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

// Define the validation schema using Zod
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(25, 'Password is too long'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// TypeScript type for form values
type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: toFormikValidationSchema(signupSchema),
    onSubmit: async (values) => {
      try {
        console.log('Form submitted:', values);
        // Add your signup logic here
      } catch (error) {
        console.error('Signup failed:', error);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center mt-[25px]">
      <div className="max-w-[45%] w-full px-6 py-8 rounded-lg shadow-lg bg-white ">
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
            Join Rudraksh
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Create an account to explore our divine collection and manage your orders
          </p>
        </div>

        {/* Google Sign-Up Button */}
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
              or Sign up with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-poppins font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
              className={`w-full px-4 py-2 border ${
                formik.touched.name && formik.errors.name
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent`}
              placeholder="Enter your full name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="mt-1 text-sm text-red-600">
                {formik.errors.name}
              </div>
            )}
          </div>

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
                placeholder="Confirm your password"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#8B5E3C] text-white rounded-md shadow-sm hover:bg-[#6B4C3C] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:ring-offset-2 font-poppins font-medium"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600 font-poppins">Already have an account?</span>
          <Link
            href="/login"
            className="ml-1 text-sm text-[#8B5E3C] hover:text-[#6B4C3C] font-poppins"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;