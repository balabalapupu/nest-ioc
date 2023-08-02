import "reflect-metadata";
interface Type<T> {
  new (...args: any[]): T;
}

interface ClassProvider<T> {
  provide: Type<T>;
  useClass: Type<T>;
}

class Container {
  providers = new Map<Type<any>, ClassProvider<any>>();

  addProvider<T>(provider: ClassProvider<T>) {
    this.providers.set(provider.provide, provider);
  }

  inject(token: Type<any>) {
    return this.providers.get(token)?.useClass;
  }
}
const Controller = (): ClassDecorator => (target) => {
  // 各种 Reflect.metadata 注入
  return target;
};
const Inject = (): ClassDecorator => (target) => {
  // 各种 Reflect.metadata 注入
  return target;
};

type Constructor<T = any> = new (...args: any[]) => T;

function Module(metadata: any) {
  const propsKeys = Object.keys(metadata);
  return (target: any) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata[property], target);
      }
    }
  };
}

function Factory<T>(target: Constructor<T>): any {
  const container = new Container();
  // 1. 先把 provider 全部都放到容器里
  const providers = Reflect.getMetadata("providers", target); // service
  for (let i = 0; i < providers.length; i++) {
    container.addProvider({ provide: providers[i], useClass: providers[i] });
  }

  // 2. 获取模块中的所有 controller
  const controllers = Reflect.getMetadata("controllers", target);
  for (let i = 0; i < controllers.length; i++) {
    // 3. 提取当前 controller 中所有的 provider id
    const currentDeps = Reflect.getMetadata(
      "design:paramtypes",
      controllers[i]
    );

    // 4. 通过 provider id 获取当前 controller 中所有的 provider
    const depsInstance = currentDeps.map((provider: Type<any>) => {
      return new (container.inject(provider) as Constructor)();
    });
    // 5. 实例化 controller
    const controllerInstance = new controllers[i](...depsInstance);
    console.log(controllerInstance.getService(), "--------");
  }
  return container;
}

// =========================
@Inject()
class AppService {
  check() {
    return "this is AppService";
  }
}

@Inject()
class AppService2 {
  check() {
    return "this is AppService2";
  }
}

@Controller()
class AppController {
  constructor(public appService: AppService2) {}
  public getService() {
    return this.appService.check();
  }
}

@Module({
  // key      value
  controllers: [AppController],
  providers: [AppService, AppService2],
})
class AppModule {}

Factory(AppModule);

const providers = Reflect.getMetadata("providers", AppModule);
const controllers = Reflect.getMetadata("controllers", AppModule);
const personMeta = Reflect.getMetadata("design:paramtypes", AppController);
console.log(providers, "---providers---");
console.log(controllers, "---controllers---");
console.log(personMeta, "---personMeta---");
