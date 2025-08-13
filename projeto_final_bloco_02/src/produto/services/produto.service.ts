import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../entities /produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private temaRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.temaRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    let produto = await this.temaRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findAllByPreco(preco: string): Promise<Produto[]> {
    return await this.temaRepository.find({
      where: {
        preco: ILike(`%${preco}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(Produto: Produto): Promise<Produto> {
    return await this.temaRepository.save(Produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    return await this.temaRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.temaRepository.delete(id);
  }
}
