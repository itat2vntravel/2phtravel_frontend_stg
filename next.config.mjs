/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost","188.166.244.16", "2phadmin-stg.arunmadhuk.in"],
  },
  env: {
      FRONTEND_URL: "https://2ph-stg.saranyag.in/",
    REACT_APP_API_BASEURL:"https://2phadmin-stg.arunmadhuk.in/api/v1/",
    // FRONTEND_URL: process.env.FRONTEND_URL,
    // REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL,
    GTAG_ID: "G-MDDYBJVETJ",
    GOOGLE_CLIENT:
      "249402124139-99d7dt2dvtgvh6ffn9v9lqj39ke3d97c.apps.googleusercontent.com",
  },
  typescript:{
    ignoreBuildErrors:true,
  }
};

export default nextConfig;
