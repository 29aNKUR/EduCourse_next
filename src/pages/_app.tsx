import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import { RecoilRoot } from 'recoil'
import Header from './header'


//component points to index.tsx
export default function App({ 
  Component, 
  pageProps: { session, ...pageProps} }: AppProps) 
  {
  return ( 
  <RecoilRoot>

    <SessionProvider session={session}>
    <Header />
      {Component.auth ? (
        <Auth>
            <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
  </SessionProvider></RecoilRoot> 
  ) 
}


function Auth({children}) {
  const {status} = useSession({ required: true});

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children;
}