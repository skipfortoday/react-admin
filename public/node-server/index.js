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

const sqlite3 = require('sqlite3').verbose();
const Database = require('sqlite-async')
const moment = require("moment");

// const url_endpoint = "https://absensei.lviors.com";
const url_endpoint = "http://localhost:3009";


// , (err) => {
// 	if (err) {
// 		console.error(err.message);
// 	}
// 	console.log('Connected to the sqlite local database.');
// });

// const db = require('./asyncdb.js');


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let jardir = __dirname + '/../../../jar/Launcher.jar';
let fpdir = __dirname + '/../../../fp/';
let ssdir = __dirname + '/../../../ss/';
let dbdir = __dirname + '/../../../db/';

// cek , jika ada fie dev.txt berarti di develop enviroment
if (fs.existsSync(__dirname + "/../../dev.txt")) {
	jardir = __dirname + '/../../dist/win-unpacked/resources/jar/Launcher.jar';
	fpdir = __dirname + '/../../dist/win-unpacked/resources/fp/';
	ssdir = __dirname + '/../../dist/win-unpacked/resources/ss/';
	dbdir = __dirname + '/../../dist/win-unpacked/resources/db/';
}

let db = new sqlite3.Database(dbdir+'local_db.db');
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
			axios.post(url_endpoint+"/api/uploadfp", data, {
				headers: fd.getHeaders()
			})
				.then(function (response) {
					// console.log("respons api server :" + response)
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
			url_endpoint+"/api/deletefingerprint/"+UserID
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
		let fpserver = url_endpoint+"/downloadfp?id="+UserID;
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

	let fpt = url_endpoint+"/testdownload";
	let jpg = "https://www.lviors.com/images/sun-gel.jpg";
	
	https.get(fpt, (res) => {
		// Image will be stored at this path
		const path = fpdir + "SB1MIT005.fpt";
		const filePath = fs.createWriteStream(path);
		res.pipe(filePath);
		filePath.on('finish', () => {
			filePath.close();
			// console.log('Download Completed');
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
			// console.log(stdout)
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
				// console.log(stdout)
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
	// console.log(filename)

	screenshot({filename:filename}).then((img) => {
		res.send(filename)
	}).catch((err) => {
		// ...
		res.send(err)
	})
})

app.get("/onduty", (req, res)=>{
	let q = `SELECT Nama, a.ScanMasuk
	FROM attlog a
	WHERE a.TanggalScan = CURRENT_DATE
	`;
	
	db.all(q, [], (err, rows) => {
		if (err) throw err;
		res.send(rows)
	})
})

app.get("/synctoserver", (req, res)=>{
	// console.log(req.headers)
	let sql = `
		SELECT * FROM attlog 
		WHERE Status = 0 OR (StatusPulang = 0 AND ScanPulang IS NOT NULL)`;
	db.all(sql, [], (err, rows) => {
		if (err) throw err;
		let postData = {attlogs:rows}
		let header ={headers:{kodecabang:req.headers.kodecabang}}
		if(rows.length>0){
			axios
			.post(url_endpoint+"/api/synctoserver", postData, header)
			.then(function (response) {
				console.log("resplocal",response.data)
			})
			.catch(function (error) {
				console.log('error')
			});
		}
		res.send("OK LOKAL")
	})
})

app.post("/synctolocal", async (req, res)=>{

	// let attlogs = [{UserID:"SB1MIT005", TanggalScan:"2021-06-29"}]
	let arr = [];
	let attlogs = req.body.attlogs;
	let i = 0;
	Promise.all(attlogs.map(async (item, key)=>{
		let q = `SELECT * FROM attlog WHERE UserID = "`+item.UserID+`"
			AND TanggalScan = "`+item.TanggalScan+`"`;
		// let log = await db.get(q, [item.UserID, item.TanggalScan]);
		// if(log) arr.push(log)
		db.get(q, [], (err, row) => {
			// if(row) arr.push(row);
			if(!row) {
				let qins = `
				INSERT INTO attlog(
					UserID, TanggalScan, DatangID, Nama, 
					ScanMasuk, ScanPulang, KodeCabang, KodeCabangPulang, Status )
				VALUES(
					?, ?, ?, ?,
					?, ?, ?, ?, ?
				)`;

				let parms = [
					item.UserID, item.TanggalScan, item.DatangID, item.Nama, 
					item.ScanMasuk, item.ScanPulang, item.KodeCabang, item.KodeCabangPulang, 1
				]

				db.run(qins, parms, function(err) {
					// if (err) {
					//   return console.log(err.message);
					// }
					
					console.log("synctolocal", this.lastID, err);
				});
			}else{
				if(row.Status == 0){
					let qupd = `UPDATE attlog 
					SET UserID = ?, TanggalScan = ?, 
					DatangID = ?, Nama = ?, 
					ScanMasuk = ?, ScanPulang = ?, KodeCabang = ?, KodeCabangPulang = ?, 
					Status = ?
					WHERE id = ?`;
					let parms = [
						item.UserID, item.TanggalScan, item.DatangID, item.Nama, 
						item.ScanMasuk, item.ScanPulang, item.KodeCabang, item.KodeCabangPulang, 1,
						row.id
					]
	
					db.run(qupd, parms, function(err) {
						if (err) {
						  return console.log(err.message);
						}
					});

				}
			}
			// sementara, karena belum dapat fungsi asyncnya
			if(i == attlogs.length -1) res.send(arr) 
			i++;
		})
	}))


	// res.send(arr)
})

app.get("/cekuserafterfinger/:id/:action",(req, res)=>{
	let UserID = req.params.id
	let Action = req.params.action

	if(Action == 'masuk'){
		let q = `
			SELECT 
				u.UserID, u.Nama , 
				CASE WHEN a.id IS NULL THEN 1 ELSE 0 END status,
				CASE WHEN a.id IS NULL THEN 'Anda Bisa masuk' ELSE 'Anda Sudah Masuk' END message 
			FROM user u
			LEFT JOIN attlog a ON a.UserID = u.UserID AND a.TanggalScan = CURRENT_DATE
			WHERE u.UserID = '`+UserID+`'
			LIMIT 1
		`;
		// let log = await db.get(q, [item.UserID, item.TanggalScan]);
		// if(log) arr.push(log)
		db.get(q, [], (err, row) => {
			if (err) throw err;
			res.send(row)
		});
	}else{
		res.send("oooo")
	}
})

app.post("/postmasuk", (req, res) => {
	let data = {
        Tanggal: moment.parseZone(moment()).format('YYYY-MM-DD'),
        ScanMasuk: moment.parseZone(moment()).format('HH:mm:ss'),
        UserID: req.body.UserID,
        Nama: req.body.NamaUser.split(" - ")[1],
		DatangID: req.body.DatangID,
		Status:req.body.Status,
		Shift:req.body.Shift,
    }
    let ket = req.body.Keterangan == undefined ? '' : req.body.Keterangan;
	let kodeCabang = req.headers.kodecabang;
	let q = `
		INSERT INTO attlog (
			UserID, TanggalScan, DatangID, Nama, ScanMasuk, 
			KodeCabang, Status, Keterangan, Shift
		) VALUES(
			?, ?, ?, ?, ?,
			?, ?, ?, ?
		)
	`;

	let parms = [
		data.UserID, data.Tanggal, data.DatangID, data.Nama, data.ScanMasuk, 
		kodeCabang,data.Status,ket, data.Shift];
	db.run(q, parms, function(err) {
		// if (err) throw err;
		console.log("postMasukLokal", this.lastID, err);
		res.send({UserID:data.UserID, status:1,message:"" })
	});

	//SELECT P_UserID UserID, ROW_COUNT() `status`, "" message;
})

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
	// console.log(
	// 	new Date() +
	// 	" Recieved a new connection from origin " +
	// 	request.origin +
	// 	"."
	// );
	// You can rewrite this part of the code to accept only the requests from allowed origin
	const connection = request.accept(null, request.origin);
	clients[userID] = connection;
	// console.log(
	// 	"connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
	// );
	connection.on("message", function (message) {
		if (message.type === "utf8") {
			// console.log(message)
			const dataFromClient = JSON.parse(message.utf8Data);
			const json = dataFromClient;
			sendMessage(JSON.stringify(json));
		}
	});

});