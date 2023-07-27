import dotenv from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import router from './Routers';
import sequelize from './Configs/SequelizeConfig';
import User from './Models/UserModel';
import Task from './Models/TaskModel';
import SendEmailService from './Services/SendEmailService';
import TaskService from './Services/TaskService';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', router);

async function main() {
    try {
        await sequelize.authenticate();
        console.timeStamp("Connected to database")

        // This creates the table in the database. Use force: true only during development to drop the existing table.
        let migrate = false
        if (process.env.FORCE_MIGRATE === "True") {
            migrate = true
            await User.sync({ force: migrate });
            await Task.sync({ force: migrate });
            console.info("Success create table (check on app.ts)")
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

main();


// cron.schedule('*/3 * * * * *', async () => {
//     const data = await TaskService.addTask();
//     if (data === null) {
//         console.log('Data is null. Exiting cron job.');
//     }
// });

const MAX_RETRY_COUNT = Number(process.env.MAX_RETRY);
cron.schedule('*/10 * * * * *', async () => {
    const data = await TaskService.getUnsentTasks();
    if (data === null) {
        console.log('Data is null. Exiting cron job.');
    }
    await SendEmailService(data)
});

export default app;