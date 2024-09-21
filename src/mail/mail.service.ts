import { forwardRef, Global, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/user.schema';
import * as crypto from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MailService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  async sendPasswordResetMail(user: User, storeId: string) {
    const passwordToken = crypto.randomBytes(40).toString('hex');

    const pUser = await this.userService.findByEmail(user.email);
    if (!pUser) throw new NotFoundException('User does not exist!');
    
    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    await this.userService.update(pUser.id, {passwordToken, passwordTokenExpirationDate});

    const origin = process.env.SITE_BASE_URL;
    const resetPassword = `${origin}/reset-password?passwordToken=${passwordToken}&email=${user.email}&storeId=${storeId}`;
    const message = `<p>Please reset your password by clicking this link: <a href="${resetPassword}">Reset Password</a></p>`;
    
    await this.mailerService.sendMail({
      to: user.email,
      from: '"MePOS" <dev@mepos.com>',
      subject: 'Welcome to MEPOS!, Reset your password!',
      template: './passwordreset',
      context: {
        name: user.firstName || 'User',
        message,
      },
    });
  }
}
