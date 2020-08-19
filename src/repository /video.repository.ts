import { Repository, EntityRepository } from "typeorm";
import { Video } from "../entity/video.entity";

@EntityRepository(Video)
export class VideoRepository extends Repository<Video>{
    
}