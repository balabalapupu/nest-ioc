const METHOD_METADATA = "method";
const PATH_METADATA = "path";

export interface Type<T> {
  new (...args: any[]): T;
}

export interface ClassProvider<T> {
  provide: Type<T>;
  useClass: Type<T>;
}

export const Inject = (): ClassDecorator => (target) => {
  return target;
};

export function Module(metadata: any) {
  const propsKeys = Object.keys(metadata);
  return (target: any) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata[property], target);
      }
    }
  };
}

export class Container {
  providers = new Map<Type<any>, ClassProvider<any>>();

  addProvider<T>(provider: ClassProvider<T>) {
    this.providers.set(provider.provide, provider);
  }

  inject(token: Type<any>) {
    return this.providers.get(token)?.useClass;
  }
}

export const Controller = (path?: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
};

// ============
const createMappingDecorator =
  (method: string) =>
  (path: string): MethodDecorator => {
    return (target, key, descriptor: any) => {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    };
  };

export const Get = createMappingDecorator("get");
export const Post = createMappingDecorator("post");
export const PUT = createMappingDecorator("put");
export const DELETE = createMappingDecorator("delete");

export function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // 筛选出类中的方法
  const methodsNames = Object.getOwnPropertyNames(prototype).filter((item) => {
    return !isConstructor(item) && isFunction(prototype[item]);
  });
  return methodsNames.map((methodName) => {
    const fn = prototype[methodName];

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
      route,
      method,
      fn,
      methodName,
    };
  });
}

function isConstructor(config: string) {
  return config == "constructor";
}
function isFunction(config: any) {
  return config !== "constructor";
}
