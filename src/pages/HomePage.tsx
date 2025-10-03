import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Keyboard, BarChart3, GraduationCap, Zap, ArrowRight } from 'lucide-react';
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
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Pelacakan Akurasi",
      description: "Pantau akurasi dan kecepatan mengetik mu secara real-time"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <ThemeToggle className="absolute top-4 right-4 z-50" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="inline-flex items-center justify-center p-4 mb-8 bg-blue-100 dark:bg-blue-950 rounded-2xl shadow-lg"
            >
              <Keyboard className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 px-4">
              <span className="block mb-2">QwertyFlow</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 py-2">
                Belajar Mengetik
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4">
              Platform profesional untuk meningkatkan kecepatan dan akurasi mengetik Anda
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/app">
                <Button size="lg" className="text-base px-10 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Mulai Berlatih
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline" className="text-base px-10 py-6 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl hover:border-blue-500 dark:hover:border-blue-400 shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  Tutorial
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300">
              Semua yang kamu butuhkan untuk belajar mengetik dengan cepat dan akurat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-xl mb-4">
                        <div className="text-blue-600 dark:text-blue-400">{feature.icon}</div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Siap Meningkatkan Skill Mengetik?
                </h2>
                <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Mulai perjalanan mu sekarang dan lihat peningkatan dalam hitungan hari!
                </p>
                <Link to="/app">
                  <Button size="lg" variant="secondary" className="text-base sm:text-lg px-10 py-6 bg-white text-blue-600 hover:bg-blue-50 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
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
      <footer className="py-12 bg-slate-900 dark:bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <p className="flex items-center justify-center gap-2 text-slate-300">
              Dibuat dengan 
              <svg className="w-6 h-6 text-blue-400" viewBox="0 0 32 32" fill="currentColor">
                <path d="M0 0h8v32H0zM11 0h10v8H11zM11 11h10v10H11zM11 24h10v8H11zM24 0h8v32h-8z"/>
              </svg>
              IBM Granite
            </p>
            <p className="text-slate-400">
              © 2025 Fajar Sodik • {' '}
              <a 
                href="https://github.com/fajarsodik-ut" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
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