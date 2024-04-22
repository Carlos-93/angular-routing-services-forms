/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: () => ({
        'iphone-banner': "url('/assets/images/banner-iphone.webp')",
        'macbook-banner': "url('/assets/images/banner-macbook.jpeg')",
        'watch-banner': "url('/assets/images/banner-watch.webp')",
        'ipad-banner': "url('/assets/images/banner-ipad.jpeg')",
        'airpods-banner': "url('/assets/images/banner-airpods.jpeg')"
      })
    }
  },
  plugins: [],
}