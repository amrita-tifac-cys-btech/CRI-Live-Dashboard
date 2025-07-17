
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        <header className="mb-10">
          <div className="flex flex-col items-center space-y-2">
            <Image src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt="Institute Logo" width={700} />
            <h1 className="text-3xl font-bold text-gray-800">Cyber Readiness Index (CRI) Dashboard</h1>
          </div>
        </header>

        <main>
          <div className="mb-8">
            <label className="block mb-2 text-lg font-medium text-gray-700">Upload CSV File</label>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="mx-auto p-2 border rounded shadow" />
          </div>

          {data.length > 0 && (
            <>
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

        <footer className="mt-10 text-sm text-gray-500">
          <p>&copy; 2025 TIFAC-CORE in Cyber Security | Amrita Vishwa Vidyapeetham</p>
          <p>Designed and maintained by Ramaguru Radhakrishnan</p>
        </footer>
      </div>
    </div>
  );
}
