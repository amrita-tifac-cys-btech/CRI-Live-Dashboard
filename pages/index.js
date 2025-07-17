import { useState } from 'react';
import Papa from 'papaparse';
import { computeScores } from '../utils/scoring';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const scored = results.data.map((row) => computeScores(row));
        setData(scored);
      },
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Cyber Readiness Index (CRI) Dashboard</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-6 block"
      />

      {data.length > 0 && (
        <>
          <table className="table-auto border-collapse w-full text-sm mb-8">
            <thead>
              <tr className="bg-gray-200">
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
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{student.Name}</td>
                  <td className="border px-4 py-2">{student.CGPA}</td>
                  <td className="border px-4 py-2">{student.CTF}</td>
                  <td className="border px-4 py-2">{student.Hackathon}</td>
                  <td className="border px-4 py-2">{student.Rating}</td>
                  <td className="border px-4 py-2 font-semibold">{student.CRI}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
    </div>
  );
}
