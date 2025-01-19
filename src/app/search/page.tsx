'use client';

import { useEffect, useState } from 'react';
import { fetchBreeds, searchDogs, fetchDogsByIds } from '@/utils/api';
import DogCard from '@/components/DogCard';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogs, setDogs] = useState<Dog[]>([]); // Explicitly set type as Dog[]
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState<boolean>(false); // 🔹 State for loading

  useEffect(() => {
    const loadBreeds = async () => {
      setLoading(true); //Start loading
      const breedList = await fetchBreeds();
      setBreeds(breedList);
      setLoading(false); //Stop loading
    };
    loadBreeds();
  }, []);

  const handleSearch = async () => {
    setLoading(true); // 🔹 Start loading
    const result = await searchDogs({ breeds: [selectedBreed], sort: `breed:${sortOrder}` });
    const dogsData: Dog[] = await fetchDogsByIds(result.resultIds);
    setDogs(dogsData);
    setLoading(false); // 🔹 Stop loading
  };
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Search for Dogs</h1>
      <select
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
        className="mt-2 p-2 border rounded"
      >
        <option value="">Select Breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} className="ml-4 p-2 bg-green-500 text-white rounded">
        Search
      </button>
      {loading && (
        <div className="flex items-center justify-center w-full h-screen">
          {/* Using Tailwind Spinner */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

          {/* Using react-spinners (Optional) */}
          {/* <ClipLoader size={50} color="#3498db" /> */}
        </div>
      )}

      {/* 🔹 Dog Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
}
