import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SEOMetaProps {
  page: "home" | "villa";
}

export default function SEOMeta({ page }: SEOMetaProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 1. Update document title
    const titleKey = `seo.${page}Title`;
    document.title = t(titleKey);

    // 2. Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", t(`seo.${page}Description`));

    // 3. Update HTML lang attribute
    document.documentElement.lang = i18n.language;

    // 4. Update hreflang alternate links
    const languages = ["en", "tr", "ru"];
    const currentUrl = window.location.origin + window.location.pathname;

    // Remove existing alternate links to avoid duplication on re-renders
    const existingAlternates = document.querySelectorAll('link[rel="alternate"]');
    existingAlternates.forEach((el) => el.remove());

    // Add new alternate links for each language
    languages.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = `${currentUrl}?lang=${lang}`;
      document.head.appendChild(link);
    });

    // Add x-default link (pointing to English)
    const defaultLink = document.createElement("link");
    defaultLink.rel = "alternate";
    defaultLink.hreflang = "x-default";
    defaultLink.href = `${currentUrl}?lang=en`;
    document.head.appendChild(defaultLink);
  }, [t, i18n.language, page]);

  return null;
}
