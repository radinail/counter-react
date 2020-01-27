import * as Sentry from "@sentry/browser";

const init = () => {
  Sentry.init({
    dsn: "https://dad87b2fe1a8484390b36238e2f81917@sentry.io/1855013"
  });
};

const log = (error: any) => {
  Sentry.captureException(error);
};

export const logger = {
  init,
  log
};
