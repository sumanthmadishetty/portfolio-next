import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import mixpanel from "mixpanel-browser";

class MyDocument extends Document {
  componentDidMount() {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      track_pageview: true,
      persistence: "localStorage",
    });
  }

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
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WLTFBWFD');
          `,
            }}
          ></script>

          <meta name="description" content="Sumanth Madishetty" />
          {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"></script> */}
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
