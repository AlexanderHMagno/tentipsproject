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
};

module.exports = nextConfig;
