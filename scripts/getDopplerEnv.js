const cleanUrl = (url) => {
  return url.replace(/\/$/, '');
};

const DOPPLER_ENV = {
  APPLICANT_BASE_URL: cleanUrl(process.env.APPLICANT_BASE_URL),
  APPLICANT_WEBAPP_ORIGIN: cleanUrl(process.env.APPLICANT_WEBAPP_ORIGIN),
};

console.log(JSON.stringify(DOPPLER_ENV));
