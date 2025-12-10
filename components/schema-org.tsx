import React from "react"

export function SchemaOrg(): React.ReactElement {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FOKINA",
    url: "https://fokina.app",
    logo: "https://fokina.app/logo.webp",
    description: "Умный трекер потребления воды для здоровья и благополучия",
    sameAs: [
      "https://www.facebook.com/fokina",
      "https://www.instagram.com/fokina",
      "https://twitter.com/fokina",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@fokina.app",
    },
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FOKINA",
    applicationCategory: "HealthApplication",
    description:
      "Умный трекер потребления воды. Отслеживай суточное потребление воды и улучши свое здоровье.",
    url: "https://fokina.app",
    image: "https://fokina.app/og-image.webp",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://fokina.app",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Сколько воды нужно пить в день?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Рекомендуется пить около 2-3 литров воды в день, но это зависит от вашего веса, активности и климата. FOKINA поможет вам отслеживать потребление воды в соответствии с вашими индивидуальными потребностями.",
        },
      },
      {
        "@type": "Question",
        name: "Как работает трекер FOKINA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FOKINA отслеживает ваше ежедневное потребление воды, предоставляет персональные рекомендации и показывает статистику вашего прогресса.",
        },
      },
      {
        "@type": "Question",
        name: "Безопасны ли мои данные в FOKINA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, мы используем современные методы шифрования для защиты ваших личных данных и соответствуем всем международным стандартам безопасности.",
        },
      },
      {
        "@type": "Question",
        name: "Могу ли я использовать FOKINA на мобильном телефоне?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, FOKINA полностью оптимизирована для мобильных устройств и доступна как веб-приложение, а также как приложение для iOS и Android.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  )
}
