# E-commerce-Application

Prerequisite - 

Here we are using Angular for front-end and node for back-end and postgres as DataBase.

1) installed postgres server and start the server
2) create a database with name "training" in your postgres.

***********************************************************************************************************************************************************

To run this application on your localhost, follow the following steps - 

1) clone this git repo on your local disk

2) open my-app with terminal and type  "npm install" and after that type  "ng serve --open" ,
with this it will run on some localhost, e.g. http://localhost:4200/home

3) open backend with terminal and type   "npm install" and after that type  "npm start" ,
with this it will run on localhost, e.g. http://localhost:8000.
Note - Make sure your localhost with 8000 port is available.

NOTE - once it is then you will see a file named as "db.config.js" at location "/E-Commerce/my-backend/app/configs/db.config.js".
open this db.config file and match the credentials according to yout postgres connection like postgres user, password etc.
and save the file.

4) go to browser where your main application is running

5) type "http://localhost:4200/mockdata" in url and u will see a button with name "add product mock data" , just click on this button,
it will add all products in product table and then products will be loaded when user will login.
Note - perform this step only one time.

6) Wollaa, once this is done then again go to "http://localhost:4200/home" url and from here you can  use it in same way as a regular 
real time e-commerce website. Now, you can register, login, visit different sections , add item to cart, place orders, make payments, etc.

