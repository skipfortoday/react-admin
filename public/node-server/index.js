var express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const exec = require('child_process').exec;
const path = require('path');
const multer = require('multer')
const fs = require('fs')
const axios = require("axios");
const FormData = require('form-data');

const webSocketServer = require("websocket").server;
var W3CWebSocket = require("websocket").w3cwebsocket;
var client = new W3CWebSocket("ws://localhost:8081/");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let jardir = __dirname + '/../../../jar/Launcher.jar';
let fpdir = __dirname + '/../../../fp/';
let ssdir = __dirname + '/../../../ss/';

// cek , jika ada fie dev.txt berarti di develop enviroment
if (fs.existsSync(__dirname + "/../../dev.txt")) {
	jardir = __dirname + '/../../dist/win-unpacked/resources/jar/Launcher.jar';
	fpdir = __dirname + '/../../dist/win-unpacked/resources/fp/';
	ssdir = __dirname + '/../../dist/win-unpacked/resources/ss/';
}

const storage = multer.diskStorage({
	destination: path.join(__dirname + '/../../../fp/'),
	filename: function (req, file, cb) {
		cb(null, 'tempFPx' +
			path.extname(file.originalname));
	}
});

var upload = multer({ storage: storage }).single('upload');


// api yang diakses java
app.post('/verifikasi/cancel', (request, response) => {
	// console.log(JSON.parse(JSON.stringify(request.body)))
	// console.log(request.body.Key)
	client.send(
		JSON.stringify({
			type: "userevent",
			data: {
				Status: "cancel",
				Key: request.body.Key,
			}
		})
	);
	response.send("ok");
});
const concat = require("concat-stream");
const { dirname } = require('path');

app.post('/register/result', async (request, response) => {

	let Key = request.body.Key;
	let UserID = request.body.UserID;
	let Status = request.body.Status;
	// console.log(request.body);
	// response.send("ok")

	if (Status == 'done') {

		const fd = new FormData()

		fd.append("UserID", UserID)
		fd.append("file", fs.createReadStream(fpdir + UserID + ".fpt"))

		fd.pipe(concat({ encoding: 'buffer' }, (data) => {
			axios.post("https://absensi.lviors.com/api/uploadfp", data, {
				headers: fd.getHeaders()
			})
				.then(function (response) {
					console.log("respons api server :" + response)
				})
		}))
	}

	client.send(
		JSON.stringify({
			type: "userevent",
			data: {
				Status: Status,
				Key: Key,
				UserID: UserID,
			}
		})
	);

	response.send("ok");
});

const https = require('https');

app.post('/downloadfp', async (req, resp) => {
	let UserIDs = req.body.UserIDs;
	let results = [];
	Promise.all(UserIDs.map(async (UserID, key) => {
		let result = await downloadfptolocal(UserID)
		results.push(result)
		// console.log("complete 1")
		// console.log(results);
		if(key == UserIDs.length-1){ // terpakasa seperti ini karena await tidak jalan
			// console.log("complete all");
			resp.send(results)
		}
	}))
});

app.delete("/deletefingerprint/:id", (req, res) => {
	let UserID = req.params.id;
	let path = fpdir+UserID+".fpt";
	fs.unlink(path, (err) => {
		if (err) {
			// if (err) throw err;
			res.send({status:false, message:"Error saat hapus"})
		}

		axios.delete(
			"https://absensi.lviors.com/api/deletefingerprint/"+UserID
		)
		.then( (response) => {
			res.send({status:true, message:"Berhasil hapus"})
		}).catch((error) =>{
			res.send({status:true, message:"Fingerpirnt lokal berhasil di hapus."})
		});

	});
})

const downloadfptolocal=(UserID)=>{
	return new Promise((resolve, reject) =>{
		let fpserver = "https://absensi.lviors.com/downloadfp?id="+UserID;
		https.get(fpserver, (res) => {
			let path =  fpdir + UserID+".fpt";
			const filePath = fs.createWriteStream(path);
			res.pipe(filePath);
			filePath.on('finish', () => {
				filePath.close();
				resolve({UserID:UserID, Status : true, Message:"Downloaded"})
			})
		})
	})
}

