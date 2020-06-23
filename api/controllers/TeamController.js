'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    getAllTeams: (req, res) => {
        let sql = 'CALL getAllTeam()';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    getTeamById: (req, res) => {
        let data = req.body;
        console.log(data)
        let sql = 'CALL getTeamById(?)';
        db.query(sql, [req.params.id_team], (err, response) => {
            if (err) throw err;
            res.json(response[0]);
        })
    },
    insertTeam: (req, res) => {
        let data = req.body;
        let sql = 'CALL addTeam(?,?)';
        db.query(sql, Object.values(data), (err, response) => {
            if (err) throw err;
            res.json({ message: 'Thêm mới thành công' })
        })
    },
    updateTeam: (req, res) => {
        let data = req.body;
        let sql = 'CALL updateTeam(?,?,?)';
        db.query(sql, [req.params.id_team,...Object.values(data)], (err, response) => {
            if (err) throw err;
            res.json({message: 'Update thành công'})
        })
    },
    deleteTeam: (req, res) => {
        let sql = "CALL deleteTeam(?)";
        db.query(sql, [req.params.id_team], (err, respone) => {
            if( err ) throw err;
            res.json({message : "Xóa thành công"})
        })
    },
}


