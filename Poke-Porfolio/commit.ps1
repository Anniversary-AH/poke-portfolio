# Git commit script for PokePortfolio AU
# Run this script after Git is installed

Write-Host "Initializing Git repository..." -ForegroundColor Green
git init

Write-Host "Adding all files..." -ForegroundColor Green
git add .

Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit: PokePortfolio AU PWA app

- Next.js 14 with App Router, TypeScript, Tailwind CSS
- Portfolio tracking for Pokemon singles and sealed items
- localStorage-based data persistence
- Dashboard with P/L calculations
- Add/Edit/Delete items functionality
- eBay AU SOLD search integration
- PWA support with service worker and manifest
- Dark theme, mobile-responsive design"

Write-Host "`nCommit completed successfully!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Create a GitHub repository"
Write-Host "2. Run: git remote add origin <your-repo-url>"
Write-Host "3. Run: git branch -M main"
Write-Host "4. Run: git push -u origin main"
Write-Host "5. Connect to Vercel from GitHub"
