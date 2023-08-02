import "reflect-metadata";

// ================= Reflect 基础使用

class A {
  a: string;
  constructor() {
    this.a = "1";
  }
}
Reflect.defineMetadata("class_reflect:param", "2", A);
console.log(Reflect.getMetadata("class_reflect:param", A));

// ================= Reflect 装饰器

@Reflect.metadata("inClass", "A")
class Test {
  @Reflect.metadata("inMethod", "B")
  public hello(): string {
    return "hello world";
  }
}

console.log(Reflect.getMetadata("inClass", Test)); // 'A'
console.log(Reflect.getMetadata("inMethod", new Test(), "hello")); // 'B'

// ================= Reflect 装饰器中

function classDecorator(): ClassDecorator {
  return (target) => {
    // 在类上定义元数据，key 为 `classMetaData`，value 为 `a`
    Reflect.defineMetadata("classMetaData", "a", target);
  };
}

function methodDecorator(): MethodDecorator {
  return (target, key, descriptor) => {
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata("methodMetaData", "b", target, key);
  };
}

@classDecorator()
class SomeClass {
  @methodDecorator()
  someMethod() {}
}

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
