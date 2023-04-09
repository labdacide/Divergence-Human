import { useDebug, useLayoutEffect } from '@studio-freight/hamo'
import { raf } from '@studio-freight/tempus'
import { RealViewport } from 'components/real-viewport'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { GTM_ID } from 'lib/analytics'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import 'styles/global.scss'
import React, { useState, useEffect } from 'react';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const bt = {
  width:'24px',
  height:'24px',
}
const ballStyle = {
  width:'24px',
  height:'24px',
  zIndex: '99',
  position: 'fixed',
  left: '2%',
  top: '2%',
}

gsap.registerPlugin(ScrollTrigger)

// merge rafs
gsap.ticker.remove(gsap.updateRoot)
raf.add((time) => {
  gsap.updateRoot(time / 1000)
}, 0)

const Stats = dynamic(
  () => import('components/stats').then(({ Stats }) => Stats),
  { ssr: false }
)

const GridDebugger = dynamic(
  () =>
    import('components/grid-debugger').then(({ GridDebugger }) => GridDebugger),
  { ssr: false }
)

const Leva = dynamic(() => import('leva').then(({ Leva }) => Leva), {
  ssr: false,
})


// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = document.getElementById('audio');
    if (muted) {
      audio.muted = true;
    } else {
      audio.muted = false;
    }
  }, [muted]);
  const debug = useDebug()
  const lenis = useStore(({ lenis }) => lenis)
  const overflow = useStore(({ overflow }) => overflow)

  // const setHeaderData = useStore((state) => state.setHeaderData)
  // const setFooterData = useStore((state) => state.setFooterData)

  // const [isFetched, setIsFetched] = useState(false)

  // avoid infinite loop
  // if (!isFetched) {
  //   setHeaderData(headerData)
  //   setFooterData(footerData)
  //   setIsFetched(true)
  // }

  useEffect(() => {
    if (overflow) {
      lenis?.start()
      document.documentElement.style.removeProperty('overflow')
    } else {
      lenis?.stop()
      document.documentElement.style.setProperty('overflow', 'hidden')
    }
  }, [lenis, overflow])

  useLayoutEffect(() => {
    if (lenis) ScrollTrigger.refresh()
  }, [lenis])

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' })
  
  return (
    <>
          <Leva hidden={!debug} />
      {debug && (
        <>
          <GridDebugger />
          <Stats />
        </>
      )}

      {/* Google Tag Manager - Global base code */}
      {process.env.NODE_ENV !== 'development' && (
        <>
          <Script
            async
            strategy="worker"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          />
          <Script
            id="gtm-base"
            strategy="worker"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID}');`,
            }}
          />
        </>
      )}
      
      <RealViewport />
      <div style={ballStyle}>
        <button style={bt} onClick={() => setMuted(!muted)}>
        {muted ? (
          <svg viewBox="0 0 24 24">
            <path fill="#9b9b9b" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path fill="#00ffae" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
           )}
        </button>
        <audio id="audio" src="https://houssemlachtar.github.io/Wavy-Sounds/The%20Blaze-Territory.mp3" loop={true} autoPlay={true}></audio>
        
    </div>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
    </>
  )
}

export default MyApp
