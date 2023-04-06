import '@/styles/globals.css'
import { Roboto_Slab } from 'next/font/google'

const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
})

export default function App({ Component, pageProps }) {
  return <Component className={roboto_slab.className} {...pageProps} />
}
