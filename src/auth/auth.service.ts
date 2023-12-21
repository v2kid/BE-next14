import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;
type User = {
  email: String;
  name: String;
  password: String;
  roles: [];
};
type UserWithoutPassword = Omit<User, 'password'>;
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService
    ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async signIn(createAuthDto : CreateAuthDto){
    const user: UserWithoutPassword = await this.validate(createAuthDto.email,createAuthDto.password);
     const payload = {
     user
    }
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.secret,
      })
      // backendTokens: {
      //   accessToken: await this.jwtService.signAsync(payload, {
      //     expiresIn: '20s',
      //     secret: process.env.secret,
      //   }),
      //   refreshToken: await this.jwtService.signAsync(payload, {
      //     expiresIn: '7d',
      //     secret: process.env.jwtRefreshTokenKey,
      //   }),
      //   expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      // },
    };
  }
  async validate(email : string, password : string) : Promise<any> {
      const user: User = await this.usersService.findbyemail(email)
      if(user?.password!== password){
        throw new UnauthorizedException();
      }
      const userWithoutPassword: UserWithoutPassword = {
        email: user.email,
        name: user.name,
        roles: user.roles,
      };
      return userWithoutPassword
  }
  async refreshToken(user: any) {
    const payload = {
     user
    };
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.secret,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
  

}
