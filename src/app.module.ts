import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { AccessTokenService } from './components/obc/access-token/access-token.service';
import { AccessTokenDto } from './components/obc/access-token/dto/access-token.dto';
import { OBCModule } from './components/obc/obc.module';
import { UserModule } from './components/user/user.module';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    OBCModule,
    UserModule,
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      max: 10000,
    }),
  ],
  providers: [AccessTokenService],
})
// export class AppModule {}
export class AppModule implements OnModuleInit {
  constructor(private readonly accessTokenService: AccessTokenService) {}
  public onModuleInit() {
    const OBC_ADMIN_USERNAME = process.env.OBC_ADMIN_USERNAME;
    const OBC_ADMIN_PASSWORD = process.env.OBC_ADMIN_PASSWORD;
    const OBC_ADMIN_SCOPE = process.env.OBC_ADMIN_SCOPE;
    axios.interceptors.request.use(async (req) => {
      if (!req.headers.Authorization && !req.headers.userName) {
        const accessTokenDto = new AccessTokenDto();
        accessTokenDto.userName = OBC_ADMIN_USERNAME;
        accessTokenDto.password = OBC_ADMIN_PASSWORD;
        accessTokenDto.scope = OBC_ADMIN_SCOPE;
        accessTokenDto.grantType = 'password';
        const accessTokenResponse =
          await this.accessTokenService.generateAccessToken(accessTokenDto);
        req.headers.Authorization =
          'Bearer ' + accessTokenResponse.access_token;
      } else if (!req.headers.Authorization && req.headers.userName) {
        const accessTokenDto = new AccessTokenDto();
        accessTokenDto.userName = req.headers.userName;
        accessTokenDto.password = req.headers.password;
        accessTokenDto.scope = req.headers.scope;
        accessTokenDto.grantType = 'password';
        const accessTokenResponse =
          await this.accessTokenService.generateAccessToken(accessTokenDto);
        req.headers.Authorization =
          'Bearer ' + accessTokenResponse.access_token;
      }
      return req;
    });
  }
}
