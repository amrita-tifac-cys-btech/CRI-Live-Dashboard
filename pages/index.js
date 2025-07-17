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

  const downloadCSV = () => {
    const headers = ["Name", "CGPA", "CTF", "Hackathon", "Rating", "CRI"];
    const rows = data.map(row => [row.Name, row.CGPA, row.CTF, row.Hackathon, row.Rating, row.CRI]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "CRI_Scores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between min-h-[90vh]">
        <header className="mb-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/images/AVV_CYS_Logo.png"
              alt="Institute Logo"
              width={300}
              height={100}
            />
            <h1 className="text-3xl font-bold text-gray-800">Cyber Readiness Index (CRI) Dashboard</h1>
          </div>
        </header>

        <main className="flex-grow">
          <div className="mb-8 text-center">
            <label className="block mb-2 text-lg font-medium text-gray-700">Upload CSV File</label>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="p-2 border rounded shadow" />
          </div>

          {data.length > 0 && (
            <>
              <div className="text-center mb-6">
                <button
                  onClick={downloadCSV}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
                >
                  Download CRI Report
                </button>
              </div>

              <div className="overflow-auto max-h-[400px] shadow border rounded-lg mb-10">
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

              <div className="h-96">
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
        </main>

        <footer className="mt-8 pt-4 border-t text-center text-gray-600 text-sm">
          <p>&copy; 2025 TIFAC-CORE in Cyber Security | Amrita Vishwa Vidyapeetham</p>
          <p>Designed and maintained by Ramaguru Radhakrishnan</p>
        </footer>
      </div>
    </div>
  );
}
