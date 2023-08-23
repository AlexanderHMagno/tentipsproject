export const isLocal = () => process.env.ENV == "local";

export const configCache = (timer: number = 3600) => {
  let config: any = {
    next: { revalidate: timer },
  };

  if (isLocal()) {
    config = {
      cache: "no-cache",
    };
  }

  return config;
};
