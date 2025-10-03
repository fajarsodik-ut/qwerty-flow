import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';

export function LearnPage() {
  const fingerColors = [
    { finger: 'Kelingking Kiri', color: 'bg-pink-500', keys: ['` 1 Q A Z'] },
    { finger: 'Jari Manis Kiri', color: 'bg-purple-500', keys: ['2 W S X'] },
    { finger: 'Jari Tengah Kiri', color: 'bg-blue-500', keys: ['3 E D C'] },
    { finger: 'Jari Telunjuk Kiri', color: 'bg-green-500', keys: ['4 5 R T F G V B'] },
    { finger: 'Jari Telunjuk Kanan', color: 'bg-yellow-500', keys: ['6 7 Y U H J N M'] },
    { finger: 'Jari Tengah Kanan', color: 'bg-orange-500', keys: ['8 I K ,'] },
    { finger: 'Jari Manis Kanan', color: 'bg-red-500', keys: ['9 O L .'] },
    { finger: 'Kelingking Kanan', color: 'bg-pink-500', keys: ['0 - = P [ ] ; \' / \\'] },
    { finger: 'Ibu Jari (Kedua Tangan)', color: 'bg-gray-500', keys: ['SPASI'] },
  ];

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Panduan Posisi Jari
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Pelajari posisi yang benar untuk setiap jari pada keyboard
            </p>
          </div>

          {/* Visual Keyboard */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hand className="h-6 w-6" />
                Keyboard Visual dengan Warna Jari
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 p-4 bg-muted/50 dark:bg-muted/20 rounded-lg">
                {/* Row 1 */}
                <div className="flex justify-center gap-1">
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono text-sm">`</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono text-sm">1</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-purple-500/50 border font-mono text-sm">2</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-500/50 border font-mono text-sm">3</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-500/50 border font-mono text-sm">4</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-500/50 border font-mono text-sm">5</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-yellow-500/50 border font-mono text-sm">6</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-yellow-500/50 border font-mono text-sm">7</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-orange-500/50 border font-mono text-sm">8</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-red-500/50 border font-mono text-sm">9</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono text-sm">0</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono text-sm">-</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono text-sm">=</div>
                </div>
                
                {/* Row 2 */}
                <div className="flex justify-center gap-1">
                  <div className="h-12 w-16 flex items-center justify-center rounded-md bg-muted border text-xs">Tab</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono">Q</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-purple-500/50 border font-mono">W</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-500/50 border font-mono">E</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-500/50 border font-mono">R</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-500/50 border font-mono">T</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-yellow-500/50 border font-mono">Y</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-yellow-500/50 border font-mono">U</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-orange-500/50 border font-mono">I</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-red-500/50 border font-mono">O</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono">P</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono text-sm">[</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono text-sm">]</div>
                </div>

                {/* Row 3 - Home Row */}
                <div className="flex justify-center gap-1">
                  <div className="h-12 w-20 flex items-center justify-center rounded-md bg-muted border text-xs">Caps</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono font-bold ring-2 ring-blue-500">A</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-purple-500/50 border font-mono font-bold ring-2 ring-blue-500">S</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-500/50 border font-mono font-bold ring-2 ring-blue-500">D</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-500/50 border font-mono font-bold ring-2 ring-blue-500">F</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-500/50 border font-mono font-bold ring-2 ring-blue-500">G</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-yellow-500/50 border font-mono font-bold ring-2 ring-blue-500">H</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-yellow-500/50 border font-mono font-bold ring-2 ring-blue-500">J</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-orange-500/50 border font-mono font-bold ring-2 ring-blue-500">K</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-red-500/50 border font-mono font-bold ring-2 ring-blue-500">L</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono">;</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono">'</div>
                </div>

                {/* Row 4 */}
                <div className="flex justify-center gap-1">
                  <div className="h-12 w-24 flex items-center justify-center rounded-md bg-muted border text-xs">Shift</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono">Z</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-purple-500/50 border font-mono">X</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-500/50 border font-mono">C</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-500/50 border font-mono">V</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-500/50 border font-mono">B</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-yellow-500/50 border font-mono">N</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-yellow-500/50 border font-mono">M</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-orange-500/50 border font-mono">,</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-red-500/50 border font-mono">.</div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-pink-500/50 border font-mono">/</div>
                </div>

                {/* Row 5 - Space */}
                <div className="flex justify-center gap-1">
                  <div className="h-12 flex-1 max-w-md flex items-center justify-center rounded-md bg-gray-500/50 border font-mono">SPASI</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-100 font-semibold">
                  💡 Tips: Baris tengah (A S D F - J K L ;) adalah posisi awal. Jari harus selalu kembali ke posisi ini!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Finger Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Panduan Jari per Tombol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fingerColors.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-6 h-6 rounded-full ${item.color}`}></div>
                      <h3 className="font-semibold text-sm">{item.finger}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.keys.map((keyGroup, i) => (
                        <span key={i} className="px-2 py-1 bg-muted rounded text-sm font-mono">
                          {keyGroup}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Practice Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Tips Berlatih</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <div>
                    <strong>Posisi Duduk yang Benar:</strong> Duduk tegak dengan kaki rata di lantai
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <div>
                    <strong>Posisi Home Row:</strong> Letakkan jari pada A S D F (kiri) dan J K L ; (kanan)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <div>
                    <strong>Jangan Lihat Keyboard:</strong> Latih muscle memory dengan melihat layar
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <div>
                    <strong>Mulai Perlahan:</strong> Fokus pada akurasi terlebih dahulu, kecepatan akan mengikuti
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <div>
                    <strong>Latihan Rutin:</strong> Berlatih 15-30 menit setiap hari untuk hasil terbaik
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link to="/app">
              <Button size="lg" className="text-lg px-8 py-6">
                Mulai Berlatih Sekarang
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
