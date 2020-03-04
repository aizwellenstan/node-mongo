const request = require("request");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var fakeAlarm = {
  uri: "http://127.0.0.1:5443/alarmInfo/",
  headers: {
    "Content-type": "application/json"
  },
  json: [
    {
      objectId: "f9ad22d7-4657-408b-95db-08147c619ae7",
      DisplayObjectId: "environment_co100101", //CO感測器01
      AlarmCategory: "Medium",
      AlarmFunction: "AlarmNeedAckNoReset",
      TriggerLogic: ">",
      trigger_value: "50",
      AlarmMessage: "CO1濃度過高",
      AlarmMessageEnglish: "CO1濃度過高",
      AlarmMessageSpanish: "CO1濃度過高",
      AlarmMessageJapenese: "CO1濃度過高",
      IsOpenTrigger: "1"
    },
    {
      objectId: "b48ddf73-c31d-4731-8047-83ad40e73464",
      DisplayObjectId: "environment_chillermotor000201", //冷卻水泵01 
      AlarmCategory: "Low",
      AlarmFunction: "AlarmNoAckNoReset",
      TriggerLogic: "=",
      trigger_value: "0",
      AlarmMessage: "冷卻馬達-1停止中",
      AlarmMessageEnglish: "冷卻馬達-1停止中",
      AlarmMessageSpanish: "冷卻馬達-1停止中",
      AlarmMessageJapenese: "冷卻馬達-1停止中",
      IsOpenTrigger: "1"
    },
    // {
    //   objectId: "e10f9d11-13b5-4694-ba12-cec88222cf20",
    //   DisplayObjectId: "energy_volltagemchine000301", //電箱01 
    //   AlarmCategory: "Emergency",
    //   AlarmFunction: "AlarmNeedAckNoReset",
    //   TriggerLogic: "=",
    //   trigger_value: "1",
    //   AlarmMessage: "ACBB1-故障",
    //   AlarmMessageEnglish: "ACBB1-故障",
    //   AlarmMessageSpanish: "ACBB1-故障",
    //   AlarmMessageJapenese: "ACBB1-故障",
    //   IsOpenTrigger: "1"
    // },
    {
      objectId: "4bdc2e8a-ce5c-4a84-b0a8-8efe4d74e0ef",
      DisplayObjectId: "environment_chillerwatertank000301", //冷水箱01 
      AlarmCategory: "Medium",
      AlarmFunction: "AlarmNeedAckNoReset",
      TriggerLogic: "=",
      trigger_value: "0",
      AlarmMessage: "冷卻水塔-1停止中",
      AlarmMessageEnglish: "冷卻水塔-1停止中",
      AlarmMessageSpanish: "冷卻水塔-1停止中",
      AlarmMessageJapenese: "冷卻水塔-1停止中",
      IsOpenTrigger: "1"
    },
    {
      objectId: "8b13dfea-a7fb-4404-88a5-b58f5a3e5822",
      DisplayObjectId: "environment_chillermotor000201", //冷卻水泵01 
      AlarmCategory: "High",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "冷卻馬達-1故障跳脫",
      AlarmMessageEnglish: "冷卻馬達-1故障跳脫",
      AlarmMessageSpanish: "冷卻馬達-1故障跳脫",
      AlarmMessageJapenese: "冷卻馬達-1故障跳脫",
      IsOpenTrigger: "1"
    },
    {
      objectId: "52c5852c-885e-46e5-a555-fe585fdc8f9c",
      DisplayObjectId: "9cac0a7a-5cf5-4685-b004-6056b022b49e", //冷卻水泵02 
      AlarmCategory: "Low",
      AlarmFunction: "AlarmNoAckNoReset",
      TriggerLogic: "=",
      trigger_value: "0",
      AlarmMessage: "冷卻馬達-2停止中",
      AlarmMessageEnglish: "冷卻馬達-2停止中",
      AlarmMessageSpanish: "冷卻馬達-2停止中",
      AlarmMessageJapenese: "冷卻馬達-2停止中",
      IsOpenTrigger: "1"
    },
    {
      objectId: "db3c6401-faff-4a7c-99b7-b2903980a098",
      DisplayObjectId: "9cac0a7a-5cf5-4685-b004-6056b022b49e", //冷卻水泵02 
      AlarmCategory: "High",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "冷卻馬達-2故障跳脫",
      AlarmMessageEnglish: "冷卻馬達-2故障跳脫",
      AlarmMessageSpanish: "冷卻馬達-2故障跳脫",
      AlarmMessageJapenese: "冷卻馬達-2故障跳脫",
      IsOpenTrigger: "1"
    },
    {
      objectId: "5c951e24-69ea-4611-91fc-28e7a3239d9c",
      DisplayObjectId: "e4e9a314-0c9e-47eb-acff-c15dca018304", //冷卻水泵03 
      AlarmCategory: "Low",
      AlarmFunction: "AlarmNoAckNoReset",
      TriggerLogic: "=",
      trigger_value: "0",
      AlarmMessage: "冷卻馬達-3停止中",
      AlarmMessageEnglish: "冷卻馬達-3停止中",
      AlarmMessageSpanish: "冷卻馬達-3停止中",
      AlarmMessageJapenese: "冷卻馬達-3停止中",
      IsOpenTrigger: "1"
    },
    {
      objectId: "ae4a5ad7-3cc2-4057-b27e-d71cab3aab0c",
      DisplayObjectId: "e4e9a314-0c9e-47eb-acff-c15dca018304", //冷卻水泵03 
      AlarmCategory: "High",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "冷卻馬達-3故障跳脫",
      AlarmMessageEnglish: "冷卻馬達-3故障跳脫",
      AlarmMessageSpanish: "冷卻馬達-3故障跳脫",
      AlarmMessageJapenese: "冷卻馬達-3故障跳脫",
      IsOpenTrigger: "1"
    },
    {
      objectId: "cefb7be2-4c60-41fb-b377-084001383493",
      DisplayObjectId: "e23f6833-9e69-46b6-8f9b-33ba5a430b34", //冰水主機01	
      AlarmCategory: "Low",
      AlarmFunction: "AlarmNoAckNoReset",
      TriggerLogic: "=",
      trigger_value: "0",
      AlarmMessage: "冰水主機-1停止中",
      AlarmMessageEnglish: "冰水主機-1停止中",
      AlarmMessageSpanish: "冰水主機-1停止中",
      AlarmMessageJapenese: "冰水主機-1停止中",
      IsOpenTrigger: "1"
    },
    {
      objectId: "c4329169-3679-4f93-a695-8ed34f36f28d",
      DisplayObjectId: "e23f6833-9e69-46b6-8f9b-33ba5a430b34", //冰水主機01	 
      AlarmCategory: "Emergency",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "冰水主機-1故障跳脫",
      AlarmMessageEnglish: "冰水主機-1故障跳脫",
      AlarmMessageSpanish: "冰水主機-1故障跳脫",
      AlarmMessageJapenese: "冰水主機-1故障跳脫",
      IsOpenTrigger: "1"
    },
    {
      objectId: "817c6b44-d048-43d9-b5c4-bfc13c1ad513",
      DisplayObjectId: "7d6f9f6c-2af3-453e-a501-a82206995a42", //冰水主機02
      AlarmCategory: "Low",
      AlarmFunction: "AlarmNoAckNoReset",
      TriggerLogic: "=",
      trigger_value: "0",
      AlarmMessage: "冰水主機-2停止中",
      AlarmMessageEnglish: "冰水主機-2停止中",
      AlarmMessageSpanish: "冰水主機-2停止中",
      AlarmMessageJapenese: "冰水主機-2停止中",
      IsOpenTrigger: "1"
    },
    {
      objectId: "ca4b7e86-26ff-43e2-b8b3-6f744103c5d9",
      DisplayObjectId: "7d6f9f6c-2af3-453e-a501-a82206995a42", //冰水主機02 
      AlarmCategory: "Emergency",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "冰水主機-2故障跳脫",
      AlarmMessageEnglish: "冰水主機-2故障跳脫",
      AlarmMessageSpanish: "冰水主機-2故障跳脫",
      AlarmMessageJapenese: "冰水主機-2故障跳脫",
      IsOpenTrigger: "1"
    },
    {
      objectId: "f4395f51-116d-4d38-a04d-5e432d07a5cf",
      DisplayObjectId: "5c1993da-aa47-4706-a2d4-6a83c2e9e2ec", //風管01
      AlarmCategory: "High",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "風機過載跳脫",
      AlarmMessageEnglish: "風機過載跳脫",
      AlarmMessageSpanish: "風機過載跳脫",
      AlarmMessageJapenese: "風機過載跳脫",
      IsOpenTrigger: "1"
    },
    // {
    //   objectId: "857e57da-dc8e-4793-8984-0b0d23815b34",
    //   DisplayObjectId: "5c1993da-aa47-4706-a2d4-6a83c2e9e2ec",
    //   AlarmCategory: "High",
    //   AlarmFunction: "AlarmNeedAckNeedReset",
    //   TriggerLogic: "=",
    //   trigger_value: "1",
    //   AlarmMessage: "風機過載跳脫",
    //   AlarmMessageEnglish: "風機過載跳脫",
    //   AlarmMessageSpanish: "風機過載跳脫",
    //   AlarmMessageJapenese: "風機過載跳脫",
    //   IsOpenTrigger: "0"
    // },
    {
      objectId: "853b9151-a4aa-4f00-861c-b5a1b46cce6f",
      DisplayObjectId: "5bc13f9e-2c38-4a16-a14a-cf23791ecd2c", //風管02
      AlarmCategory: "High",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "風機過載跳脫",
      AlarmMessageEnglish: "風機過載跳脫",
      AlarmMessageSpanish: "風機過載跳脫",
      AlarmMessageJapenese: "風機過載跳脫",
      IsOpenTrigger: "1"
    },
    {
      objectId: "f71e85ee-728f-4224-beae-3c14ffb3bcda",
      DisplayObjectId: "a8685f65-8ff6-47a5-a888-c5c4ce5e3998", //電箱01
      AlarmCategory: "Emergency",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "0",
      AlarmMessage: "ACBB1-跳脫狀態01",
      AlarmMessageEnglish: "ACBB1-跳脫狀態01",
      AlarmMessageSpanish: "ACBB1-跳脫狀態01",
      AlarmMessageJapenese: "ACBB1-跳脫狀態01",
      IsOpenTrigger: "1"
    },
    {
      objectId: "ad0b8d4f-f212-4dfc-9fa0-e8326ed2444f",
      DisplayObjectId: "a8685f65-8ff6-47a5-a888-c5c4ce5e3998", //電箱01
      AlarmCategory: "Emergency",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "0",
      AlarmMessage: "ACBB1-啟停狀態01",
      AlarmMessageEnglish: "ACBB1-啟停狀態01",
      AlarmMessageSpanish: "ACBB1-啟停狀態01",
      AlarmMessageJapenese: "ACBB1-啟停狀態01",
      IsOpenTrigger: "1"
    },
  ]
};

