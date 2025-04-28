import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmEmailDto, ResendConfirmationLinkDto } from './dto/confirmEmail.dto';
import { Response } from 'express';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @Post('confirm')
  async confirm(@Body() body: ConfirmEmailDto) {
    return await this.emailConfirmationService.confirmEmail(body.token);
  }

  @Post('resend-confirmation-link')
  async resendConfirmationLink(@Body() body: ResendConfirmationLinkDto) {
    return await this.emailConfirmationService.sendVerificationLink(body.email);
  }

  @Get('verify-email')  //Eliminar para cuando se tenga esta funcionalidad en el frontend
  async verifyEmail(@Query('token') token: string, @Res() res: Response) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Verificación de Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f5f5f5;
            }
            .container {
                text-align: center;
                padding: 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .loading {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Verificando tu email...</h2>
            <div class="loading">Por favor espera mientras verificamos tu cuenta</div>
        </div>
        <form id="verifyForm" method="POST" action="/email-confirmation/confirm">
            <input type="hidden" name="token" value="${token}">
        </form>
        <script>
            document.getElementById('verifyForm').submit();
        </script>
    </body>
    </html>
    `;
    res.send(html);
  }
}
