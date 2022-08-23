const auth0 = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN ?? "",
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID ?? "",
  redirectUri: import.meta.env.VITE_AUTH0_CALLBACK_URI ?? "",
  audience: "http://diary-server",
  scope: "read:diary_entries_for_user write:diary_entries_for_user",
};

const toggles = (import.meta.env.VITE_TOGGLES || "").split(/\s+/);

// add toggle keys to this enum
enum Toggles {}

const bffUri = import.meta.env.VITE_BFF_URI ?? "";

export { auth0, toggles, Toggles, bffUri };
