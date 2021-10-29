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

const url_endpoint = "https://absensi.lviors.com";
// const url_endpoint = "http://localhost:3009";
const html_to_pdf = require('html-pdf-node');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let jardir = __dirname + '/../../../jar/Launcher.jar';
let jdkdir = __dirname + '/../../../jar/jdk/bin';
let smtdir = __dirname + '/../../../jar/sumatrapdf';
let fpdir = __dirname + '/../../../fp/';
let ssdir = __dirname + '/../../../ss/';
let dbdir = __dirname + '/../../../db/';
let printServer = __dirname + '/../../../print/';

// cek , jika ada fie dev.txt berarti di develop enviroment
if (fs.existsSync(__dirname + "/../../dev.txt")) {
	jardir = __dirname + '/../../dist/win-unpacked/resources/jar/Launcher.jar';
	jdkdir = __dirname + '/../../dist/win-unpacked/resources/jar/jdk/bin';
	smtdir = __dirname + '/../../dist/win-unpacked/resources/jar/sumatrapdf';
	fpdir = __dirname + '/../../dist/win-unpacked/resources/fp/';
	ssdir = __dirname + '/../../dist/win-unpacked/resources/ss/';
	dbdir = __dirname + '/../../dist/win-unpacked/resources/db/';
	printServer = __dirname + '/../../dist/win-unpacked/resources/print/';
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

let cssPrint = `html{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"; color:#333;} .page-break{page-break-after: always;} table td{padding:0 .2rem!important}.table-print{width:100%;border-collapse:collapse;}.tr-head{text-align:center}.tr-head th{border:1px solid #666;border-bottom:3px double #666;border-collapse:collapse; padding:0px 5px}.tr-row{margin-bottom:2px}.tr-row td{border:1px solid #666; border-collapse:collapse !important;}.tr-row-red td{border-bottom:2px solid red!important}.tfoot-print{border-top:3px double #333}.tf-td{padding:0!important;font-size:12px;font-weight:600}.tf-col{display:inline-block;vertical-align:top;margin-right:20px}.tf-row{display:block;width:100%;font-size:12px}.tf-row-col{display:inline-block;vertical-align:top}.tr-row-detail .tf-row-col{text-align:center;border-right:1px solid #333}.tr-row-detail .tf-row-col:last-child{border-right:none}.tr-row-red>td:first-child{color:red}.container-table-print{padding-left:30px;padding-right:30px}.tr-row{font-size:12px!important}.tf-row{display:table}.tf-row-col{display:table-cell}.tr-head th{background-color:#eee}.table-print td,.table-print th{border-color:#999}.table-print td{padding-top:2px!important;padding-bottom:3px!important}@media print{html{margin:0;border:initial;border-radius:initial;width:initial;min-height:initial;box-shadow:initial;background:initial;page-break-after:always}body{background-color:brown;margin:0!important;padding:0!important}.div-table-print{padding:0!important;margin:0!important;margin-top:-55px}.container-table-print{margin:0!important;padding:0!important;width:100%!important}.table-print{width:100%;border-collapse:collapse}}`

app.get('/start-server-printer', (req, res)=>{
	// let cmd = 'nodemon '+printServer+'index.js'
	let cmd = 'cd '+printServer+' && npm run mulai'
	exec(cmd,
		function (err, stdout, stderr) {
			if (err) {
				console.log(err)
			}
			// console.log(stdout)
		})
	res.send({status:"ok"})
})


app.get('/stop-server-printer', (req, res)=>{
	// let cmd = 'nodemon '+printServer+'index.js'
	let cmd = 'cd '+printServer+' && npm run stop'
	exec(cmd,
		function (err, stdout, stderr) {
			if (err) {
				console.log(err)
			}
			// console.log(stdout)
		})
	res.send({status:"ok"})
})

app.post('/print-laporan-absensi', (req, res) => {
	
	let options = { 
		// format: 'A4', 
		path: fpdir+"test.pdf",
		width: "210mm",
		height: "330mm",
		printBackground :true
	};
	// Example of options with args //
	// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
	let reports = req.body.data
	let html = `<div class="div-table-print">`;
	let admin = req.body.admin

	for(var i=0; i<reports.length;i++){
		let item = reports[i]
		let arrobj = item.data.body
		let expands = item.expandKey
		var rowsLaporan = [];
		for(var data in arrobj){
			rowsLaporan.push(arrobj[data])
		};
		let footer = item.data.footer
		
		html += `<div class="container-table-print">
		<table style="width:100%; max-width:100%" class="table-print" cellspacing="0">
			<thead>
				<tr>
				<td colspan="12">
					<img style="width:60px; display:inline-block" src="http://localhost:3000/images/logo-lviors-hitam.png" alt="Lviors"/>
					<div style="font-size:12px; font-weight:600; display:inline-block; vertical-align:top; margin-left:10px" colSpan="2">
					<div style="margin-bottom:-2px">`+item.data.header.NamaHead+`</div>
					<div style="margin-bottom:-2px">`+item.data.header.Alamat+`</div>
					<div style="margin-bottom:-2px">`+item.data.header.NoTelp+`</div>
					</div>
				</td>
				</tr>
				<tr>
					<td colSpan="12">
						<div style="text-align: center; text-decoration:underline; font-weight:600"> Absensi Per Karyawan</div>
					</td>
				</tr>
				<tr style="font-size:12px; font-weight:600">
				<td colSpan="12">
					<div style="margin-bottom:-5px">
					<div style="display:inline-block; width:120px">Periode</div>
					<div style="display:inline-block; width:20px">:</div>
					<div style="display:inline-block">`+footer.Periode+`</div>
					</div>
				</td>
				</tr>
				<tr style="font-size:12px; font-weight:600">
					<td colSpan="12">
						<div style="margin-bottom:-5px">
							<div style="display:inline-block; width:120px">Nama</div>
							<div style="display:inline-block; width:20px">:</div>
							<div style="display:inline-block">`+item.data.header.Nama+`</div>
						</div>
					</td>
				</tr> 
				
				<tr style="font-size:12px; font-weight:600">
					<td colSpan="12" style="padding:0px !important">
						<div style="margin-left:3px">
							<div style="display:inline-block; width:120px">Posisi / Jabatan</div>
							<div style="display:inline-block; width:20px">:</div>
							<div style="display:inline-block">`+item.data.header.Posisi+`</div>
						</div>
					</td>
				</tr>
				<tr>
					<th colspan="12" style="height:10px; border-top:2px solid #333; margin-top:5px"></th>
				</tr>
				<tr class="tr-head" style="font-size:12px">
					<th>Tanggal</th>
					<th>Datang</th>
					<th>Pulang</th>
					<th>Tlmbt</th>
					<th style="width:10px !important">Lmbur</th>
					<th style="width:10px !important">Shift</th>
					<th style="width:10px !important">Break</th>
					<th style="width:10px !important">Kmbl</th>
					<th>Tlmbt</th>
					<th>Status</th>
					<th>Keterangan</th>
					<th>Ket.Pulang</th>
				</tr>
			</thead>`;
			html += `<tbody>`
				for(var x=0; x<rowsLaporan.length; x++){
					let row = rowsLaporan[x]
					let trrow = "tr-row";
					if(row.w == 0) trrow += ' tr-row-red'
					let colorRed = row.Terlambat != null ? "#f00" : "#333"
					let dtg = row.ScanMasuk == null ? '' : row.ScanMasuk
					let plg = row.ScanPulang == null ? '' : row.ScanPulang
					let tlmbt = row.Terlambat == null ? '' : row.Terlambat
					let lmbur = row.Lembur ==  null ? '' : row.Lembur
					let shift = row.Shift == null ? '' : row.Shift
					let istKlr = row.IstirahatKeluar == null ? '' : row.IstirahatKeluar
					let istKbl = row.IstirahatKembali == null ? '' : row.IstirahatKembali
					let tlmbtKbl = row.TerlambatIstirahat == null ? '' : row.TerlambatIstirahat
					let status = row.CaraMasuk == 'HPWFH' ? 'WFH' : row.Status == null ? '' : row.Status
					let ket = row.Keterangan == null ? '' : row.Keterangan
					let ketPlg = row.KetPulang == null ? '' : row.KetPulang
					console.log(row.CaraMasuk)
					console.log(status)
					html+= `<tr class="`+trrow+`">
						<td style="text-align:right; white-space:nowrap; width:90px">`+row.Tanggal+`</td>
						<td style="text-align:center; font-weight:600; color:`+colorRed+`">`+dtg+`</td>
						<td style="text-align:center; font-weight:600">`+plg+`</td>
						<td style="text-align:center; font-weight:600; color:#f00">`+tlmbt+`</td>
						<td style="text-align:center; font-weight:600; color:teal; width:10px !important">`+lmbur+`</td>
						<td style="text-align:center;">`+shift+`</td>
						<td style="text-align:center;">`+istKlr+`</td>
						<td style="text-align:center;">`+istKbl+`</td>
						<td style="text-align:center;">`+tlmbtKbl+`</td>
						<td style="text-align:center;">`+status+`</td>
						<td style="text-align:center;">`+ket+`</td>
						<td style="text-align:center;">`+ketPlg+`</td>
					</tr>`
					if(row.detail.length > 0){
						for(var y =0; y<row.detail.length; y++){
							let dt = row.detail[y]
							html += `
								<tr class="tr-row tr-row-detail">
									<td style="text-align:right; font-weight:600">Keluar Kantor</td>
									<td style="text-align:center; white-space:nowrap; font-weight:600; color:`+colorRed+`" colspan="2">`+dt.KelKan+`</td>
									<td style="text-align:left; font-weight:600" colspan="2">`+dt.Durasi+`</td>
									<td style="text-align:left;" colspan="5"><span style="font-weight:600">Ket :</span>`+dt.Ket.replace("Ket. :","")+`</td>
									<td style="text-align:left;" colspan="2"><span style="font-weight:600">Ket. Kembali :</span> `+dt.KetKembali.replace("Ket. Kembali :","")+`</td>
								</tr>`
						}
					}
				}
			html +=`</tbody>`
			
			html += `
			<tbody class="tfoot-print">
				<tr>
				<td colspan="12" class="tf-td">
					<div style="width:100%;">
						<div style="width:35%;" class="tf-col">
							<div class="tf-row">
								<div class="tf-row-col" style="width:135px">Ijin Terlambat</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col">`+footer.IjinTerlambat+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:130px">Jumlah Terlambat</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:30px; color:#f00">`+footer.JumTerlambat+`</div>
								<div class="tf-row-col" style="width:20px">=</div>
								<div class="tf-row-col" style="width:60px; text-align:right; color:#f00">`+footer.RpPotonganTerlambat+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:130px">Ijin Tidak Masuk</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:30px; color:#f00">`+footer.JumlahIzinTidakMasuk+`</div>
								<div class="tf-row-col" style="width:20px">=</div>
								<div class="tf-row-col" style="width:60px;text-align:right; color:#f00">`+footer.RpPotonganTidakMasuk+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:130px">Trlmbt Kmbl Istrht</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:30px; color:#f00">`+footer.TerlambatKembali+`</div>
								<div class="tf-row-col" style="width:20px">=</div>
								<div class="tf-row-col" style="width:60px; text-align:right; color:#f00">`+footer.RpPotKembaliIstirahat+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:130px"></div>
								<div class="tf-row-col" style="width:20px">&nbsp;</div>
								<div class="tf-row-col" style="width:30px; color:#f00"></div>
								<div class="tf-row-col" style="width:20px">&nbsp;&nbsp;</div>
								<div class="tf-row-col" style="width:60px; text-align:right">---------</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:130px">Total Potongan</div>
								<div class="tf-row-col" style="width:20px"></div>
								<div class="tf-row-col" style="width:30px; color:#f00"></div>
								<div class="tf-row-col" style="width:20px">=</div>
								<div class="tf-row-col" style="width:60px; text-align:right; color:#f00">`+footer.TotalPotongan+`</div>
							</div>
							<div class="tf-row" style=" margin-top:20px">
								<div class="tf-row-col" style="width:130px; font-size:12px; font-style:italic">`+footer.TglPrint+` `+admin+`</div>
							</div>
						</div>
						<div style="width:25%" class="tf-col">
							<div class="tf-row">
								<div class="tf-row-col" style="width:200px">Jml Sakit Bulan Ini</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:40px; text-align:left">`+footer.JumlahSakit+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:200px">Jml Cuti Bulan Ini</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:40px; text-align:left">`+footer.JumlahCuti+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:200px">Ijin Tidak Masuk</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:40px; text-align:left">`+footer.JumlahIzinTidakMasuk+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:200px"></div>
								<div class="tf-row-col" style="width:20px"><span style="border-bottom:1px solid #000; display:block; width:50px; height:20px; margin-right:-20px"></span></div>
								<div class="tf-row-col" style="width:40px; text-align:right">+</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:200px">Total Tidak Masuk</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:40px; text-align:left">`+footer.TotalTidakMasuk+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:200px">Total Cuti Tahun Ini</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:40px; text-align:left">`+footer.TotalCutiThnIni+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:200px">Sisa Cuti</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:40px; text-align:left">`+footer.SisaCuti+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:200px">Cuti Khusus Bulan Ini</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:40px; text-align:left; color:#f00">`+footer.JumlahCutiKhusus+`</div>
							</div>
						</div>
						<div style="width:27%;" class="tf-col">
							<div class="tf-row">
								<div class="tf-row-col" style="width:140px">Jml Lembur</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="text-align:left">`+footer.JumlahLembur+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:140px">Total Lembur</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="text-align:left">`+footer.TotalJamLembur+`</div>
							</div>
							<div class="tf-row" style="margin-top:00px">
								<div class="tf-row-col" style="width:140px">OFF</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="text-align:left">`+footer.JumlahOFF+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:140px">Jml Masuk Kantor</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="text-align:left">`+footer.JmlMasukKantor+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:140px">Jml Dinas Luar</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="text-align:left">`+footer.JumlahDinasLuar+`</div>
							</div>
							<div class="tf-row">
								<div class="tf-row-col" style="width:300px; white-space:nowrap">ACC Lupa Absen (Dari Awal Kerja)</div>
								<div class="tf-row-col" style="width:20px">:</div>
								<div class="tf-row-col" style="width:40px; text-align:left; color:#f00">`+footer.AccLupaAbsen+`</div>
							</div>
						</div>
					</div>
				</td>
				</tr>
			</tbody>
			`
		html +=`
		</table>
		<div class="page-break"></div>
		</div>`; // end container-table-print
	}
	
	html += `</div>`; // end div-table-print
	let file = { 
		content: `
		<html style="padding:10px">
		<style>`+cssPrint+`</style>
		<body style="padding:0px; margin:0; background:#fff !important">
			`+html+`
		</body>
		</html>` 
	};
	// or //
	// let file = { url: "https://example.com" };
	html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
		console.log("PDF Buffer:-", pdfBuffer);
		// res.send(pdfBuffer)
		let javaCommand = jdkdir+'/java -jar ' + jardir + ' "printlaporanabsensi"'
		let sumatraCommand = smtdir+'/sumatrapdf.exe -print-dialog '+fpdir+'test.pdf'
		exec(sumatraCommand,
		function (err, stdout, stderr) {
			if (err) {
				console.log(err)
			}
			// console.log(stdout)
		})
		res.send({status:"ok alallalal"})
	});
})


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

	const childPorcess = exec(jdkdir+'/java -jar ' + jardir + ' "' + userId + '-' + key + '"',
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
	exec(jdkdir+'/java -jar ' + jardir + ' "verifikasi-' + key + '"',
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

const screenshot = require('screenshot-desktop');
const { Jumbotron } = require('reactstrap');

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

app.get("/api/onduty", (req, res)=>{
	let q = `SELECT UserID, Nama, a.ScanMasuk, ScanPulang, Status, StatusPulang
	FROM attlog a
	WHERE a.TanggalScan = CURRENT_DATE
	AND (ScanMasuk IS NOT NULL OR ScanPulang IS NOT NULL)
	`;
	
	db.all(q, [], (err, rows) => {
		if (err) throw err;
		res.send(rows)
	})
})

app.get("/api/list-offline", (req, res) => {
	let filter = req.query.filter
	let q = `
	SELECT 
		a.UserID || STRFTIME('%Y%m%d', TanggalScan) k,
		a.id,
		a.DatangID,
		a.UserID,
		a.UserID || ' - ' || a.Nama as Nama,
		a.TanggalScan, a.Shift, a.ScanMasuk, a.KodeCabang, a.Status,
		a.ScanPulang, a.KodeCabangPulang, a.StatusPulang, a.Keterangan, a.KetPulang
	FROM attlog a
	ORDER BY a.TanggalScan DESC
	`;
	db.all(q, [], (err, rows) => {
		if (err) throw err;
		res.send(rows)
	})
})

app.post("/api/attlogmanual", (req, res)=>{
	// res.send(req.body);
	let data = req.body
	let nama = data.NamaUser.split(" - ")[1]
	let sql = `
	INSERT INTO attlog(
		UserID, TanggalScan, Shift, 
		Nama, ScanMasuk, KodeCabang, Keterangan
	) VALUES(
		'`+data.UserID+`', DATE(CURRENT_DATE, 'localtime'), `+data.Shift+`, 
		'`+nama+`', TIME(CURRENT_TIME, 'localtime'), '`+req.headers.kodecabang+`', 'Absen Offline'
	)`
	
	db.run(sql, [], function(err) {
		if (err) throw err;
		res.send({status:true, message:"Absens berhasil"})
	});
})

app.put('/api/datangmanual/:id', (req, res) => {
	let id = req.params.id
	if(id == 0){
		
		let data = req.body
		let nama = data.NamaUser.split(" - ")[1]
		let sql = `
		INSERT INTO attlog(
			UserID, TanggalScan,
			Nama, ScanPulang, KodeCabangPulang, KetPulang
		) VALUES(
			'`+data.UserID+`', DATE(CURRENT_DATE, 'localtime'), 
			'`+nama+`', TIME(CURRENT_TIME, 'localtime'), '`+req.headers.kodecabang+`', 'Absen Offline'
		)`;

		db.run(sql, [], function(err) {
			if (err) {
			  throw err
			}
			res.send({status:true, message:"Berhasil pulang" })
		});

	}else{
		let sql = `
		UPDATE attlog
		SET ScanPulang = TIME(CURRENT_TIME, 'localtime'), KodeCabangPulang = '`+req.headers.kodecabang+`' , KetPulang = 'Absen Offline'
		WHERE id = `+req.params.id+``;
		db.run(sql, [], function(err) {
			if (err) {
			  throw err
			}
			res.send({status:true, message:"Berhasil pulang" })
		});
	}
})

// app.get("/api/optusermanual", (req, res) => {
// 	let q = `SELECT
// 	DISTINCT UserID AS value, UserID || ' - ' || Nama AS label 
// 	FROM user 
// 	WHERE  
	
// 	UserID NOT IN ( 
// 		SELECT UserID FROM attlog WHERE TanggalScan = DATE(CURRENT_DATE, 'localtime')
// 		AND ScanPulang IS NULL
// 		AND ScanMasuk IS NOT NULL 
// 	) 
// 	AND Status IN('001','111','101') 
// 	AND KodeCabang = '`+req.headers.kodecabang+`'
// 	ORDER BY label ASC`;
	
// 	db.all(q, [], (err, rows) => {
// 		if (err) throw err;
// 		res.send(rows)
// 	})
// })

app.get("/api/optusermanual", (req, res) => {
	let q = `SELECT
	DISTINCT UserID AS value, UserID || ' - ' || Nama AS label 
	FROM user 
	WHERE  
	
	UserID NOT IN ( 
		SELECT UserID FROM attlog WHERE TanggalScan = DATE(CURRENT_DATE, 'localtime')
		AND ScanPulang IS NULL
		AND ScanMasuk IS NOT NULL 
	) 
	-- AND Status IN('001','111','101') 
	AND KodeCabang = '`+req.headers.kodecabang+`'
	ORDER BY label ASC`;
	
	db.all(q, [], (err, rows) => {
		if (err) throw err;
		res.send(rows)
	})
})

app.get("/api/optusermanualpulang", (req, res) => {
	let q = `SELECT
	DISTINCT UserID AS value, UserID || ' - ' || Nama AS label 
	FROM user 
	WHERE  
	
	UserID NOT IN ( 
		SELECT UserID FROM attlog WHERE TanggalScan = DATE(CURRENT_DATE, 'localtime')
		AND ScanPulang IS NOT NULL
		-- AND ScanMasuk IS NOT NULL 
	) 
	-- AND Status IN('001','111','101') 
	AND KodeCabang = '`+req.headers.kodecabang+`'
	ORDER BY label ASC`;
	// let q = `
	// SELECT 
	// 	a.id,
	// 	a.DatangID, 
	// 	a.UserID value, 
	// 	a.Nama label 
	// FROM attlog a
	// LEFT JOIN user u ON a.UserID = u.UserID
	// WHERE a.TanggalScan = CURRENT_DATE
	// AND a.ScanPulang IS NULL 
	// AND a.ScanMasuk IS NOT NULL 
	// AND u.Status IN('001','111','101')`;
	
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

app.get("/api/cekuserafterfinger/:id/:action",(req, res)=>{
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
			console.log(row)
			res.send(row)
		});
	}else{
		let q = `
		SELECT b.id, b.ScanMasuk, b.ScanPulang, u.UserID, u.Nama, 
			CASE 
				WHEN b.id IS NULL THEN 1
				WHEN b.id IS NOT NULL AND b.ScanPulang IS NULL THEN 1 
				WHEN b.id IS NOT NULL AND b.ScanPulang IS NOT NULL THEN 0
			END status,
			CASE 
				WHEN b.id IS NULL THEN 'Anda bisa absen pulang'
				WHEN b.id IS NOT NULL AND b.ScanPulang IS NULL THEN 'Anda bisa pulang' 
				WHEN b.id IS NOT NULL AND b.ScanPulang IS NOT NULL THEN 'Anda sudah pulang'
			END message
		FROM (
			SELECT 1
		) a
		LEFT JOIN (
			SELECT id, ScanMasuk, ScanPulang, UserID, Nama
			FROM attlog WHERE 
			TanggalScan = DATE(CURRENT_DATE, 'localtime')
			AND UserID = '`+UserID+`'
		) b
		LEFT JOIN user u ON u.UserID = '`+UserID+`'
		`;

		db.get(q, [], (err, row) => {
			if (err) throw err;
			res.send(row)
		});
	}
})

app.get("/users", async (req, res)=>{
	let q = "SELECT * FROM user"
	let users = []
	db.all(q, [], (err, rows) => {
		if (err) throw err;
		//res.send(rows)
		Promise.all(rows.map((item) => {
			users.push(item.UserID)
		}))
		res.send(users)
	})
})

app.post("/download-user", (req, res) => {
	let q = `INSERT INTO user(UserID, KodeCabang, Nama, GroupID, Status) 
	VALUES(?, ?, ?, ?, ?)`;
	let parms = [req.body.UserID, req.body.KodeCabang, req.body.Nama, req.body.GroupID, req.body.Status]
	db.run(q, parms, function(err) {
		if (err) throw err;			
		res.send({status:true, message:req.body.UserID +" berhasil didownload"})
	})
	//res.send(req.body)
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
	const connection = request.accept(null, request.origin);
	clients[userID] = connection;
	connection.on("message", function (message) {
		if (message.type === "utf8") {
			// console.log(message)
			const dataFromClient = JSON.parse(message.utf8Data);
			const json = dataFromClient;
			sendMessage(JSON.stringify(json));
		}
	});
});