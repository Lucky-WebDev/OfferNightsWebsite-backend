import { Controller, HttpCode, UseGuards, Request, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, Req } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { User } from './schemas/verify.schema';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { JwtService } from '@nestjs/jwt';
import { Handler } from './utils/handler';
import { validateAsync} from 'parameter-validator';

@Controller('verify')
export class VerifyController {

  constructor(private verifyService: VerifyService, private jwtService: JwtService, private Handler: Handler) { }

  // Email Verify
  @Post('/email-verify')
  async emailVerify(@Res() response, @Body() email: any) {
    try {
      const token = await this.verifyService.verify(email);
      return response.status(200).json(token);
    }
    catch (error) {
      return this.Handler.errorException(response, error);
    }
  }

  // Check token
  @Get('/check-token/:email/:token')
  async checkToken(@Param('email') email: string, @Param('token') token: string, @Res() response) {
    try {
      // return this.Handler.success(response, {flag: true});
      const check = await this.verifyService.check(token);
      // return response.status(200).json(check);
      if(check.email == email) {
        return this.Handler.success(response, {flag: true});
      } else {
        return this.Handler.errorException(response, {flag: false});
      }
    }
    catch (error) {
      return this.Handler.errorException(response, {flag: false});
    }
  }

  // send otp for phone verify
  @Post('/SendOtp')
  async sendOtp(@Body() data: any): Promise<{ msg: string }> {
    console.log(data)
    let prefix = '+1';
    let phone = prefix.concat(data.phone);
    return await this.verifyService.sendOtp(phone);
  }

  // Verify otp for phone verify
  @Post('/VerifyOtp')
  async verifyOtp(@Body() data: any): Promise<{ msg: string }> {
    console.log(data)
    let prefix = '+1';
    let phone = prefix.concat(data.phone);
    return await this.verifyService.verifyOtp(phone, data.otp);
  }
}
