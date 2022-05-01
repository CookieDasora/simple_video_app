/* eslint-disable no-param-reassign */
import IVideoCategory from 'interfaces/VideoCategory.interface';
import validator from 'validator';
import prisma from '../prisma/Client';

class updateCategoryService {
  async execute({
    category_name, category_description, author_id, category_id,
  }: IVideoCategory): Promise<Object | Error> {
    if (validator.isUUID(category_id) === false
    || !(await prisma.category.findUnique({ where: { category_id } }))) {
      return new Error('Invalid category_id');
    }

    if (validator.isUUID(author_id) === false
    || !(await prisma.user.findUnique({ where: { id: author_id } }))) {
      return new Error('Invalid author_id');
    }

    const category = await prisma.category.findUnique({ where: { category_id } });

    if (category_name.length === 0) {
      category_name = category.category_name;
    }

    if (category_description.length === 0) {
      category_description = category.category_description;
    }

    const updated = await prisma.category.update({
      where: {
        category_id,
      },
      data: {
        category_name,
        category_description,
      },
    });

    return updated;
  }
}

export default updateCategoryService;
