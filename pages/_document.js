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
          <title>Sumanth Madishetty</title>
          <meta name="description" content="Sumanth Madishetty" />
          {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"></script> */}
        </Head>
        <body style={{ maxWidth: "1500px", margin: "auto" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
