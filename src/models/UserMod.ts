import bcrypt from "bcrypt";
import { IsEmail, Length } from "class-validator";
import { BaseEntity, BeforeInsert, CreateDateColumn, 
    Entity, Index, Column,
    PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";

@Entity({name: "users"})
export class UserModel extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column() first: string;
    @Column() last: string;
    
    @Index()
    @IsEmail()
    @Column({ unique: true }) email: string;

    @Length(6, 30)
    @Column() password: string;

    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt
            .hash(this.password, 6);
    };
};


 