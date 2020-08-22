import { Application, Router, Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export const AuthController = (app: Application) => {
    const router = Router();
    const authService = new AuthService();

    router.post('/signup', async (req: Request, res: Response) => {
        const user = req.body;

        try {
            await authService.signUp(user);
            res.sendStatus(204);
        } catch (error) {
            if (error.message === 'ALREADY_EXIST') {
                res.status(408).send('Informations déjà utilisées');
            } else {
                res.status(409).send('Erreur lors de l\'inscription >>>> Error : \n' + error);
            }
        }    
    })

    router.get('/confirmation/:token', (req: Request, res: Response) => {
        const tokenStr = req.params.token;

        try {
            authService.confirmation(tokenStr);
            res.sendStatus(204);
        } catch (error) {
            res.sendStatus(400);
        }
    })

    app.use('/auth', router)
}