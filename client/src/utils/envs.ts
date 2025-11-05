const { VITE_BACKEND_URL } = import.meta.env;

if (!VITE_BACKEND_URL) {
  throw new Error('Missing required environment variables');
}

const backendURL = VITE_BACKEND_URL;

export { backendURL };
