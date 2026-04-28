# 🏏 Ultimate Dream 11 Team Builder

Assemble your ultimate cricket squad with internal strategy and budget management. This interactive web application allows users to browse top international cricketers, manage their budget (coins), and build a balanced team of 6 players.

![Project Preview](https://i.ibb.co.com/XFSHC5z/banner-main.png)

## 🚀 Live Demo
[Check out the Live Application](https://playoo-11.netlify.app)

## ✨ Key Features

### 1. Dynamic Squad Management
The app features a sophisticated toggling system between "Available Players" and "My Selected Squad". Users can seamlessly switch views to see who's left on the block and who's currently in their team.

### 2. Intelligent Budget System
Every player comes with a bidding price. Users must manage their virtual "Coin" balance, which can be replenished using the interactive banner. The app performs real-time validation to ensure you don't overspend your budget.

### 3. Smart Selection Guardrails
- **Squad Capacity**: Enforces a strict 6-player limit to mimic realistic team constraints.
- **Identity Verification**: Prevents duplicate player selection using advanced state tracking.
- **Instant Feedback**: integrated with `React-Toastify` for polished, colorful notifications for every action (success, warnings, and errors).

## 🌐 Deployment Tips (Netlify & GitHub)

For the fastest deployment and post-processing:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Asset Optimization**: In the Netlify dashboard under *Build & Deploy > Post-processing*, you can disable "Image optimization" if you find it takes too long, as we already use optimized external URLs from Unsplash and Ibb.
- **Node Version**: Ensure you are using Node 18 or 20 (standard in this project).

## 🛠️ Technologies Used

- **React.js (v19)** - High-performance UI rendering
- **Tailwind CSS** - Modern utility-first styling for a polished design
- **Lucide React** - Beautiful, consistent iconography
- **Motion (Framer Motion)** - Fluid layout animations and smooth view transitions
- **React-Toastify** - Professional-grade floating notifications
- **Local Storage** - Persistence for newsletter subscriptions

## 📦 Installation & Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Build for production: `npm run build`

---
*Created with ❤️ by Md Sifat Hossan*
