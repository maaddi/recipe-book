# Recipe Book

## 1. Project Description

With the recipe-book application you can create your own digital recipe book. You can also create different accounts to create multiple recipe books for different users.

Features to come:
- Select one or multiple recipes and add them to your grocery list. You can then edit the list and download it/send it per email.

## 2. How to Install and Run the Project
### 2.1. Backend
In order to start the backend server you need to download and install the following things:
- [Java JDK (17 or above)](https://www.oracle.com/at/java/technologies/downloads/#jdk17-windows)
- [PostgreSQL (16.1)](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- [jar file](https://github.com/maaddi/recipe-book/blob/main/backend/target/recipe-book-0.0.1-SNAPSHOT.jar)

While installing postgresql you will get asked to provide a password. It is important to remember this password, because you will need it to run your backend server.

![pw](https://github.com/maaddi/recipe-book/assets/101003016/66317322-208e-4848-8e63-824c30101ab8)

When being asked to enter a port, just leave the default value of 5432.

![port](https://github.com/maaddi/recipe-book/assets/101003016/7cee423d-4ede-460f-9491-987976491bc7)

After downloading and installing the above mentioned things open a shell (cmd, bash, ...) and navigate to the folder where you stored the .jar file. To start the server you then need to type the following command:

`java -jar filename --db.password=your_password`

where "filename" is the name of the jar file and "your_password" is the password you defined for postgresql.

After that your backend server should be up and running.

### 2.2. Frontend
In order to start the frontend server you need to download and install the following things:
- [Frontend folder](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2Fmaaddi%2Frecipe-book%2Ftree%2Fmain%2Ffrontend)
- [Node.js (LTS version)](https://nodejs.org/en)

After that extract the frontend folder you have just downloaded. Open another shell, navigate to the extracted folder and run the command:

`npm install` &rarr; (only needed for the first time, when starting the server)

After that run the following command to start the frontend server:

`npm run ng serve`

## 3. How to Use the Project
(Pending)

## 4. Credits
Source of background image and card image: https://wallpaperswide.com/good_food-wallpapers.html
