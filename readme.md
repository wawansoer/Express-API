

# Birthday Message Service Using Express

## System Requirement 

 1. Node >= 14 
 2. PostgreSQL 

## How To Run This Project  

 1. Run this code below 
	  ``` bash 
	  npm install 
	  ```
     
 2. Set .env file 
	```bash
	DB_USER = postgres 
	DB_PASSWORD = postgres 
	DB_NAME = express 
	DB_HOST = 127.0.0.1 
	DB_PORT = 5432 
	DB_LOG = True # True or False 
	FORCE_MIGRATE = True # True or False
	```
	 if FORCE_MIGRATE True that will be automatically create created tables on database

 3. Available command
	 ``` bash 
	 npm run dev 
	 npm run debug
	 npm run build 
	 ```
	 
## What is inside

 1. Create user using this this 
	```
	curl --location 'localhost:3000/user' \
	--header 'Content-Type: application/json'\
	 --data-raw '
	{
    "email": "v@a.com",
    "first_name": "aw",
    "last_name": "123",
    "birthday_date": "1993-07-28",
    "timezone": "Asia/Jakarta",
    "location": "Jakarta"
    }'
	```
 2. Delete using this 
	```
	curl --location --request DELETE 'localhost:3000/user/1'
	```
 3. Update user using this
	```
	curl --location --request PUT 'localhost:3000/user/1' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "email": "v@a.com",
    "first_name": "asd",
    "last_name": "sadasd",
    "birthday_date": "1993-07-28",
    "timezone": "Asia/Jakarta",
    "location": "Jakarta"
	}'
	```
 4. There is two cron running on this system which first cron is running every 30 minutes to get which user have a birthday at 9 AM on their local timezone and save to task table. And second Cron is running every 30 seconds to send Happy Birthday Email to Users based on task table sent status is false.
 

