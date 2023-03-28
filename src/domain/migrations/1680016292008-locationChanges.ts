import { MigrationInterface, QueryRunner } from "typeorm";

export class locationChanges1680016292008 implements MigrationInterface {
    name = 'locationChanges1680016292008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_location" ("id" varchar PRIMARY KEY NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar, "country" varchar, "countryCode" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_location"("id", "latitude", "longitude", "city", "country", "countryCode") SELECT "id", "latitude", "longitude", "city", "country", "countryCode" FROM "location"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`ALTER TABLE "temporary_location" RENAME TO "location"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" RENAME TO "temporary_location"`);
        await queryRunner.query(`CREATE TABLE "location" ("id" varchar PRIMARY KEY NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar NOT NULL, "country" varchar NOT NULL, "countryCode" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "location"("id", "latitude", "longitude", "city", "country", "countryCode") SELECT "id", "latitude", "longitude", "city", "country", "countryCode" FROM "temporary_location"`);
        await queryRunner.query(`DROP TABLE "temporary_location"`);
    }

}
