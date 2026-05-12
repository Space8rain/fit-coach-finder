import api, { getAPI } from ".";

export const postAuthTg = async (body: string) => {
  return api.post(getAPI("authTg"), body);
}

export const postAuth = async (body: string) => {
  return api.post(getAPI("auth"), body);
}

export const getWhoAmI = async () => {
  return api.get(getAPI("whoAmI"));
}
