import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository /user.repository";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";
import { User } from "../entity/user.entity";
import { hash, verify } from 'argon2';
import { randomBytes } from "crypto";
import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";
import { Token } from "../entity/token.entity";
import  { sign } from 'jsonwebtoken';

export class AuthService {
    
    private userRepo: UserRepository;
    private tokenService: TokenService;
    private userService: UserService;

    constructor(){
        this.userRepo = getCustomRepository(UserRepository);
        this.tokenService = new TokenService();
        this.userService = new UserService();
    }

    private async getUserSensitives(email: string){
        if (await this.userRepo.findOne({where: {email}, select: ['email', 'password']})) {
            return true;
        }
    }

    async signUp(user: User){
        if(await this.getUserSensitives(user.email)) {
            throw new Error('ALREADY_EXIST')
        }
        user.password = await hash(user.password);

        const tokenString = randomBytes(12).toString('hex');

        user = this.userRepo.create(user);
        user = await this.userRepo.save(user);

        await this.nodemailer(tokenString, user);

        const token = new Token();
        token.user = user;
        token.value = tokenString;
        this.tokenService.create(token);

        console.log(user)
        console.log('\nThe user has been saved!')
        return true
    }

    async confirmation(tokenStr: string){
        const token = await this.tokenService.getByValue(tokenStr);
        if(!token){
            throw new Error('Lien invalide');
        }
        await this.userService.activeUserAccount(token.user)
    }

    async signIn(email: string, password: string){
        const labelError = new Error('Crendentials are incorrects');

        const user = await this.userRepo.findOne({where: { email }, select: ["id", "email", "password", "isActive", "firstname", "surname", "nickname", "age", "country", "region"]})
        console.log(user);

        if(!user?.isActive){
            throw new Error("Not active");
        }

        const isValid = await verify(user.password, password);

        if (!isValid) {
            throw labelError
        }

        const secret = "fzifehzifhz";
        if(!secret) { throw new Error('Pas de secret')};
        
        const token = sign(
            {id : user.id, email: user.email}, secret
        )

        console.log('La fonction sign in est finie')
        return { token, user}; 
    }

    private async nodemailer(token: string, user: User) {
        const testAccount = await createTestAccount();

        const transporter = createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            }
        });

        const info = await transporter.sendMail({
            from: '<antoebt@hotmail.com>',
            to: user.email,
            subject: 'Activation Link',
            text: 'Hello World',
            html: `<b> Hello ${user.firstname} <br> Here is your activation link <a href="http:localhost:3000/auth/confirmation/${token}"> Activation Link </a> <b>`
        });

        console.log('Message send to: %s', user.email);
        console.log('Preview URL: %s', getTestMessageUrl(info));
    }
}