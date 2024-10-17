'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`
        );
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">List of Countries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country) => (
          <Link
            href={`/country/${country.countryCode}`}
            key={country.countryCode}
          >
            <div className="flex items-center p-4 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition">
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-10 h-6 mr-4"
              />
              <span className="text-lg font-medium text-black">
                {country.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
