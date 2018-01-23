# Hybrid Store

This is a basic AngularJS, NodeJS and MongoDB online shopping cart, to demonstrate a basic MEAN stack app.

## Getting Started

To get started make sure you have MongoDB and NodeJS installed.


These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Once MongoDB and NodeJS have successfully installed navigate to the MongoDB installation folder and open the terminal, you do this by running the following commands in the /bin folder of your installation of MongoDB. This command starts MongoDB as a service. MongoDB should startup without errors.

```
mongod
```

Then run the following command in a seperate window to open up the MongoDB interface within the terminal. This step is not necessary but should you wish to interact with the DB directly you can use this command. The project will interact with the DB through a node api so you need not use the MongoDB console

```
mongo
```


Now we can move to setting up the project, navigate to the root of the project and follow the following the steps.

### Installing

Open a terminal at the root of the project, and run the following scripts to setup the project.

This will install all node dependencies from package.json

```
npm install 
```

once all packages have been downloaded, run the following snippet to download bower dependendecies e.g (Bootstrap, Angular, etc.)

```
bower install
```

Once bower components have downloaded, run the following script. This initializes the database with some users and products

```
node dbinit
```

you should see this

```
DATABASE CREATED!
```

Now we can startup our node server for the app. Run the below script to start the server.

```
node server
```

You should see the below message

```
Server running on port 3000
```

Yay! it works! Below are some of the users you can use of the box, but you can add users through registration. Admin users have to be inserted direclty in the DB.

```
"username":"admin",
"password":"admin123"
"isAdmin":true

"username":"wandile",
"password":"password1"
"isAdmin":true

"username":"steve",
"password":"password2"
"isAdmin":false

"username":"john",
"password":"password4"
"isAdmin":false

```

## Built With

* [MongoDB](https://docs.mongodb.com/manual/) - Dabasebase used
* [NodeJS](https://nodejs.org/en/docs/) - The server used for the api
* [AngularJS](https://docs.angularjs.org/api) - The web framework used

## Authors

* **Wandile Chamane** - *Initial work* - [FrontEndNinja](https://github.com/WandileChamane)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tips for Inspiration, and patients.
* etc

