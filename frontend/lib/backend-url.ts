const currentBackendUrl = "https://codecraften.onrender.com";
const oldBackendUrls = ["https://crew-connect1.onrender.com", "https://crew-connect-backend.onrender.com"];

export function getBackendBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL ?? currentBackendUrl;
  const normalizedUrl = configuredUrl.replace(/\/$/, "");

  return oldBackendUrls.includes(normalizedUrl) ? currentBackendUrl : normalizedUrl;
}
