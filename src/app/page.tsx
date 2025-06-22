// src/app/page.tsx
// Ini adalah Server Component. Tugasnya mengekspor metadata dan merender komponen klien.

import GalleryClient from "@/components/GalleryClient";

// SEO Metadata (Pengganti <Head> di App Router)
// Ini sekarang berada di Server Component, yang sudah benar.
export const metadata = {
  title: "Kenangan KKP Tawanga",
  description: "Galeri memori tak terlupakan selama KKP di Kelurahan Tawanga.",
};

// Komponen Halaman utama (Server Component)
export default function Page() {
  // Hanya merender komponen klien yang berisi semua logika interaktif
  return <GalleryClient />;
}
