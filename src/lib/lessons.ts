import type { Level } from '@/types';
export const lessons: Record<Level, string[]> = {
  easy: [
    'asdf jkl;',
    'ada saja jasa lada;',
    'jkl; asdf',
    'jalak salak kadal;',
    'ada jalak; sajak lada;',
  ],
  medium: [
    'Anak ayam turun dari tangga, sebutir dua, sebutir tiga.',
    'Indonesia adalah negara kepulauan terbesar di dunia.',
    'Belajar mengetik dengan cepat dan akurat membutuhkan latihan rutin.',
    'Bunga mawar merah dan melati putih tumbuh di taman belakang rumah.',
    'Burung cendrawasih adalah burung khas dari Papua yang sangat indah.',
  ],
  hard: [
    'API proyek (versi 2.1) menggunakan OAuth2 untuk autentikasi, memerlukan client_id & kunci rahasia!',
    'Alamat IP saya adalah 192.168.1.1, dan subnet mask adalah 255.255.255.0.',
    'Gunakan `const array = [1, 2, 3];` untuk deklarasi array di JavaScript.',
    'Biaya akhir adalah Rp1.234.567 (naik 15%!), yang tidak terduga.',
    'Dia berteriak, "Apa?! Saya tidak percaya ini terjadi @ 15:00 WIB." #kaget',
  ],
};