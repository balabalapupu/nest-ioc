"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Container = /** @class */ (function () {
    function Container() {
        this.providers = new Map();
    }
    /**
     * 注册
     */
    Container.prototype.addProvider = function (provider) {
        this.providers.set(provider.provide, provider);
    };
    Container.prototype.inject = function (token) {
        var _a;
        return (_a = this.providers.get(token)) === null || _a === void 0 ? void 0 : _a.useClass;
    };
    return Container;
}());
var Service = /** @class */ (function () {
    function Service() {
    }
    return Service;
}());
var container = new Container();
container.addProvider({ provide: Service, useClass: Service });
console.log(container.providers);
console.log(container.inject(Service));
