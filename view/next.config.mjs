/**
 * @type {import('next').NextConfig}
 */

import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import TerserPlugin from "terser-webpack-plugin";


const nextConfig = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* 開発フェーズでのみ利用するオプションを設定 */
    };
  }

  return {
    /* 開発フェーズを除く全てのフェーズで有効なオプションを設定 */
    webpack: (config, options) => {
      // ----- ここから本番環境で、console.log を出力しない系の設定 -----
      config.optimization.minimize = true;
      config.optimization.minimizer = [
        new TerserPlugin({
          // Build時に console.log を削除する
          terserOptions: {
            compress: { drop_console: true },
          },
          // LICENSE 情報を残してその他のコメントを削除する
          extractComments: "all",
        }),
      ];
      // ----- ここまで本番環境で、console.log を出力しない系の設定 -----

      return config;
    },
  };
};
export default nextConfig;
