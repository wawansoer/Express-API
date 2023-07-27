import Task from '../Models/TaskModel';
import TaskService from './TaskService';
import axios from 'axios';
const API_URL = 'https://email-service.digitalenvision.com.au/send-email';

async function SendEmailService(datas: any) {

    // console.log(datas)
    for (const data of datas) {
        const { id, email, message, sent, } = data.dataValues;
        axios
            .post(API_URL,
                {
                    email: email,
                    subject: 'Happy Birthday!',
                    message: message,
                })
            .then((response) => {
                if (response.data.status === 'sent') {
                    TaskService.markTaskAsSentById(id)
                }
                console.log('Response data:', response.data.status);
            })
            .catch((error) => {
                // If there's an error in the request or the server responds with an error status code
                console.error('Error sent email data:', error);
            });
    }

}

export default SendEmailService;