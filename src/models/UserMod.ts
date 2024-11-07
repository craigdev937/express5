import bcrypt from "bcrypt";
import { IsEmail, Length } from "class-validator";
import { BeforeInsert, Entity, 
    Index, Column, OneToMany } from "typeorm";
import { BaseMod } from "./BaseMod";
import { PostModel } from "./PostMod";

@Entity({name: "users"})
export class UserModel extends BaseMod {
    @Column() first: string;
    @Column() last: string;    
    @Index()
    @IsEmail()
    @Column({ unique: true }) email: string;
    @Length(6, 30)
    @Column() password: string;

    @OneToMany(() => PostModel, (post) => post.user)
    posts: PostModel[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt
            .hash(this.password, 6);
    };
};


 