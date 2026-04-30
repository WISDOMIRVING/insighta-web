# Insighta Web Portal

The official web dashboard for the Insighta Labs+ Profile Intelligence platform. Designed for non-technical users to explore enriched demographic insights with a premium, responsive interface.

## 🚀 Features
- **Secure GitHub Login**: Direct OAuth integration with browser-based session management.
- **Intelligence Dashboard**: Real-time metrics on profile data and system status.
- **Advanced Explorer**: Paginated profile lists with deep filtering by gender, age, and country.
- **Natural Language Search**: Intuitive search bar that understands complex queries.
- **Account Management**: View your profile details and role-based permissions.

## 🔐 Security
- **HTTP-only Cookies**: Authentication tokens are stored in secure, HttpOnly cookies to prevent XSS attacks.
- **CSRF Protection**: All state-modifying actions are protected via a double-submit cookie pattern.
- **Session Handoff**: Implements a secure cross-domain token handoff between the Railway backend and Vercel frontend.

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router)
- **State Management**: React Server Components + Client-side hooks
- **Styling**: Vanilla CSS with a custom Glassmorphism design system
- **Icons**: Lucide React

## 📦 Installation
To run the portal locally:
```bash
git clone https://github.com/WISDOMIRVING/insighta-web.git
cd insighta-web
npm install
npm run dev
```

## 🌐 Deployment
The portal is deployed on **Vercel** and connects to the production API at:
`https://profile-intelligence-service-production.up.railway.app`
