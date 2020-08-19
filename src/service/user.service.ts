import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository /user.repository";
import { User } from "../entity/user.entity";

export class UserService {
    protected repo = getCustomRepository(UserRepository);

    get() {
        return this.repo.find();
    }

    post(user: User){
        return this.repo.save(user)
    }

    modifyById(id: number, body: any){
       return this.repo.update({id }, body)
    }

    deleteById(id: number){
        return this.repo.delete({ 'id' : id});
    }
}