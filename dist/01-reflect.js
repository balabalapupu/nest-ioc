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
require("reflect-metadata");
// ================= Reflect 基础使用
var A = /** @class */ (function () {
    function A() {
        this.a = "1";
    }
    return A;
}());
Reflect.defineMetadata("class_reflect:param", "2", A);
console.log(Reflect.getMetadata("class_reflect:param", A));
// ================= Reflect 装饰器
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.hello = function () {
        return "hello world";
    };
    __decorate([
        Reflect.metadata("inMethod", "B"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], Test.prototype, "hello", null);
    Test = __decorate([
        Reflect.metadata("inClass", "A")
    ], Test);
    return Test;
}());
console.log(Reflect.getMetadata("inClass", Test)); // 'A'
console.log(Reflect.getMetadata("inMethod", new Test(), "hello")); // 'B'
// ================= Reflect 装饰器中
function classDecorator() {
    return function (target) {
        // 在类上定义元数据，key 为 `classMetaData`，value 为 `a`
        Reflect.defineMetadata("classMetaData", "a", target);
    };
}
function methodDecorator() {
    return function (target, key, descriptor) {
        // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
        Reflect.defineMetadata("methodMetaData", "b", target, key);
    };
}
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.someMethod = function () { };
    __decorate([
        methodDecorator(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SomeClass.prototype, "someMethod", null);
    SomeClass = __decorate([
        classDecorator()
    ], SomeClass);
    return SomeClass;
}());
Reflect.getMetadata("classMetaData", SomeClass); // 'a'
Reflect.getMetadata("methodMetaData", new SomeClass(), "someMethod"); // 'b'
// // ================= 测试
// class Hobby {
//   check() {
//     console.log("hello");
//   }
// }
// class Person {
//   hobby: any;
//   constructor(hobby: Hobby) {
//     this.hobby = hobby;
//   }
//   getService() {
//     this.hobby.check();
//   }
// }
// const a = new Person(new Hobby());
// console.log(a, "---a---");
// a.getService();
