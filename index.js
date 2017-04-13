const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const keycloak = new Keycloak({cookies: true, scope: 'offline_access'});

app.use(cookieParser());
app.use(session({secret: 'mysecret', resave: false, saveUninitialized: true, cookie: {}}));
app.use(keycloak.middleware({ logout: '/logout' }));

app.get('/', keycloak.protect(), (req, res) => {
	res.status(200).send('OK');
});

app.listen(3000, () => {
	console.log('Server running...');
});
