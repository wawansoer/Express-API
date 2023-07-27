import express from 'express';
import router from './Routers';
import User from './Models/UserModel';

const app = express();
app.use(express.json());
app.use('/', router);

// run migration automatically 
async function main() {
    try {
        // This creates the table in the database. Use force: true only during development to drop the existing table.
        await User.sync({ force: true });
        console.info("Success create user table (check on app.ts)")
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

main();

export default app;