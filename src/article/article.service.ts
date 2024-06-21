import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(article);
  }

  async findAll() {
    return await this.articleRepository.find();
  }

  async findOne(id: string) {
    return await this.articleRepository.findOneBy({ id });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: string) {
    return await this.articleRepository.delete(id);
  }
}
