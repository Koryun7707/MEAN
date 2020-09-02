const express = require('express');
const bodyParser = require('body-parser');
const {logger} = require('./components/logger');


const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: '12345',
    resave :false,
    saveUninitialized:true,
    cookie:{secure:false}
}));


require('./controllers/passport')(passport);

require("./components/mongo");
logger.info("APP START ----------");


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

const userController = require('./controllers/user');
app.post('/api/user', userController.addUser);
app.get('/api/user',passport.authenticate('jwt',{session:false}),userController.getUser);
app.put('/api/user', userController.updateUser);
app.delete('/api/user/:id', userController.deleteUser);

app.post('/api/user/auth',userController.auth);

const Upload = require('./controllers/uploadFile');
app.post('/api/user/fileupload', Upload.upload.single('file'), Upload.uploadFile);
app.get('/api/user/getFile', Upload.openUploadFile);

//Fcebook Auth
const uri = 'http://localhost:4200'
app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: uri+'/login',successRedirect: uri+'/profile'}));


app.listen(3000, () => {
    console.log('server has benn started');
})
