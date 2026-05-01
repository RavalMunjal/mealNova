import React from 'react';
import Card, { CardBody } from './Card';
import Button from './Button';

const MealCard = ({ meal }) => {
  // Destructure with default values for safety
  const { 
    id, 
    title = 'Delicious Meal', 
    image, 
    category = 'General', 
    rating = 4.5, 
    price = '12.99', 
    time = '30 Min',
    description = 'A healthy and tasty meal packed with flavor and nutrition.' 
  } = meal || {};

  return (
    <Card className="group">
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-orange-300 font-medium group-hover:scale-105 transition-transform duration-500">
            {title}
          </div>
        )}
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
            {time}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>
      
      <CardBody>
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-1" title={title}>
            {title}
          </h3>
          <div className="flex items-center bg-green-50 px-2 py-1 rounded text-green-700 text-xs font-bold whitespace-nowrap">
            ★ {rating}
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Price</span>
            <span className="font-bold text-orange-600 text-lg">${price}</span>
          </div>
          
          <Button variant="primary" size="sm" className="shadow-sm">
            Add
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default React.memo(MealCard);
