"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationController = void 0;
const common_1 = require("@nestjs/common");
const email_confirmation_service_1 = require("./email-confirmation.service");
const confirmEmail_dto_1 = require("./dto/confirmEmail.dto");
let EmailConfirmationController = class EmailConfirmationController {
    emailConfirmationService;
    constructor(emailConfirmationService) {
        this.emailConfirmationService = emailConfirmationService;
    }
    async confirm(body) {
        return await this.emailConfirmationService.confirmEmail(body.token);
    }
    async resendConfirmationLink(body) {
        return await this.emailConfirmationService.sendVerificationLink(body.email);
    }
    async verifyEmail(token, res) {
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
};
exports.EmailConfirmationController = EmailConfirmationController;
__decorate([
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirmEmail_dto_1.ConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)('resend-confirmation-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirmEmail_dto_1.ResendConfirmationLinkDto]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "resendConfirmationLink", null);
__decorate([
    (0, common_1.Get)('verify-email'),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "verifyEmail", null);
exports.EmailConfirmationController = EmailConfirmationController = __decorate([
    (0, common_1.Controller)('email-confirmation'),
    __metadata("design:paramtypes", [email_confirmation_service_1.EmailConfirmationService])
], EmailConfirmationController);
//# sourceMappingURL=email-confirmation.controller.js.map