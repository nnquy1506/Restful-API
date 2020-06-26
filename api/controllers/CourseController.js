'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    getAllCourse: (req, res) => {
        let sql = 'CALL getAllCourse()';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    getCourseById: (req, res) => {
        let data = req.body;
        console.log(data)
        let sql = 'CALL getCourseById(?)';
        db.query(sql, [req.params.id_course], (err, response) => {
            if (err) throw err;
            res.json(response[0]);
        })
    },
    insertCourse: async (req, res) => {
        let data = req.body;
        let isExits = await checkExitsNameCourse(data.name_course);
       if(!isExits){
        let sql = 'CALL addCourse(?,?,?,?)';
        db.query(sql, Object.values(data), (err, response) => {
            if (err) throw err;
            res.json({ message: 'Thêm mới thành công' })
        })
       }else {
           res.json({message : 'Khóa học đã tồn tại'})
       }
    },
    updateCourse: (req, res) => {
        let data = req.body;
        console.log(req.body)
        let sql = 'CALL updateCourse(?,?,?,?,?)';
        db.query(sql, Object.values(data), (err, response) => {
            if (err) throw err;
            res.json({message: 'Update thành công'})
        })
    },
    deleteCourse: (req, res) => {
        let sql = "CALL deleteCourse(?)";
        db.query(sql, [req.params.id_course], (err, respone) => {
            if( err ) throw err;
            res.json({message : "Xóa thành công"})
        })
    },
    
}

function checkExitsNameCourse (name) {
    const query =`select * from course where name_course = '${name}'`;
    return new Promise((resolve) => {
        db.query(query , [name] ,  (error, results) => {
            if (error) throw error;
            resolve(!!results.length)
        });
    })
}








