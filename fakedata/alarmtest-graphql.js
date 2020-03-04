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
      //DisplayObjectId: "f9ad22d7-4657-408b-95db-08147c619ae7",
      DisplayObjectId: "environment_co100101",
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
      //DisplayObjectId: "1caa6a0e-fd7e-46d0-9f89-082bb96c36a6",
      DisplayObjectId: "environment_chillermortor000201",
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
      objectId: "e10f9d11-13b5-4694-ba12-cec88222cf20",
      //DisplayObjectId: "d5a98ad0-3cf9-4952-88fc-8a4aaba25aee",
      DisplayObjectId: "energy_volltagemachine000201",
      AlarmCategory: "Emergency",
      AlarmFunction: "AlarmNeedAckNoReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "ACBB1-故障",
      AlarmMessageEnglish: "ACBB1-故障",
      AlarmMessageSpanish: "ACBB1-故障",
      AlarmMessageJapenese: "ACBB1-故障",
      IsOpenTrigger: "1"
    },
    {
      objectId: "4bdc2e8a-ce5c-4a84-b0a8-8efe4d74e0ef",
      //DisplayObjectId: "415cb5b8-3160-4956-b255-cc263b483df8",
      DisplayObjectId: "environment_chillerwatertank000301",
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
      // DisplayObjectId: "1caa6a0e-fd7e-46d0-9f89-082bb96c36a6",
      DisplayObjectId: "environment_chillermotor000202",
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
      objectId: "e10f9d11-13b5-4694-ba12-cec88222cf20",
      //DisplayObjectId: "a8685f65-8ff6-47a5-a888-c5c4ce5e3998",
      DisplayObjectId: "energy_volltagemchine000201",
      AlarmCategory: "Emergency",
      AlarmFunction: "AlarmNeedAckNeedReset",
      TriggerLogic: "=",
      trigger_value: "1",
      AlarmMessage: "ACBB1-故障",
      AlarmMessageEnglish: "ACBB1-故障",
      AlarmMessageSpanish: "ACBB1-故障",
      AlarmMessageJapenese: "ACBB1-故障",
      IsOpenTrigger: "1"
    }
  ]
};

request.post(fakeAlarm, function(error, response, body) {
  console.log(response);
});

const URI = "http://127.0.0.1:3001/api/historicals/";

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

var his = {
  uri: "",
  headers: {
    "Content-type": "application/json"
  },
  json: [{ Value: "" }]
};

var ddosAlarm_His = function(ObjectId, min, max) {
  var rand = randomIntFromInterval(min, max);
  // Add Data to alarm
  alarm.json.objectId = ObjectId;
  alarm.json.sensor_value = rand;

  // Add Data To his
  his.uri = URI + ObjectId + "/attributes";
  his.json.Value = rand;
  //request.post(his, function(error, response, body) {});
  request.post(alarm, function(error, response, body) {});
  console.log("post " + alarm.uri + " " + his.json.Value);
  console.log("post " + his.uri + " " + his.json.Value);
};

var ddosHis = function(ObjectId, min, max) {
  async function resolveSample() {
    his.uri = URI + ObjectId + "/attributes";
    var rand = randomIntFromInterval(min, max);
    his.json = JSON.parse('[{"Value":"' + rand + '"}]');
  }

  resolveSample().then(
    request.post(his, function(error, response, body) {}),
    // console.log('post ' + his.uri + ' ' + his.json.Value)
    console.log(his)
  );
};

function sleep(waitMsec) {
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec) {
    console.log();
  }
}

