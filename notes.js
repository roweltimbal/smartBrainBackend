/*
=============== Final Project: SmartBrain Back-End Server ========= 07.07.24
=============================================================================

============================ Setting up our Server ============== 07.07.24

We will simply create urls and endpoints and providing a response to the front end.

== Endpoint we want to have:
1. Sign in endpoint
2. Register endpoint
3. Profile: we want name and rank to be displayed. Rank is based on how many links/url we submitted from our profile.

== We wont be touching the front-end first, we will want to figure out the functionality that we want and test it out on something like postman.

== Set up
1. Create a folder
2. npm init
3. install dependecies like express


== Planning our API
Before you start your API, you have to have an idea on how you will design your api.

/ --> res = this is working

/signin --> POST(posting some data/JSON user info) = success/fail 
whenever we create a password, we want to send it inside of the body, ideally over HTTPS, so that it's hidden from man in the middle attacks

/register --> POST(add something to our database) = return newly created user
/profile/:userId --> GET = return the user 
/image --> PUT(updating the score) = return updated user object

============================ /signin and /register ============== 07.07.24

== /signin route

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(express.json());
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).send("error logging in");
  }
});

== /register
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

- In real life we need a database, Ann wasn't added the first time is because we changed the root route, nodemon had to restart the server, the database file in this case is not persistent.

Database run on disks somewhere, it becomes persistent, they don't go down and even if they have, they have backups.


============================ /profile /:id and /image ============== 07.07.24

== Get request, /profile/:id
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("Not found");
  }
});

my version:
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const profile = database.users.find((user) => id === user.id);
  if (!profile) {
    return res.json("No such user");
  }
  res.json({ id: profile.id, name: profile.name, email: profile.email });
});

== Put request /image (updating the image count eveytime they submit an image)

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
    if (!found) {
      res.status(400).json("No user found");
    }
  });
});

my version:
// app.put("/image", (req, res) => {
//   const { id } = req.body;
//   const profile = database.users.find((user) => user.id === id);
//   if (profile) {
//     profile.entries += 1;
//     res.json(profile);
//   } else {
//     res.status(400).json("User not found");
//   }
// });

=========================== Bcrypt Notes ============== 07.013.24
use bcrypt or bcrypt.js, we are still using bcrypt-nodejs just for this project.

=========================== Storing User Passwords ============== 07.013.24

bcrypt allows us to use a very secure login.

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '987;,
      has: '',
      email: 'john@gmail.com'
    }
  ]
};

In real life we would never ever store password like this as a string/plaintext into our database. You will get hacked like this. 

sending to endpoint POST '/signin'
{
    "email": "lui@gmail.com",
    "password": "tennis"
}

Sending it via post request so it would be in the body, we also wanted to send it over HTTPS so that it's encrypted. Cookies will be jumbled up so no one in the middle can't see the meaning.

Second thing is how do we store the password. We store it in a hash and bcrypt, allows us to do it.

=== bcrypt Async:
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});


app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    // Store hash in your password DB.
  });
  console.log(hashPass);
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  console.log(database.users);
  res.json(database.users[database.users.length - 1]);
});

hashed password = $2a$10$SQTc6yDjfu1J8Ezvu.oLuef0cHBi4F.xJpnQDmV3RQvv5/gF2KWuK

It takes a string and jumbles it up. 

Always send any information from frontend to the backend using https in a post body, and if its a password, use something like bcrypt.

======================== Storing Passwords Securely ============== 07.013.24

see notes on module

======================== Connecting to our Frontend ============== 07.013.24
continued on smart-brain face-recognition app.



*/
