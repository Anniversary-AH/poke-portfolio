# PokePortfolio AU

A Progressive Web App (PWA) for tracking your Pokémon singles and sealed items portfolio.

## Features

- Track Pokémon singles and sealed items
- Store data in localStorage (no backend required)
- Dashboard with totals and P/L calculations
- Add, edit, and delete items
- Quick eBay AU SOLD search for each item
- Installable on Android devices (PWA)

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate PWA icons (required for installability):
   - Option 1: Use the built-in icon generator
     - Open `public/generate-icons.html` in your browser
     - Click the download buttons to save the icons
     - Move the downloaded files to the `public/` folder
   - Option 2: Create manually
     - Create two PNG icons: 192x192 and 512x512 pixels
     - Place them in the `public/` folder as:
       - `public/icon-192x192.png`
       - `public/icon-512x512.png`
     - You can use online tools like [RealFaviconGenerator](https://realfavicongenerator.net/)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Installing on Android

1. Open the app in Chrome on your Android device
2. Tap the menu (three dots) in Chrome
3. Select "Add to Home screen" or "Install app"
4. The app will be installed and can be launched like a native app

## Data Model

Each portfolio item includes:
- **type**: "single" or "sealed"
- **name**: Item name
- **set**: Pokémon set
- **cardNumber**: Card number
- **variantOrProduct**: Variant or product name
- **condition**: Item condition
- **quantity**: Number of items
- **purchasePrice**: Purchase price in AUD
- **feesPercent**: Fees percentage
- **purchaseDate**: Date of purchase
- **marketPrice**: Current market price in AUD
- **notes**: Additional notes

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- localStorage for data persistence
- PWA support with service worker

## License

MIT
