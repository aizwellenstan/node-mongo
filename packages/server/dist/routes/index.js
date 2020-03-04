"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import path from 'path';
var express = require("express");
// import render from '../../../client';
// import manifest from '../../../client/static/build/manifest.json';
var bodyParser = require("body-parser");
var redis = require("redis");
// import mongoose from 'mongoose'
var Historical = require("../models/historical");
// mongoose.connect("mongodb://localhost:27017/historical");
// mongoose.connection.once("open", () => {
//   console.log("conneted to database");
// });
// const client = require.resolve('../../../client');
var router = express.Router();
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
var client = redis.createClient();
client.on("connect", function () {
    console.log("Connected to Redis...");
});
function getCourses(from) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from = parseInt(from);
                    return [4 /*yield*/, Historical.find({
                            timestamp: { $lte: from }
                        })
                            .sort({ timestamp: -1 })
                            .limit(1)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
router.get("/historical", function (req, res) {
    var from = "";
    req.query.from ? (from = req.query.from) : (from = "");
    if (from == "") {
        var return_dataset = [];
        client.keys('*', function (err, log_list) {
            if (err) {
                // console.log(err)
            }
            var keys = Object.keys(log_list);
            var i = 0;
            keys.forEach(function (l) {
                client.hgetall(log_list[l], function (e, o) {
                    i++;
                    if (e) {
                        // console.log(e) 
                    }
                    else {
                        var temp_data = { 'key': log_list[l], 'value': o };
                        if (log_list[l] !== "unacked") {
                            return_dataset.push(temp_data);
                        }
                    }
                    if (i == keys.length) {
                        var data = return_dataset;
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
                            };
                            delete data[j].key;
                            delete data[j].value;
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
        getCourses(from).then(function (data) {
            data = JSON.parse(data[0].body);
            res.json(data);
        });
        // res.send(getCourses(from))
    }
});
router.get("/alarmhistorical", function (req, res) {
    var from = "";
    req.query.from ? (from = req.query.from) : (from = "");
    if (from == "") {
        var return_dataset = [];
        client.keys('*', function (err, log_list) {
            if (err) {
                // console.log(err)
            }
            var keys = Object.keys(log_list);
            var i = 0;
            keys.forEach(function (l) {
                client.hgetall(log_list[l], function (e, o) {
                    i++;
                    if (e) {
                        // console.log(e) 
                    }
                    else {
                        var temp_data = { 'key': log_list[l], 'value': o };
                        if (log_list[l] !== "unacked") {
                            return_dataset.push(temp_data);
                        }
                    }
                    if (i == keys.length) {
                        var data = return_dataset;
                        var dict = new Map();
                        for (var j = 0; j < data.length; j++) {
                            data[j].ObjectId = data[j].key,
                                data[j].Value = data[j].value.Value;
                            dict.set(j, j);
                            delete data[j].key;
                            delete data[j].value;
                        }
                        res.json("");
                        // console.log(dict.get({}))
                    }
                });
            });
        });
    }
    else {
        getCourses(from).then(function (data) {
            data = JSON.parse(data[0].body);
            res.json(data);
        });
    }
});
// Attribute Create
router.post("/attribute", function (req, res) {
    var Key = "Present_Value";
    var Timestamp = Math.floor(Date.now() / 1000);
    var data = req.body;
    Key = "Present_Value";
    for (var i in data) {
        client.hmset(data[i].objectId, ["Key", Key, "Value", data[i].Value, "Timestamp", Timestamp], function (err) {
            if (err) {
                // console.log(err);
            }
            // console.log(reply);
        });
    }
    res.status(200).json("created");
});
// Control
router.post("/api/historicals/:objectId/attributes", function (req, res) {
    var objectId = req.params.objectId;
    var value = req.body[0].Value;
    var Key = "Present_Value";
    var Timestamp = Math.floor(Date.now() / 1000);
    Key = "Present_Value";
    client.hmset(objectId, ["Key", Key, "Value", value, "Timestamp", Timestamp], function (err) {
        if (err) {
            // console.log(err);
        }
        // console.log(reply);
    });
    res.status(200).json("updated");
});
exports.routes = router;
