import dotenv from "dotenv";
import path from 'path';

// NODE_ENV 값을 가져옵니다. 기본값은 'development'로 설정합니다.
const env = process.env.NODE_ENV || 'development';

// 해당하는 .env 파일 경로를 설정합니다.
const envFilePath = path.resolve(`./config/.env.${env}`);

dotenv.config({ path: envFilePath });



/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    // https://github.com/mswjs/msw/issues/1801
    // https://jaypedia.tistory.com/382
    if (context?.isServer) {
      // next server build => ignore msw/browser
      if (Array.isArray(config.resolve.alias)) {
        // in Next the type is always object, so this branch isn't necessary. But to keep TS happy, avoid @tt
        // s-ignore and prevent possible future breaking changes it's good to have it
        config.resolve.alias.push({ name: "msw/browser", alias: false });
      } else {
        config.resolve.alias["msw/browser"] = false;
      }
    } else {
      // browser => ignore msw/node
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/node", alias: false });
      } else {
        config.resolve.alias["msw/node"] = false;
      }
    }
    return config;
  }
};
console.log(
    'env',
    process.env.NEXT_AUTH_URL,
    process.env.NEXTAUTH_URL,
    process.env.NEXT_PUBLIC_BASE_URL
);

export default nextConfig;
