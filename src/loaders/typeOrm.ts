import { createConnection } from "typeorm"
import { User } from "../entity/user.entity"
import { Video } from "../entity/video.entity"

export default async () => {
    await createConnection({
        type: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'Livredepoche18;',
        database: 'test_Workbench',
        entities: [
            User,
            Video
        ],
        synchronize: true,
        logging: false,
    }).then(connection => {

        console.log('typeOrm initialized')
    }).catch(err => console.log('Something wrong happended : ' + err));
}