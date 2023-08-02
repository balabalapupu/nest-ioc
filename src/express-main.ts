import * as express from "express";
import { AppModule } from "./03-nest-03";
import { Container, mapRoute } from "./express-decorator";

interface Type<T> {
  new (...args: any[]): T;
}

interface ClassProvider<T> {
  provide: Type<T>;
  useClass: Type<T>;
}

type Constructor<T = any> = new (...args: any[]) => T;

Factory(AppModule) as any;

async function Factory<T>(target: Constructor<T>) {
  const app = express() as any;

  const container = new Container();
  // 1. 先把 provider 全部都放到容器里
  const providers = Reflect.getMetadata("providers", target);
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

    // 6. 传参到 express
    const expressConfig = mapRoute(controllerInstance);
    expressConfig.forEach((item) => {
      const { route, method, fn } = item;
      app[method](route, fn.bind(controllerInstance));
    });
  }
  app.listen(3000);
}
