import React from 'react';
import { MdConstruction } from 'react-icons/md';

// Generic placeholder page — module তৈরির আগে ব্যবহার করা হবে
function PlaceholderPage({ title, subtitle, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-5 shadow-inner">
        {Icon
          ? <Icon className="text-4xl text-green-700" />
          : <MdConstruction className="text-4xl text-green-700" />
        }
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-400 text-sm max-w-xs">
        {subtitle || 'এই মডিউলটি শীঘ্রই তৈরি করা হবে।'}
      </p>
      <div className="mt-6 px-4 py-2 bg-green-50 rounded-full text-green-700 text-xs font-medium border border-green-100">
        🛠️ পরবর্তী Step-এ তৈরি হবে
      </div>
    </div>
  );
}

export default PlaceholderPage;
