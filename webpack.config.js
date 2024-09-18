import { webpack } from "next/dist/compiled/webpack/webpack";

module.exports = {
  // ... other config options ...
  resolve: { conditionNames: ["require", "node", "workerd"] },
  plugins: [
    new webpack.SchemePlugin('cloudflare', 'https'),
  ],
};