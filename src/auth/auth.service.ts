import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import {
  TSigninRequest,
  TSigninResponse,
  TSignupRequest,
  TSignupResponse,
  TUpdatePasswordRequest,
  TUpdatePasswordResponse,
  TVerifyOtpRequest,
  TVerifyOtpResponse,
} from 'src/libs/entities';
import { expiredAt, generateOTP } from 'src/libs/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async signup(payload: TSignupRequest): Promise<TSignupResponse> {
    try {
      const { name, email, password } = payload;
      const hashedPass = await argon.hash(password);

      const isEmailExist = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (isEmailExist) {
        throw new ForbiddenException('Email already exist');
      }

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPass,
        },
      });

      return {
        message: 'Success',
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async signin(payload: TSigninRequest): Promise<TSigninResponse> {
    try {
      const { email, password } = payload;

      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new ForbiddenException('Credentials incorrect');
      }

      const isMatches = await argon.verify(user.password, password);
      if (!isMatches) {
        throw new ForbiddenException('Credentials incorrect');
      }

      const accessToken = await this.generateToken(user.id, user.email);

      return {
        message: 'Success',
        access_token: accessToken,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async generateToken(userId: number, email: string): Promise<string> {
    try {
      const payload = {
        sub: userId,
        email,
      };
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '999h',
        secret: process.env.JWT_SECRET,
      });

      return token;
    } catch (error) {
      return 'Something went wrong!';
    }
  }

  async updatePassword(
    payload: TUpdatePasswordRequest,
  ): Promise<TUpdatePasswordResponse> {
    try {
      const { email, password } = payload;
      const hashedPass = await argon.hash(password);

      await this.prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPass,
        },
      });

      return {
        message: 'Success',
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }
}
