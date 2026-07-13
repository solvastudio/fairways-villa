import "../i18n";
import { useEffect } from "react";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { SplashScreen } from "../components/SplashScreen";

import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var root=document.documentElement;root.classList.remove('dark');root.classList.add('light');root.setAttribute('data-theme','light');root.style.colorScheme='light';}catch(e){}})();`;
const SPLASH_INIT_SCRIPT = `(function(){try{if(window.sessionStorage.getItem('splash_shown')){document.documentElement.classList.add('splash-hidden');}}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Fairways Villa",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Detect language client-side on mount to prevent SSR hydration mismatch
    const detectLanguage = () => {
      if (typeof window === "undefined") return "en";

      // 1. Query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const queryLng = urlParams.get("lng") || urlParams.get("lang");
      if (queryLng && ["id", "en", "tr", "ru"].includes(queryLng)) return queryLng;

      // 2. Cookie
      const cookieLng = document.cookie
        .split("; ")
        .find((row) => row.startsWith("i18next="))
        ?.split("=")[1];
      if (cookieLng && ["id", "en", "tr", "ru"].includes(cookieLng)) return cookieLng;

      // 3. LocalStorage
      const localLng = localStorage.getItem("i18nextLng");
      if (localLng && ["id", "en", "tr", "ru"].includes(localLng)) return localLng;

      // 4. Navigator browser language
      const navLng = navigator.language || (navigator as any).userLanguage;
      if (navLng) {
        const shortLng = navLng.split("-")[0];
        if (["id", "en", "tr", "ru"].includes(shortLng)) return shortLng;
      }

      return "en";
    };

    const targetLng = detectLanguage();
    if (targetLng !== i18n.language) {
      i18n.changeLanguage(targetLng);
    }
  }, [i18n]);

  return (
    <html lang={i18n.resolvedLanguage || "en"} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: SPLASH_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]" suppressHydrationWarning>
        <SplashScreen />
        <Header />
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
