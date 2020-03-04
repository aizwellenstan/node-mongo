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
var request = require("request");
var mongoose = require("mongoose");
var config_1 = require("./config");
mongoose.connect("mongodb://localhost:27018/historical", {
    poolSize: 10,
    bufferMaxEntries: 0,
    reconnectTries: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once("open", function () {
    console.log("conneted to database");
});
var Historical = require("./models/historical");
var initialData = function () {
    function getIntial() {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Historical.find({ timestamp: 0 })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    }
    getIntial().then(function (data) {
        if (data.length !== 0) {
            // var timestamp = Math.floor(Date.now() / 1000)
            var uri = "http://127.0.0.1:" + config_1.BIND_PORT + "/historical";
            //@ts-ignore
            request(uri, function (error, response, body) {
                // console.error('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                body = JSON.parse(body);
                if (body) {
                    for (var i = 0; i < body.length; i++) {
                        delete body[i].Attributes;
                        body[i].Attributes = [];
                    }
                }
                var emptyAttr = JSON.stringify(body);
                var historical = new Historical({});
                var myquery = { timestamp: 0 };
                var newvalues = { $set: { body: emptyAttr } };
                return historical.updateOne(myquery, newvalues, function (err) {
                    if (err)
                        throw err;
                });
            });
        }
        else {
            // var timestamp = Math.floor(Date.now() / 1000)
            var uri = "http://127.0.0.1:" + config_1.BIND_PORT + "/historical";
            //@ts-ignore
            request(uri, function (error, response, body) {
                // console.error('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                body = JSON.parse(body);
                if (body) {
                    for (var i = 0; i < body.length; i++) {
                        delete body[i].Attributes;
                        body[i].Attributes = [];
                    }
                }
                var emptyAttr = JSON.stringify(body);
                var historical = new Historical({
                    timestamp: 0,
                    body: emptyAttr
                });
                return historical.save();
            });
        }
    });
};
var saveData = function () {
    var timestamp = Math.floor(Date.now() / 1000);
    var uri = "http://127.0.0.1:" + config_1.BIND_PORT + "/historical";
    //@ts-ignore
    request(uri, function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var historical = new Historical({
            timestamp: timestamp,
            body: body
        });
        return historical.save();
    });
    // console.log("========saving data========")
};
exports.initialdata = initialData;
exports.savedata = saveData;
