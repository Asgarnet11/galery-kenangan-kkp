/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      // Anda bisa menambahkan domain lain di sini jika perlu
    ],
  },
};

module.exports = nextConfig;
