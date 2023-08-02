class Person {
  constructor(name) {
    this.name = name;
  }
}
class Car {
  constructor(car) {
    this.car = car;
  }
}
class Destination {
  constructor(destination) {
    this.destination = destination;
  }
}

const _Person = {
  init(_thiz) {
    const target = new Person(_thiz.options.name);
    console.log(_thiz);
    return target.name;
  },
};

const _Car = {
  init(_thiz) {
    target = new Car(_thiz.options.car);
    _thiz.carType = "我一定是四驱的";
    return target.car;
  },
};
const _Destination = {
  init(_thiz) {
    console.log(_thiz);
    target = new Destination(_thiz.options.destination);
    return target.destination;
  },
};

const moduleFactory = [];
class Go {
  constructor(options) {
    this.options = options;
    this.init();
  }
  static inject(args) {
    args.map((item) => {
      return moduleFactory.push(item);
    });
  }
  init() {
    const _return = moduleFactory.map((item) => {
      return item.init(this);
    });
    console.log(_return, "---_return---");
  }
}

Go.inject([_Person, _Car, _Destination]);

new Go({
  name: "小明",
  car: "奥拓",
  destination: "回家",
});
