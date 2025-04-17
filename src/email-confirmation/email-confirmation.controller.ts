import { Controller, Post, Body } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmEmailDto } from './dto/confirmEmail.dto';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @Post('confirm')
  async confirm(@Body() body: ConfirmEmailDto) {
    return await this.emailConfirmationService.confirmEmail(body.token);
  }

  @Post('resend-confirmation-link')
  async resendConfirmationLink(@Body() body: ConfirmEmailDto) {
    return await this.emailConfirmationService.confirmEmail(body.token);
  }
}
