import type { ReactNode } from "react";

export const metadata = {
  title: "LAP",
  description: "Driver OS webapp",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
