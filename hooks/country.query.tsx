import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFetchCountry = () => {
    return useQuery({
        queryKey: ["useFetchCountry"],
        queryFn: async () => {
            const response = await axios.get(
                "https://restcountries.com/v3.1/all"
            )

            if (!response || !response.data) {
                throw new Error("Failed to fetch country")
            }

            return response.data
        },
    })
}

export const useFetchCountryByName = (countryName: any) => {
    return useQuery({
        queryKey: ["useFetchCountryByName"],
        queryFn: async () => {
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
            )

            if (!response || !response.data) {
                throw new Error("Failed to fetch country")
            }

            return response.data
        },
    })
}