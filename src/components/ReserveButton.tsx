import { useTranslation } from "react-i18next"

interface ReserveButtonProps {
  className?: string
  children?: React.ReactNode
}

export function ReserveButton({ className = "", children }: ReserveButtonProps) {
  const { t, i18n } = useTranslation()

  const getWhatsappUrl = () => {
    const phone = "905378435048"
    let text = ""
    switch (i18n.resolvedLanguage) {
      case "tr":
        text = "Merhaba! Fairways Villa Belek'te rezervasyon yaptırmak istiyorum. Müsaitlik durumunu kontrol edebilir misiniz?"
        break
      case "ru":
        text = "Здравствуйте! Я хотел бы забронировать виллу Fairways в Белеке. Подскажите, пожалуйста, свободные даты?"
        break
      default:
        text = "Hello! I would like to reserve my stay at Fairways Villa Belek. Could you please check availability?"
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  return (
    <a
      href={getWhatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-primary hover:bg-primary/95 text-white font-sans font-semibold text-[16px] tracking-[1.6px] px-10 py-[17px] h-[53px] rounded-[1px] transition-colors inline-flex items-center justify-center select-none cursor-pointer ${className}`}
    >
      {children || t("common.reserve")}
    </a>
  )
}
