import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TanggunganPage: React.FC = () => {
  const navigate = useNavigate();
  const [tanggungan, setTanggungan] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-white">
  <div className="relative h-[40vh] bg-cover bg-center z-0" style={{ backgroundImage: 'url(../family.jpg)' }}>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-transparent opacity-70 z-0"></div>
</div>



      {/* Box bawah */}
      <div className="flex-1 bg-blue-700 rounded-t-3xl -mt-12 p-6 flex flex-col items-center justify-between z-10 relative">

        <div className="w-full max-w-sm text-center space-y-6 mt-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">👨‍👩‍👧‍👦</span>
          </div>

          {/* Pertanyaan */}
          <h2 className="text-white text-lg font-semibold">Berapa jumlah Anggota Keluarga yang Anda Tanggung?</h2>

          {/* Input angka */}
          <input
            type="number"
            min="0"
            value={tanggungan}
            onChange={(e) => setTanggungan(e.target.value)}
            placeholder="Masukkan Jumlah"
            className="no-spinner w-full rounded-lg bg-gray-200 text-center py-3 px-4 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Tombol Kembali */}
                <div className="fixed bottom-8 left-12">
                <Button
          className="bg-yellow-100 bg-opacity-60 hover:bg-opacity-100 hover:bg-grey-100 text-gray-200 font-medium py-3 px-6 hover:text-black rounded-xl"
          onClick={() => navigate('/jk')}
        >
          Kembali
        </Button>
        
                  </div>

        <div className="fixed bottom-8 right-12">
  <Button
    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl shadow-lg"
    onClick={() => navigate('/pekerjaan')}
    disabled={!tanggungan} 
  >
    Lanjut
  </Button>
</div>


      </div>
    </div>
  );
};

export default TanggunganPage;
