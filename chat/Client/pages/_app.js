import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  
  return (<>
  <Component {...pageProps} sock />
  </>
  )
}

export default MyApp