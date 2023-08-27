{
  import("next").NextConfig;
}
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "images.unsplash.com",
      "mdbcdn.b-cdn.net",
      "pixabay.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "10tips-images.s3.us-west-1.amazonaws.com",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      aws4: false,
      kerberos: false,
      "@mongodb-js/zstd": false,
      "@aws-sdk/credential-providers": false,
      snappy: false,
    };

    return config;
  },
};

module.exports = nextConfig;
