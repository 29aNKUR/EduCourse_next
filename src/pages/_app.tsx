import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import type { NextComponentType } from 'next';

type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: boolean}
}


//component points to index.tsx
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <SessionProvider session={session}>
          {/* <Header /> */}
          <Navbar />
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          <Footer />
        </SessionProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
