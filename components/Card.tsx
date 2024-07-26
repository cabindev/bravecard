import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/types/card';

interface CardGridProps {
  cards: Card[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Link key={card.id} href={`/result/${card.id}`}>
          <div className="border rounded p-4 hover:shadow-lg transition-shadow">
            <Image 
              src={`/braveCards/${card.imageName}`}
              alt={card.title}
              width={200}
              height={300}
              className="mx-auto"
            />
            <h3 className="mt-2 text-lg font-semibold text-center">{card.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardGrid;