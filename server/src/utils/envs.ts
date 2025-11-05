const { NODE_ENV, DEV_PORT, PROD_PORT, ALLOWED_DOMAINS } = process.env;

if (!ALLOWED_DOMAINS || !DEV_PORT) {
  throw new Error('Missing required environment variable');
}

const serverPort = NODE_ENV === 'development' ? DEV_PORT : PROD_PORT;

const allowed_domains = ALLOWED_DOMAINS;

export { serverPort, allowed_domains };
