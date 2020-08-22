import { createConnection } from "typeorm"
import { User } from "../entity/user.entity"
import { Video } from "../entity/video.entity"
import { Token } from "../entity/token.entity";

export default async () => {
    await createConnection({
        type: 'mysql',
        host: 'localhost',
        username: process.env.SQL_user,
        password: process.env.SQL_pass,
        database: process.env.SQL_db_sf,
        entities: [
            User,
            Video,
            Token
        ],
        synchronize: true,
        logging: false,
    }).then(connection => {

        console.log('typeOrm initialized')
    }).catch(err => console.log('Something wrong happended : ' + err));
}