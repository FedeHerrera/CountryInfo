'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import Link from 'next/link';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

export default function CountryInfoPage({ params }) {
  const { code } = params;
  const [countryInfo, setCountryInfo] = useState(null);
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    if (!code) return;

    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country/${code}`
        );
        setCountryInfo(response.data);
        setPopulationData(response.data.populationData || []); // Keep population data as an empty array if not found
      } catch (error) {
        console.error('Error fetching country info:', error);
      }
    };

    fetchCountryInfo();
  }, [code]);

  if (!countryInfo) {
    return <p className="text-center mt-4 text-lg">Loading...</p>;
  }

  const chartData = {
    labels: populationData.map((data) => data.year),
    datasets: [
      {
        label: 'Population Over Time',
        data: populationData.map((data) => data.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  console.log(countryInfo);
  return (
    <div className="container mx-auto p-4">
      <div className="relative bg-white shadow-lg rounded-lg p-6">
        <Link href="/">
          <button className="absolute top-4 right-4 px-3 py-2 bg-black text-white rounded hover:bg-gray-800">
            Home
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-black text-center mb-6">
          {countryInfo.name}
        </h1>

        <div className="flex flex-col items-center md:flex-row md:items-center">
          {countryInfo.flag ? (
            <img
              src={countryInfo.flag}
              alt={`${countryInfo.commonName} flag`}
              className="w-32 h-20 mb-4 md:mb-0 md:mr-6 rounded"
            />
          ) : (
            <p className="text-gray-500">No flag available</p>
          )}
          <div className="text-center md:text-left">
            <p className="text-black font-bold text-2xl">
              {countryInfo.officialName}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3 text-black">
            Border Countries
          </h2>
          {countryInfo.borders.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {countryInfo.borders.map((borderCountry) => (
                <li key={borderCountry.countryCode}>
                  <a
                    href={`/country/${borderCountry.countryCode}`}
                    className="block p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    {borderCountry.commonName}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No bordering countries available.</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3 text-black">
            Population Over Time
          </h2>
          <div className="bg-white p-4 shadow rounded">
            {/* Check if population data is available for chart rendering */}
            {populationData.length > 0 ? (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        font: {
                          size: 14,
                        },
                      },
                    },
                    title: {
                      display: true,
                      text: 'Population Growth Over Time',
                      font: {
                        size: 16,
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Year',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Population',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : (
              <p className="text-gray-500">No population data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
