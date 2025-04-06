'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Params = Promise<{ id: string }>

export default async function Country({ params }: { params: Params }) {
    const searchParams = useSearchParams();
    const { id } = await params;

    const countryName = searchParams.get("countryName");

    const [loaderData, setLoaderData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (countryName) {
            fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.length > 0) {
                        setLoaderData(data);
                    } else {
                        setError("Country not found");
                    }
                })
                .catch(() => setError("Failed to fetch country data"));
        }
    }, [countryName]);

    if (error) {
        return <div className="p-6">{error}</div>;
    }

    if (!loaderData) {
        return <div className="p-6">Loading...</div>;
    }

    const country = {
        name: loaderData[0]?.name?.common || "N/A",
        officialName: loaderData[0]?.name?.official || "N/A",
        region: loaderData[0]?.region || "N/A",
        subregion: loaderData[0]?.subregion || "N/A",
        capital: loaderData[0]?.capital || "N/A",
        population: loaderData[0]?.population || "N/A",
        flagUrl: loaderData[0]?.flags?.png || "",
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-gray-900">{country.name}</h2>
                <div className="space-y-2 text-gray-700">
                    <p>
                        <span className="font-semibold">Official Name:</span>{" "}
                        {country.officialName}
                    </p>
                    <p>
                        <span className="font-semibold">Capital:</span> {country.capital}
                    </p>
                    <p>
                        <span className="font-semibold">Region:</span> {country.region}
                    </p>
                    <p>
                        <span className="font-semibold">Subregion:</span>{" "}
                        {country.subregion}
                    </p>
                    <p>
                        <span className="font-semibold">Population:</span>{" "}
                        {country.population.toLocaleString()}
                    </p>
                </div>
            </div>
            {country.flagUrl && (
                <div className="flex justify-center items-center">
                    <img
                        src={country.flagUrl}
                        className="w-56 h-auto border rounded shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}
