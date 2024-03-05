"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
var Methods;
(function (Methods) {
    Methods["HEAD"] = "head";
    Methods["OPTIONS"] = "options";
    Methods["GET"] = "get";
    Methods["PUT"] = "put";
    Methods["POST"] = "post";
    Methods["DELETE"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
;
class Router {
    constructor(routerOptions, handlerOptions) {
        this.handler = (ctx, next) => __awaiter(this, void 0, void 0, function* () { return yield next(); });
        this.paths = [];
        this.router = new koa_router_1.default(routerOptions);
        for (const key in handlerOptions) {
            // @ts-ignore
            this[key] = handlerOptions[key];
        }
    }
    register(routerOptions) {
        routerOptions.forEach(({ method, path, handlers: { authHandler, validHandler, preHandler, handler, sufHandler } }) => {
            this.paths.push(path);
            const handlers = [path];
            (authHandler || this.authHandler) && handlers.push(authHandler || this.authHandler);
            (validHandler || this.validHandler) && handlers.push(validHandler || this.validHandler);
            (preHandler || this.preHandler) && handlers.push(preHandler || this.preHandler);
            (handler || this.handler) && handlers.push(handler || this.handler);
            (sufHandler || this.sufHandler) && (handlers.push(sufHandler || sufHandler));
            this.router[method.toLocaleLowerCase()](path, ...handlers);
        });
        return this.router;
    }
}
exports.default = Router;
