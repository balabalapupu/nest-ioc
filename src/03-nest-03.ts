import "reflect-metadata";
import { Controller, Get, Inject, Module, mapRoute } from "./express-decorator";

// provider
@Inject()
class AppService {
  testExpressService1(req: any, res: any) {
    console.log("AppService:testExpressService 1");
    res.end(" app /test-express service 1");
  }
}

// controller
@Controller("/")
class AppController {
  constructor(public appService: AppService) {}

  @Get("/test-express")
  public testExpressController(req: any, res: any) {
    console.log("AppController:testExpressController");
    return this.appService.testExpressService1(req, res);
  }
}

// modal
@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
