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
        const isExits = await checkExitsEmailAdd(data.email);
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
    
    updateUser: async  (req, res) => {
        let data = req.body;
        let sql = 'CALL updateUser(?,?,?,?,?,?,?,?,?)';
        let isExits = await checkExitsEmailUpdate(data.email,data.id)
        if(!isExits){
            db.query(sql, Object.values(data), (err, response) => {
                if (err) throw err;
                res.json({message: 'Sửa thành công'})
            })
        }else {
            res.json({message: 'Email đã tồn tại'})
        }
    },
    deleteUser: (req, res) => {
        let sql = "CALL deleteUser(?)";
        db.query(sql, [req.params.id], (err, respone) => {
            if( err ) throw err;
            res.json({message : "Xóa thành công"})
        })
    },
    checkExitsEmail: (req, res) => {
        let data = req.body 
        let sql = "select email from users where email = ?"
        db.query(sql,[req.params.email], (err, respone)=> {
            if(err) throw err;
            console.log(respone)
            res.json(respone[0])
        })
    }
    
}

function checkExitsEmailAdd  (email) {
    const query =`select * from users where email = '${email}'`;
    return new Promise((resolve) => {
        db.query(query , [email] ,  (error, results) => {
            if (error) throw error;
            console.log(!!results.length)
            resolve(!!results.length)
        });
    })
}

function checkExitsEmailUpdate (email,id) {
    const query =`select * from users where email = '${email}' and id != '${id}'`;
    return new Promise((resolve) => {
        db.query(query , [email] ,  (error, results) => {
            if (error) throw error;
            console.log(!!results.length)
            resolve(!!results.length)
        });
    })
}

