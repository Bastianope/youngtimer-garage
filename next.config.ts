import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "whojpjwwyclainfsaxwr.supabase.co",
      },
    ],
  },
  // Adresse courte imprimée sur les flyers (QR code) : la destination peut changer sans réimprimer.
  // Temporaire (307) pour ne pas être mise en cache par les navigateurs. La query (?src=flyer) est conservée.
  async redirects() {
    return [{ source: "/rejoindre", destination: "/auth/inscription", permanent: false }];
  },
};

export default nextConfig;