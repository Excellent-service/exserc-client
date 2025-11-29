'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'

const useCountries = () => {
  const [countries, setCountries] = useState<{ name: string; id: number }[]>([])
  const [countrySchema, setCountrySchema] = useState<z.ZodTypeAny>()

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/countries/add`,
          { method: 'GET' }
        )

        const data = await response.json()

        // Extract country ids
        const ids = data.map((country: { id: number }) => String(country.id))

        // Set states
        setCountries(data)

        // Dynamically build a zod schema to validate against the names
        const dynamicSchema = z.string().refine((val) => ids.includes(val), {
          message: 'Invalid country',
        })

        setCountrySchema(dynamicSchema)
      } catch (err) {
        console.error('Error fetching countries:', err)
      }
    }

    fetchCountries()
  }, [])

  return {
    countries,       // full country objects
    countrySchema,   // Zod schema you can use for validation
  }
}

export default useCountries
