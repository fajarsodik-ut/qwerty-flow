import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { useLessonStore } from '@/store/lessonStore';

interface CertificateProps {
  name: string;
  level: 'easy' | 'medium' | 'hard';
  onClose: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ name, level, onClose }) => {
  const wpm = useLessonStore((s) => s.wpm);
  const accuracy = useLessonStore((s) => s.accuracy);
  const date = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 p-4 print:bg-white">
      <div id="certificate" className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full border-4 border-gray-800 relative print:shadow-none print:border-none">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-serif">Sertifikat Kelulusan</h1>
          <p className="text-lg text-gray-600 mt-2">Dengan ini menyatakan bahwa</p>
        </div>

        <div className="text-center my-12">
          <h2 className="text-5xl font-extrabold text-blue-700 font-cursive">{name}</h2>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600">
            telah berhasil menyelesaikan kursus mengetik level{' '}
            <span className="font-bold text-gray-800">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
          </p>
          <p className="text-md text-gray-500 mt-2">
            dengan performa yang mengesankan.
          </p>
        </div>

        <div className="flex justify-around my-8 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-800">{wpm}</p>
            <p className="text-sm text-gray-500">Kata per Menit</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{accuracy}%</p>
            <p className="text-sm text-gray-500">Akurasi</p>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end">
          <div className="text-left">
            <p className="text-sm text-gray-500">Tanggal</p>
            <p className="font-semibold text-gray-700">{date}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-700 font-serif">QwertyFlow</p>
            <p className="text-sm text-gray-500">Platform Belajar Mengetik</p>
          </div>
        </div>

        <div className="absolute top-4 right-4 print:hidden">
            <Button onClick={onClose} variant="ghost" size="sm">
                X
            </Button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2 print:hidden">
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Cetak Sertifikat
        </Button>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate, #certificate * {
            visibility: visible;
          }
          #certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 2rem;
            border: none;
            box-shadow: none;
          }
        }
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
};