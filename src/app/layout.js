import './globals.css';     // ← tu pridaj import

export const metadata = {
  title: 'My Outreach Generator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sk">
      <body>
        {children}
      </body>
    </html>
  );
}
