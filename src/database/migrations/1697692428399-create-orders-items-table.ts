import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersItemsTable1697692428399 implements MigrationInterface {
  name = 'CreateOrdersItemsTable1697692428399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders_items" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_0fd87b790d35ac255b17f6a3bd1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_dbffa0e72d9de7f8b08c83df153" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD CONSTRAINT "FK_a64e204bf61651554cedd2988f1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP CONSTRAINT "FK_a64e204bf61651554cedd2988f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP CONSTRAINT "FK_dbffa0e72d9de7f8b08c83df153"`,
    );
    await queryRunner.query(`DROP TABLE "orders_items"`);
  }
}
