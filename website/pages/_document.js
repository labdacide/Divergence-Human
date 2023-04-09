/* eslint-disable @next/next/no-document-import-in-page */
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className={process.env.NODE_ENV === 'development' && 'dev'}>
      <Head>
        <meta charSet="UTF-8" />
        <link
          href="/fonts/Slussen-Bold.woff2"
          as="font"
          rel="preload prefetch"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/Slussen-Compressed-Black.woff2"
          as="font"
          rel="preload prefetch"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/Slussen-Expanded-Black.woff2"
          as="font"
          rel="preload prefetch"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/Slussen-Medium.woff2"
          as="font"
          rel="preload prefetch"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/Slussen-Regular.woff2"
          as="font"
          rel="preload prefetch"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/Slussen-Semibold.woff2"
          as="font"
          rel="preload prefetch"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `(function(d, t){
          if(window.location.hash!='#gleam'&&(''+document.cookie).match(/(^|;)\s*GleamFeI9S=X($|;)/)){return;}
          var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
          g.src = "https://widget.gleamjs.io/FeI9S/ol.js?xdga=true"; s.parentNode.insertBefore(g, s);
        }(document, "script"))` }} />
      </Head>
      <body>
        {/* // https://github.com/donavon/use-dark-mode */}
        {/* <script src="./noflash.js" /> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
