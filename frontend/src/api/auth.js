import { mentoraApi, toReadableError } from "./api";

// Add axios interceptor for token expiration
mentoraApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("mentora_token");
      localStorage.removeItem("mentora_role");
      localStorage.removeItem("mentora_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export async function login({ identifier, password }) {
  try {
    const response = await mentoraApi.post("/auth/login", {
      // Backend may expect email/username under a specific key; we pass both.
      email: identifier,
      username: identifier,
      password,
    });

    // Backend wraps response in { success: true, data: {...} }
    const responseData = response.data.data || response.data;

    const token =
      responseData.token || responseData.accessToken || responseData.jwt;
    if (!token) {
      throw new Error("Login succeeded but no token was returned by the API.");
    }

    const role = responseData.user?.role || responseData.role || "";
    return { token, role, raw: responseData };
  } catch (error) {
    throw toReadableError(error, "Unable to login");
  }
}

export async function signup({ name, email, password, role, organization }) {
  try {
    const response = await mentoraApi.post("/auth/signup", {
      name,
      email,
      password,
      role,
      organization,
    });

    // Backend wraps response in { success: true, data: {...} }
    const responseData = response.data.data || response.data;

    const token =
      responseData.token || responseData.accessToken || responseData.jwt;
    if (!token) {
      throw new Error(
        "Sign up succeeded but no token was returned by the API.",
      );
    }

    const resolvedRole = responseData.user?.role || responseData.role || "";
    return { token, role: resolvedRole, raw: responseData };
  } catch (error) {
    throw toReadableError(error, "Unable to create account");
  }
}

export function deriveProfileFromTokenPayload(payload) {
  if (!payload) return null;
  return {
    id: payload.sub || payload.id,
    role: payload.role,
    email: payload.email,
    name: payload.name || payload.fullName,
  };
}

export async function fetchUserProfile(token) {
  try {
    const response = await mentoraApi.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const responseData = response.data.data || response.data;
    return responseData;
  } catch (error) {
    throw toReadableError(error, "Unable to load profile");
  }
}
