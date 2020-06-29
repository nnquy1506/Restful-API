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
        let sql = 'CALL getCourseById(?)';
        db.query(sql, [req.params.id_course], (err, response) => {
            if (err) throw err;
            res.json(response[0]);
        })
    },
    insertCourse: async (req, res) => {
        let data = req.body;
        let isExits = await checkExitsNameCourseAdd(data.name_course);
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
    updateCourse:  async (req, res) => {
        let data = req.body;
        let isExits = await checkExitsNameCourseUpdate(data.name_course,data.id_course)
        if(!isExits){
            let sql = 'CALL updateCourse(?,?,?,?,?)';
            db.query(sql, Object.values(data), (err, response) => {
                if (err) throw err;
                res.json({message: 'Update thành công'})
            })
        }else{
            res.json({message:'Khóa học đã tồn tại'})
        }
    },
    deleteCourse: (req, res) => {
        let sql = "CALL deleteCourse(?)";
        db.query(sql, [req.params.id_course], (err, respone) => {
            if( err ) res.json({message : "Khóa học đã tồn tại team "});
            res.json({message : "Xóa thành công"})
        })
    },
    
}

function checkExitsNameCourseAdd (name) {
    const query =`select * from course where name_course = '${name}'`;
    return new Promise((resolve) => {
        db.query(query , [name] ,  (error, results) => {
            if (error) throw error;
            resolve(!!results.length)
        });
    })
}
function checkExitsNameCourseUpdate (name,id) {
    const query =`select * from course where name_course = '${name}' and id_course !=  ${id}`;
    return new Promise((resolve) => {
        db.query(query , [name] ,  (error, results) => {
            if (error) throw error;
            resolve(!!results.length)
        });
    })
}










