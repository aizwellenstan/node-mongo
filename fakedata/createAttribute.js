const request = require("request");

const URI = "http://localhost:6004/attribute";

attribute = {
  uri: "",
  headers: {
    "Content-type": "application/json"
  },
  json: ""
};

function randomIntFromInterval(min, max, dec) {
  // min and max included
  console.log(dec)
  if(dec){
    if ((max-min)==0){
      return min
    }
    return Math.round((Math.random() * (max - min + 1) + min)*10)/10;
  }
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var createAttribute = function (data) {
  async function resolveSample() {
    attribute.uri = URI;
    array = [];
    // console.log(data[0].ObjectId);
    for (var i = 0; i < data.length; i++) {
      var rand = randomIntFromInterval(data[i].min, data[i].max, data[i].dec);
      objectArray = { objectId: data[i].objectId, Value: rand };

      array.push(objectArray);
    }

    attribute.json = array;
  }

  resolveSample().then(
    request.post(attribute, function (error, response, body) { }),
    console.log(JSON.stringify(attribute))
  );
};

nocahngeArray = [
  // control
  { objectId: "7d5deb1a-2bc8-41e6-bc85-6bdc70caf30c", min: 12, max: 12, dec: false }, // 冷卻水塔-1溫度設定值
  { objectId: "ff5926fd-e946-4ee8-a570-d0c5c93e0e4a", min: 1, max: 1, dec: false },
  { objectId: "e7288245-91be-4312-aa54-e133e08741a6", min: 1, max: 1, dec: false },
  { objectId: "7150fabd-4fda-41f4-9463-4b6128be6cad", min: 1, max: 1, dec: false },
  { objectId: "fe26fcf5-baba-4a0e-8889-87552c305a9d", min: 1, max: 1, dec: false },
  { objectId: "4187e2b4-1440-4259-b5c6-8136e36307d9", min: 12, max: 12, dec: false },
  { objectId: "6545ad92-c3cb-4a01-a7b6-b8e47c27de07", min: 0, max: 0, dec: false },
  { objectId: "aa0468d0-26fa-4d9c-aae5-196e6c3a3fb0", min: 1, max: 1, dec: false },
  { objectId: "acc7ffa8-5482-4f33-82c9-14fe6d7f841f", min: 1, max: 1, dec: false },
  { objectId: "34b5a04e-a2a4-4c8e-a252-b7acf75eee14", min: 1, max: 1, dec: false },
  { objectId: "0c19921b-9d35-472d-a3c3-35bf86ac917f", min: 1, max: 1, dec: false },
  { objectId: "d977ad08-4425-4c9f-9e0c-87aaf47638b8", min: 12, max: 12, dec: false },
  { objectId: "7a8115a4-dd4c-4381-9c74-e2945e62b3b3", min: 50, max: 50, dec: false },
  { objectId: "ea8a812b-32de-4df0-b1b2-f746db7b8ff0", min: 1, max: 1, dec: false },
  { objectId: "72d857a8-ced2-423c-9e70-7febea4ba16e", min: 1, max: 1, dec: false },
  { objectId: "efa56d9c-5dea-45cc-8b17-402eccdd4c65", min: 1, max: 1, dec: false },
  { objectId: "5dfdc14e-d8c9-4a77-a14f-77590198b3bf", min: 50, max: 50, dec: true },
  { objectId: "5dfdc14e-d8c9-4a77-a14f-77590198b3bf-2", min: 50, max: 50, dec: true },
  { objectId: "0cc1e583-d283-4a48-af61-604bf594c622", min: 1, max: 1, dec: false },
  { objectId: "1d31cfeb-ded3-42d6-9f1f-48c2ab21fc4d", min: 1, max: 1, dec: false },

  // no control
  { objectId: "4bdc2e8a-ce5c-4a84-b0a8-8efe4d74e0ef", min: 0, max: 0, dec: false },
  { objectId: "4bdc2e8a-ce5c-4a84-b0a8-8efe4d74e0ef-2", min: 1, max: 1, dec: false },
  { objectId: "38c69d3d-d5f8-47ff-a615-4b5b02f32380", min: 1, max: 1, dec: false },
  { objectId: "38c69d3d-d5f8-47ff-a615-4b5b02f32380-2", min: 0, max: 0, dec: false },
  { objectId: "096c817c-766e-4cf1-b648-8a6514cd8f55", min: 1, max: 1, dec: false },
  { objectId: "096c817c-766e-4cf1-b648-8a6514cd8f55-2", min: 0, max: 0, dec: false },
  { objectId: "b48ddf73-c31d-4731-8047-83ad40e73464", min: 0, max: 0, dec: false },
  { objectId: "8b13dfea-a7fb-4404-88a5-b58f5a3e5822", min: 1, max: 1, dec: false },
  { objectId: "52c5852c-885e-46e5-a555-fe585fdc8f9c", min: 1, max: 1, dec: false },
  { objectId: "5c951e24-69ea-4611-91fc-28e7a3239d9c", min: 1, max: 1, dec: false },
  { objectId: "ae4a5ad7-3cc2-4057-b27e-d71cab3aab0c", min: 0, max: 0, dec: false },
  { objectId: "ae4a5ad7-3cc2-4057-b27e-d71cab3aab0c", min: 1, max: 1, dec: false },
  { objectId: "cefb7be2-4c60-41fb-b377-084001383493", min: 1, max: 1, dec: false },
  { objectId: "c4329169-3679-4f93-a695-8ed34f36f28d", min: 0, max: 0, dec: false },
  { objectId: "817c6b44-d048-43d9-b5c4-bfc13c1ad513", min: 1, max: 1, dec: false },
  { objectId: "ca4b7e86-26ff-43e2-b8b3-6f744103c5d9", min: 0, max: 0, dec: false},
  { objectId: "90af7071-c367-456b-a13d-5f04307be6a0", min: 1, max: 1, dec: false },
  { objectId: "9ae8cf48-e9c8-4f27-bb2e-1451fc4c4e55", min: 1, max: 1, dec: false },
  { objectId: "41a6bad6-1b99-4752-ae67-75f77b4d900e", min: 1, max: 1, dec: false },
  { objectId: "f27cb6c3-f631-4f82-a23e-a21f18495fdb", min: 1, max: 1, dec: false },
  { objectId: "f4395f51-116d-4d38-a04d-5e432d07a5cf", min: 0, max: 0, dec: false },
  { objectId: "74dab691-b48b-44d8-9675-7d5b01ca714e", min: 1, max: 1, dec: false },
  { objectId: "17e73d9a-def8-4989-b3f5-6632a57825f1", min: 1, max: 1, dec: false },
  { objectId: "857e57da-dc8e-4793-8984-0b0d23815b34", min: 1, max: 1, dec: false },
  { objectId: "1556e2a4-e99f-452e-b9b9-9f8b15a69671", min: 1, max: 1, dec: false },
  { objectId: "9cf253ae-c663-47fa-996a-840cf96595ce", min: 1, max: 1, dec: false },
  { objectId: "45efca7a-5dd3-46b6-9d43-52b664336304", min: 1, max: 1, dec: false },
  { objectId: "b7e0cb71-31a7-4888-9551-e9ae99f1871c", min: 1, max: 1, dec: false },
  { objectId: "853b9151-a4aa-4f00-861c-b5a1b46cce6f", min: 0, max: 0, dec: false },
  { objectId: "b9e4cc5e-ec88-4eb8-aedc-1e59107b81b1", min: 1, max: 1, dec: false },
  { objectId: "411dfc0e-e8ec-48cd-85fe-890155e466af", min: 1, max: 1, dec: false },
  { objectId: "e8331740-b9b3-48bd-9599-33553c05ce85", min: 1, max: 1, dec: false },
  { objectId: "e10f9d11-13b5-4694-ba12-cec88222cf20", min: 1, max: 1, dec: false },
  { objectId: "f71e85ee-728f-4224-beae-3c14ffb3bcda", min: 1, max: 1, dec: false },
  { objectId: "ad0b8d4f-f212-4dfc-9fa0-e8326ed2444f", min: 0, max: 0, dec: false },
  { objectId: "f7c457be-eaf3-46e5-8f80-1978771192e8", min: 1, max: 1, dec: false },
  { objectId: "951da7c3-5b23-4af3-887f-7480ed53e87c", min: 0, max: 0, dec: false },
  { objectId: "2483c978-000b-497f-8cce-595ba00effb7", min: 1, max: 1, dec: false },
  { objectId: "963c61a1-e1e6-4028-9142-8160e0534dd0", min: 1, max: 1, dec: false },
  { objectId: "85d74bab-753e-4e21-a895-84af4bf9f493", min: 1, max: 1, dec: false },
  { objectId: "573b917e-e282-47a9-a2c9-33b9616aed98", min: 1, max: 1, dec: false },
  { objectId: "9d7387e2-5694-4fbe-99ea-d7e4381b5f44", min: 0, max: 0, dec: false },
  { objectId: "8a649c92-ad15-4c11-a05a-e49d98e49ae5", min: 1, max: 1, dec: false },
  { objectId: "399b8447-7977-43a7-bc32-708f8dd2337b", min: 1, max: 1, dec: false },
  { objectId: "2a8065d9-d967-48c3-80c6-ffc178985691", min: 0, max: 0, dec: false },
  { objectId: "79904457-a1fa-48b8-81c4-76f68b17eaab", min: 1, max: 1, dec: false },
  { objectId: "05509524-a1dd-48b6-8cea-e00b57eff5de", min: 0, max: 0, dec: false },
  { objectId: "f6698ca0-0a92-434c-8eef-ac2581025441", min: 0, max: 0, dec: false },
]

changeArray = [
  { objectId: "11d78abd-d74a-458d-a77d-4afecbe25197", min: 15, max: 15, dec: false }, // 冷卻水塔-1回水溫度
  { objectId: "be3d2034-9116-453b-b76f-fdcad1e11125", min: 15, max: 30, dec: false }, // 冷卻水塔模組1-外氣溫度
  { objectId: "1036c4fb-da99-405a-8240-18f274011c63", min: 45, max: 90, dec: false }, // 冷卻水塔模組1-外氣濕度
  { objectId: "474308ae-c944-448c-9b3a-51b1c2694b35", min: 18.75, max: 37.5, dec: true }, // 冷卻水塔模組1-外氣露點
  { objectId: "559df386-cf80-4f72-a712-ab061a427a25", min: 15, max: 15, dec: false }, // 冷卻水塔-2回水溫度
  { objectId: "bc61cbd5-43f6-4bb5-a021-c6f1c5e8cc10", min: 24.75, max: 49.5, dec: true }, // 冷卻水塔模組2-外氣溫度
  { objectId: "d59f0b12-e559-4fcf-9f6b-c801158e17e8", min: 45, max: 90, dec: false }, // 冷卻水塔模組2-外氣濕度
  { objectId: "47f7e999-44f6-43ea-9e98-9ba3e28b5750", min: 19.05, max: 38.1, dec: true }, // 冷卻水塔模組2-外氣露點
  { objectId: "8918c16e-690a-413d-b24a-5fac497693a2", min: 15, max: 15, dec: false }, // 冷卻水塔-3回水溫度
  { objectId: "d8b380d8-e718-4cbf-886d-43bdef496021", min: 24.75, max: 49.5, dec: true }, // 冷卻水塔模組3-外氣溫度
  { objectId: "88e0f77c-4d96-4d9c-9125-596d4e886715", min: 45.75, max: 91.5, dec: true }, // 冷卻水塔模組3-外氣濕度
  { objectId: "a4b4c39e-8d17-4a21-99be-9756dc8fce7c", min: 19.13, max: 38.3, dec: true }, // 冷卻水塔模組3-外氣露點
  { objectId: "e098a47b-89aa-4867-9351-752d35793cee", min: 22.5, max: 45, dec: false }, // 冷卻水泵模組1-冷卻水泵-1加載設定值
  { objectId: "8df1c517-3808-4801-8b38-65fc8cf74275", min: 52.5, max: 105, dec: false }, // 冷卻水泵模組1-冷卻水泵-1卸載設定值
  { objectId: "9d4f97f9-dbb6-4614-b40d-2884735d7765", min: 135, max: 270, dec: false }, // 冷卻水泵模組1-冷卻水泵-1交替時間
  { objectId: "064f615d-cc56-4989-aca0-8c2963ff98ba", min: 15, max: 30, dec: false }, // 冷卻水泵模組1-冷卻水泵-1交替延遲
  { objectId: "977d5a7b-6d7e-46f3-8125-a8847784cf60", min: 30, max: 60, dec: false }, // 冷卻水泵模組1-冷卻水泵-1頻率輸出
  { objectId: "1f7986f1-b442-4d94-8104-4ce2a4734921", min: 22.5, max: 45, dec: false }, // 冷卻水泵模組2-冷卻水泵-2加載設定值
  { objectId: "668c190b-feee-43c6-8295-b1390a07aae4", min: 52.5, max: 105, dec: false }, // 冷卻水泵模組2-冷卻水泵-2卸載設定值
  { objectId: "39af6242-407c-4973-ae91-961e2e26fd79", min: 135, max: 270, dec: false }, // 冷卻水泵模組2-冷卻水泵-2交替時間
  { objectId: "bc32da6f-a744-4524-b87a-ea671ced874f", min: 15, max: 30, dec: false }, // 冷卻水泵模組2-冷卻水泵-2交替延遲
  { objectId: "7fd7f3e8-05f3-4be1-add5-f907042c899b", min: 30, max: 60, dec: false }, // 冷卻水泵模組2-冷卻水泵-2頻率輸出
  { objectId: "05971ce2-2c63-4857-b876-cbf272ce7fff", min: 22.5, max: 45, dec: false }, // 冷卻水泵模組3-冷卻水泵-3加載設定值
  { objectId: "68739a53-2efa-42f6-8ca5-bb2109ac7557", min: 52.5, max: 105, dec: false }, // 冷卻水泵模組3-冷卻水泵-3卸載設定值
  { objectId: "76e18c37-19b6-4126-b8a5-90b009e49a5c", min: 135, max: 270, dec: false }, // 冷卻水泵模組3-冷卻水泵-3交替時間
  { objectId: "56e33dfe-fead-4c0b-934e-374c10855a3c", min: 15, max: 30, dec: false }, // 冷卻水泵模組3-冷卻水泵-3交替延遲
  { objectId: "64c9e84b-7c8a-4153-a833-142f53ca34b4", min: 30, max: 60, dec: false }, // 冷卻水泵模組3-冷卻水泵-3頻率輸出
  { objectId: "2d66338e-6eb3-492e-8cf9-fa61836ead48", min: 21, max: 42, dec: false }, // 回風溫度值
  { objectId: "2c318c8b-77cd-4cbf-948c-941f15ef2e08", min: 65, max: 65, dec: false }, // 回風濕度值
  { objectId: "015951a5-116a-4f00-ab52-af4f7cf30ab4", min: 28, max: 28, dec: false }, // 回風溫度值
  { objectId: "28c77277-4989-46cc-8bc2-d4b3eef8f615", min: 65, max: 65, dec: false }, // 回風濕度值
  { objectId: "53402a68-06cd-43d7-b07d-b90844ed6f49", min: 219.6, max: 220.4, dec: true }, // ACBB1電表電壓V1
  { objectId: "d2825cd1-8f53-4d9b-9090-689294c73d32", min: 219.6, max: 220.4, dec: true }, // ACBB1電表電壓V2
  { objectId: "cbace30c-50c2-47fa-8a67-d5501726663c", min: 219.6, max: 220.4, dec: true }, // ACBB1電表電壓V3
  { objectId: "88cb061c-5ffc-42dd-a59a-a3063b86af7f", min: 0.3, max: 0.5, dec: true }, // ACBB1電表電流I1
  { objectId: "e90df963-e309-4981-b254-53f24a24d549", min: 0.3, max: 0.5, dec: true }, // ACBB1電表電流I2
  { objectId: "2981dd6d-6f75-496a-a9e6-374d493bbd31", min: 0.3, max: 0.5, dec: true }, // ACBB1電表電流I3
  { objectId: "fd4760e1-3912-48d1-88bf-3e4f17455613", min: 0.9, max: 1.1, dec: true }, // ACBB1電表電功率KW
  { objectId: "8b3712c9-eec3-4cf1-bea4-3868c7ae17e5", min: 0.8, max: 0.8, dec: true }, // ACBB1電表功因Pf
  { objectId: "843d7623-488a-4d93-a8b5-b13faf8ab813", min: 59.8, max: 60.1, dec: true }, // ACBB1電表頻率Hz
  { objectId: "f74346d5-3061-4269-9059-5cd3dd37a055", min: 219.6, max: 220.4, dec: true }, // ACBB2電表電壓V1
  { objectId: "0c4e11e6-8f41-4ac0-8f61-c1dcb97a092b", min: 219.6, max: 220.4, dec: true }, // ACBB2電表電壓V2
  { objectId: "7825ec50-ec55-4ba5-89dc-09d7a3005c03", min: 219.6, max: 220.4, dec: true }, // ACBB2電表電壓V3
  { objectId: "02273ca2-0fd4-4fa3-bc69-205147daa8ac", min: 1.0, max: 1.2, dec: true }, // ACBB2電表電流I1
  { objectId: "7c19e6fb-b1c3-49d2-8f7e-f69b1e228c08", min: 1.2, max: 1.3, dec: true }, // ACBB2電表電流I2
  { objectId: "7a648611-9823-481e-a076-f3856cd3f874", min: 1.2, max: 1.5, dec: true }, // ACBB2電表電流I3
  { objectId: "82846ee6-d61a-439e-af6a-00ac836fd37f", min: 1.1, max: 1.3, dec: true }, // ACBB2電表電功率KW
  { objectId: "d124d2e3-501e-461c-951e-84e3a9ee2be4", min: 0.8, max: 0.8, dec: true }, // ACBB2電表功因Pf
  { objectId: "e66c1d8b-7828-402b-ab65-88e99dbb7045", min: 59.8, max: 60.1, dec: true }, // ACBB2電表頻率Hz
  { objectId: "01a308db-90c9-45b5-a6dd-cbcc23a9a7ec", min: 219.6, max: 220.4, dec: true }, // 發電機3電壓V1
  { objectId: "34162679-dc25-419a-8d06-7cc9fa054466", min: 219.6, max: 220.4, dec: true }, // 發電機3電壓V2
  { objectId: "6222709e-5560-4cea-ba98-ebae51a62a06", min: 219.6, max: 220.4, dec: true }, // 發電機3電壓V3
  { objectId: "872f7c43-12d1-432f-9f9f-13b822218f13", min: 38, max: 38, dec: false }, // 發電機3電流I1
  { objectId: "3530d351-3f2e-4296-b4a1-477ec88f72b1", min: 37, max: 37, dec: false }, // 發電機3電流I2
  { objectId: "c91cc744-a977-46b6-9fb6-3de05b0c1cb8", min: 35, max: 35, dec: false }, // 發電機3電流I3
  { objectId: "07a59ed6-cef8-4c43-8626-66d8df59c6a9", min: 14.1, max: 14.1, dec: true }, // 發電機3電功率KW
  { objectId: "4a01b9a3-c68b-45d2-a3ea-17b3b3e31e4f", min: 0.9, max: 0.9, dec: true }, // 發電機3功因Pf
  { objectId: "bea053a1-6be9-44d8-8762-33812b358d24", min: 59.8, max: 60.1, dec: true}, // 發電機3頻率Hz
  { objectId: "f9ad22d7-4657-408b-95db-08147c619ae7", min: 51, max: 60, dec: false }, // CO 感測器1
  { objectId: "1e243a9a-2bff-43c4-94fe-cf0205b12cb3", min: 20, max: 45, dec: false }, // CO 感測器2
  { objectId: "fb6f0fdf-a5e2-4620-8870-1993362b2919", min: 20, max: 45, dec: false } // CO 感測器3
];

var createAttributes = () => {
  createAttribute(nocahngeArray)

  setInterval(function () {
    createAttribute(changeArray);
  }, 10000);
}

module.exports = createAttributes

