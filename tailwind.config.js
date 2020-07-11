module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.js',
      './public/**/*.html',
    ],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}