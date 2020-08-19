import { Application, Router, Request, Response } from "express"
import { VideoService } from "../service/video.service";

export const VideoController = (app: Application) => {
    const service = new VideoService;
    const router = Router();

    router.get('/', async (req: Request, res: Response) => {
         res.send(await service.get())
    })

    router.post('/', async (req: Request, res: Response) => {
        res.send(await service.post(req.body));
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        await service.deleteById(Number(req.params.id));
        res.send('La suppression a bien été effectuée').status(200)
    })

    app.use('/video', router)
}