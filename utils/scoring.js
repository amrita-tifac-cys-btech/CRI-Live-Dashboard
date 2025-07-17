function getCGPAScore(cgpa) {
  const c = parseFloat(cgpa);
  if (c >= 9.0) return 10;
  if (c >= 8.5) return 9;
  if (c >= 8.0) return 8;
  if (c >= 7.5) return 7;
  if (c >= 7.0) return 6;
  if (c >= 6.5) return 5;
  if (c >= 6.0) return 4;
  return 0;
}

function getCompetitiveScore(rating) {
  const r = parseInt(rating);
  if (r >= 2400) return 10;
  if (r >= 2000) return 9;
  if (r >= 1800) return 8;
  if (r >= 1600) return 7;
  if (r >= 1400) return 6;
  if (r >= 1200) return 5;
  if (r >= 1000) return 4;
  if (r >= 800) return 3;
  return 1;
}

export function computeScores(row) {
  const cgpa = parseFloat(row.CGPA || 0);
  const ctf = parseFloat(row.CTF || 0);
  const hack = parseFloat(row.Hackathon || 0);
  const rating = parseInt(row.Rating || 0);

  const cgpaScore = getCGPAScore(cgpa);
  const competitiveScore = getCompetitiveScore(rating);

  const cri = 0.25 * cgpaScore + 0.25 * ctf + 0.25 * hack + 0.25 * competitiveScore;

  return {
    Name: row.Name || 'Unknown',
    CGPA: cgpaScore,
    CTF: ctf,
    Hackathon: hack,
    Rating: competitiveScore,
    CRI: cri.toFixed(2),
  };
}
