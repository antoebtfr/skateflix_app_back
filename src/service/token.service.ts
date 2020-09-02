import { getCustomRepository } from "typeorm";
import { TokenRepository } from "../repository /token.repository";
import { Token } from "../entity/token.entity";

export class TokenService {
    protected repo = getCustomRepository(TokenRepository);

    create(token: Token){
        return this.repo.save(token)
    }

    getByValue(value: string){
        return this.repo.findOne({value}, {relations : ['user']});
    }
}