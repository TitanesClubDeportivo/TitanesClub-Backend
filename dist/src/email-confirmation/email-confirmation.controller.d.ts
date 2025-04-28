import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmEmailDto, ResendConfirmationLinkDto } from './dto/confirmEmail.dto';
import { Response } from 'express';
export declare class EmailConfirmationController {
    private readonly emailConfirmationService;
    constructor(emailConfirmationService: EmailConfirmationService);
    confirm(body: ConfirmEmailDto): Promise<{
        message: string;
    }>;
    resendConfirmationLink(body: ResendConfirmationLinkDto): Promise<{
        message: string;
    }>;
    verifyEmail(token: string, res: Response): Promise<void>;
}
