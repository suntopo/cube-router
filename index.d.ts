import { IRouterOptions, IMiddleware } from 'koa-router';
interface HandlerOptions {
    authHandler?: IMiddleware;
    validHandler?: IMiddleware;
    preHandler?: IMiddleware;
    handler: IMiddleware;
    sufHandler?: IMiddleware;
}
export declare enum Methods {
    HEAD = "head",
    OPTIONS = "options",
    GET = "get",
    PUT = "put",
    POST = "post",
    DELETE = "delete"
}
interface RouterOptions {
    method: Methods;
    path: string;
    handlers: HandlerOptions;
}
declare class Router {
    private authHandler?;
    private validHandler?;
    private preHandler?;
    private handler;
    private sufHandler?;
    router: any;
    paths: Array<string>;
    constructor(routerOptions: IRouterOptions, handlerOptions?: HandlerOptions);
    register(routerOptions: Array<RouterOptions>): any;
}
export default Router;
