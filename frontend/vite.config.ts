import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dir, "./src"),
    },
  },
/* Having the server deployed on a different server/domain, teh server will throw CORS error when the UI makes a request to the backend, so in this application, utilizing this feature in Vite, where it would make it seem like both the UI and the API are hosted under the same domain/origin, like the requests to the like http://myapp.com/api/expenses/4 would proxied to the API, from the UI app like, http://localhost:3000/api/expenses/3 (local) || https://{domain_name}/api/expenses/3 (production), as Vite would make it seem like a normal request to fetch data from same origin, but under the hood, it will request teh server from where it's deployed, Preventing CORS, by mimicing that both the UI and the API are deployed under the same origin. Now to test the API it be done through the UI instead of making any calls to http://localhost:3000/ or https://{domain_name}/ */
  server: {
    proxy: {
      "/api": {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    },
  },
})