const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/data', async (req, res) => {
  const { heartRate, spo2 } = req.body;
  try {
    const measurement = await prisma.healthData.create({
      data: { heartRate, spo2 }
    });
    res.status(201).json({ success: true, data: measurement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

module.exports = router;