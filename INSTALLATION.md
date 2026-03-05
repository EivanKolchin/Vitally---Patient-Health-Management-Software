# Installation Guide - Sepsis Sentinel

This guide will help you get Sepsis Sentinel up and running quickly.

---

## System Requirements

- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Latest version
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

---

## Installation Steps

### 1. Install Node.js

If you don't have Node.js installed:

**Windows:**
- Download from https://nodejs.org/
- Run the installer
- Verify: Open PowerShell and run `node --version`

**macOS:**
```bash
brew install node
```

**Linux:**
```bash
sudo apt update
sudo apt install nodejs npm
```

---

### 2. Navigate to Project Directory

Open your terminal (PowerShell on Windows, Terminal on macOS/Linux):

```bash
cd path/to/Vitally---Patient-Health-Management-Software
```

---

### 3. Install Dependencies

Run one of these commands:

```bash
npm install
```

or if you prefer yarn:

```bash
yarn install
```

This will install all required packages:
- Next.js (React framework)
- React and React-DOM
- TypeScript
- Tailwind CSS
- Recharts (for visualizations)
- And their dependencies

**Expected time:** 2-3 minutes (depending on internet speed)

---

### 4. Start the Development Server

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

You should see output like:

```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 2.5s
```

---

### 5. Open in Browser

Navigate to: **http://localhost:3000**

You should see the Sepsis Sentinel dashboard with 3 patients.

---

## Troubleshooting

### Port 3000 Already in Use

If you see an error about port 3000 being in use:

**Option 1:** Kill the process using port 3000

Windows:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

macOS/Linux:
```bash
lsof -ti:3000 | xargs kill -9
```

**Option 2:** Use a different port

```bash
PORT=3001 npm run dev
```

---

### Module Not Found Errors

If you see errors about missing modules:

1. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Reinstall:
   ```bash
   npm install
   ```

---

### TypeScript Errors

If you see TypeScript compilation errors:

1. Make sure all files are saved
2. Restart the dev server (Ctrl+C, then `npm run dev`)
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### Blank Page or Loading Forever

1. Check browser console for errors (F12 → Console tab)
2. Make sure all API routes are working:
   - http://localhost:3000/api/patients
   - http://localhost:3000/api/hospitals
3. Check terminal for server-side errors

---

## Building for Production

To create an optimized production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

The production build will:
- Optimize JavaScript bundles
- Minify CSS
- Generate static pages where possible
- Improve performance

---

## Project Structure Quick Reference

```
├── app/                     # Pages (Next.js 13+ app directory)
│   ├── page.tsx            # Dashboard (/)
│   └── patient/[id]/       # Patient detail pages
├── pages/api/              # API routes (serverless functions)
├── components/             # React components
├── lib/clinical/           # Clinical logic (risk scoring, recommendations)
├── data/                   # Synthetic patient & hospital data
└── types/                  # TypeScript type definitions
```

---

## Verifying Installation

### Test 1: Dashboard Loads
- Open http://localhost:3000
- You should see 3 patient cards
- Cards should have color-coded risk badges (red, amber, green)

### Test 2: API Routes Work
- Open http://localhost:3000/api/patients
- You should see JSON data for 3 patients

### Test 3: Patient Detail Works
- Click on "Sarah Johnson" from dashboard
- You should see:
  - Vital signs and labs
  - Charts
  - Timeline
  - Antibiotic recommendations

### Test 4: Hospital Switching Works
- On patient detail page, change hospital dropdown
- Page should update with new recommendations

---

## Common Issues on Windows

### PowerShell Execution Policy

If you see "cannot be loaded because running scripts is disabled":

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Line Ending Issues

If you cloned from git and see weird errors:

```bash
git config core.autocrlf false
```

Then re-clone the repository.

---

## Need Help?

1. **Check the README.md** for comprehensive documentation
2. **Check the DEMO_SCRIPT.md** for usage guidance
3. **Review code comments** - all files are extensively documented
4. **Check browser console** (F12) for JavaScript errors
5. **Check terminal** for server-side errors

---

## Next Steps

Once installed successfully:

1. **Read the README.md** - Understand the clinical logic
2. **Practice the demo** - Use DEMO_SCRIPT.md
3. **Explore the code** - All files are heavily commented
4. **Customize** - Add your own patients, hospitals, or features

---

**You're ready to go! 🚀**

