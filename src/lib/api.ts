export const API_BASE =
  import.meta.env.VITE_API_BASE ??
  (import.meta.env.DEV ? "http://localhost/itsource/api" : "/itsource/api");
