/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // Tailwind CSS plugin
  },
};

export default config;

// After
const nextIndex = 0;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

// After
function example(input) {
  return input;
}
