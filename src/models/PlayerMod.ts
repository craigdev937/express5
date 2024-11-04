import { BaseEntity, Column, Entity, 
    PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "players"})
export class PlayerModel extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column() first: string;
    @Column() last: string;
    @Column() age: number;
    @Column() info: string;
};



