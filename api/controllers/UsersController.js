'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    getAllUsers: (req, res) => {
        let sql = 'CALL getAllUsers()';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    getUserById: (req, res) => {
        let data = req.body;
        console.log(data)
        let sql = 'CALL getUserById(?)';
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err;
            res.json(response[0]);
        })
    },
    insertUser: async (req, res) => {
        let data = req.body;
        const isExits = await checkExitsEmail(data.email);
        console.log(isExits)
        if(!isExits) {
            let sql = 'CALL addUser(?,?,?,?,?,?,?,?)';
            db.query(sql, Object.values(data), (err, response) => {
                if (err) throw err;
                res.json({ message: 'Thêm thành công thành viên' })
            })
        } else {
            res.json({ message: 'Email đã tồn tại' })
        }
      
    },
    
    updateUser: async (req, res) => {
        let data = req.body;
        let sql = 'CALL updateUser(?,?,?,?,?,?,?,?,?)';
        db.query(sql, Object.values(data), (err, response) => {
            if (err) throw err;
            res.json({message: 'Sửa thành công'})
        })
    },
    deleteUser: (req, res) => {
        let sql = "CALL deleteUser(?)";
        db.query(sql, [req.params.id], (err, respone) => {
            if( err ) throw err;
            res.json({message : "Xóa thành công"})
        })
    },
    
}

function checkExitsEmail  (email) {
    const query =`select * from users where email = '${email}'`;
    return new Promise((resolve) => {
        db.query(query , [email] ,  (error, results) => {
            if (error) throw error;
            resolve(!!results.length)
        });
    })
}

