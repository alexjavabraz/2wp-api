import {TwpapiApplication} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';
// import {ControllerBooter} from '@loopback/boot';

export async function setupApplication(
  ctrlOptions?: {name: string; instance: object}[],
): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new TwpapiApplication({
    rest: restConfig,
  });
  // const ctrlBooter = new ControllerBooter(app, __dirname, {
  //   dirs: ['controllers'],
  //   extensions: ['.controller.js'],
  //   nested: true,
  // });
  // await ctrlBooter.load();
  await app.boot();
  ctrlOptions?.forEach(ctrl => {
    app.bind(ctrl.name).to(ctrl.instance);
  });
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: TwpapiApplication;
  client: Client;
}
