/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import IVideoCategory from '../interfaces/videoCategory.interface';
import prisma from '../prisma/Client';

class createCategoryService {
  async execute({ category_name, category_description }: IVideoCategory): Promise<Error | Object> {
    if (category_name.length === 0) {
      return new Error('Category must have a name');
    }

    if (category_description.length === 0) {
      category_description = 'No description';
    }

    if (await prisma.category.findUnique({ where: { category_name } })) {
      return new Error('This category already exists');
    }

    const category = await prisma.category.create({
      data: {
        category_name,
        category_description,
      },
    });

    return category;
  }
}

export default createCategoryService;
