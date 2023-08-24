export const isLocal = () => process.env.ENV == "local";

interface config {
  timer?: number;
  next?: any;
}
export const configCache = (timer = 3600, additional?: config) => {
  let config: any = { ...additional };

  if (isLocal()) {
    config.cache = "no-cache";
  } else {
    config.next = { revalidate: timer };
  }

  return config;
};
