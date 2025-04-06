"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ShippingFormProps {
  onSubmit: (address: ShippingAddress) =>  Promise<void>
  isLoading: boolean
}

interface CountryItem {
  name: string
  iso2: string
  long: number
  lat: number
}

interface CountriesResponse {
  error: boolean
  msg: string
  data: CountryItem[]
}

interface StateItem {
  name: string
}

interface StatesResponse {
  error: boolean
  msg: string
  data: {
    name: string
    states: StateItem[]
  }
}

export function ShippingForm({ onSubmit, isLoading }: ShippingFormProps) {
  const [countries, setCountries] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])
  const [address, setAddress] = useState<ShippingAddress>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions")
      const data: CountriesResponse = await res.json()
      if (!data.error && data.data.length) {
        const countryNames = data.data.map((country) => country.name)
        setCountries(countryNames.sort())
      }
    } catch (error) {
      console.error("Failed to load countries", error)
    }
  }

  const fetchStates = async (country: string) => {
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      })
      const data: StatesResponse = await res.json()
      if (!data.error && data.data.states) {
        const stateNames = data.data.states.map((state) => state.name)
        setStates(stateNames.sort())
      } else {
        setStates([])
      }
    } catch (error) {
      console.error("Failed to load states", error)
      setStates([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleCountryChange = (value: string) => {
    setAddress((prev) => ({ ...prev, country: value, state: "" }))
    fetchStates(value)
  }

  const handleStateChange = (value: string) => {
    setAddress((prev) => ({ ...prev, state: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(address)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Shipping Details</h2>
      <p className="text-sm text-muted-foreground">Please enter your details to proceed</p>

      <div className="space-y-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={address.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={address.email} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleChange}
            placeholder="e.g. +1 234 567 890"
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={address.address} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={address.city} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Select value={address.state} onValueChange={handleStateChange}>
              <SelectTrigger>
                <SelectValue placeholder={states.length ? "Select state" : "Select country first"} />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Select value={address.country} onValueChange={handleCountryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Proceed to Payment"}
      </Button>
    </form>
  )
}
