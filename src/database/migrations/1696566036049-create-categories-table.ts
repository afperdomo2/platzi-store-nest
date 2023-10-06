import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriesTable1696566036049 implements MigrationInterface {
  name = 'CreateCategoriesTable1696566036049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_categories" ("productsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_4a051f8c72746f27e055d4aa8db" PRIMARY KEY ("productsId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_caf983c81021c4ea13c01f2cc3" ON "products_categories" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a66867266e5ba86d1a296bbb5c" ON "products_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" ADD CONSTRAINT "FK_caf983c81021c4ea13c01f2cc33" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" ADD CONSTRAINT "FK_a66867266e5ba86d1a296bbb5cb" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_categories" DROP CONSTRAINT "FK_a66867266e5ba86d1a296bbb5cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" DROP CONSTRAINT "FK_caf983c81021c4ea13c01f2cc33"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a66867266e5ba86d1a296bbb5c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_caf983c81021c4ea13c01f2cc3"`,
    );
    await queryRunner.query(`DROP TABLE "products_categories"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
