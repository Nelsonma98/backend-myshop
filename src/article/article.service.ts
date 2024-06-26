import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { deleteFile } from 'src/helper/image.tools';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create({
      ...createArticleDto,
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
    try {
      const oldArt = await this.findOne(id);
      if (!oldArt) {
        throw new BadRequestException('Article not found');
      }
      await deleteFile(oldArt.image);
      const article = {
        ...updateArticleDto,
      };
      return await this.articleRepository.update(id, article);
    } catch (error) {
      error.status = 500;
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const article = await this.findOne(id);
      if (!article) {
        throw new BadRequestException('Article not found');
      }
      await deleteFile(article.image);
      return await this.articleRepository.delete(id);
    } catch (error) {
      error.status = 500;
      throw error;
    }
  }
}
