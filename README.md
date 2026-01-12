devrank/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Landing page entry
│   ├── globals.css             # Global styles
│   │
│   ├── (marketing)/            # Landing / marketing pages
│   │   ├── page.tsx            # Landing page
│   │   └── components/
│   │       ├── Hero.tsx
│   │       ├── SocialProof.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── FeaturedPortfolios.tsx
│   │       ├── Inspiration.tsx
│   │       ├── Audience.tsx
│   │       └── FinalCTA.tsx
│   │
│   ├── (auth)/                 # Later (login, signup)
│   │   └── page.tsx
│   │
│   ├── (app)/                  # Main product later
│   │   ├── explore/
│   │   │   └── page.tsx
│   │   └── profile/
│   │       └── [username]/
│   │           └── page.tsx
│
├── components/                 # Reusable UI components
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Container.tsx
│   │
│   ├── Navbar.tsx
│   └── Footer.tsx
│
├── lib/                        # Helpers (no UI)
│   ├── constants.ts
│   └── utils.ts
│
├── public/
│   ├── images/
│   │   └── portfolio-demo.png
│   └── favicon.ico
│
├── prisma/
│   └── schema.prisma
│
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── package.json
└── README.md
