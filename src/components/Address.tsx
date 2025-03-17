import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

// API Call Function
const addAddress = async (userId: string, addressData: { street: string; city: string; state: string; country: string; zipCode: string }) => {
  try {
    const response = await fetch("/api/address/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      body: JSON.stringify(addressData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add address");
    }

    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error adding address:", error.message);
    throw error;
  }
};

// Zod Schema for Validation
const AddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string()
    .regex(/^\d{5,6}$/, "Zip Code must be 5 or 6 digits")
    .min(5, "Zip Code must be at least 5 digits")
    .max(6, "Zip Code cannot exceed 6 digits"),
});

export default function AddressForm({ userId }: { userId: string }) {
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Address</h2>

      <Formik
        initialValues={{
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        }}
        validationSchema={toFormikValidationSchema(AddressSchema)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addAddress(userId, values);
            setSuccessMessage("Address added successfully!");
            resetForm();
          } catch (error) {
            alert("Failed to add address.");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block">Street</label>
              <Field name="street" className="w-full p-2 border rounded" />
              <ErrorMessage name="street" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block">City</label>
              <Field name="city" className="w-full p-2 border rounded" />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block">State</label>
              <Field name="state" className="w-full p-2 border rounded" />
              <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block">Country</label>
              <Field name="country" className="w-full p-2 border rounded" />
              <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block">Zip Code</label>
              <Field name="zipCode" className="w-full p-2 border rounded" />
              <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Address"}
            </button>

            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}