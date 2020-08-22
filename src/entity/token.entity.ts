import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    value!: string;

    @OneToOne(type => User)
    @JoinColumn()
    user!: User;
}