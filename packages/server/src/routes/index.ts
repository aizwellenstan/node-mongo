// import path from 'path';
import * as express from 'express';
// import render from '../../../client';
// import manifest from '../../../client/static/build/manifest.json';

import * as bodyParser from "body-parser";
import * as redis from 'redis'
// import mongoose from 'mongoose'
const Historical = require("../models/historical");

// mongoose.connect("mongodb://localhost:27017/historical");
// mongoose.connection.once("open", () => {
//   console.log("conneted to database");
// });

// const client = require.resolve('../../../client');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Service worker
// router.use('/sw.js', (_, res) => {
//   res.sendFile(path.resolve(client, '../../static/build/sw.js'));
// });

// Progressive web app
// router.use('/manifest.json', ({ i18n }, res) => {
//   res.json({
//     name: i18n.t('meta.title', { defaultValue: '' }),
//     short_name: i18n.t('meta.title_short', { defaultValue: '' }),
//     display: 'standalone',
//     icons: [
//       {
//         src: '/android-chrome.png',
//         size: '250x250',
//         type: 'image/png',
//       },
//     ],
//     start_url: '/activities',
//     theme_color: '#F80652',
//     background_color: '#C70542',
//   });
// });

// Server side rendering
// router.use(async (req, res) => {
//   const result = await render({
//     manifest,
//     i18n: req.i18n,
//     location: req.url,
//   });

//   res.status(result.statusCode);
//   res.send(`<!DOCTYPE html>\n${result.staticMarkup}`);
// });

let client = redis.createClient();
client.on("connect", function () {
  console.log("Connected to Redis...");
});

async function getCourses(from: any) {
  from = parseInt(from)
  const data = await Historical.find({
    timestamp: { $lte: from }
  })
    .sort({ timestamp: -1 })
    .limit(1)

  return data
}

router.get("/historical", function (req, res) {
  var from = ""
  req.query.from ? (from = req.query.from) : (from = "");

  if (from == "") {
    var return_dataset: Array<any> = [];
    client.keys('*', function (err, log_list) {
      if(err) {
        // console.log(err)
      }
      var keys = Object.keys(log_list);
      var i = 0;

      keys.forEach(function (l: any) {
        client.hgetall(log_list[l], function (e, o) {
          i++;
          if (e) { 
            // console.log(e) 
          } else {
            var temp_data = { 'key': log_list[l], 'value': o };
            if(log_list[l]!=="unacked"){
              return_dataset.push(temp_data);
            }
          }

          if (i == keys.length) {
            var data = return_dataset

            for (var j = 0; j < data.length; j++) {
              data[j].ObjectData = {
                ObjectId: data[j].key,
                Attributes: [
                  {
                    "Key": data[j].value.Key,
                    "Value": data[j].value.Value,
                    "Timestamp": data[j].value.Timestamp
                  }
                ]
              }
              delete data[j].key
              delete data[j].value
            }

            res.json(data);
          }
        });
      });
    });
  }
  else {
    // console.log(from)
    // console.log(getCourses(from))
    getCourses(from).then(data => {
      data = JSON.parse(data[0].body)
      res.json(data)
    })
    // res.send(getCourses(from))
  }
});

router.get("/alarmhistorical", function (req, res) {
  var from = ""
  req.query.from ? (from = req.query.from) : (from = "");

  if (from == "") {
    var return_dataset: Array<any> = [];
    client.keys('*', function (err, log_list) {
      if(err){
        // console.log(err)
      }
      var keys = Object.keys(log_list);
      var i = 0;

      keys.forEach(function (l: any) {
        client.hgetall(log_list[l], function (e, o) {
          i++;
          if (e) { 
            // console.log(e) 
          } else {
            var temp_data = { 'key': log_list[l], 'value': o };
            if(log_list[l]!=="unacked"){
              return_dataset.push(temp_data);
            }
          }

          if (i == keys.length) {
            var data = return_dataset

            var dict = new Map();

            for (var j = 0; j < data.length; j++) {
              data[j].ObjectId= data[j].key,
              data[j].Value= data[j].value.Value
              

              dict.set(j, j);
              delete data[j].key
              delete data[j].value
              
            }
            
            res.json("");
            // console.log(dict.get({}))
          }
        });
      });
    });
  }
  else {
    getCourses(from).then(data => {
      data = JSON.parse(data[0].body)
      res.json(data)
    })
  }
});

// Attribute Create
router.post("/attribute", function (req, res) {
  var Key = "Present_Value";
  var Timestamp = Math.floor(Date.now() / 1000);
  var data = req.body;
  Key = "Present_Value";
  for (var i in data) {
    client.hmset(
      data[i].objectId,
      ["Key", Key, "Value", data[i].Value, "Timestamp", Timestamp],
      function (err) {
        if (err) {
          // console.log(err);
        }
        // console.log(reply);
      }
    );
  }
  res.status(200).json("created");
});

// Control
router.post("/api/historicals/:objectId/attributes", function (req, res) {
  var objectId = req.params.objectId
  var value = req.body[0].Value
  var Key = "Present_Value";
  var Timestamp = Math.floor(Date.now() / 1000);
  Key = "Present_Value";
  client.hmset(
    objectId,
    ["Key", Key, "Value", value, "Timestamp", Timestamp],
    function (err) {
      if (err) {
        // console.log(err);
      }
      // console.log(reply);
    }
  );

  res.status(200).json("updated");
});

export const routes = router;
