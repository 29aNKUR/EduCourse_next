import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import type { NextComponentType } from 'next';
import Shimmer from "../../components/shimmer";

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

function Auth({ children }: {children: React.ReactNode}) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div><Shimmer /></div>;
  }

  return children;
}


//Problem - user should be redirected to our custom created login page if not logged in 