app.get('/downloadfpt', (req, resp) => {

	let fpt = "https://absensi.lviors.com/testdownload";
	let jpg = "https://www.lviors.com/images/sun-gel.jpg";
	
	https.get(fpt, (res) => {
		// Image will be stored at this path
		const path = fpdir + "SB1MIT005.fpt";
		const filePath = fs.createWriteStream(path);
		res.pipe(filePath);
		filePath.on('finish', () => {
			filePath.close();
			console.log('Download Completed');
			resp.send("ok")
		})
	})
});

app.get('/getfplist', async (req, res) => {

	let userFps = ['noempty'];

	fs.readdir(fpdir, async (err, files) => {
		// console.log(files)
		let i = 0;
		files.forEach(file => {
			if (path.extname(file) == '.fpt') {
				userFps.push(path.basename(file).replace(".fpt", ""));
			}
			if (i == files.length - 1) {
				res.send(userFps)
			}
			i++;
		});
	});
})


app.post('/verifikasi/result', async (request, response) => {
	let Key = request.body.Key;
	let UserID = request.body.UserID;
	let Status = request.body.Status;

	let FP = "";
	if (fs.existsSync(fpdir + "/tempFP.png")) {
		FP = new Buffer(fs.readFileSync(fpdir + "/tempFP.png")).toString('base64');
	}

	client.send(
		JSON.stringify({
			type: "userevent",
			data: {
				Status: Status,
				Key: Key,
				UserID: UserID,
				FP: FP
			}
		})
	);
	response.send("ok");
});

app.get('/register/:id/:key', async function (req, res) {
	let userId = req.params.id;
	let key = req.params.key;

	const childPorcess = exec('java -jar ' + jardir + ' "' + userId + '-' + key + '"',
		function (err, stdout, stderr) {
			if (err) {
				console.log(err)
			}
			console.log(stdout)
		})
	res.send('ok')

});

app.get('/verifikasi', async function (req, res) {
	let key = req.query.key;

	const childPorcess =
		exec('java -jar ' + jardir + ' "verifikasi-' + key + '"',
			function (err, stdout, stderr) {
				if (err) {
					console.log(err)
				}
				console.log(stdout)
			})
	res.send('ok')
});

app.get('/', function (req, res) {
	res.send('Hello World');

})

const screenshot = require('screenshot-desktop')

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}
const tgl = () =>{
	var d = new Date;
	return dformat = [
		d.getFullYear(),
		(d.getMonth()+1).padLeft(),
		d.getDate().padLeft()
	].join('_') +'_' +[
	d.getHours().padLeft(),
	d.getMinutes().padLeft(),
	d.getSeconds().padLeft()].join('_');
}

app.get('/screenshoot/:id', (req, res) => {
	let filename = ssdir+req.params.id+"_"+tgl()+".jpeg";
	console.log(filename)

	screenshot({filename:filename}).then((img) => {
		res.send(filename)
	}).catch((err) => {
		// ...
		res.send(err)
	})
})

// app.get('/users', (req, res) => {
	
// })

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})

const wsServer = new webSocketServer({
	httpServer: server,
});
// Generates unique ID for every new connection
const getUniqueID = () => {
	const s4 = () =>
		Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	return s4() + s4() + "-" + s4();
};

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

const sendMessage = (json) => {
	// We are sending the current data to all connected clients
	Object.keys(clients).map((client) => {
		clients[client].sendUTF(json);
	});
};

const typesDef = {
	USER_EVENT: "userevent",
	CONTENT_CHANGE: "contentchange",
};

wsServer.on("request", function (request) {
	var userID = getUniqueID();
	console.log(
		new Date() +
		" Recieved a new connection from origin " +
		request.origin +
		"."
	);
	// You can rewrite this part of the code to accept only the requests from allowed origin
	const connection = request.accept(null, request.origin);
	clients[userID] = connection;
	console.log(
		"connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
	);
	connection.on("message", function (message) {
		if (message.type === "utf8") {
			// console.log(message)
			const dataFromClient = JSON.parse(message.utf8Data);
			const json = dataFromClient;
			sendMessage(JSON.stringify(json));
		}
	});

});