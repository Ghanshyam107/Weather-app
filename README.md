# Weather React App (Vite)

Quick starter for a small weather app using OpenWeatherMap and Vite + React.

Setup

1. Open a terminal in the `react-app` folder.
2. Create a file named `.env` with:

```
VITE_OWM_KEY=your_openweathermap_api_key_here
```

3. Install and run:

```powershell
# in Windows PowerShell
npm install
npm run dev
```

The app will be available at the URL shown by Vite (usually http://localhost:5173).

Notes
- For production do not expose API keys in the client. Use a server-side proxy if you need to keep the key secret.
- This is a minimal starter — you can extend with caching, loading states, better UX, and unit tests.