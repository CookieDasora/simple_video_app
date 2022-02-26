import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategories1645884408398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'category_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'category_name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'category_description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
