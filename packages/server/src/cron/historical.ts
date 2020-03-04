import { CronJob } from 'cron';
import request from 'request'
import mongoose from 'mongoose'
import { BIND_PORT } from "../config";

const Historical = require("../models/historical");

mongoose.connect("mongodb://localhost:27017/historical");
mongoose.connection.once("open", () => {
    console.log("conneted to database");
});


export class HistoricalCron {
    constructor() {
        this.cron();
    }

    private cron = () => {
        const job = new CronJob('* * * * *', this.collectHistoricals);
        return job.start();
    };

    private collectHistoricals = async () => {
        var timestamp = Math.floor(Date.now() / 1000)
        var uri = `http://127.0.0.1:${BIND_PORT}/historical`
        console.log(uri)
        request(uri, function (body) {
            // console.error('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            let historical = new Historical({
                timestamp: timestamp,
                body: body
            });
            return historical.save();
        });
    };
}
