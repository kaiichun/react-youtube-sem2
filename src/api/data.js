// export const API_URL = "http://localhost:1205";

export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1205"
    : "http://10.1.104.3:5001";
