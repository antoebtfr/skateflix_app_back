import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('videos')

export class Video {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 70})
    videoname!: string;
    
    @Column({type: 'varchar', length: 50, default:''})
    category!: string;

    @Column({type: 'int'})
    userId!: number;

/*    @ManyToOne(type => User, user => user.id, {nullable: false})
    user!: User; */
    
}
