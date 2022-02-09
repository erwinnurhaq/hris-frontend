function arrayToQueryString(key: string, array = []) {
  return array
    .filter((item) => item !== null && item !== undefined && item !== '')
    .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
    .join('&');
}

function getQueryString(objParams: any = {}) {
  const keys = Object.keys(objParams).filter(
    (key) => objParams[key] !== null && objParams[key] !== undefined && objParams[key] !== ''
  );
  if (keys.length === 0) return '';

  return `?${keys
    .map((key) => {
      const value = objParams[key];
      return Array.isArray(value)
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          arrayToQueryString(key, value)
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter((item) => item.length > 0)
    .join('&')}`;
}

export default getQueryString;
