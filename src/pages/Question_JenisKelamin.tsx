import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const JenisKelaminPage: React.FC = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div
        className="relative h-[40vh] bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(../gender.jpg)' }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-transparent opacity-70 z-0"></div>
      </div>

      {/* Box bawah */}
      <div className="flex-1 bg-yellow-300 rounded-t-3xl -mt-12 p-6 flex flex-col items-center justify-between z-10 relative">
        <div className="w-full max-w-sm text-center space-y-6 mt-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">♀️♂️</span>
          </div>

          {/* Pertanyaan */}
          <h2 className="text-black text-lg font-semibold">Apa Jenis Kelamin Anda?</h2>

          {/* Pilihan jenis kelamin */}
          <div className="flex justify-center gap-6">
            <div
              className={`p-4 cursor-pointer rounded-xl transition-all duration-300 ${
                gender === 'Laki-laki'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black'
              }`}
              onClick={() => setGender('Laki-laki')}
            >
              <span>Laki-laki</span>
            </div>
            <div
              className={`p-4 cursor-pointer rounded-xl transition-all duration-300 ${
                gender === 'Perempuan'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-black'
              }`}
              onClick={() => setGender('Perempuan')}
            >
              <span>Perempuan</span>
            </div>
          </div>
        </div>

        {/* Tombol Kembali */}
        <div className="fixed bottom-8 left-12">
        <Button
  className="bg-yellow-100 bg-opacity-60 hover:bg-opacity-100 hover:bg-grey-100 text-gray-400 font-medium py-3 px-6 hover:text-black rounded-xl"
  onClick={() => navigate('/usia')}
>
  Kembali
</Button>

          </div>
        {/* Tombol Lanjut */}
        <div className="fixed bottom-8 right-12">
          <Button
            className={`${
              gender ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'
            } text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300`}
            onClick={() => navigate('/tanggungan')}
            disabled={!gender}
          >
            Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JenisKelaminPage;
