import React, { useEffect, useState } from 'react';

function Cinema() {
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/cinemas')
            .then(response => response.json())
            .then(data => {
                console.log('Cinema data:', data);
                setCinemas(data);
            })
            .catch(error => {
                console.error('Error fetching cinema data:', error);
            });
    }, []);

    return (
        <div className='mb-28 px-4'>
            <h1 className="text-2xl font-bold text-center mt-4">Rạp Phim</h1>
            <div className="flex flex-col mt-4 gap-4">
                {cinemas.map((cinema, index) => (
                    <div
                        key={cinema._id || index}
                        className="w-full p-4 flex border rounded-lg shadow-sm bg-white hover:shadow-md transition"
                    >
                        <img
                            src={cinema.image}
                            alt={`Cinema ${index + 1}`}
                            className="w-1/4 max-h-40 object-cover rounded-lg shadow"
                        />
                        <div className="ml-4 flex flex-col justify-center">
                            <h2 className="text-xl font-semibold">{cinema.nameCine}</h2>
                            <p className="text-gray-600">{cinema.addressCine}</p>
                            <p className="text-gray-600">{cinema.hotline}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cinema;
