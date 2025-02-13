import React from 'react';

function FareTable() {
  const fares = [
    { carType: 'Budget', price: 300 },
    { carType: 'City',  price: 450 },
    { carType: 'Semi',price: 600 },
    { carType: 'Car',price: 900 },
    { carType: '9 Seater',price: 1230 },
    { carType: '14 Seater',price: 3000 },
    
  ];

  return (
    <div className='min-h-[45vw] p-4 flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Fare Table</h1> <br /> <br />
      <table className='table-auto border-collapse  border-gray-500 w-[60vw] text-left rounded-lg overflow-hidden'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2'>Car Type</th>
            <th className='border border-gray-300 px-4 py-2'>Fare (1Km)</th>
          </tr>
        </thead>
        <tbody>
          {fares.map((fare, index) => (
            <tr key={index} className='hover:bg-gray-50'>
              <td className='border border-gray-300 text-balance px-4 py-2'>{fare.carType}</td>
              <td className='border border-gray-300 px-4 py-2'>{fare.price} LKR</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FareTable;