ddosHis("7d5deb1a-2bc8-41e6-bc85-6bdc70caf30c", 12, 12); // 冷卻水塔-1溫度設定值
ddosHis("f9ad22d7-4657-408b-95db-08147c619ae7", 1, 1); // 冷卻水塔-1停起控制
ddosHis("4bdc2e8a-ce5c-4a84-b0a8-8efe4d74e0ef", 0, 0); // 冷卻水塔-1運轉狀態
ddosHis("4187e2b4-1440-4259-b5c6-8136e36307d9", 12, 12); // 冷卻水塔-2溫度設定值
ddosHis("0c19921b-9d35-472d-a3c3-35bf86ac917f", 1, 1); // 冷卻水塔-2停起控制
ddosHis("38c69d3d-d5f8-47ff-a615-4b5b02f32380", 1, 1); // 冷卻水塔-2運轉狀態
ddosHis("d977ad08-4425-4c9f-9e0c-87aaf47638b8", 12, 12); // 冷卻水塔-3溫度設定值
ddosHis("ff5926fd-e946-4ee8-a570-d0c5c93e0e4a", 1, 1); // 冷卻水塔-3停起控制
ddosHis("096c817c-766e-4cf1-b648-8a6514cd8f55", 1, 1); // 冷卻水塔-3運轉狀態
ddosHis("6545ad92-c3cb-4a01-a7b6-b8e47c27de07", 0, 0); // 冷卻馬達-1停起控制
ddosHis("b48ddf73-c31d-4731-8047-83ad40e73464", 0, 0); // 冷卻馬達-1運轉狀態
ddosHis("8b13dfea-a7fb-4404-88a5-b58f5a3e5822", 1, 1); // 冷卻馬達-1故障跳脫
ddosHis("aa0468d0-26fa-4d9c-aae5-196e6c3a3fb0", 1, 1); // 設備
ddosHis("52c5852c-885e-46e5-a555-fe585fdc8f9c", 1, 1); // 冷卻馬達-2運轉狀態
ddosHis("db3c6401-faff-4a7c-99b7-b2903980a098", 1, 1); // 冷卻馬達-2故障跳脫
ddosHis("acc7ffa8-5482-4f33-82c9-14fe6d7f841f", 1, 1); // 冷卻馬達-3停起控制
ddosHis("5c951e24-69ea-4611-91fc-28e7a3239d9c", 1, 1); // 冷卻馬達-3運轉狀態
ddosHis("ae4a5ad7-3cc2-4057-b27e-d71cab3aab0c", 1, 1); // 冷卻馬達-3故障跳脫
ddosHis("34b5a04e-a2a4-4c8e-a252-b7acf75eee14", 1, 1); // 冰水主機-1停起控制
ddosHis("cefb7be2-4c60-41fb-b377-084001383493", 1, 1); // 冰水主機-1運轉狀態
ddosHis("c4329169-3679-4f93-a695-8ed34f36f28d", 1, 1); // 冰水主機-1故障跳脫
ddosHis("72d857a8-ced2-423c-9e70-7febea4ba16e", 1, 1); // 冰水主機-2停起控制
ddosHis("817c6b44-d048-43d9-b5c4-bfc13c1ad513", 1, 1); // 冰水主機-2運轉狀態
ddosHis("ca4b7e86-26ff-43e2-b8b3-6f744103c5d9", 1, 1); // 冰水主機-2故障跳脫
ddosHis("90af7071-c367-456b-a13d-5f04307be6a0", 1, 1); // 偵煙感測器狀態
ddosHis("ea8a812b-32de-4df0-b1b2-f746db7b8ff0", 1, 1); // 控制閥控制
ddosHis("9ae8cf48-e9c8-4f27-bb2e-1451fc4c4e55", 1, 1); // 濾網差壓狀態
ddosHis("41a6bad6-1b99-4752-ae67-75f77b4d900e", 1, 1); // 風差壓開關狀態
ddosHis("f27cb6c3-f631-4f82-a23e-a21f18495fdb", 1, 1); // 變頻器狀態
ddosHis("f4395f51-116d-4d38-a04d-5e432d07a5cf", 1, 1); // 風機過載跳脫
ddosHis("74dab691-b48b-44d8-9675-7d5b01ca714e", 1, 1); // 風機運轉狀態
ddosHis("17e73d9a-def8-4989-b3f5-6632a57825f1", 1, 1); // 手自動狀態
ddosHis("7150fabd-4fda-41f4-9463-4b6128be6cad", 1, 1); // 變頻器起停
ddosHis("857e57da-dc8e-4793-8984-0b0d23815b34", 1, 1); // 保持式關閉
ddosHis("efa56d9c-5dea-45cc-8b17-402eccdd4c65", 1, 1); // 變頻器控制
ddosHis("1556e2a4-e99f-452e-b9b9-9f8b15a69671", 1, 1); // 偵煙感測器狀態
ddosHis("0cc1e583-d283-4a48-af61-604bf594c622", 1, 1); // 控制閥控制
ddosHis("9cf253ae-c663-47fa-996a-840cf96595ce", 1, 1); // 濾網差壓狀態
ddosHis("45efca7a-5dd3-46b6-9d43-52b664336304", 1, 1); // 風差壓開關狀態
ddosHis("b7e0cb71-31a7-4888-9551-e9ae99f1871c", 1, 1); // 變頻器狀態
ddosHis("853b9151-a4aa-4f00-861c-b5a1b46cce6f", 1, 1); // 風機過載跳脫
ddosHis("b9e4cc5e-ec88-4eb8-aedc-1e59107b81b1", 1, 1); // 風機運轉狀態
ddosHis("411dfc0e-e8ec-48cd-85fe-890155e466af", 1, 1); // 手自動狀態
ddosHis("e7288245-91be-4312-aa54-e133e08741a6", 1, 1); // 變頻器起停
ddosHis("e8331740-b9b3-48bd-9599-33553c05ce85", 1, 1); // 保持式關閉
ddosHis("1d31cfeb-ded3-42d6-9f1f-48c2ab21fc4d", 1, 1); // 變頻器控制
ddosHis("e10f9d11-13b5-4694-ba12-cec88222cf20", 1, 1); // ACBB1-故障狀態01
ddosHis("f71e85ee-728f-4224-beae-3c14ffb3bcda", 0, 0); // ACBB1-跳脫狀態01
ddosHis("ad0b8d4f-f212-4dfc-9fa0-e8326ed2444f", 1, 1); // ACBB1-啟停狀態01
ddosHis("f7c457be-eaf3-46e5-8f80-1978771192e8", 1, 1); // ACBB2-故障狀態02
ddosHis("951da7c3-5b23-4af3-887f-7480ed53e87c", 1, 1); // ACBB2-跳脫狀態02
ddosHis("2483c978-000b-497f-8cce-595ba00effb7", 1, 1); // ACBB2-啟停狀態02
ddosHis("963c61a1-e1e6-4028-9142-8160e0534dd0", 1, 1); // 發電機啟停狀態
ddosHis("85d74bab-753e-4e21-a895-84af4bf9f493", 1, 1); // 發電機啟停控制
ddosHis("573b917e-e282-47a9-a2c9-33b9616aed98", 1, 1); // 泵浦故障狀態03
ddosHis("9d7387e2-5694-4fbe-99ea-d7e4381b5f44", 1, 1); // 泵浦跳脫狀態03
ddosHis("8a649c92-ad15-4c11-a05a-e49d98e49ae5", 1, 1); // 泵浦啟停狀態03
ddosHis("399b8447-7977-43a7-bc32-708f8dd2337b", 1, 1); // 泵浦故障狀態04
ddosHis("2a8065d9-d967-48c3-80c6-ffc178985691", 1, 1); // 泵浦跳脫狀態04
ddosHis("79904457-a1fa-48b8-81c4-76f68b17eaab", 1, 1); // 泵浦啟停狀態04
ddosHis("05509524-a1dd-48b6-8cea-e00b57eff5de", 1, 1); // 集水區高水位sensor1
ddosHis("f6698ca0-0a92-434c-8eef-ac2581025441", 1, 1); // 集水區低水位sensor1

