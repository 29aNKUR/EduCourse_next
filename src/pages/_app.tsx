import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import { RecoilRoot } from 'recoil'
import Header from './header'
import { ThemeProvider } from "next-themes";


//component points to index.tsx
export default function App({ 
  Component, 
  pageProps: { session, ...pageProps} }: AppProps) 
  {
  return ( 
  <RecoilRoot>
    <ThemeProvider attribute='class'>
    <SessionProvider session={session}>
    <Header />
      {Component.auth ? (
        <Auth>
            <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
  </SessionProvider>
  </ThemeProvider>
  </RecoilRoot> 
  ) 
}


function Auth({children}) {
  const {status} = useSession({ required: true});

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children;
}