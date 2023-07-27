import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
let db_log = false
if (process.env.DB_LOG === "True") {
    db_log = true
}
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        logging: db_log,
        pool: {
            max: 3,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        dialectOptions: {
            useUTC: true,
            dateStrings: true,
            typeCast: true,
        },
        timezone: "+00:00",
    }
);


export default sequelize;