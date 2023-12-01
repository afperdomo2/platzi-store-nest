import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameIndexProducts1701404104577 implements MigrationInterface {
  name = 'AddNameIndexProducts1701404104577';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_4c9fb58de893725258746385e1" ON "products" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c9fb58de893725258746385e1"`,
    );
  }
}
