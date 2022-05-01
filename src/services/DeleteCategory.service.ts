import validator from 'validator';
import IVideoCategory from 'interfaces/VideoCategory.interface';
import prisma from '../prisma/Client';

class deleteCategoryService {
  async execute({ category_id, author_id }: IVideoCategory): Promise<Error | String> {
    if (validator.isUUID(category_id) === false
    || !(await prisma.category.findUnique({ where: { category_id } }))) {
      return new Error('Invalid category_id');
    }

    if (validator.isUUID(author_id) === false
    || !(await prisma.user.findUnique({ where: { id: author_id } }))) {
      return new Error('Invalid author_id');
    }

    const category = await prisma.category.findUnique({ where: { category_id } });

    if (category.author_id !== author_id) {
      return new Error('Forbidden');
    }

    await prisma.category.delete({
      where: {
        category_id,
      },
    });

    return 'Category deleted';
  }
}

export default deleteCategoryService;
