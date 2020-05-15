const isValidUrl = (url: string): boolean => {
  try {
    // eslint-disable-next-line
    new URL(url);
  } catch (_) {
    return false;
  }

  return true;
};

const buildUrlParams = (url: string, params?: object): string | null => {
  if (isValidUrl(url)) {
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).map(([key, value]) => queryParams.set(key, value));
      return `${url}?${queryParams}`;
    }
    return url;
  }
  return null;
};

export { isValidUrl, buildUrlParams };
