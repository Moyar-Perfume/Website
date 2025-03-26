import RootClient from "./RootClient";

export const metadata = {
  title: "Moyar Perfume",
  description: "Believe In Miracle",
  icons: "/logo/logo.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
