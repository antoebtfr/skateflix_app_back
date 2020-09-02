import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";

@Entity('users')

export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, default: ''})
    surname!:string;

    @Column({ type: 'varchar', length: 50, default: ''})
    firstname!:string;

    @Column({ type: 'varchar', length: 50, default: ''})
    nickname!:string;

    @Column({type: 'varchar', length: 100})
    email!:string;

    @Column({ type: 'boolean', default: false})
    isPremium!:boolean;

    @Column({ type: 'boolean', default: false})
    isAdmin!:boolean;

    @Column({ type: 'text', nullable: true})
    bio?:string;

    @Column({type: 'varchar', length: 100})
    password!:string;

    @Column({type: 'int', nullable: true})
    age?:number;

    @Column({type: 'varchar', length: 50, nullable: true})
    country?:string;

    @Column({type: 'varchar', length: 30, nullable: true})
    region?:string;

}