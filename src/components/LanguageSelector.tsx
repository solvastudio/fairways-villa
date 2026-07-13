import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"

export interface Language {
  code: "id" | "en" | "tr" | "ru"
  label: string
}

const languages: Language[] = [
  { code: "id", label: "Indonesia" },
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ru", label: "Русский" },
]

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile"
  className?: string
}

export function LanguageSelector({ variant = "desktop", className = "" }: LanguageSelectorProps) {
  const { i18n } = useTranslation()
  const currentLang = (i18n.resolvedLanguage || "en") as "id" | "en" | "tr" | "ru"
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={`relative select-none ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 font-haas text-[16px] tracking-[0.8px] uppercase text-text-dark lg:text-inherit cursor-pointer focus:outline-none"
      >
        {variant === "mobile" ? (
          <span className="text-lg tracking-[1px]">Language: {currentLang}</span>
        ) : (
          <span>{currentLang}</span>
        )}
        <svg
          className={`w-[7px] h-[4px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 7 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.73864 3.59464L3.49989 4L0 0.405362L0.238755 0L3.73864 3.59464Z" fill="currentColor" />
          <path d="M3.26136 3.59464L3.49989 4L7 0.405362L6.76125 0L3.26136 3.59464Z" fill="currentColor" />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={`absolute z-50 bg-white py-1.5 rounded-[1px] shadow-md w-36 mt-2 transition-all ${
            variant === "mobile" ? "bottom-full mb-2 left-0" : "top-full right-0"
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                localStorage.setItem("i18nextLng", lang.code)
                document.cookie = `i18next=${lang.code}; path=/; max-age=31536000` // 1 year
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm font-haas tracking-[0.5px] uppercase transition-colors hover:bg-slate-100! ${
                currentLang === lang.code ? "text-primary font-semibold" : "text-text-dark"
              }`}
            >
              {lang.code} - {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
