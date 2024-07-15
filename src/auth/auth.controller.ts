import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SigninDto, SignupDto, UpdatePasswordDto } from 'src/libs/dto';
import {
  TSigninRequest,
  TSignupRequest,
  TUpdatePasswordRequest,
} from 'src/libs/entities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SignupDto })
  signup(@Body() payload: TSignupRequest) {
    return this.authService.signup(payload);
  }

  @Post('signin')
  @HttpCode(200)
  @ApiBody({ type: SigninDto })
  signin(@Body() payload: TSigninRequest) {
    return this.authService.signin(payload);
  }

  @Post('update-password')
  @ApiBody({ type: UpdatePasswordDto })
  updatePassword(@Body() payload: TUpdatePasswordRequest) {
    return this.authService.updatePassword(payload);
  }
}
