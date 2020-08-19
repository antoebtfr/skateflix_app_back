import { Application, Request, Response, Router } from "express";
import { UserService } from "../service/user.service";


export const userController = (app: Application) => {
    const service = new UserService();
    const router = Router()

    router.get('/', async (req: Request, res: Response) => {
            res.send(await service.get());
    })

    router.post('/', async (req: Request, res: Response) => {
        res.send(await service.post(req.body))
    })

    router.put('/:id', async(req: Request, res: Response) => {
        await service.modifyById(Number(req.params.id), req.body)
        res.send('La modification a bien été effectuée').status(200)
    })

    router.delete('/:id', async(req: Request, res: Response) => {
        await service.deleteById(Number(req.params.id));
        res.send('La suppression a bien été effectuée').status(200);
    })


    app.use('/user', router)
}