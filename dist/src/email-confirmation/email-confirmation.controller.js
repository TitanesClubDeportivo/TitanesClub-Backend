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
        return await this.emailConfirmationService.confirmEmail(body.token);
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
    __metadata("design:paramtypes", [confirmEmail_dto_1.ConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "resendConfirmationLink", null);
exports.EmailConfirmationController = EmailConfirmationController = __decorate([
    (0, common_1.Controller)('email-confirmation'),
    __metadata("design:paramtypes", [email_confirmation_service_1.EmailConfirmationService])
], EmailConfirmationController);
//# sourceMappingURL=email-confirmation.controller.js.map