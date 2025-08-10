import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754821719989 implements MigrationInterface {
    name = 'Init1754821719989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "api_key" character varying(255) NOT NULL, "title" character varying(100) NOT NULL, "is_favorite" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_efc151a4aafa9a28b73dedc485f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c0e4600dc95b9221319bc708d" ON "chat_sessions" ("is_favorite") `);
        await queryRunner.query(`CREATE INDEX "IDX_870a101d7bc073a6c27865b9ff" ON "chat_sessions" ("api_key") `);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_sender_enum" AS ENUM('user', 'assistant')`);
        await queryRunner.query(`CREATE TABLE "chat_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "session_id" uuid NOT NULL, "sender" "public"."chat_messages_sender_enum" NOT NULL, "content" character varying(10000) NOT NULL, "context" character varying(50000), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40c55ee0e571e268b0d3cd37d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_34bfc66e62161622b54ac9af4a" ON "chat_messages" ("session_id", "created_at") `);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_0672782561e44d43febcfba2984" FOREIGN KEY ("session_id") REFERENCES "chat_sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_0672782561e44d43febcfba2984"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34bfc66e62161622b54ac9af4a"`);
        await queryRunner.query(`DROP TABLE "chat_messages"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_sender_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_870a101d7bc073a6c27865b9ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6c0e4600dc95b9221319bc708d"`);
        await queryRunner.query(`DROP TABLE "chat_sessions"`);
    }

}
