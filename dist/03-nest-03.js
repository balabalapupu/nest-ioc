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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("reflect-metadata");
var express_decorator_1 = require("./express-decorator");
// provider
var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.prototype.testExpressService1 = function (req, res) {
        console.log("AppService:testExpressService 1");
        res.end(" app /test-express service 1");
    };
    AppService = __decorate([
        (0, express_decorator_1.Inject)()
    ], AppService);
    return AppService;
}());
// controller
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
    }
    AppController.prototype.testExpressController = function (req, res) {
        console.log("AppController:testExpressController");
        return this.appService.testExpressService1(req, res);
    };
    __decorate([
        (0, express_decorator_1.Get)("/test-express"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AppController.prototype, "testExpressController", null);
    AppController = __decorate([
        (0, express_decorator_1.Controller)("/"),
        __metadata("design:paramtypes", [AppService])
    ], AppController);
    return AppController;
}());
// modal
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, express_decorator_1.Module)({
            controllers: [AppController],
            providers: [AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
