import UserService from './UserService';
import axios from 'axios';
const API_URL = 'https://example.com/api/data'; // Replace this with your API endpoint URL

async function SendEmailService(retryCount: number) {

    let users = await UserService.getUsersWithBirthdayAt9AM();

    for (const user of users) {
        const { email, first_name, last_name, birthday_date, timezone, location } = user.dataValues;
        try {
            // const response = await axios.get(API_URL);
            // const data = response.data;
            // Handle the API response here
        } catch (error) {
            if (retryCount > 0) {
                console.log(`Request failed. Retrying (${retryCount} attempts left)...`);
                return SendEmailService(retryCount - 1);
            } else {
                console.error('Failed to fetch data after retries.');
                return null;
            }
        }
        console.log(email)
    }



}

export default SendEmailService;