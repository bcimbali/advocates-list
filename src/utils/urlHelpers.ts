type urlParams = {
  [key: string]: string | string[] | undefined;
};

function objectToUrlParams(obj: urlParams) {
  const params = [];

  for (const key in obj) {
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }

  return params.join('&');
};

export default objectToUrlParams;
