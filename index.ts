import { Context} from 'koa';
import KoaRouter, { IRouterOptions, IMiddleware } from 'koa-router';

interface HandlerOptions {
  authHandler?: IMiddleware;
  validHandler?: IMiddleware;
  preHandler?: IMiddleware;
  handler: IMiddleware;
  sufHandler?: IMiddleware;
}

export enum Methods { 
  HEAD ='head',
  OPTIONS ='options',
  GET ='get',
  PUT ='put',
  POST ='post',
  DELETE ='delete'
};

interface RouterOptions {
  method: Methods, // todo 应该是枚举
  path: string,
  handlers: HandlerOptions
}

class Router {
  private authHandler?: IMiddleware;
  private validHandler?: IMiddleware;
  private preHandler?: IMiddleware;
  private handler: IMiddleware = async (ctx: Context, next: () => Promise<any>) => await next()
  private sufHandler?: IMiddleware;
  public router: any;
  public paths: Array<string> = [];

  constructor(routerOptions: IRouterOptions, handlerOptions?: HandlerOptions) {
    this.router = new KoaRouter(routerOptions);
    for(const key in handlerOptions) {
      // @ts-ignore
      this[key] = handlerOptions[key];
    }
  }

  register(routerOptions: Array<RouterOptions>): any {
    routerOptions.forEach(({
      method,
      path, 
      handlers: {
        authHandler,
        validHandler,
        preHandler,
        handler,
        sufHandler
      }
    }) => {
      this.paths.push(path);
      const handlers: Array<any> = [path];
      (authHandler || this.authHandler) && handlers.push(authHandler || this.authHandler);
      (validHandler || this.validHandler) && handlers.push(validHandler || this.validHandler);
      (preHandler || this.preHandler) && handlers.push(preHandler || this.preHandler);
      (handler || this.handler) && handlers.push(handler || this.handler);
      (sufHandler || this.sufHandler) && (handlers.push(sufHandler || sufHandler));
      this.router[method.toLocaleLowerCase()](path, ...handlers)
    });
    return this.router;
  }
}

export default Router;