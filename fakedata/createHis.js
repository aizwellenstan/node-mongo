const request = require("request");

const URI = "http://localhost:6004/historical";

his = {
  uri: "",
  headers: {
    "Content-type": "application/json"
  },
  json: ""
};

var createHis = function(objectId) {
  async function resolveSample() {
    his.uri = URI;
    array = [];
    for (var i = 0; i < objectId.length; i++) {
      objectArray = { objectId: objectId[i] };

      array.push(objectArray);
    }

    his.json = array;
  }

  resolveSample().then(
    request.post(his, function(error, response, body) {}),
    console.log(his)
  );
};

sourceArray = [
  "7d5deb1a-2bc8-41e6-bc85-6bdc70caf30c", // 冷卻水塔-1溫度設定值
  "f9ad22d7-4657-408b-95db-08147c619ae7", // 冷卻水塔-1停起控制
  "4bdc2e8a-ce5c-4a84-b0a8-8efe4d74e0ef", // 冷卻水塔-1運轉狀態
  "4187e2b4-1440-4259-b5c6-8136e36307d9", // 冷卻水塔-2溫度設定值
  "0c19921b-9d35-472d-a3c3-35bf86ac917f", // 冷卻水塔-2停起控制
  "38c69d3d-d5f8-47ff-a615-4b5b02f32380", // 冷卻水塔-2運轉狀態
  "d977ad08-4425-4c9f-9e0c-87aaf47638b8", // 冷卻水塔-3溫度設定值
  "ff5926fd-e946-4ee8-a570-d0c5c93e0e4a", // 冷卻水塔-3停起控制
  "096c817c-766e-4cf1-b648-8a6514cd8f55", // 冷卻水塔-3運轉狀態
  "6545ad92-c3cb-4a01-a7b6-b8e47c27de07", // 冷卻馬達-1停起控制
  "b48ddf73-c31d-4731-8047-83ad40e73464", // 冷卻馬達-1運轉狀態
  "8b13dfea-a7fb-4404-88a5-b58f5a3e5822", // 冷卻馬達-1故障跳脫
  "aa0468d0-26fa-4d9c-aae5-196e6c3a3fb0", // 設備
  "52c5852c-885e-46e5-a555-fe585fdc8f9c", // 冷卻馬達-2運轉狀態
  "db3c6401-faff-4a7c-99b7-b2903980a098", // 冷卻馬達-2故障跳脫
  "acc7ffa8-5482-4f33-82c9-14fe6d7f841f", // 冷卻馬達-3停起控制
  "5c951e24-69ea-4611-91fc-28e7a3239d9c", // 冷卻馬達-3運轉狀態
  "ae4a5ad7-3cc2-4057-b27e-d71cab3aab0c", // 冷卻馬達-3故障跳脫
  "34b5a04e-a2a4-4c8e-a252-b7acf75eee14", // 冰水主機-1停起控制
  "cefb7be2-4c60-41fb-b377-084001383493", // 冰水主機-1運轉狀態
  "c4329169-3679-4f93-a695-8ed34f36f28d", // 冰水主機-1故障跳脫
  "72d857a8-ced2-423c-9e70-7febea4ba16e", // 冰水主機-2停起控制
  "817c6b44-d048-43d9-b5c4-bfc13c1ad513", // 冰水主機-2運轉狀態
  "ca4b7e86-26ff-43e2-b8b3-6f744103c5d9", // 冰水主機-2故障跳脫
  "90af7071-c367-456b-a13d-5f04307be6a0", // 偵煙感測器狀態
  "ea8a812b-32de-4df0-b1b2-f746db7b8ff0", // 控制閥控制
  "9ae8cf48-e9c8-4f27-bb2e-1451fc4c4e55", // 濾網差壓狀態
  "41a6bad6-1b99-4752-ae67-75f77b4d900e", // 風差壓開關狀態
  "f27cb6c3-f631-4f82-a23e-a21f18495fdb", // 變頻器狀態
  "f4395f51-116d-4d38-a04d-5e432d07a5cf", // 風機過載跳脫
  "74dab691-b48b-44d8-9675-7d5b01ca714e", // 風機運轉狀態
  "17e73d9a-def8-4989-b3f5-6632a57825f1", // 手自動狀態
  "7150fabd-4fda-41f4-9463-4b6128be6cad", // 變頻器起停
  "857e57da-dc8e-4793-8984-0b0d23815b34", // 保持式關閉
  "efa56d9c-5dea-45cc-8b17-402eccdd4c65", // 變頻器控制
  "1556e2a4-e99f-452e-b9b9-9f8b15a69671", // 偵煙感測器狀態
  "0cc1e583-d283-4a48-af61-604bf594c622", // 控制閥控制
  "9cf253ae-c663-47fa-996a-840cf96595ce", // 濾網差壓狀態
  "45efca7a-5dd3-46b6-9d43-52b664336304", // 風差壓開關狀態
  "b7e0cb71-31a7-4888-9551-e9ae99f1871c", // 變頻器狀態
  "853b9151-a4aa-4f00-861c-b5a1b46cce6f", // 風機過載跳脫
  "b9e4cc5e-ec88-4eb8-aedc-1e59107b81b1", // 風機運轉狀態
  "411dfc0e-e8ec-48cd-85fe-890155e466af", // 手自動狀態
  "e7288245-91be-4312-aa54-e133e08741a6", // 變頻器起停
  "e8331740-b9b3-48bd-9599-33553c05ce85", // 保持式關閉
  "1d31cfeb-ded3-42d6-9f1f-48c2ab21fc4d", // 變頻器控制
  "e10f9d11-13b5-4694-ba12-cec88222cf20", // ACBB1-故障狀態01
  "f71e85ee-728f-4224-beae-3c14ffb3bcda", // ACBB1-跳脫狀態01
  "ad0b8d4f-f212-4dfc-9fa0-e8326ed2444f", // ACBB1-啟停狀態01
  "f7c457be-eaf3-46e5-8f80-1978771192e8", // ACBB2-故障狀態02
  "951da7c3-5b23-4af3-887f-7480ed53e87c", // ACBB2-跳脫狀態02
  "2483c978-000b-497f-8cce-595ba00effb7", // ACBB2-啟停狀態02
  "963c61a1-e1e6-4028-9142-8160e0534dd0", // 發電機啟停狀態
  "85d74bab-753e-4e21-a895-84af4bf9f493", // 發電機啟停控制
  "573b917e-e282-47a9-a2c9-33b9616aed98", // 泵浦故障狀態03
  "9d7387e2-5694-4fbe-99ea-d7e4381b5f44", // 泵浦跳脫狀態03
  "8a649c92-ad15-4c11-a05a-e49d98e49ae5", // 泵浦啟停狀態03
  "399b8447-7977-43a7-bc32-708f8dd2337b", // 泵浦故障狀態04
  "2a8065d9-d967-48c3-80c6-ffc178985691", // 泵浦跳脫狀態04
  "79904457-a1fa-48b8-81c4-76f68b17eaab", // 泵浦啟停狀態04
  "05509524-a1dd-48b6-8cea-e00b57eff5de", // 集水區高水位sensor1
  "f6698ca0-0a92-434c-8eef-ac2581025441", // 集水區低水位sensor1
  "11d78abd-d74a-458d-a77d-4afecbe25197", // 冷卻水塔-1回水溫度
  "be3d2034-9116-453b-b76f-fdcad1e11125", // 冷卻水塔模組1-外氣溫度
  "1036c4fb-da99-405a-8240-18f274011c63", // 冷卻水塔模組1-外氣濕度
  "474308ae-c944-448c-9b3a-51b1c2694b35", // 冷卻水塔模組1-外氣露點
  "559df386-cf80-4f72-a712-ab061a427a25", // 冷卻水塔-2回水溫度
  "bc61cbd5-43f6-4bb5-a021-c6f1c5e8cc10", // 冷卻水塔模組2-外氣溫度
  "d59f0b12-e559-4fcf-9f6b-c801158e17e8", // 冷卻水塔模組2-外氣濕度
  "47f7e999-44f6-43ea-9e98-9ba3e28b5750", // 冷卻水塔模組2-外氣露點
  "8918c16e-690a-413d-b24a-5fac497693a2", // 冷卻水塔-3回水溫度
  "d8b380d8-e718-4cbf-886d-43bdef496021", // 冷卻水塔模組3-外氣溫度
  "88e0f77c-4d96-4d9c-9125-596d4e886715", // 冷卻水塔模組3-外氣濕度
  "a4b4c39e-8d17-4a21-99be-9756dc8fce7c", // 冷卻水塔模組3-外氣露點
  "e098a47b-89aa-4867-9351-752d35793cee", // 冷卻水泵模組1-冷卻水泵-1加載設定值
  "8df1c517-3808-4801-8b38-65fc8cf74275", // 冷卻水泵模組1-冷卻水泵-1卸載設定值
  "9d4f97f9-dbb6-4614-b40d-2884735d7765", // 冷卻水泵模組1-冷卻水泵-1交替時間
  "064f615d-cc56-4989-aca0-8c2963ff98ba", // 冷卻水泵模組1-冷卻水泵-1交替延遲
  "977d5a7b-6d7e-46f3-8125-a8847784cf60", // 冷卻水泵模組1-冷卻水泵-1頻率輸出
  "1f7986f1-b442-4d94-8104-4ce2a4734921", // 冷卻水泵模組2-冷卻水泵-2加載設定值
  "668c190b-feee-43c6-8295-b1390a07aae4", // 冷卻水泵模組2-冷卻水泵-2卸載設定值
  "39af6242-407c-4973-ae91-961e2e26fd79", // 冷卻水泵模組2-冷卻水泵-2交替時間
  "bc32da6f-a744-4524-b87a-ea671ced874f", // 冷卻水泵模組2-冷卻水泵-2交替延遲
  "7fd7f3e8-05f3-4be1-add5-f907042c899b", // 冷卻水泵模組2-冷卻水泵-2頻率輸出
  "05971ce2-2c63-4857-b876-cbf272ce7fff", // 冷卻水泵模組3-冷卻水泵-3加載設定值
  "68739a53-2efa-42f6-8ca5-bb2109ac7557", // 冷卻水泵模組3-冷卻水泵-3卸載設定值
  "76e18c37-19b6-4126-b8a5-90b009e49a5c", // 冷卻水泵模組3-冷卻水泵-3交替時間
  "56e33dfe-fead-4c0b-934e-374c10855a3c", // 冷卻水泵模組3-冷卻水泵-3交替延遲
  "64c9e84b-7c8a-4153-a833-142f53ca34b4", // 冷卻水泵模組3-冷卻水泵-3頻率輸出
  "2d66338e-6eb3-492e-8cf9-fa61836ead48", // 回風溫度值
  "2c318c8b-77cd-4cbf-948c-941f15ef2e08", // 回風濕度值
  "7a8115a4-dd4c-4381-9c74-e2945e62b3b3", // 風門開度控制
  "015951a5-116a-4f00-ab52-af4f7cf30ab4", // 回風溫度值
  "28c77277-4989-46cc-8bc2-d4b3eef8f615", // 回風濕度值
  "5dfdc14e-d8c9-4a77-a14f-77590198b3bf", // 風門開度控制
  "53402a68-06cd-43d7-b07d-b90844ed6f49", // ACBB1電表電壓V1
  "d2825cd1-8f53-4d9b-9090-689294c73d32", // ACBB1電表電壓V2
  "cbace30c-50c2-47fa-8a67-d5501726663c", // ACBB1電表電壓V3
  "88cb061c-5ffc-42dd-a59a-a3063b86af7f", // ACBB1電表電流I1
  "e90df963-e309-4981-b254-53f24a24d549", // ACBB1電表電流I2
  "2981dd6d-6f75-496a-a9e6-374d493bbd31", // ACBB1電表電流I3
  "fd4760e1-3912-48d1-88bf-3e4f17455613", // ACBB1電表電功率KW
  "8b3712c9-eec3-4cf1-bea4-3868c7ae17e5", // ACBB1電表功因Pf
  "843d7623-488a-4d93-a8b5-b13faf8ab813", // ACBB1電表頻率Hz
  "f74346d5-3061-4269-9059-5cd3dd37a055", // ACBB2電表電壓V1
  "0c4e11e6-8f41-4ac0-8f61-c1dcb97a092b", // ACBB2電表電壓V2
  "7825ec50-ec55-4ba5-89dc-09d7a3005c03", // ACBB2電表電壓V3
  "02273ca2-0fd4-4fa3-bc69-205147daa8ac", // ACBB2電表電流I1
  "7c19e6fb-b1c3-49d2-8f7e-f69b1e228c08", // ACBB2電表電流I2
  "7a648611-9823-481e-a076-f3856cd3f874", // ACBB2電表電流I3
  "82846ee6-d61a-439e-af6a-00ac836fd37f", // ACBB2電表電功率KW
  "d124d2e3-501e-461c-951e-84e3a9ee2be4", // ACBB2電表功因Pf
  "e66c1d8b-7828-402b-ab65-88e99dbb7045", // ACBB2電表頻率Hz
  "01a308db-90c9-45b5-a6dd-cbcc23a9a7ec", // 發電機3電壓V1
  "34162679-dc25-419a-8d06-7cc9fa054466", // 發電機3電壓V2
  "6222709e-5560-4cea-ba98-ebae51a62a06", // 發電機3電壓V3
  "872f7c43-12d1-432f-9f9f-13b822218f13", // 發電機3電流I1
  "3530d351-3f2e-4296-b4a1-477ec88f72b1", // 發電機3電流I2
  "c91cc744-a977-46b6-9fb6-3de05b0c1cb8", // 發電機3電流I3
  "07a59ed6-cef8-4c43-8626-66d8df59c6a9", // 發電機3電功率KW
  "4a01b9a3-c68b-45d2-a3ea-17b3b3e31e4f", // 發電機3功因Pf
  "bea053a1-6be9-44d8-8762-33812b358d24", // 發電機3頻率Hz
  "1e243a9a-2bff-43c4-94fe-cf0205b12cb3", // CO 感測器2
  "fb6f0fdf-a5e2-4620-8870-1993362b2919" // CO 感測器3
];

createHis(sourceArray);

function find_duplicate_in_array(arra1) {
  var object = {};
  var result = [];

  arra1.forEach(function(item) {
    if (!object[item]) object[item] = 0;
    object[item] += 1;
  });

  for (var prop in object) {
    if (object[prop] >= 2) {
      result.push(prop);
    }
  }

  return result;
}

console.log(find_duplicate_in_array(sourceArray));
