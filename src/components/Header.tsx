import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Menu, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Logo } from "./Logo"
import { ReserveButton } from "./ReserveButton"
import { LanguageSelector } from "./LanguageSelector"

interface LinkItem {
  to: string
  key: string
}

const navLinks: LinkItem[] = [
  { to: "#gallery", key: "gallery" },
  { to: "/villa", key: "amenities" },
  { to: "#location", key: "location" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith("#")) {
      e.preventDefault()
      const element = document.getElementById(to.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
      }
    }
  }

  return (
    <header className="absolute top-0 left-0 w-full z-30 px-4 py-5 lg:px-[4%] lg:py-[47px]">
      <div className="max-w-[1620px] mx-auto flex items-center justify-between">
        
        {/* Left Side: Navigation Links (Desktop only) */}
        <nav className="hidden lg:flex items-center gap-10 font-haas text-[16px] tracking-[0.8px] uppercase text-white w-[400px]">
          {navLinks.map((link) => 
            link.to.startsWith("/") ? (
              <Link
                key={link.key}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="hover:opacity-75 transition-opacity"
              >
                {t(`navigation.${link.key}`)}
              </Link>
            ) : (
              <a
                key={link.key}
                href={link.to}
                onClick={(e) => handleScroll(e, link.to)}
                className="hover:opacity-75 transition-opacity"
              >
                {t(`navigation.${link.key}`)}
              </a>
            )
          )}
        </nav>

        {/* Center: Logo (Centered on desktop, left/center on mobile) */}
        <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
          <Link to="/">
            <Logo className="scale-90 md:scale-100" />
          </Link>
        </div>

        {/* Right Side: Language & CTA Button (Desktop only) */}
        <div className="hidden lg:flex items-center gap-[30px] w-[400px] justify-end">
          {/* Language Selector */}
          <LanguageSelector variant="desktop" />

          {/* Reserve Button */}
          <ReserveButton />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden  focus:outline-none z-50 p-2 text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-6 text-text-dark" /> : <Menu className="size-6" />}
        </button>

      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col justify-between px-6 py-10 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-8 mt-20">
            {navLinks.map((link) => 
              link.to.startsWith("/") ? (
                <Link
                  key={link.key}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="font-haas text-2xl tracking-[1px] uppercase text-text-dark hover:opacity-70 transition-opacity"
                >
                  {t(`navigation.${link.key}`)}
                </Link>
              ) : (
                <a
                  key={link.key}
                  href={link.to}
                  onClick={(e) => handleScroll(e, link.to)}
                  className="font-haas text-2xl tracking-[1px] uppercase text-text-dark hover:opacity-70 transition-opacity"
                >
                  {t(`navigation.${link.key}`)}
                </a>
              )
            )}
            
            <div className="h-px bg-border my-2" />

            {/* Language Selector Mobile */}
            <LanguageSelector variant="mobile" />
          </div>

          {/* Reserve Button Mobile */}
          <ReserveButton className="w-full py-4 h-[58px] text-lg mb-8" />
        </div>
      )}
    </header>
  )
}