// Erik start from here

ddosHis("fe26fcf5-baba-4a0e-8889-87552c305a9d", 1, 1); // 冷卻水塔-1停起控制
ddosHis("0c19921b-9d35-472d-a3c3-35bf86ac917f", 1, 1); // 冷卻水塔-2停起控制
ddosHis("38c69d3d-d5f8-47ff-a615-4b5b02f32380", 1, 1); // 冷卻水塔-2運轉狀態
ddosHis("ff5926fd-e946-4ee8-a570-d0c5c93e0e4a", 1, 1); // 冷卻水塔-3停起控制
ddosHis("096c817c-766e-4cf1-b648-8a6514cd8f55", 1, 1); // 冷卻水塔-3運轉狀態
ddosHis("6545ad92-c3cb-4a01-a7b6-b8e47c27de07", 0, 0); // 冷卻馬達-1停起控制
ddosHis("aa0468d0-26fa-4d9c-aae5-196e6c3a3fb0", 1, 1); // 設備
ddosHis("52c5852c-885e-46e5-a555-fe585fdc8f9c", 1, 1); // 冷卻馬達-2運轉狀態
ddosHis("db3c6401-faff-4a7c-99b7-b2903980a098", 0, 0); // 冷卻馬達-2故障跳脫
ddosHis("34b5a04e-a2a4-4c8e-a252-b7acf75eee14", 1, 1); // 冰水主機-1停起控制
ddosHis("cefb7be2-4c60-41fb-b377-084001383493", 1, 1); // 冰水主機-1運轉狀態
ddosHis("c4329169-3679-4f93-a695-8ed34f36f28d", 0, 0); // 冰水主機-1故障跳脫
ddosHis("72d857a8-ced2-423c-9e70-7febea4ba16e", 1, 1); // 冰水主機-2停起控制
ddosHis("817c6b44-d048-43d9-b5c4-bfc13c1ad513", 1, 1); // 冰水主機-2運轉狀態
ddosHis("ca4b7e86-26ff-43e2-b8b3-6f744103c5d9", 0, 0); // 冰水主機-2故障跳脫
ddosHis("90af7071-c367-456b-a13d-5f04307be6a0", 1, 1); // 偵煙感測器狀態
ddosHis("ea8a812b-32de-4df0-b1b2-f746db7b8ff0", 1, 1); // 控制閥控制
ddosHis("9ae8cf48-e9c8-4f27-bb2e-1451fc4c4e55", 1, 1); // 濾網差壓狀態
ddosHis("41a6bad6-1b99-4752-ae67-75f77b4d900e", 1, 1); // 風差壓開關狀態
ddosHis("f27cb6c3-f631-4f82-a23e-a21f18495fdb", 1, 1); // 變頻器狀態
ddosHis("f4395f51-116d-4d38-a04d-5e432d07a5cf", 0, 0); // 風機過載跳脫
ddosHis("74dab691-b48b-44d8-9675-7d5b01ca714e", 1, 1); // 風機運轉狀態
ddosHis("17e73d9a-def8-4989-b3f5-6632a57825f1", 1, 1); // 手自動狀態
ddosHis("7150fabd-4fda-41f4-9463-4b6128be6cad", 1, 1); // 變頻器起停
ddosHis("857e57da-dc8e-4793-8984-0b0d23815b34", 1, 1); // 保持式關閉
ddosHis("efa56d9c-5dea-45cc-8b17-402eccdd4c65", 1, 1); // 變頻器控制
ddosHis("1556e2a4-e99f-452e-b9b9-9f8b15a69671", 1, 1); // 偵煙感測器狀態
ddosHis("0cc1e583-d283-4a48-af61-604bf594c622", 1, 1); // 控制閥控制
ddosHis("9cf253ae-c663-47fa-996a-840cf96595ce", 1, 1); // 濾網差壓狀態
ddosHis("45efca7a-5dd3-46b6-9d43-52b664336304", 1, 1); // 風差壓開關狀態
ddosHis("b7e0cb71-31a7-4888-9551-e9ae99f1871c", 1, 1); // 變頻器狀態
ddosHis("853b9151-a4aa-4f00-861c-b5a1b46cce6f", 0, 0); // 風機過載跳脫
ddosHis("b9e4cc5e-ec88-4eb8-aedc-1e59107b81b1", 1, 1); // 風機運轉狀態
ddosHis("411dfc0e-e8ec-48cd-85fe-890155e466af", 1, 1); // 手自動狀態
ddosHis("e7288245-91be-4312-aa54-e133e08741a6", 1, 1); // 變頻器起停
ddosHis("e8331740-b9b3-48bd-9599-33553c05ce85", 1, 1); // 保持式關閉
ddosHis("1d31cfeb-ded3-42d6-9f1f-48c2ab21fc4d", 1, 1); // 變頻器控制
ddosHis("f71e85ee-728f-4224-beae-3c14ffb3bcda", 0, 0); // ACBB1-跳脫狀態01
ddosHis("ad0b8d4f-f212-4dfc-9fa0-e8326ed2444f", 1, 1); // ACBB1-啟停狀態01
ddosHis("963c61a1-e1e6-4028-9142-8160e0534dd0", 1, 1); // 發電機啟停狀態
ddosHis("85d74bab-753e-4e21-a895-84af4bf9f493", 1, 1); // 發電機啟停控制
ddosHis("573b917e-e282-47a9-a2c9-33b9616aed98", 0, 0); // 泵浦故障狀態03
ddosHis("9d7387e2-5694-4fbe-99ea-d7e4381b5f44", 0, 0); // 泵浦跳脫狀態03
ddosHis("8a649c92-ad15-4c11-a05a-e49d98e49ae5", 1, 1); // 泵浦啟停狀態03
ddosHis("399b8447-7977-43a7-bc32-708f8dd2337b", 0, 0); // 泵浦故障狀態04
ddosHis("2a8065d9-d967-48c3-80c6-ffc178985691", 0, 0); // 泵浦跳脫狀態04
ddosHis("79904457-a1fa-48b8-81c4-76f68b17eaab", 1, 1); // 泵浦啟停狀態04
//
ddosHis("acc7ffa8-5482-4f33-82c9-14fe6d7f841f", 1, 1); // 冷卻馬達-3停起控制
ddosHis("5c951e24-69ea-4611-91fc-28e7a3239d9c", 1, 1); // 冷卻馬達-3運轉狀態
ddosHis("ae4a5ad7-3cc2-4057-b27e-d71cab3aab0c", 0, 0); // 冷卻馬達-3故障跳脫
ddosHis("f7c457be-eaf3-46e5-8f80-1978771192e8", 0, 0); // ACBB2-故障狀態02
ddosHis("951da7c3-5b23-4af3-887f-7480ed53e87c", 0, 0); // ACBB2-跳脫狀態02
ddosHis("2483c978-000b-497f-8cce-595ba00effb7", 1, 1); // ACBB2-啟停狀態02

