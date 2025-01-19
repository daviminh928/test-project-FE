'use client';

import { useEffect, useState } from 'react';
import { matchDogs, fetchDogsByIds } from '@/utils/api';

export default function MatchPage() {
//   const [matchId, setMatchId] = useState<string | null>(null);
  const [matchedDog, setMatchedDog] = useState<any>(null);

  useEffect(() => {
    const findMatch = async () => {
      const match = await matchDogs(["favorite-dog-id"]);
    //   setMatchId(match);
      const dogDetails = await fetchDogsByIds([match]);
      setMatchedDog(dogDetails[0]);
    };
    findMatch();
  }, []);

  if (!matchedDog) return <p>Finding your match...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Matched Dog</h1>
      <div className="border p-4 mt-4">
        <img src={matchedDog.img} alt={matchedDog.name} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-bold">{matchedDog.name}</h2>
        <p>Breed: {matchedDog.breed}</p>
        <p>Age: {matchedDog.age}</p>
      </div>
    </div>
  );
}
