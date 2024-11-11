const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const WebSocket = require('ws');
const quanli1=require('./router/QuanLi1/admin')

const app = express();
const prisma = new PrismaClient();
const port = 2222;

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Thiết lập WebSocket server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const wss = new WebSocket.Server({ server });

// Hàm phát dữ liệu tới tất cả client WebSocket đang kết nối
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Route nhận dữ liệu từ ESP8266 và lưu vào database
app.post('/data', async (req, res) => {
    const { heartRate, spo2 } = req.body;

    try {
        const newData = await prisma.healthData.create({
            data: { heartRate, spo2 }
        });
        res.status(200).send('Data saved successfully');

        // Phát dữ liệu mới tới các client WebSocket
        broadcast(newData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data');
    }
});

// Route để render trang hiển thị dữ liệu
app.use('/',quanli1);
