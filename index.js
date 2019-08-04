let express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	port = 8080;

const config = require('./config');
const cookieParser = require('cookie-parser');
const cors = require('cors');

let coursesRoute = require('./routes/courses'),
	userRoute = require('./routes/users'),
	selectionRoute = require('./routes/selection');

app.set('APP_SECRET', config.secret)
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.use(express.static(__dirname + '/views/'))

app.get('/', function(req, res){
	let sess = req.session;
	console.log(sess)
	res.sendFile(__dirname + '/views/index.html')
})

app.get('/about', function(req, res){
	let sess = req.session;
	console.log(sess)
	res.send('about Page')
})


app.get('/home', function(req, res){
	res.send('home page')
})












app.use('/api/courses/', coursesRoute);
app.use('/api/users/', userRoute);
app.use('/api/selections/', selectionRoute);

app.listen(port, function(){
	console.log("app is running");
})

