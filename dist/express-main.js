"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var express = require("express");
var _03_nest_03_1 = require("./03-nest-03");
var express_decorator_1 = require("./express-decorator");
Factory(_03_nest_03_1.AppModule);
function Factory(target) {
    return __awaiter(this, void 0, void 0, function () {
        var app, container, providers, i, controllers, _loop_1, i;
        return __generator(this, function (_a) {
            app = express();
            container = new express_decorator_1.Container();
            providers = Reflect.getMetadata("providers", target);
            for (i = 0; i < providers.length; i++) {
                container.addProvider({ provide: providers[i], useClass: providers[i] });
            }
            controllers = Reflect.getMetadata("controllers", target);
            _loop_1 = function (i) {
                var _b;
                // 3. 提取当前 controller 中所有的 provider id
                var currentDeps = Reflect.getMetadata("design:paramtypes", controllers[i]);
                // 4. 通过 provider id 获取当前 controller 中所有的 provider
                var depsInstance = currentDeps.map(function (provider) {
                    return new (container.inject(provider))();
                });
                // 5. 实例化 controller
                var controllerInstance = new ((_b = controllers[i]).bind.apply(_b, __spreadArray([void 0], depsInstance, false)))();
                // 6. 传参到 express
                var expressConfig = (0, express_decorator_1.mapRoute)(controllerInstance);
                expressConfig.forEach(function (item) {
                    var route = item.route, method = item.method, fn = item.fn;
                    app[method](route, fn.bind(controllerInstance));
                });
            };
            for (i = 0; i < controllers.length; i++) {
                _loop_1(i);
            }
            app.listen(3000);
            return [2 /*return*/];
        });
    });
}
