const currentBackendUrl = "https://crew-connect1.onrender.com";
const oldBackendUrls = ["https://codecraften.onrender.com", "https://crew-connect-backend.onrender.com"];

export function getBackendBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL ?? currentBackendUrl;
  const normalizedUrl = configuredUrl.replace(/\/$/, "");

  return oldBackendUrls.includes(normalizedUrl) ? currentBackendUrl : normalizedUrl;
}
