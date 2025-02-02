import "nes.css/css/nes.min.css";
import "../styles/globals.css";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      track_pageview: true,
      persistence: "localStorage",
    });

    mixpanel.track("app_opened");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