// Initial Value
ddosHis("f9ad22d7-4657-408b-95db-08147c619ae7", 51, 60), // CO 感測器1
  ddosHis("7d5deb1a-2bc8-41e6-bc85-6bdc70caf30c", 9, 18), // 冷卻水塔-1溫度設定值
  ddosHis("11d78abd-d74a-458d-a77d-4afecbe25197", 11.25, 22.5), // 冷卻水塔-1回水溫度
  ddosHis("be3d2034-9116-453b-b76f-fdcad1e11125", 15, 30), // 冷卻水塔模組1-外氣溫度
  ddosHis("1036c4fb-da99-405a-8240-18f274011c63", 45, 90), // 冷卻水塔模組1-外氣濕度
  ddosHis("474308ae-c944-448c-9b3a-51b1c2694b35", 18.75, 37.5), // 冷卻水塔模組1-外氣露點
  ddosHis("4187e2b4-1440-4259-b5c6-8136e36307d9", 9, 18), // 冷卻水塔-2溫度設定值
  ddosHis("559df386-cf80-4f72-a712-ab061a427a25", 11.25, 22.5), // 冷卻水塔-2回水溫度
  ddosHis("bc61cbd5-43f6-4bb5-a021-c6f1c5e8cc10", 24.75, 49.5), // 冷卻水塔模組2-外氣溫度
  ddosHis("d59f0b12-e559-4fcf-9f6b-c801158e17e8", 45, 90), // 冷卻水塔模組2-外氣濕度
  ddosHis("47f7e999-44f6-43ea-9e98-9ba3e28b5750", 19.05, 38.1), // 冷卻水塔模組2-外氣露點
  ddosHis("d977ad08-4425-4c9f-9e0c-87aaf47638b8", 9, 18), // 冷卻水塔-3溫度設定值
  ddosHis("8918c16e-690a-413d-b24a-5fac497693a2", 11.25, 22.5), // 冷卻水塔-3回水溫度
  ddosHis("d8b380d8-e718-4cbf-886d-43bdef496021", 24.75, 49.5), // 冷卻水塔模組3-外氣溫度
  ddosHis("88e0f77c-4d96-4d9c-9125-596d4e886715", 45.75, 91.5), // 冷卻水塔模組3-外氣濕度
  ddosHis("a4b4c39e-8d17-4a21-99be-9756dc8fce7c", 19.125, 38.25), // 冷卻水塔模組3-外氣露點
  ddosHis("e098a47b-89aa-4867-9351-752d35793cee", 22.5, 45), // 冷卻水泵模組1-冷卻水泵-1加載設定值
  ddosHis("8df1c517-3808-4801-8b38-65fc8cf74275", 52.5, 105), // 冷卻水泵模組1-冷卻水泵-1卸載設定值
  ddosHis("9d4f97f9-dbb6-4614-b40d-2884735d7765", 135, 270), // 冷卻水泵模組1-冷卻水泵-1交替時間
  ddosHis("064f615d-cc56-4989-aca0-8c2963ff98ba", 15, 30), // 冷卻水泵模組1-冷卻水泵-1交替延遲
  ddosHis("977d5a7b-6d7e-46f3-8125-a8847784cf60", 30, 60), // 冷卻水泵模組1-冷卻水泵-1頻率輸出
  ddosHis("1f7986f1-b442-4d94-8104-4ce2a4734921", 22.5, 45), // 冷卻水泵模組2-冷卻水泵-2加載設定值
  ddosHis("668c190b-feee-43c6-8295-b1390a07aae4", 52.5, 105), // 冷卻水泵模組2-冷卻水泵-2卸載設定值
  ddosHis("39af6242-407c-4973-ae91-961e2e26fd79", 135, 270), // 冷卻水泵模組2-冷卻水泵-2交替時間
  ddosHis("bc32da6f-a744-4524-b87a-ea671ced874f", 15, 30), // 冷卻水泵模組2-冷卻水泵-2交替延遲
  ddosHis("7fd7f3e8-05f3-4be1-add5-f907042c899b", 30, 60), // 冷卻水泵模組2-冷卻水泵-2頻率輸出
  ddosHis("05971ce2-2c63-4857-b876-cbf272ce7fff", 22.5, 45), // 冷卻水泵模組3-冷卻水泵-3加載設定值
  ddosHis("68739a53-2efa-42f6-8ca5-bb2109ac7557", 52.5, 105), // 冷卻水泵模組3-冷卻水泵-3卸載設定值
  ddosHis("76e18c37-19b6-4126-b8a5-90b009e49a5c", 135, 270), // 冷卻水泵模組3-冷卻水泵-3交替時間
  ddosHis("56e33dfe-fead-4c0b-934e-374c10855a3c", 15, 30), // 冷卻水泵模組3-冷卻水泵-3交替延遲
  ddosHis("64c9e84b-7c8a-4153-a833-142f53ca34b4", 30, 60), // 冷卻水泵模組3-冷卻水泵-3頻率輸出
  ddosHis("2d66338e-6eb3-492e-8cf9-fa61836ead48", 21, 42), // 回風溫度值
  ddosHis("2c318c8b-77cd-4cbf-948c-941f15ef2e08", 48.75, 97.5), // 回風濕度值
  ddosHis("7a8115a4-dd4c-4381-9c74-e2945e62b3b3", 37.5, 75), // 風門開度控制
  ddosHis("015951a5-116a-4f00-ab52-af4f7cf30ab4", 21, 42), // 回風溫度值
  ddosHis("28c77277-4989-46cc-8bc2-d4b3eef8f615", 48.75, 97.5), // 回風濕度值
  ddosHis("5dfdc14e-d8c9-4a77-a14f-77590198b3bf", 37.5, 75), // 風門開度控制
  ddosHis("53402a68-06cd-43d7-b07d-b90844ed6f49", 82.5, 165), // ACBB1電表電壓V1
  ddosHis("d2825cd1-8f53-4d9b-9090-689294c73d32", 82.5, 165), // ACBB1電表電壓V2
  ddosHis("cbace30c-50c2-47fa-8a67-d5501726663c", 82.5, 165), // ACBB1電表電壓V3
  ddosHis("88cb061c-5ffc-42dd-a59a-a3063b86af7f", 3.75, 7.5), // ACBB1電表電流I1
  ddosHis("e90df963-e309-4981-b254-53f24a24d549", 3.75, 7.5), // ACBB1電表電流I2
  ddosHis("2981dd6d-6f75-496a-a9e6-374d493bbd31", 3.75, 7.5), // ACBB1電表電流I3
  ddosHis("fd4760e1-3912-48d1-88bf-3e4f17455613", 2.625, 5.25), // ACBB1電表電功率KW
  ddosHis("8b3712c9-eec3-4cf1-bea4-3868c7ae17e5", 0.6, 1.2), // ACBB1電表功因Pf
  ddosHis("843d7623-488a-4d93-a8b5-b13faf8ab813", 45, 90), // ACBB1電表頻率Hz
  ddosHis("f74346d5-3061-4269-9059-5cd3dd37a055", 82.5, 165), // ACBB2電表電壓V1
  ddosHis("0c4e11e6-8f41-4ac0-8f61-c1dcb97a092b", 82.5, 165), // ACBB2電表電壓V2
  ddosHis("7825ec50-ec55-4ba5-89dc-09d7a3005c03", 82.5, 165), // ACBB2電表電壓V3
  ddosHis("02273ca2-0fd4-4fa3-bc69-205147daa8ac", 3.75, 7.5), // ACBB2電表電流I1
  ddosHis("7c19e6fb-b1c3-49d2-8f7e-f69b1e228c08", 3.75, 7.5), // ACBB2電表電流I2
  ddosHis("7a648611-9823-481e-a076-f3856cd3f874", 3.75, 7.5), // ACBB2電表電流I3
  ddosHis("82846ee6-d61a-439e-af6a-00ac836fd37f", 2.625, 5.25), // ACBB2電表電功率KW
  ddosHis("d124d2e3-501e-461c-951e-84e3a9ee2be4", 0.6, 1.2), // ACBB2電表功因Pf
  ddosHis("e66c1d8b-7828-402b-ab65-88e99dbb7045", 45, 90), // ACBB2電表頻率Hz
  ddosHis("01a308db-90c9-45b5-a6dd-cbcc23a9a7ec", 82.5, 165), // 發電機3電壓V1
  ddosHis("34162679-dc25-419a-8d06-7cc9fa054466", 82.5, 165), // 發電機3電壓V2
  ddosHis("6222709e-5560-4cea-ba98-ebae51a62a06", 82.5, 165), // 發電機3電壓V3
  ddosHis("872f7c43-12d1-432f-9f9f-13b822218f13", 3.75, 7.5), // 發電機3電流I1
  ddosHis("3530d351-3f2e-4296-b4a1-477ec88f72b1", 3.75, 7.5), // 發電機3電流I2
  ddosHis("c91cc744-a977-46b6-9fb6-3de05b0c1cb8", 3.75, 7.5), // 發電機3電流I3
  ddosHis("07a59ed6-cef8-4c43-8626-66d8df59c6a9", 2.625, 5.25), // 發電機3電功率KW
  ddosHis("4a01b9a3-c68b-45d2-a3ea-17b3b3e31e4f", 0.6, 1.2), // 發電機3功因Pf
  ddosHis("bea053a1-6be9-44d8-8762-33812b358d24", 45, 90), // 發電機3頻率Hz
  ddosHis("1e243a9a-2bff-43c4-94fe-cf0205b12cb3", 20, 45), // CO 感測器2
  ddosHis("fb6f0fdf-a5e2-4620-8870-1993362b2919", 20, 45); // CO 感測器3

