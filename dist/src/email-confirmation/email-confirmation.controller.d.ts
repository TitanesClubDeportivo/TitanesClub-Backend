import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmEmailDto } from './dto/confirmEmail.dto';
export declare class EmailConfirmationController {
    private readonly emailConfirmationService;
    constructor(emailConfirmationService: EmailConfirmationService);
    confirm(body: ConfirmEmailDto): Promise<{
        message: string;
    }>;
    resendConfirmationLink(body: ConfirmEmailDto): Promise<{
        message: string;
    }>;
}
