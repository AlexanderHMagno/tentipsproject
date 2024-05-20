{
  import("next").NextConfig;
}
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pixabay.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "10tips-images.s3.us-west-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
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
