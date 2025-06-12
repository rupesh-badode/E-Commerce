import { CartProvider } from "./cart/CartContext";
import Header from "./components/page";
import Script from 'next/script';
import { AuthProvider } from "./context/AuthContext";
import BootstrapClientLoader from '../bootstrap-client';
import Footer from "./components/Footer";

export const metadata = {
  title: "Next.js E-commerce",
  description: "A simple e-commerce application built with Next.js and React.",
  keywords: "e-commerce, next.js, react, shopping cart",
  authors: [{ name: "Rupesh Badode" }],
};
export default function RootLayout({children}) {
  return (  
<html lang="en" >
        <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossOrigin="anonymous"/>
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossOrigin="anonymous"></Script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
          <link rel="icon" href="../public/favicon.ico"/>
        </head>
        <CartProvider>
          <body>
            <BootstrapClientLoader />
            <AuthProvider>
            <header>  
              <Header/>
            </header>
            <section>
                <main>
                  {children}
                </main>
            </section>
            <Footer/>
            </AuthProvider>
          </body>
        </CartProvider>
</html>
  );
}
