import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { ProdutoService } from 'src/produto/services/produto.service';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    private produtoService: ProdutoService
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    let categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!categoria)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return categoria;
  }

  async findAllByDescricao(descricao: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id)

    await this.produtoService.findById(categoria.produto.id)

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.categoriaRepository.delete(id);
  }
}

// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DeleteResult, ILike, Repository } from 'typeorm';
// import { Categoria } from '../entities/categoria.entity';

// @Injectable()
// export class CategoriaService {
//   constructor(
//     @InjectRepository(Categoria)
//     private categoriaRepository: Repository<Categoria>,
//   ) {}

//   async findAll(): Promise<Categoria[]> {
//     return await this.categoriaRepository.find();
//     relations:{
//       produto: true
//     }
//   }

//   async findById(id: number): Promise<Categoria> {
//     let categoria = await this.categoriaRepository.findOne({
//       where: {
//         id,
//       },
//     });

//     if (!categoria)
//       throw new HttpException(
//         'Categoria não encontrada!',
//         HttpStatus.NOT_FOUND,
//       );

//     return categoria;
//   }

//   async findAllByDescricao(descricao: string): Promise<Categoria[]> {
//     return await this.categoriaRepository.find({
//       where: {
//         descricao: ILike(`%${descricao}%`),
//       },
//     });
//   }

//   async create(categoria: Categoria): Promise<Categoria> {
//     return await this.categoriaRepository.save(categoria);
//   }

//   async update(categoria: Categoria): Promise<Categoria> {
//     let buscaCategoria = await this.findById(categoria.id);

//     if (!buscaCategoria || !categoria.id)
//       throw new HttpException(
//         'Categoria não encontrada!',
//         HttpStatus.NOT_FOUND,
//       );

//     return await this.categoriaRepository.save(categoria);
//   }

//   async delete(id: number): Promise<DeleteResult> {
//     let buscaCategoria = await this.findById(id);

//     if (!buscaCategoria)
//       throw new HttpException(
//         'Categoria não encontrada!',
//         HttpStatus.NOT_FOUND,
//       );

//     return await this.categoriaRepository.delete(id);
//   }
// }

// // import { HttpStatus, Injectable, HttpException } from "@nestjs/common";
// // import { InjectRepository } from "@nestjs/typeorm";
// // import { Categoria } from "../entities/categoria.entity";
// // import { ILike, Repository } from "typeorm";

// // @Injectable()
// // export class CategoriaService {
// //     constructor(
// //         @InjectRepository(Categoria)
// //         private categoriaRepository: Repository<Categoria>,
// //     ) { }

// //     async findAll(): Promise<Categoria[]> {
// //         return await this.categoriaRepository.find()
// //         }

// //     async findById(id: number): Promise<Categoria> {
// //         const categoria = await this.categoriaRepository.findOne ({
// //             where: {
// //                 id
// //             }
// //         });
// //         if (!categoria)
// //             throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);
// //         return categoria;
// //     }

// // async findAllByDescricao(descricao: string): Promise<Categoria[]>{
// //     return await this.categoriaRepository.find({
// //         where:{
// //             descricao:ILike(`%${descricao}`)
// //         }
// //     })
// // }

// // async create(categoria: Categoria): Promise<Categoria> {
// //     return await this.categoriaRepository.save(categoria);
// // }

// // async update(categoria: Categoria): Promise<Categoria> {
// //     await this.findById(categoria.id)
// //     return await this.categoriaRepository.save(categoria)
// // }
// // }

// // async