// 5 alam datas
setInterval(function() {
  ddosAlarm_His("f9ad22d7-4657-408b-95db-08147c619ae7", 51, 60); // CO 感測器1
  ddosAlarm_His("4bdc2e8a-ce5c-4a84-b0a8-8efe4d74e0ef", 0, 0); // 冷卻水塔-1運轉狀態
  ddosAlarm_His("b48ddf73-c31d-4731-8047-83ad40e73464", 0, 0); // 冷卻馬達-1運轉狀態
  ddosAlarm_His("8b13dfea-a7fb-4404-88a5-b58f5a3e5822", 1, 1); // 冷卻馬達-1故障跳脫
  ddosAlarm_His("e10f9d11-13b5-4694-ba12-cec88222cf20", 1, 1); // ACBB1-故障狀態01
}, 5000);

// changable data
//setInterval(function() {
ddosHis("f9ad22d7-4657-408b-95db-08147c619ae7", 51, 60); // CO 感測器1
// sleep(2500),
ddosHis("7d5deb1a-2bc8-41e6-bc85-6bdc70caf30c", 9, 18); // 冷卻水塔-1溫度設定值
// sleep(2500),
ddosHis("11d78abd-d74a-458d-a77d-4afecbe25197", 11.25, 22.5); // 冷卻水塔-1回水溫度
// sleep(2500),
ddosHis("be3d2034-9116-453b-b76f-fdcad1e11125", 15, 30); // 冷卻水塔模組1-外氣溫度
// sleep(2500),
ddosHis("1036c4fb-da99-405a-8240-18f274011c63", 45, 90); // 冷卻水塔模組1-外氣濕度
// sleep(2500),
ddosHis("474308ae-c944-448c-9b3a-51b1c2694b35", 18.75, 37.5); // 冷卻水塔模組1-外氣露點
// sleep(2500),
ddosHis("4187e2b4-1440-4259-b5c6-8136e36307d9", 9, 18); // 冷卻水塔-2溫度設定值
// sleep(2500),
ddosHis("559df386-cf80-4f72-a712-ab061a427a25", 11.25, 22.5); // 冷卻水塔-2回水溫度
// sleep(2500),
ddosHis("bc61cbd5-43f6-4bb5-a021-c6f1c5e8cc10", 24.75, 49.5); // 冷卻水塔模組2-外氣溫度
// sleep(2500),
ddosHis("d59f0b12-e559-4fcf-9f6b-c801158e17e8", 45, 90); // 冷卻水塔模組2-外氣濕度
// sleep(2500),
ddosHis("47f7e999-44f6-43ea-9e98-9ba3e28b5750", 19.05, 38.1); // 冷卻水塔模組2-外氣露點
// sleep(2500),
ddosHis("d977ad08-4425-4c9f-9e0c-87aaf47638b8", 9, 18); // 冷卻水塔-3溫度設定值
// sleep(2500),
ddosHis("8918c16e-690a-413d-b24a-5fac497693a2", 11.25, 22.5); // 冷卻水塔-3回水溫度
// sleep(2500),
ddosHis("d8b380d8-e718-4cbf-886d-43bdef496021", 24.75, 49.5); // 冷卻水塔模組3-外氣溫度
// sleep(2500),
ddosHis("88e0f77c-4d96-4d9c-9125-596d4e886715", 45.75, 91.5); // 冷卻水塔模組3-外氣濕度
// sleep(2500),
ddosHis("a4b4c39e-8d17-4a21-99be-9756dc8fce7c", 19.125, 38.25); // 冷卻水塔模組3-外氣露點
// sleep(2500),
ddosHis("e098a47b-89aa-4867-9351-752d35793cee", 22.5, 45); // 冷卻水泵模組1-冷卻水泵-1加載設定值
// sleep(2500),
ddosHis("8df1c517-3808-4801-8b38-65fc8cf74275", 52.5, 105); // 冷卻水泵模組1-冷卻水泵-1卸載設定值
// sleep(2500),
ddosHis("9d4f97f9-dbb6-4614-b40d-2884735d7765", 135, 270); // 冷卻水泵模組1-冷卻水泵-1交替時間
// sleep(2500),
ddosHis("064f615d-cc56-4989-aca0-8c2963ff98ba", 15, 30); // 冷卻水泵模組1-冷卻水泵-1交替延遲
// sleep(2500),
ddosHis("977d5a7b-6d7e-46f3-8125-a8847784cf60", 30, 60); // 冷卻水泵模組1-冷卻水泵-1頻率輸出
// sleep(2500),
ddosHis("1f7986f1-b442-4d94-8104-4ce2a4734921", 22.5, 45); // 冷卻水泵模組2-冷卻水泵-2加載設定值
// sleep(2500),
ddosHis("668c190b-feee-43c6-8295-b1390a07aae4", 52.5, 105); // 冷卻水泵模組2-冷卻水泵-2卸載設定值
// sleep(2500),
ddosHis("39af6242-407c-4973-ae91-961e2e26fd79", 135, 270); // 冷卻水泵模組2-冷卻水泵-2交替時間
// sleep(2500),
ddosHis("bc32da6f-a744-4524-b87a-ea671ced874f", 15, 30); // 冷卻水泵模組2-冷卻水泵-2交替延遲
// sleep(2500),
ddosHis("7fd7f3e8-05f3-4be1-add5-f907042c899b", 30, 60); // 冷卻水泵模組2-冷卻水泵-2頻率輸出
// sleep(2500),
ddosHis("05971ce2-2c63-4857-b876-cbf272ce7fff", 22.5, 45); // 冷卻水泵模組3-冷卻水泵-3加載設定值
// sleep(2500),
ddosHis("68739a53-2efa-42f6-8ca5-bb2109ac7557", 52.5, 105); // 冷卻水泵模組3-冷卻水泵-3卸載設定值
// sleep(2500),
ddosHis("76e18c37-19b6-4126-b8a5-90b009e49a5c", 135, 270); // 冷卻水泵模組3-冷卻水泵-3交替時間
// sleep(2500),
ddosHis("56e33dfe-fead-4c0b-934e-374c10855a3c", 15, 30); // 冷卻水泵模組3-冷卻水泵-3交替延遲
// sleep(2500),
ddosHis("64c9e84b-7c8a-4153-a833-142f53ca34b4", 30, 60); // 冷卻水泵模組3-冷卻水泵-3頻率輸出
// sleep(2500),
ddosHis("2d66338e-6eb3-492e-8cf9-fa61836ead48", 21, 42); // 回風溫度值
// sleep(2500),
ddosHis("2c318c8b-77cd-4cbf-948c-941f15ef2e08", 48.75, 97.5); // 回風濕度值
// sleep(2500),
ddosHis("7a8115a4-dd4c-4381-9c74-e2945e62b3b3", 37.5, 75); // 風門開度控制
// sleep(2500),
ddosHis("015951a5-116a-4f00-ab52-af4f7cf30ab4", 21, 42); // 回風溫度值
// sleep(2500),
ddosHis("28c77277-4989-46cc-8bc2-d4b3eef8f615", 48.75, 97.5); // 回風濕度值
// sleep(2500),
ddosHis("5dfdc14e-d8c9-4a77-a14f-77590198b3bf", 37.5, 75); // 風門開度控制
// sleep(2500),
ddosHis("53402a68-06cd-43d7-b07d-b90844ed6f49", 82.5, 165); // ACBB1電表電壓V1
// sleep(2500),
ddosHis("d2825cd1-8f53-4d9b-9090-689294c73d32", 82.5, 165); // ACBB1電表電壓V2
// sleep(2500),
ddosHis("cbace30c-50c2-47fa-8a67-d5501726663c", 82.5, 165); // ACBB1電表電壓V3
// sleep(2500),
ddosHis("88cb061c-5ffc-42dd-a59a-a3063b86af7f", 3.75, 7.5); // ACBB1電表電流I1
// sleep(2500),
ddosHis("e90df963-e309-4981-b254-53f24a24d549", 3.75, 7.5); // ACBB1電表電流I2
// sleep(2500),
ddosHis("2981dd6d-6f75-496a-a9e6-374d493bbd31", 3.75, 7.5); // ACBB1電表電流I3
// sleep(2500),
ddosHis("fd4760e1-3912-48d1-88bf-3e4f17455613", 2.625, 5.25); // ACBB1電表電功率KW
// sleep(2500),
ddosHis("8b3712c9-eec3-4cf1-bea4-3868c7ae17e5", 0.6, 1.2); // ACBB1電表功因Pf
// sleep(2500),
ddosHis("843d7623-488a-4d93-a8b5-b13faf8ab813", 45, 90); // ACBB1電表頻率Hz
// sleep(2500),
ddosHis("f74346d5-3061-4269-9059-5cd3dd37a055", 82.5, 165); // ACBB2電表電壓V1
// sleep(2500),
ddosHis("0c4e11e6-8f41-4ac0-8f61-c1dcb97a092b", 82.5, 165); // ACBB2電表電壓V2
// sleep(2500),
ddosHis("7825ec50-ec55-4ba5-89dc-09d7a3005c03", 82.5, 165); // ACBB2電表電壓V3
// sleep(2500),
ddosHis("02273ca2-0fd4-4fa3-bc69-205147daa8ac", 3.75, 7.5); // ACBB2電表電流I1
// sleep(2500),
ddosHis("7c19e6fb-b1c3-49d2-8f7e-f69b1e228c08", 3.75, 7.5); // ACBB2電表電流I2
// sleep(2500),
ddosHis("7a648611-9823-481e-a076-f3856cd3f874", 3.75, 7.5); // ACBB2電表電流I3
// sleep(2500),
ddosHis("82846ee6-d61a-439e-af6a-00ac836fd37f", 2.625, 5.25); // ACBB2電表電功率KW
// sleep(2500),
ddosHis("d124d2e3-501e-461c-951e-84e3a9ee2be4", 0.6, 1.2); // ACBB2電表功因Pf
// sleep(2500),
ddosHis("e66c1d8b-7828-402b-ab65-88e99dbb7045", 45, 90); // ACBB2電表頻率Hz
// sleep(2500),
ddosHis("01a308db-90c9-45b5-a6dd-cbcc23a9a7ec", 82.5, 165); // 發電機3電壓V1
// sleep(2500),
ddosHis("34162679-dc25-419a-8d06-7cc9fa054466", 82.5, 165); // 發電機3電壓V2
// sleep(2500),
ddosHis("6222709e-5560-4cea-ba98-ebae51a62a06", 82.5, 165); // 發電機3電壓V3
// sleep(2500),
ddosHis("872f7c43-12d1-432f-9f9f-13b822218f13", 3.75, 7.5); // 發電機3電流I1
// sleep(2500),
ddosHis("3530d351-3f2e-4296-b4a1-477ec88f72b1", 3.75, 7.5); // 發電機3電流I2
// sleep(2500),
ddosHis("c91cc744-a977-46b6-9fb6-3de05b0c1cb8", 3.75, 7.5); // 發電機3電流I3
// sleep(2500),
ddosHis("07a59ed6-cef8-4c43-8626-66d8df59c6a9", 2.625, 5.25); // 發電機3電功率KW
// sleep(2500),
ddosHis("4a01b9a3-c68b-45d2-a3ea-17b3b3e31e4f", 0.6, 1.2); // 發電機3功因Pf
// sleep(2500),
ddosHis("bea053a1-6be9-44d8-8762-33812b358d24", 45, 90); // 發電機3頻率Hz
// sleep(2500),
ddosHis("1e243a9a-2bff-43c4-94fe-cf0205b12cb3", 20, 45); // CO 感測器2
// sleep(2500),
ddosHis("fb6f0fdf-a5e2-4620-8870-1993362b2919", 20, 45); // CO 感測器3
//}, 1000);
