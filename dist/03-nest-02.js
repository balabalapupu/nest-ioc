"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
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
var Controller = function () { return function (target) {
    // 各种 Reflect.metadata 注入
    return target;
}; };
var Inject = function () { return function (target) {
    // 各种 Reflect.metadata 注入
    return target;
}; };
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
function Factory(target) {
    var _a;
    var container = new Container();
    // 1. 先把 provider 全部都放到容器里
    var providers = Reflect.getMetadata("providers", target); // service
    for (var i = 0; i < providers.length; i++) {
        container.addProvider({ provide: providers[i], useClass: providers[i] });
    }
    // 2. 获取模块中的所有 controller
    var controllers = Reflect.getMetadata("controllers", target);
    for (var i = 0; i < controllers.length; i++) {
        // 3. 提取当前 controller 中所有的 provider id
        var currentDeps = Reflect.getMetadata("design:paramtypes", controllers[i]);
        // 4. 通过 provider id 获取当前 controller 中所有的 provider
        var depsInstance = currentDeps.map(function (provider) {
            return new (container.inject(provider))();
        });
        // 5. 实例化 controller
        var controllerInstance = new ((_a = controllers[i]).bind.apply(_a, __spreadArray([void 0], depsInstance, false)))();
        console.log(controllerInstance.getService(), "--------");
    }
    return container;
}
// =========================
var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.prototype.check = function () {
        return "this is AppService";
    };
    AppService = __decorate([
        Inject()
    ], AppService);
    return AppService;
}());
var AppService2 = /** @class */ (function () {
    function AppService2() {
    }
    AppService2.prototype.check = function () {
        return "this is AppService2";
    };
    AppService2 = __decorate([
        Inject()
    ], AppService2);
    return AppService2;
}());
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
    }
    AppController.prototype.getService = function () {
        return this.appService.check();
    };
    AppController = __decorate([
        Controller(),
        __metadata("design:paramtypes", [AppService2])
    ], AppController);
    return AppController;
}());
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Module({
            // key      value
            controllers: [AppController],
            providers: [AppService, AppService2],
        })
    ], AppModule);
    return AppModule;
}());
Factory(AppModule);
var providers = Reflect.getMetadata("providers", AppModule);
var controllers = Reflect.getMetadata("controllers", AppModule);
var personMeta = Reflect.getMetadata("design:paramtypes", AppController);
console.log(providers, "---providers---");
console.log(controllers, "---controllers---");
console.log(personMeta, "---personMeta---");
