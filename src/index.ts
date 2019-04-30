import {Loopback4StarterApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {Loopback4StarterApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new Loopback4StarterApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
