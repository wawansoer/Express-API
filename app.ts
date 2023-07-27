import express from 'express';
import cron from 'node-cron';
import router from './Routers';
import sequelize from './Configs/SequelizeConfig';
import User from './Models/UserModel';
import dotenv from 'dotenv';
import SendEmailService from './Services/SendEmailService';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', router);


// run migration automatically 
async function main() {
    try {
        await sequelize.authenticate();
        console.timeStamp("Connected to database")

        // This creates the table in the database. Use force: true only during development to drop the existing table.
        let migrate = false
        if (process.env.FORCE_MIGRATE === "True") {
            migrate = true
            await User.sync({ force: migrate });
            console.info("Success create user table (check on app.ts)")
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

main();


const MAX_RETRY_COUNT = Number(process.env.MAX_RETRY);

cron.schedule('*/3 * * * * *', async () => {
    const data = await SendEmailService(MAX_RETRY_COUNT);
    if (data === null) {
        console.log('Data is null. Exiting cron job.');
        process.exit(0);
    }
});

export default app;