import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'

//component points to index.tsx

export default function App({ Component, pageProps }: AppProps) {
  return  <RecoilRoot><SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider></RecoilRoot> 
}
