const { parse } = require('dotenv');
const db = require('../config/db');
const haversineDistance = require('../utils/haversine');

const addSchool = async(req,res) => {
    try{
        const {name,address,latitude,longitude} = req.body;
        const [result] = await db.execute("INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)", [name.trim(),address.trim(),parseFloat(latitude),parseFloat(longitude)]);

        return res.status(201).json({
            success: true,
            message: "School added successfully",
            data: {
                id: result.insertId,
                name: name.trim(),
                address: address.trim(),
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            }
        })
    }
}

module.exports = { addSchool, listSchools };