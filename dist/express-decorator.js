"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRoute = exports.DELETE = exports.PUT = exports.Post = exports.Get = exports.Controller = exports.Container = exports.Module = exports.Inject = void 0;
var METHOD_METADATA = "method";
var PATH_METADATA = "path";
var Inject = function () { return function (target) {
    return target;
}; };
exports.Inject = Inject;
function Module(metadata) {
    var propsKeys = Object.keys(metadata);
    return function (target) {
        for (var property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadata[property], target);
            }
        }
    };
}
exports.Module = Module;
var Container = /** @class */ (function () {
    function Container() {
        this.providers = new Map();
    }
    Container.prototype.addProvider = function (provider) {
        this.providers.set(provider.provide, provider);
    };
    Container.prototype.inject = function (token) {
        var _a;
        return (_a = this.providers.get(token)) === null || _a === void 0 ? void 0 : _a.useClass;
    };
    return Container;
}());
exports.Container = Container;
var Controller = function (path) {
    return function (target) {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
};
exports.Controller = Controller;
// ============
var createMappingDecorator = function (method) {
    return function (path) {
        return function (target, key, descriptor) {
            Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
            Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
        };
    };
};
exports.Get = createMappingDecorator("get");
exports.Post = createMappingDecorator("post");
exports.PUT = createMappingDecorator("put");
exports.DELETE = createMappingDecorator("delete");
function mapRoute(instance) {
    var prototype = Object.getPrototypeOf(instance);
    // 筛选出类中的方法
    var methodsNames = Object.getOwnPropertyNames(prototype).filter(function (item) {
        return !isConstructor(item) && isFunction(prototype[item]);
    });
    return methodsNames.map(function (methodName) {
        var fn = prototype[methodName];
        // 取出定义的 metadata
        var route = Reflect.getMetadata(PATH_METADATA, fn);
        var method = Reflect.getMetadata(METHOD_METADATA, fn);
        return {
            route: route,
            method: method,
            fn: fn,
            methodName: methodName,
        };
    });
}
exports.mapRoute = mapRoute;
function isConstructor(config) {
    return config == "constructor";
}
function isFunction(config) {
    return config !== "constructor";
}
