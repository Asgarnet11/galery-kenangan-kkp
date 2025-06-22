"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowLeft, ArrowRight, X, Video } from "lucide-react";

// --- DEFINISI TIPE DATA (TYPESCRIPT) ---
interface MediaItem {
  id: string;
  src: string;
  caption: string;
  author: string;
  type: "photo" | "video";
}

interface MediaData {
  [key: string]: MediaItem[];
}

// --- DATABASE FOTO & VIDEO ---
const mediaDataByDay: MediaData = {
  "Random 1": [
    {
      id: "h1-1",
      src: "/photo/kkp-hari1.jpg",
      caption: "Tiba di lokasi dan Sosialisasi",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h1-2",
      src: "/photo/kkp-hari3.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
  ],
  "Random 2": [
    {
      id: "h2-1",
      src: "/photo/kkp-hari4.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h2-2",
      src: "/photo/kkp-hari5.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h2-3",
      src: "/photo/kkp-hari6.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h1-3",
      src: "/photo/kkp-hari7.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h1-4",
      src: "/photo/kkp-hari9.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h1-5",
      src: "/photo/kkp-hari19.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
  ],
  "Random 3": [
    {
      id: "h3-1",
      src: "/photo/kkp-hari20.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h3-2",
      src: "/photo/kkp-hari21.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h3-3",
      src: "/photo/kkp-sma1.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h3-4",
      src: "/photo/kkp-sma2.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
  ],
  "Random 4": [
    {
      id: "h6-1",
      src: "/photo/kkp-hari29.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h6-2",
      src: "/photo/kkp-hari30.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h6-3",
      src: "/photo/kkp-hari31.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h6-4",
      src: "/photo/kkp-random1.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h6-5",
      src: "/photo/kkp-random2.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
    {
      id: "h6-6",
      src: "/photo/kkp-random4.jpg",
      caption: "Random",
      author: "Asgar",
      type: "photo",
    },
  ],
  "Video Random": [
    {
      id: "v-1",
      src: "/video/random1.mp4",
      caption: "Video Random Kami Selama di Posko",
      author: "Kelompok kkp",
      type: "video",
    },
    {
      id: "v-2",
      src: "/video/random2.mp4",
      caption: "Video Random Kami Selama di Posko",
      author: "Kelompok kkp",
      type: "video",
    },
    {
      id: "v-3",
      src: "/video/random3.mp4",
      caption: "Video Random Kami Selama di Posko",
      author: "Kelompok kkp",
      type: "video",
    },
    {
      id: "v-4",
      src: "/video/random4.mp4",
      caption: "Video Random Kami Selama di Posko",
      author: "Kelompok kkp",
      type: "video",
    },
    {
      id: "v-5",
      src: "/video/random5.mp4",
      caption: "Video Random Kami Selama di Posko",
      author: "Kelompok kkp",
      type: "video",
    },
  ],
};

const headerBackgrounds = [
  "/photo/kkp-hari1.jpg",
  "/photo/kkp-hari3.jpg",
  "/photo/kkp-hari4.jpg",
  "/photo/kkp-hari5.jpg",
  "/photo/kkp-hari6.jpg",
  "/photo/kkp-hari7.jpg",
];

const GalleryClient: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Semua");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % headerBackgrounds.length
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const allMedia = useMemo(() => Object.values(mediaDataByDay).flat(), []);
  const tabs = ["Semua", ...Object.keys(mediaDataByDay)];
  const currentMediaList =
    activeTab === "Semua" ? allMedia : mediaDataByDay[activeTab];

  const handleItemClick = (item: MediaItem) => setSelectedItem(item);
  const handleCloseLightbox = () => setSelectedItem(null);

  const handleNavigation = (direction: number) => {
    if (!selectedItem) return;
    const currentIndex = currentMediaList.findIndex(
      (item) => item.id === selectedItem.id
    );
    const nextIndex =
      (currentIndex + direction + currentMediaList.length) %
      currentMediaList.length;
    setSelectedItem(currentMediaList[nextIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-500">
      <header className="py-24 md:py-32 text-center relative overflow-hidden h-96 md:h-[500px] flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={headerBackgrounds[currentBgIndex]}
              alt="Background Kenangan KKP"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative z-20 container mx-auto px-6 text-white"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Memori KKP Kita
          </h1>
          <div className="flex justify-center items-center gap-2 text-lg md:text-xl font-semibold text-slate-200 mb-6 drop-shadow-md">
            <MapPin className="w-5 h-5" />
            <span>Kelurahan Tawanga</span>
          </div>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-100 drop-shadow-md">
            Setiap sudut Tawanga kini menyimpan cerita kita. Dari tawa di posko
            hingga lelah saat program berjalan, semua terekam di sini. Mari kita
            kenang kembali setiap detiknya, karena momen ini takkan terulang.
          </p>
        </motion.div>
      </header>

      <main className="container mx-auto px-6 pb-16 -mt-16 relative z-30">
        <div className="sticky top-4 z-20 bg-cream-50/80 dark:bg-slate-900/80 backdrop-blur-md py-4 mb-8 rounded-xl shadow-lg">
          <div className="flex justify-center flex-wrap gap-2 px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-slate-700"
                } px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {currentMediaList.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 150,
                    },
                  },
                }}
                onClick={() => handleItemClick(item)}
              >
                <div className="group aspect-w-1 aspect-h-1 block bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300">
                  {item.type === "video" ? (
                    <>
                      <div className="absolute inset-0 bg-black flex items-center justify-center">
                        <Video className="h-12 w-12 text-white/50" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <p className="text-white text-sm font-bold truncate">
                          {item.caption}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="group-hover:scale-110 transition-transform duration-500 ease-in-out object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/600x600/fecaca/333?text=Error";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <p className="text-white text-sm font-bold truncate">
                          {item.caption}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}{" "}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={handleCloseLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation(-1);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 z-50"
            >
              <ArrowLeft size={36} />
            </button>
            <motion.div
              key={selectedItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="relative"
            >
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
                />
              ) : (
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.caption}
                  width={1200}
                  height={800}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl w-auto h-auto"
                />
              )}
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 z-50"
            >
              <ArrowRight size={36} />
            </button>
            <button
              onClick={handleCloseLightbox}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors p-2 z-50"
            >
              <X size={32} />
            </button>
            <div className="absolute bottom-5 left-5 right-5 text-center bg-black/30 p-3 rounded-lg z-50">
              <p className="text-white font-bold">{selectedItem.caption}</p>
              <p className="text-slate-300 text-sm">
                Oleh: {selectedItem.author}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryClient;
