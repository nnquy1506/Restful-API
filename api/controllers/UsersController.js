'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    getAll: (req, res) => {
        let sql = 'CALL getAllUsers()';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
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
    insertUser: (req, res) => {
        let data = req.body;
        let sql = 'CALL addUser(?,?,?,?,?,?)';
        db.query(sql, Object.values(data), (err, response) => {
            if (err) throw err;
            res.json({ message: 'add thanh cong' })
        })
    },
    updateUser: (req, res) => {
        let data = req.body;
        let sql = 'CALL updateUser(?,?,?,?,?,?,?)';
        db.query(sql, [req.params.id,...Object.values(data)], (err, response) => {
            if (err) throw err;
            res.json({ message: 'update thanh cong' })
        })
    },
    deleteUser: (req, res) => {
        let sql = "CALL deleteUser(?)";
        db.query(sql, [req.params.id], (err, respone) => {
            if( err ) throw err;
            res.json({message : "Xoa thanh cong"})
        })
    }
}