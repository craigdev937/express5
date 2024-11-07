import { BaseEntity, CreateDateColumn, 
    Entity, PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";

@Entity()
export abstract class BaseMod extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
};



