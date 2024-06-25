import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { unlinkSync } from 'fs';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create({
      ...createArticleDto,
      image: createArticleDto.image.filename,
    });
    return await this.articleRepository.save(article);
  }

  async findAll() {
    return await this.articleRepository.find();
  }

  async findOne(id: string) {
    return await this.articleRepository.findOneBy({ id });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const oldArt = this.findOne(id);
    if (!oldArt) {
      throw new BadRequestException('Article not found');
    }
    const article = {
      ...updateArticleDto,
      image: updateArticleDto.image.filename,
    };
    return await this.articleRepository.update(id, article);
  }

  async remove(id: string) {
    return await this.articleRepository.delete(id);
  }
}
