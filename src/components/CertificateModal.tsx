import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award, Printer, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Level } from '@/types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level;
  meanWpm: number;
  meanAccuracy: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  level,
  meanWpm,
  meanAccuracy,
}) => {
  const [name, setName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  const date = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const levelNames = {
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit',
  };

  const handleGenerateCertificate = () => {
    if (name.trim()) {
      setShowCertificate(true);
    }
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate the certificate HTML
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Sertifikat - ${name}</title>
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 landscape;
              margin: 0;
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: white;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 2cm;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .certificate {
              background: white;
              border: 4px solid #000000;
              border-radius: 12px;
              padding: 4rem 5rem;
              width: 100%;
              max-width: 1000px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .font-cursive {
              font-family: 'Dancing Script', cursive;
            }
            
            .text-center {
              text-align: center;
            }
            
            .title {
              font-size: 3.5rem;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 1rem;
              font-family: Georgia, serif;
            }
            
            .subtitle {
              font-size: 1.25rem;
              color: #6b7280;
              margin-bottom: 3rem;
            }
            
            .name {
              font-size: 4.5rem;
              font-weight: 800;
              color: #2563eb;
              margin: 2.5rem 0;
            }
            
            .description {
              font-size: 1.25rem;
              color: #6b7280;
              margin-bottom: 0.5rem;
            }
            
            .description strong {
              color: #1f2937;
            }
            
            .sub-description {
              font-size: 1rem;
              color: #9ca3af;
              margin-bottom: 3rem;
            }
            
            .stats {
              display: flex;
              justify-content: center;
              gap: 6rem;
              margin: 3rem 0;
            }
            
            .stat-item {
              text-align: center;
            }
            
            .stat-value {
              font-size: 3.5rem;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 0.5rem;
            }
            
            .stat-label {
              font-size: 1rem;
              color: #6b7280;
            }
            
            .footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 4rem;
            }
            
            .footer-left,
            .footer-right {
              text-align: left;
            }
            
            .footer-right {
              text-align: right;
            }
            
            .footer-label {
              font-size: 0.875rem;
              color: #6b7280;
              margin-bottom: 0.25rem;
            }
            
            .footer-value {
              font-size: 1rem;
              font-weight: 600;
              color: #1f2937;
            }
            
            .footer-brand {
              font-size: 1.5rem;
              font-weight: bold;
              color: #1f2937;
              font-family: Georgia, serif;
              margin-bottom: 0.25rem;
            }
            
            @media print {
              body {
                padding: 0;
              }
              
              .certificate {
                border-radius: 12px;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="text-center">
              <h1 class="title">Sertifikat Kelulusan</h1>
              <p class="subtitle">Dengan ini menyatakan bahwa</p>
            </div>
            
            <div class="text-center">
              <h2 class="name font-cursive">${name}</h2>
            </div>
            
            <div class="text-center">
              <p class="description">
                telah berhasil menyelesaikan kursus mengetik level <strong>${levelNames[level]}</strong>
              </p>
              <p class="sub-description">dengan performa rata-rata yang mengesankan.</p>
            </div>
            
            <div class="stats">
              <div class="stat-item">
                <p class="stat-value">${meanWpm}</p>
                <p class="stat-label">Rata-rata Kata per Menit</p>
              </div>
              <div class="stat-item">
                <p class="stat-value">${meanAccuracy}%</p>
                <p class="stat-label">Rata-rata Akurasi</p>
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-left">
                <p class="footer-label">Tanggal</p>
                <p class="footer-value">${date}</p>
              </div>
              <div class="footer-right">
                <p class="footer-brand">QwertyFlow</p>
                <p class="footer-label">Platform Belajar Mengetik</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Write the HTML to the new window
    printWindow.document.write(certificateHTML);
    printWindow.document.close();

    // Wait for the content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Optionally close the window after printing
        // printWindow.close();
      }, 250);
    };
  };

  const handleClose = () => {
    setShowCertificate(false);
    setName('');
    onClose();
  };

  const handleBack = () => {
    setShowCertificate(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onKeyDown={(e) => {
          // Prevent event propagation to allow typing in inputs
          e.stopPropagation();
        }}
      >
        {!showCertificate ? (
          <div className="py-4">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Award className="h-6 w-6 text-yellow-500" />
                  Buat Sertifikat Level {levelNames[level]}
                </CardTitle>
                <CardDescription className="text-base">
                  Berdasarkan performa rata-rata Anda di level ini
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{meanWpm}</p>
                    <p className="text-sm text-muted-foreground">Rata-rata WPM</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{meanAccuracy}%</p>
                    <p className="text-sm text-muted-foreground">Rata-rata Akurasi</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate-name" className="text-base">
                    Nama Lengkap untuk Sertifikat
                  </Label>
                  <Input
                    id="certificate-name"
                    placeholder="Masukkan nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation(); // Stop event from bubbling to parent
                      if (e.key === 'Enter' && name.trim()) {
                        handleGenerateCertificate();
                      }
                    }}
                    autoFocus
                    className="text-lg"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button onClick={handleClose} variant="outline" className="flex-1">
                  Batal
                </Button>
                <Button
                  onClick={handleGenerateCertificate}
                  className="flex-1"
                  disabled={!name.trim()}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Buat Sertifikat
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="relative">
            {/* Certificate Display */}
            <div 
              id="certificate" 
              className="bg-white rounded-xl shadow-2xl p-12 md:p-16 border-4 relative print:shadow-none"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                borderColor: '#000000',
              }}
            >
              <div className="absolute top-4 right-4 print:hidden">
                <Button onClick={handleClose} variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4" style={{ color: '#1f2937' }}>
                  Sertifikat Kelulusan
                </h1>
                <p className="text-lg md:text-xl" style={{ color: '#6b7280' }}>Dengan ini menyatakan bahwa</p>
              </div>

              {/* Name */}
              <div className="text-center my-10">
                <h2 className="text-6xl md:text-7xl font-extrabold font-cursive" style={{ color: '#2563eb' }}>
                  {name}
                </h2>
              </div>

              {/* Description */}
              <div className="text-center mb-12">
                <p className="text-lg md:text-xl" style={{ color: '#6b7280' }}>
                  telah berhasil menyelesaikan kursus mengetik level <span className="font-bold" style={{ color: '#1f2937' }}>{levelNames[level]}</span>
                </p>
                <p className="text-base mt-2" style={{ color: '#9ca3af' }}>dengan performa rata-rata yang mengesankan.</p>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-24 my-12 text-center">
                <div>
                  <p className="text-5xl md:text-6xl font-bold mb-2" style={{ color: '#1f2937' }}>{meanWpm}</p>
                  <p className="text-base" style={{ color: '#6b7280' }}>Rata-rata Kata per Menit</p>
                </div>
                <div>
                  <p className="text-5xl md:text-6xl font-bold mb-2" style={{ color: '#1f2937' }}>{meanAccuracy}%</p>
                  <p className="text-base" style={{ color: '#6b7280' }}>Rata-rata Akurasi</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 flex justify-between items-end">
                <div className="text-left">
                  <p className="text-sm mb-1" style={{ color: '#6b7280' }}>Tanggal</p>
                  <p className="text-base font-semibold" style={{ color: '#1f2937' }}>{date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold font-serif mb-1" style={{ color: '#1f2937' }}>QwertyFlow</p>
                  <p className="text-sm" style={{ color: '#6b7280' }}>Platform Belajar Mengetik</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
              <Button onClick={handleBack} variant="outline">
                <Award className="mr-2 h-4 w-4" />
                Buat Ulang
              </Button>
              <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Cetak Sertifikat
              </Button>
            </div>

            <style>{`
              @media print {
                @page {
                  size: A4 landscape;
                  margin: 0;
                }
                
                html, body {
                  width: 100%;
                  height: 100%;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: white !important;
                  overflow: hidden !important;
                }
                
                /* Hide everything */
                body * {
                  visibility: hidden !important;
                }
                
                /* Show only certificate */
                #certificate,
                #certificate * {
                  visibility: visible !important;
                }
                
                #certificate {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  right: 0 !important;
                  bottom: 0 !important;
                  transform: none !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  height: 100vh !important;
                  margin: 0 !important;
                  padding: 3cm 4cm !important;
                  border: 4px solid #000000 !important;
                  border-radius: 0.75rem !important;
                  box-shadow: none !important;
                  background: white !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                  display: flex !important;
                  flex-direction: column !important;
                  justify-content: center !important;
                }
                
                /* Ensure all colors and styles are preserved */
                #certificate * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
                
                /* Hide buttons */
                button,
                .print\\:hidden,
                [class*="print:hidden"] {
                  display: none !important;
                  visibility: hidden !important;
                }
              }
              
              @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
              .font-cursive {
                font-family: 'Dancing Script', cursive;
              }
            `}</style>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
