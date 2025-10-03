import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Award } from 'lucide-react';

interface CertificationProps {
  level: 'easy' | 'medium' | 'hard';
  onGenerate: (name: string) => void;
}

export const Certification: React.FC<CertificationProps> = ({ level, onGenerate }) => {
  const [name, setName] = useState('');

  const handleGenerateClick = () => {
    if (name.trim()) {
      onGenerate(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-500" />
            Selamat! Anda Telah Menyelesaikan Level {level.charAt(0).toUpperCase() + level.slice(1)}
          </CardTitle>
          <CardDescription>
            Anda telah menunjukkan dedikasi dan keterampilan yang luar biasa. Masukkan nama Anda di bawah ini untuk membuat sertifikat kelulusan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name">Nama Lengkap</label>
              <Input
                id="name"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateClick} className="w-full" disabled={!name.trim()}>
            Buat Sertifikat
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};