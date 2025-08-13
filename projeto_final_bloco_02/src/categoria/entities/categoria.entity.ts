// import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Produto } from "src/produto/entities /produto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_categorias"})
export class Categoria {

   // @ApiProperty()  
    @PrimaryGeneratedColumn()    
    id: number

    //@ApiProperty()  
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    descricao: string

    //@ApiProperty()  
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string

    //@ApiProperty()  
    @UpdateDateColumn()
    data: Date
    
    // @ApiProperty({ type: () => Tema })  
    @ManyToOne(() => Produto, (produto) => produto.categoria, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
    produto: any;


    // @ApiProperty({ type: () => Usuario })  
    // @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    //     onDelete: "CASCADE"
    // })
    // usuario: Usuario

}