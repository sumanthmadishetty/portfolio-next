import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=block"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
            rel="stylesheet"
          />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-E3JVDXBKRB"
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-E3JVDXBKRB');`,
            }}
          ></script>

          <meta name="description" content="Sumanth Madishetty" />
        </Head>
        <body style={{ maxWidth: "1500px", margin: "auto" }}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WLTFBWFD"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
