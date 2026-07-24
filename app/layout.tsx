import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

// 공유에 사용하는 대표 도메인. og:image 절대 URL의 기준이 된다.
// Vercel이 자동 생성하는 도메인이 아니라 실제로 공유하는 주소로 고정한다.
const siteUrl = "https://minyoung-ux-portfolio.vercel.app";

export const metadata: Metadata = {
  title: "김민영 | UX 기획 포트폴리오",
  description: "안정적인 서비스를 만드는 UX 기획자 김민영의 프로젝트 포트폴리오입니다.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "김민영 | UX 기획 포트폴리오",
    description: "안정적인 서비스를 만드는 UX 기획자 김민영의 프로젝트 포트폴리오입니다.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "김민영 UX Planner Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "김민영 | UX 기획 포트폴리오",
    description: "안정적인 서비스를 만드는 UX 기획자 김민영의 프로젝트 포트폴리오입니다.",
    images: ["/og-image.png"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
