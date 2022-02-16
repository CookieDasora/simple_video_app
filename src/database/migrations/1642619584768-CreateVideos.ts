import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVideos1642619584768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'videos',
        columns: [
          {
            name: 'video_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'author_id',
            type: 'uuid',
          },
          {
            name: 'originalname',
            type: 'varchar',
          },
          {
            name: 'filename',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'numeric',
          },
          {
            name: 'url',
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
    await queryRunner.dropTable('videos');
  }
}
