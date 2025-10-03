import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Level = 'easy' | 'medium' | 'hard';

export function CertificatePage() {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Level>('easy');
  const [wpm, setWpm] = useState('50');
  const [accuracy, setAccuracy] = useState('95');
  const [showCertificate, setShowCertificate] = useState(false);

  const date = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const levelNames = {
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit'
  };

  const handleGenerateCertificate = () => {
    if (name.trim()) {
      setShowCertificate(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setShowCertificate(false);
    setName('');
    setWpm('50');
    setAccuracy('95');
    setLevel('easy');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle className="absolute top-4 right-4 z-50" />
      <Link to="/" className="absolute top-4 left-4 z-50">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </Link>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showCertificate ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center p-4 mb-6 bg-yellow-100 dark:bg-yellow-950 rounded-2xl shadow-lg"
              >
                <Award className="h-16 w-16 text-yellow-600 dark:text-yellow-400" />
              </motion.div>
              
              <h1 className="text-4xl font-bold mb-4">Buat Sertifikat</h1>
              <p className="text-lg text-muted-foreground">
                Buat sertifikat kelulusan untuk pencapaian mengetik Anda
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informasi Sertifikat</CardTitle>
                <CardDescription>
                  Masukkan detail untuk sertifikat Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={level} onValueChange={(value) => setLevel(value as Level)}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Pilih level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Mudah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="hard">Sulit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wpm">Kata per Menit (WPM)</Label>
                    <Input
                      id="wpm"
                      type="number"
                      min="1"
                      max="200"
                      placeholder="50"
                      value={wpm}
                      onChange={(e) => setWpm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accuracy">Akurasi (%)</Label>
                    <Input
                      id="accuracy"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="95"
                      value={accuracy}
                      onChange={(e) => setAccuracy(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateCertificate} 
                  className="w-full"
                  disabled={!name.trim() || !wpm || !accuracy}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Buat Sertifikat
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="max-w-4xl mx-auto">
              {/* Certificate Display */}
              <div id="certificate" className="bg-white rounded-lg shadow-2xl p-8 md:p-12 border-4 border-gray-800 relative print:shadow-none print:border-none">
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif">Sertifikat Kelulusan</h1>
                  <p className="text-lg md:text-xl text-gray-600 mt-2">Dengan ini menyatakan bahwa</p>
                </div>

                <div className="text-center my-12">
                  <h2 className="text-5xl md:text-6xl font-extrabold text-blue-700 font-cursive">{name}</h2>
                </div>

                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl text-gray-600">
                    telah berhasil menyelesaikan kursus mengetik level{' '}
                    <span className="font-bold text-gray-800">{levelNames[level]}</span>
                  </p>
                  <p className="text-md text-gray-500 mt-2">
                    dengan performa yang mengesankan.
                  </p>
                </div>

                <div className="flex justify-around my-8 text-center">
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-gray-800">{wpm}</p>
                    <p className="text-sm md:text-base text-gray-500">Kata per Menit</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-gray-800">{accuracy}%</p>
                    <p className="text-sm md:text-base text-gray-500">Akurasi</p>
                  </div>
                </div>

                <div className="mt-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-gray-500">Tanggal</p>
                    <p className="font-semibold text-gray-700">{date}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="font-semibold text-gray-700 font-serif text-xl">QwertyFlow</p>
                    <p className="text-sm text-gray-500">Platform Belajar Mengetik</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
                <Button onClick={handlePrint} size="lg">
                  <Printer className="mr-2 h-4 w-4" />
                  Cetak Sertifikat
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  Buat Sertifikat Baru
                </Button>
              </div>
            </div>

            <style>{`
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
          </motion.div>
        )}
      </div>
    </div>
  );
}
