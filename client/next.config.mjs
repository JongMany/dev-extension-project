import dotenv from "dotenv";
dotenv.config();

// console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log(
  "NEXTAUTH_URL:",
  process.env.NEXT_AUTH_URL,
  process.env.NEXTAUTH_URL
);
console.log("NEXTAUTH_URL:", process.env.NEXT_PUBLIC_BASE_URL);

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
  },
  env: {
    PORT: "80",
    NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
    NEXTAUTHURL: process.env.NEXT_AUTH_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  // rewrites: [
  //   {
  //     source: "/api/auth/:path*",
  //     destination: "/routes/auth/:path*", //change "routes" to your liking
  //   },
  // ],
};

export default nextConfig;
