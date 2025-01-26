/** @type {import('next').NextConfig} */
const nextConfig = { experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Adjust as needed, e.g., '10mb', '20mb', etc.
    },
  },
  images:{
    remotePatterns:[{hostname:'res.cloudinary.com'}]
}
};

export default nextConfig;
