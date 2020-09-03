import { getCustomRepository } from "typeorm";
import { VideoRepository } from "../repository /video.repository";
import { Video } from "../entity/video.entity";

export class VideoService {
    protected repo = getCustomRepository(VideoRepository);

    get(){
        return this.repo.find();
    }

    post(video: any){
        console.log(video)
        return this.repo.save(video);
    }

    modifyById(id: number, body:any){
        return this.repo.update({id}, body);
    }

    deleteById(id: number){
        return this.repo.delete({"id" : id});
    }
}