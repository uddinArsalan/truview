/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "source.unsplash.com"
            },
            {
                protocol : "https",
                hostname : "i.pravatar.cc"
            },
            {
                protocol : "https",
                hostname : "loremflickr.com"
            },
            {
                protocol : "https",
                hostname : "picsum.photos"
            },
        ]
    }
};

export default nextConfig;
