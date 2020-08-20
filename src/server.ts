import express from 'express';
import loaders from './loaders';
import { userController } from './controller/user.controller';
import { VideoController } from './controller/video.controller';


async function startServer(){
    const app = express();
    const PORT = 3000;
    
    const server = app.listen(PORT, err => {
    if (err) {
        console.log('Something went wrong during the server launch... \n \n More Details here :\n ' + err)
    }
        else {
            console.log('Server is running on port : ' + PORT)
        };
    }
    )
    
    await loaders(app, server);
    
    await userController(app);
    await VideoController(app);
    
}

startServer()