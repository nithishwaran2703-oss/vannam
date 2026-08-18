import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://vannamworldpreschool.com"),
  title: {
    default: "Vannam World Preschool | Best Montessori, STEAM & Daycare Playschool",
    template: "%s | Vannam World Preschool",
  },
  description: "Award-winning Montessori & STEAM preschool featuring 1:6 teacher ratios, organic chef nutrition, 4K encrypted parent live stream, and nurturing early learning programs.",
  keywords: [
    "best preschool near me",
    "top playschool",
    "Montessori preschool",
    "STEAM early childhood education",
    "daycare for toddlers",
    "kindergarten admissions 2026",
    "nursery school enrollment",
    "safe preschool with live camera streaming",
    "organic food playschool",
    "preschool fee calculator",
    "early child development center"
  ],
  authors: [{ name: "Vannam World Preschool", url: "https://vannamworldpreschool.com" }],
  creator: "Vannam World Preschool",
  publisher: "Vannam World Preschool",
  applicationName: "Vannam World Preschool",
  category: "Education",
  classification: "Preschool, Kindergarten, Early Childhood Education",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Vannam World Preschool | Award-Winning Early Childhood & Montessori Education",
    description: "Nurturing curious young minds with STEAM Montessori curricula, certified teachers, organic chef meals, and real-time parent portal app.",
    url: "https://vannamworldpreschool.com",
    siteName: "Vannam World Preschool",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vannam World Preschool | Creative, Safe & Joyful Playschool",
    description: "Montessori STEAM learning, organic chef meals, certified teachers, and secure parent login portal.",
    creator: "@VannamWorld",
    site: "@VannamWorld",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vannamworldpreschool.com",
  },
  verification: {
    google: "google-site-verification-token",
  },
};

export const viewport = {
  themeColor: "#0F2963",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  // Comprehensive Schema.org Graph combining Preschool, FAQ, Breadcrumbs, and Site Navigation
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "Preschool", "ChildCare"],
        "@id": "https://vannamworldpreschool.com/#organization",
        "name": "Vannam World Preschool",
        "alternateName": ["Vannam Preschool", "Vannam Playschool", "Vannam World Daycare"],
        "url": "https://vannamworldpreschool.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://vannamworldpreschool.com/favicon.ico",
          "caption": "Vannam World Preschool Logo"
        },
        "image": "https://vannamworldpreschool.com/favicon.ico",
        "description": "Leading Montessori and STEAM preschool delivering progressive early childhood education with certified teachers, 4K live streaming, and organic chef nutrition.",
        "telephone": "+1-800-826-6261",
        "email": "admissions@vannamworldpreschool.com",
        "priceRange": "$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": "Credit Card, Direct Debit, Online Banking",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "124 Rainbow Gardens Drive, Sector 4",
          "addressLocality": "North Academic Zone",
          "postalCode": "10001",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 40.7128,
          "longitude": -74.0060
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Preschool Programs & Admissions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "Toddler Discovery Program (1.5 - 2.5 yrs)",
                "description": "Sensory exploration, motor skills, social bonding, and potty training support."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "Playgroup Explorer (2.5 - 3.5 yrs)",
                "description": "Montessori discovery, language immersion, basic numeracy, and rhythmic play."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "Nursery Innovators (3.5 - 4.5 yrs)",
                "description": "STEAM foundations, phonics, environmental science, and emotional development."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "Kindergarten Preparatory (4.5 - 6.0 yrs)",
                "description": "Advanced literacy, logic, global citizenship, and elementary school readiness."
              }
            }
          ]
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "184",
          "bestRating": "5",
          "worstRating": "1"
        },
        "sameAs": [
          "https://facebook.com/vannamworldpreschool",
          "https://instagram.com/vannamworldpreschool",
          "https://youtube.com/vannamworldpreschool"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://vannamworldpreschool.com/#website",
        "url": "https://vannamworldpreschool.com",
        "name": "Vannam World Preschool",
        "publisher": {
          "@id": "https://vannamworldpreschool.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://vannamworldpreschool.com/programs?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://vannamworldpreschool.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the teacher-to-child ratio at Vannam World Preschool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We maintain an ultra-low teacher-to-child ratio: 1:4 for Toddlers, 1:6 for Playgroup, 1:8 for Nursery, and 1:10 for Kindergarten, alongside dedicated assistant caregivers in every classroom."
            }
          },
          {
            "@type": "Question",
            "name": "How does the secure parent live streaming work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our 4K encrypted live video feed is exclusively accessible to verified parents via the secure Parent Portal app between 8:00 AM and 6:00 PM on school days."
            }
          },
          {
            "@type": "Question",
            "name": "What curriculum framework does Vannam World Preschool follow?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We blend the internationally acclaimed Montessori method with Hands-on STEAM (Science, Tech, Engineering, Arts, Math) experiential learning."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className={`${fredoka.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className="font-sans bg-[#FFFDF8] bg-playful-dots text-[#0F2963] antialiased selection:bg-vannam-yellow/30 selection:text-vannam-orange">
        {children}
      </body>
    </html>
  );
}
