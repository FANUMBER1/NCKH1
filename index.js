const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const expressWs = require('express-ws');
const app = express();
const prisma = new PrismaClient();
expressWs(app);

app.use(bodyParser.json());
const port = 2222;
app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.post('/data', async (req, res) => {
    const { heartRate, spo2 } = req.body;

    try {
        await prisma.healthData.create({
            data: { heartRate, spo2 }
        });

        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data');
    }
});
app.get('/data',async(req,res)=>{
    const heartRate = req.query.heartRate;
    const spo2 = req.query.spo2;
    console.log(`GET - Heart Rate: ${heartRate}, SpO2: ${spo2}`);
    const datah=await prisma.healthData.findFirst({
            orderBy: {
                id: 'desc', // Thay 'createdAt' bằng trường bạn muốn sắp xếp
        }
    })
    res.render('pages/benhnhan',{hearth:datah.heartRate,spo2s:datah.spo2})
})

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




// const express = require('express');
// const app = express();
// const path = require('path');
// const body=require('body-parser')
// const expressWs = require('express-ws');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // const http = require('http');
// // const WebSocket = require('ws');
// // const server = http.createServer(app);
// // const wss = new WebSocket.Server({ server });
// // const dataRoute = require('./router/connectESP8266/connectData');
// const port = 2222;
// const quanli1=require('./router/QuanLi1/admin')

// // app.use('/api', dataRoute);
// app.use(body.json());
// app.set('view engine', 'ejs');
// app.use('/assets', express.static(path.join(__dirname, 'assets')));
// app.use(body.json());
// app.use(body.urlencoded({ extended: true }));

// expressWs(app);
// let clients = [];

// // API để nhận dữ liệu từ ESP8266
// app.post('/data', async (req, res) => {
//     const { heartRate, spo2 } = req.body;

//     try {
//         await prisma.healthData.create({
//             data: { heartRate, spo2 }
//         });

//         // Phát dữ liệu tới tất cả các client qua WebSocket
//         clients.forEach(ws => {
//             if (ws.readyState === ws.OPEN) {
//                 ws.send(JSON.stringify({ heartRate, spo2, timestamp: Date.now() }));
//             }
//         });

//         res.status(200).send('Data saved successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error saving data');
//     }
// });

// // Kết nối WebSocket để cập nhật biểu đồ thời gian thực
// app.ws('/ws', (ws) => {
//     clients.push(ws);
//     ws.on('close', () => {
//         clients = clients.filter(client => client !== ws);
//     });
// });

 
// app.use('/',quanli1)
// app.listen(port,()=> {
//     console.log(`Server is running on http://localhost:${port}`);
// });
   


// // Phát dữ liệu đến tất cả client kết nối qua WebSocket
// // function broadcastData(data) {
// //     wss.clients.forEach((client) => {
// //         if (client.readyState === WebSocket.OPEN) {
// //             client.send(JSON.stringify(data));
// //         }
// //     });
// // }
// // app.post('/', async (req, res) => {
// //     const { heartRate, spo2 } = req.body;

// //     try {
// //         // Lưu dữ liệu vào database
// //         const newData = await prisma.healthData.create({
// //             data: { heartRate, spo2 },
// //         });

// //         // Phát dữ liệu mới qua WebSocket
// //         broadcastData(newData);

// //         res.status(200).json({ status: 'success', data: newData });
// //     } catch (error) {
// //         console.error("Lỗi khi lưu dữ liệu:", error);
// //         res.status(500).json({ status: 'error', message: 'Lưu dữ liệu thất bại' });
// //     }
// // });
