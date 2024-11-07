import { BeforeInsert, Column, Entity, Index, JoinColumn, 
    ManyToOne } from "typeorm";
import { BaseMod } from "./BaseMod";
import { UserModel } from "./UserMod";
import { makeID, slugify } from "../utility/helpers";

@Entity({name: "posts"})
export class PostModel extends BaseMod {
    @Index()
    @Column() identifier: string;  // 7 Character ID
    @Column() title: string;
    @Index()
    @Column() slug: string;
    @Column({ 
        nullable: true, 
        type: "text" 
    }) body: string;
    @Column() subName: string;

    @ManyToOne(() => UserModel, 
        (user) => user.posts) 
    @JoinColumn({ 
        name: "email", 
        referencedColumnName: "email" 
    }) user: UserModel;

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeID(7);
        this.slug = slugify(this.title);
    };
};


