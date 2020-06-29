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
    insertTeam: async (req, res) => {
        let data = req.body;
        let isExits = await checkExitsNameTeam(data.name_team,data.id_course);
        if(!isExits){
            let sql = 'CALL addTeam(?,?)';
            db.query(sql, Object.values(data), (err, response) => {
            if (err) throw err;
            res.json({ message: 'Thêm mới thành công' })
        })
        }else
        {
            res.json({message : 'Team đã tồn tại'})  }
    },
    updateTeam: async (req, res) => {
        let data = req.body;
        let isExits = await checkExitsNameTeam(data.name_team,data.id_course);
        if(!isExits){
            let sql = 'CALL updateTeam(?,?,?)';
        db.query(sql, Object.values(data), (err, response) => {
            if (err) throw err;
            res.json({message: 'Update thành công'})
        })
    }
        else
        {
            res.json({message : 'Team đã tồn tại'})  }
    },
    deleteTeam: (req, res) => {
        let sql = "CALL deleteTeam(?)";
        db.query(sql, [req.params.id_team], (err, respone) => {
            if( err )  res.json({message : "Team đã tồn tại thành viên "});
            res.json({message : "Xóa thành công"})
        })
    },
}

function checkExitsNameTeam(name,id_course){
    const query =`select * from team where name_team = '${name}' and id_course = '${id_course}'`;
    return new Promise((resolve) => {
        db.query(query , [name] ,  (error, results) => {
            if (error) throw error;
            resolve(!!results.length)
        });
    })
}
