import "./globals.css";

export const metadata = {
  title: "Ari Anggara — Break The Mold Visual CV",
  description:
    "Portfolio-CV eksperimental Ari Anggara untuk desain komersial, campaign identity, dan creative advertising."
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
