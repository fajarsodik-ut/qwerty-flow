import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Keyboard, Zap, Target, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';

export function HomePage() {
  const features = [
    {
      icon: <Keyboard className="h-8 w-8" />,
      title: "Keyboard Visual",
      description: "Keyboard interaktif dengan warna yang menunjukkan posisi jari untuk setiap tombol"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Pelacakan Akurasi",
      description: "Pantau akurasi dan kecepatan mengetik mu secara real-time"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Tingkat Kesulitan",
      description: "Tiga tingkat kesulitan: Mudah, Sedang, dan Sulit untuk perkembangan bertahap"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Latihan Langsung",
      description: "Langsung mulai berlatih tanpa perlu registrasi atau login"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <ThemeToggle className="absolute top-4 right-4 z-50" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center p-2 mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full"
            >
              <Keyboard className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 px-4">
              <span className="block mb-2">QwertyFlow</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 pb-2">
                Master Mengetik
              </span>
            </h1>
            
            <p className="mt-6 text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4">
              Tutor mengetik yang elegan dan minimalis untuk meningkatkan kecepatan dan akurasi mu.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/app">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl">
                  Mulai Berlatih
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Semua yang kamu butuhkan untuk menjadi master mengetik
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-blue-500/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Siap Meningkatkan Skill Mengetik?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Mulai perjalanan mu sekarang dan lihat peningkatan dalam hitungan hari!
                </p>
                <Link to="/app">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                    Mulai Gratis Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <p className="flex items-center justify-center gap-2">
              Dibuat dengan 
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                <path d="M0 0h8v32H0zM11 0h10v8H11zM11 11h10v10H11zM11 24h10v8H11zM24 0h8v32h-8z"/>
              </svg>
              IBM Granite
            </p>
            <p>
              © 2025 Fajar Sodik • {' '}
              <a 
                href="https://github.com/fajarsodik-ut" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}