request.post(fakeAlarm, function (error, response, body) {
  console.log(response);
});

const URI = "http://localhost:4000/historical";

var alarm = {
  uri: "http://127.0.0.1:5443/testAlarmTrigger/",
  headers: {
    "Content-type": "application/json"
  },
  json: {
    objectId: "",
    sensor_value: 0
  }
};

createHis = {
  uri: "",
  headers: {
    "Content-type": "application/json"
  },
  json: [{ Name: "Value", Value: "", DataType: "ExtendedEnum" }]
};

var his = {
  uri: "",
  headers: {
    "Content-type": "application/json"
  },
  json: [{ Name: "Value", Value: "", DataType: "ExtendedEnum" }]
};

var ddosAlarm_His = function (ObjectId, min, max) {
  var rand = randomIntFromInterval(min, max);
  // Add Data to alarm
  alarm.json.objectId = ObjectId;
  alarm.json.sensor_value = rand;

  // Add Data To his
  his.uri = URI + ObjectId + "/attributes";
  his.json.Value = rand;
  //request.post(his, function(error, response, body) {});
  request.post(alarm, function (error, response, body) { });
  console.log("post " + alarm.uri + " " + his.json.Value);
  console.log("post " + his.uri + " " + his.json.Value);
};

// 5 alam datas
createAlarm = () => {
  request.post(fakeAlarm, function (error, response, body) {
    console.log(response);
  });
  setInterval(function () {
    ddosAlarm_His("f9ad22d7-4657-408b-95db-08147c619ae7", 51, 60); // CO 感測器1
    ddosAlarm_His("4bdc2e8a-ce5c-4a84-b0a8-8efe4d74e0ef", 0, 0); // 冷卻水塔-1運轉狀態
    ddosAlarm_His("b48ddf73-c31d-4731-8047-83ad40e73464", 0, 0); // 冷卻馬達-1運轉狀態
    ddosAlarm_His("8b13dfea-a7fb-4404-88a5-b58f5a3e5822", 1, 1); // 冷卻馬達-1故障跳脫
    // ddosAlarm_His("e10f9d11-13b5-4694-ba12-cec88222cf20", 1, 1); // ACBB1-故障狀態01
  }, 5000);
}

module.exports = createAlarm