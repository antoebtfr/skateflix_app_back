import { Application, Router, Request, Response, NextFunction } from "express";
import { VideoService } from "../service/video.service";
import multer from "multer";
import express from "express";


export const VideoController = (app: Application) => {
    const service = new VideoService;
    const router = Router();
    const storage = multer.diskStorage({
        destination: (req: Request, file, callback) => {
            callback(null, 'uploads');
        },
        filename: (req: Request, file, callback) => {
            callback(null, `id${req.params.userId}_${file.originalname}`)
        }
    })

    const upload = multer({storage: storage});

    router.get('/', async (req: Request, res: Response) => {
         res.send(await service.get())
    })

    router.post('/:userId/:category/:videoname', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
        const file = req.file;
        console.log(file);
        if(!file){
            const error = new Error('Please upload a file');
            return next(error)
        }

        console.log('\nFile has been saved in the folder\n')

        const video = {
            videoname: req.params.videoname,
            link: `uploads/id${req.params.userId}_${file.originalname}`,
            userId: Number(req.params.userId),
            category: req.params.category,
        }

        res.send(await service.post(video));
        console.log('The sending to the database has been carried out correctly.\n \nSending of the following Object :');
        console.log(video);
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        await service.deleteById(Number(req.params.userId));
        res.send('Deletion has been carried out correctly').status(200)
    })

    app.use('/video', router)
    app.use('/uploads', express.static('uploads'));
}