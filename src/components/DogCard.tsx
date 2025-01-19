import React from 'react';
import Image from 'next/image';
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const DogCard: React.FC<{ dog: Dog }> = ({ dog }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <Image src={dog.img} alt={dog.name} width={300} height={200} className="w-full h-32 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{dog.name}</h2>
      <p>Age: {dog.age}</p>
      <p>Breed: {dog.breed}</p>
      <p>Location: {dog.zip_code}</p>
    </div>
  );
};

export default DogCard;
