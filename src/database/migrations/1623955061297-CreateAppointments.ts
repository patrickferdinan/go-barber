import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateAppointments1623955061297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'update_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        );

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName:'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
