import api, { getAPI } from ".";

export const postAuthTg = async (body: string) => {
  return api.post(getAPI("authTg"), body);
}

export const postAuth = async (body: string) => {
  return api.post(getAPI("auth"), body);
}

export const postAuthRegister = async (body: string) => {
  return api.post(getAPI("authRegister"), body);
}

export const getWhoAmI = async () => {
  return api.get(getAPI("whoAmI"));
}

export const postSetRole = async (role: "client" | "coach") => {
  return api.post(getAPI("setRole"), { role });
}