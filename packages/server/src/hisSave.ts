import * as request from 'request'
import * as mongoose from 'mongoose'
import { BIND_PORT } from "./config";

mongoose.connect("mongodb://localhost:27017/historical", {
    poolSize: 10, 
    bufferMaxEntries: 0, 
    reconnectTries: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, 
function(err) {
   if(err) {
       console.log('error in this')
       console.log(err);
       // Do whatever to handle the error 
   } else {
       console.log('Connected to the database');
   }});
mongoose.connection.once("open", () => {
    console.log("conneted to database");
});

const Historical = require("./models/historical");

var initialData = function () {
    async function getIntial() {
        const data = await Historical.find({ timestamp: 0 })

        return data
    }

    getIntial().then(data => {
        if (data.length !== 0) {
            // var timestamp = Math.floor(Date.now() / 1000)
            var uri = `http://127.0.0.1:${BIND_PORT}/historical`
            //@ts-ignore
            request(uri, function (error, response, body) {
                // console.error('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

                body = JSON.parse(body)
                if(body){
                    for (var i = 0; i < body.length; i++) {
                        delete body[i].Attributes
                        body[i].Attributes = []
                    }
                }

                var emptyAttr = JSON.stringify(body)
                let historical = new Historical({});

                var myquery = { timestamp: 0 };
                var newvalues = { $set: { body: emptyAttr } };


                return historical.updateOne(myquery, newvalues, function (err: Error) {
                    if (err) throw err;
                });
            });
        } else {
            // var timestamp = Math.floor(Date.now() / 1000)
            var uri = `http://127.0.0.1:${BIND_PORT}/historical`
            //@ts-ignore
            request(uri, function (error, response, body) {
                // console.error('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

                body = JSON.parse(body)
                if(body){
                    for (var i = 0; i < body.length; i++) {
                        delete body[i].Attributes
                        body[i].Attributes = []
                    }
                }

                var emptyAttr = JSON.stringify(body)
                let historical = new Historical({
                    timestamp: 0,
                    body: emptyAttr
                });
                return historical.save();
            });
        }
    })


}

var saveData = function () {
    var timestamp = Math.floor(Date.now() / 1000)
    var uri = `http://127.0.0.1:${BIND_PORT}/historical`
    //@ts-ignore
    request(uri, function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let historical = new Historical({
            timestamp: timestamp,
            body: body
        });
        return historical.save();
    });
    // console.log("========saving data========")
}

export const initialdata = initialData;
export const savedata = saveData;
