// File: pages/index.js
import { useState } from 'react';
import Papa from 'papaparse';
import { computeScores } from '../utils/scoring';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

export default function Home() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const scored = results.data.map((row) => computeScores(row));
        setData(scored);
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Institute Logo" width={50} height={50} />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Cyber Readiness Index (CRI) Dashboard</h1>
        </div>
        <a
          href="https://www.example-institution.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Visit Institute Website
        </a>
      </header>

      <main className="flex-grow p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Upload CSV File</label>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="p-2 border rounded" />
          </div>

          {data.length > 0 && (
            <>
              <div className="overflow-auto max-h-[400px] shadow border rounded-lg">
                <table className="table-auto border-collapse w-full text-sm text-center">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">CGPA</th>
                      <th className="border px-4 py-2">CTF</th>
                      <th className="border px-4 py-2">Hackathon</th>
                      <th className="border px-4 py-2">Rating</th>
                      <th className="border px-4 py-2">CRI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{student.Name}</td>
                        <td className="border px-4 py-2">{student.CGPA}</td>
                        <td className="border px-4 py-2">{student.CTF}</td>
                        <td className="border px-4 py-2">{student.Hackathon}</td>
                        <td className="border px-4 py-2">{student.Rating}</td>
                        <td className="border px-4 py-2 font-bold">{student.CRI}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-10 h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="CRI" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p>&copy; 2025 TIFAC-CORE in Cyber Security | Amrita Vishwa Vidyapeetham</p>
        <p className="text-sm text-gray-300">Designed and maintained by Ramaguru Radhakrishnan</p>
      </footer>
    </div>
  );
}
