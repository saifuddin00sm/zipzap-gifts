const gFunctions = require("./genericFunctions");
const qFunctions = require("./queryFunctions");
const appSettings = require("./appSettings.json");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  let response = { error: "Missing Endpoint" };
  
  event.httpMethod = event.requestContext.http.method;
  // console.log("E", event.httpMethod, event);
  
  // get single order
  if (event.httpMethod === "GET"&& "pathParameters" in event && event.pathParameters.campaignID && event.pathParameters.orderID ) {
   let response = { error: "", order: null };

    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.getOrdersList
    );
    if (allowed.error || !allowed.allowed) {
      response.error = allowed.error ? allowed.error : "Unauthorized";
      event.body = response;
      return event;
    }
    
    let campaignData = await qFunctions.getCampaignData(
      event.pathParameters.campaignID,
      allowed.userEmail
    );
  
    if (campaignData.error) {
      response.error = campaignData.error;
      event.body = response;
      return event;
    }
  
    // let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;
    // let campaignOrders = await gFunctions.openLocalJSONFile(filePath);
  
    let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
    let campaignOrders = await gFunctions.readAWSJsonFile(filePath);
  
    if (campaignOrders.error) {
      console.log("CAMP", campaignOrders.error, filePath);
      response.error = "Error getting order.";
      event.body = response;
      return event;
    }
  
    // TO-DO - test if slower than DB grab
    response.order = campaignOrders.data[event.pathParameters.orderID];
    event.body = response;
    return event;
  }
 
  // get all accounts with orders for the week
  else if (event.httpMethod === "GET" && "pathParameters" in event && event.pathParameters.campaignID === "all") {
    let response = { error: "", campaignOrders: {}, firstDay: "", lastDay: "",  dateOrders:{} };
    console.log("hitting the get all");

    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.getOrdersDB
    );
    if (allowed.error || !allowed.allowed) {
      response.error = allowed.error ? allowed.error : "Unauthorized";
      event.body = response;
      return event;
    }
  
    let { firstDay, lastDay } = gFunctions.getMonthSunday();
    let accountData = await qFunctions.getAccountData(allowed.userEmail);
    
    if (accountData.error) {
      console.log("there is an account data error");
      response.error = accountData.error;
      event.body = response;
      return event;
    }
  
    let orders = await qFunctions.getWeekOrders(
      firstDay,
      lastDay,
      allowed.account.accountID,
      true,
      true
    );
    response.campaignOrders = orders.orderObject;
    response.dateOrders = orders.dateObject;
    response.firstDay = firstDay;
    response.lastDay = lastDay;
  
    event.body = response;
    return event;
  }
  
  // get all accounts with orders for the week
  else if (event.httpMethod === "GET" && 
           "pathParameters" in event && 
           event.pathParameters.campaignID === "past") {
    let response = {
      error: "",
      dateOrders: {},
    };
  
    let query = event.queryStringParameters;
  
    let month = query.month;
    let year = query.year;
    let getAll = query.all;
  
    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.getOrdersPrevious
    );
    if (allowed.error || !allowed.allowed) {
      response.error = allowed.error ? allowed.error : "Unauthorized";
      event.body = response;
      return event;
    }
  
    if (!month || !year) {
      let { firstDay } = gFunctions.getMonthSunday();
  
      if (!month) {
        month = new Date(firstDay).getMonth().toString();
      }
  
      if (!year) {
        year = new Date(firstDay).getFullYear().toString();
      }
    }
  
    let campaigns = await qFunctions.getAllCampaigns(allowed.userEmail);
  
    if (campaigns.error) {
      response.error = campaigns.error;
      event.body = response;
      return event;
    }
  
    // EXAMPLE All ORDERS
    // {
    //   monthID:{
    //     campaignID:{
    //       orderID:eventOrder
    //     }
    //   }
    // }
  
    let allOrders = {};
  
    let error = {};
  
    let campaignPromise = Object.keys(campaigns.campaigns).map(
      async (campaignID) => {
        let campaign = campaigns.campaigns[campaignID];
  
        let filePath = `campaigns/${campaignID}/orders.json`;
        let userList = await gFunctions.readAWSJsonFile(filePath);
  
        if (userList.error) {
          error = userList.error;
          return false;
        }
  
        // allOrders[campaignID] = {};
  
        let orderMap = Object.keys(userList.data).map((orderID) => {
          let order = userList.data[orderID];
  
          let orderMonth = new Date(order.shippingDate).getMonth();
          let orderYear = new Date(order.shippingDate).getFullYear();
  
          if (
            getAll ||
            (month === orderMonth.toString() && year === orderYear.toString())
          ) {
            if (!(orderMonth in allOrders)) {
              allOrders[orderMonth] = {};
            }
  
            if (!(campaignID in allOrders[orderMonth])) {
              allOrders[orderMonth][campaignID] = {};
            }
  
            allOrders[orderMonth][campaignID][orderID] = order;
          }
        });
  
        let orderResult = await Promise.all(orderMap);
      }
    );
  
    let campaignResult = await Promise.all(campaignPromise);
  
    response.dateOrders = allOrders;
    event.body = response;
    return event;
  }
  
   // Update/Fulfill Order
  else if (event.httpMethod === "PUT" && "routeKey" in event && event.routeKey.includes("/orders/fulfill")) {
    if (!("body" in event)) {
      let response = {error:""};
      response.error = "Missing Requirements";
      event.body = response;
      return event;
    }
    let response = { error: "", saved: false, orderID: null };
    let body = JSON.parse(event.body);
    
    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.adminFulfillOrder
    );
    if (allowed.error || !allowed.allowed) {
      response.error = allowed.error ? allowed.error : "Unauthorized";
      event.body = response;
      return event;
    }
  
    let campaignData = await qFunctions.getCampaignData(
      body.user.campaignID,
      allowed.userEmail
    );
  
    if (campaignData.error) {
      response.error = campaignData.error;
      event.body = response;
      return event;
    }
  
    // EXAMPLE BODY - will either replace or add new user
    // {
    //   user:{
    //       "orderID":"501",
    //       "cost": 45,
    //       "shippingAddress": "1153 north 240 east",
    //       "shippingCity": "Orem",
    //       "shippingState": "UT",
    //       "shippingZip": "84057",
    //       "giftee": 0,
    //       "campaignID": 123,
    //       "groupedID": 23, - or null if giftID
    //       "giftID": 2, - or null if groupedID
    //       "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
    //       "shippingFee": 5.90,
    //       "shippingDetails":{}
    //   },
    //   oneTime?:boolean
    //   oneTimeDB?:boolean
    // }
  
    let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
    let campaignOrders = await gFunctions.readAWSJsonFile(filePath);
  
    if (
      campaignOrders.error &&
      "code" in campaignOrders.error &&
      campaignOrders.error.code.includes("NoSuchKey")
    ) {
      campaignOrders.data = {};
      campaignOrders.error = "";
    }
  
    if (campaignOrders.error) {
      response.error = "Error updating campaign orders.";
      event.body = response;
      return event;
    }
  
    if (body.oneTime) {
      // console.log("ONE", body.oneTime);
      let order = campaignOrders.data[body.user.orderID];
      if (order && order.giftee === body.user.giftee) {
        // console.log("same", body.user.orderID, body.user.giftee, order.giftee);
        campaignOrders.data[body.user.orderID] = body.user;
      } else {
        let orderTotal = Object.keys(campaignOrders.data).length;
  
        body.user.orderID = orderTotal + 1;
        campaignOrders.data[orderTotal + 1] = body.user;
      }
    } else {
      campaignOrders.data[body.user.orderID] = body.user;
    }
  
    let saved = await gFunctions.writeAWSFile(filePath, campaignOrders.data);
  
    response.saved = saved.saved;
  
    let rowUpdate = await qFunctions.editOrder(
      body.user,
      body.user.campaignID,
      body.user.orderID
    );
  
    if (rowUpdate.error !== "No Order Found") {
      response.error = rowUpdate.error;
      event.body = response;
      return event;
    }
    response.orderID = rowUpdate.orderID;

  
    event.body = response;
    return event;
  }
  
  // get shippo rates 
  else if (event.httpMethod === "POST" && "routeKey" in event && event.routeKey.includes("/admin/shipmentRates")) {
    if (!("body" in event)) {
      let response = {error:""};
      response.error = "Missing Requirements";
      event.body = response;
      return event;
    }

    let body = JSON.parse(event.body);
    let response = {
      error: "",
    };
  
    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.adminGetShipmentRates
    );
  
    if (allowed.error || !allowed.allowed) {
      response.error = "Unauthorized";
      event.body = response;
      return event;
    }
    
    let stage = event.stageVariables?.stage;
  
    let shippo = await fetch("https://api.goshippo.com/shipments/", {
      headers: {
        Authorization: `ShippoToken ${stage === "production"?appSettings.shippoKey:appSettings.shippoKeyTest}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return { error: err };
      });
  
    event.body = shippo;
    return event;
  }
  
  // Complete Shippo transaction
  else if (event.httpMethod === "POST" && "routeKey" in event && event.routeKey.includes("/admin/completeTransaction")) {
    if (!("body" in event)) {
      let response = {error:""};
      response.error = "Missing Requirements";
      event.body = response;
      return event;
    }

    let body = JSON.parse(event.body);
    let response = {
      error: "",
    };
  
    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.adminCompleteShipment
    );
  
    if (allowed.error || !allowed.allowed) {
      response.error = "Unauthorized";
      event.body = response;
      return event;
    }
    
    let stage = event.stageVariables?.stage;
  
    let shippo = await fetch("https://api.goshippo.com/transactions", {
      headers: {
        Authorization: `ShippoToken ${stage === "production"?appSettings.shippoKey:appSettings.shippoKeyTest}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return { error: err };
      });
  
    event.body = shippo;
    return event;
  }

  
  // get all orders for all campaigns in DB
  else if (event.httpMethod === "GET" && "pathParameters" in event && event.pathParameters.campaignID === "all") {
    let response = { error: "", campaignOrders: {}, firstDay: "", lastDay: "",  dateOrders:{} };

    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.getOrdersDB
    );
    if (allowed.error || !allowed.allowed) {
      response.error = allowed.error ? allowed.error : "Unauthorized";
      event.body = response;
      return event;
    }
  
    let { firstDay, lastDay } = gFunctions.getMonthSunday();
    let accountData = await qFunctions.getAccountData(allowed.userEmail);
  
    if (accountData.error) {
      response.error = accountData.error;
      event.body = response;
      return event;
    }
  
    let orders = await qFunctions.getWeekOrders(
      firstDay,
      lastDay,
      allowed.account.accountID,
      true,
      true
    );
  
    response.campaignOrders = orders.orderObject;
    response.dateOrders = orders.dateObject;
    response.firstDay = firstDay;
    response.lastDay = lastDay;
  
    event.body = response;
    return event;
  }
  
  // Get all orders for specific account for the current week
  else if (
    event.httpMethod === "GET" && 
    "routeKey" in event && 
    event.routeKey.includes("/admin/orders") && 
    "pathParameters" in event && 
    event.pathParameters.accountID
  ) {
    let response = {
      error: "",
      campaignList: {},
      orders: [],
      accountUsers: { activeUsers: {}, inActiveUsers: {} },
      dates: {
        lastSunday: "",
        nextSunday: "",
      },
    };
    
     let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.adminGetAccountOrders
    );
  
    if (allowed.error || !allowed.allowed) {
      response.error = "Unauthorized";
      event.body = response;
      return event;
    }
  
    
    
    let { lastSunday, nextSunday } = gFunctions.getLastSunday();
  
    let params = event.pathParameters;
  
    // get orders and campaigns #'s
    // let weekOrders = await qFunctions.getWeekOrders(lastSunday, nextSunday);
    let weekOrders = await qFunctions.getWeekOrders(
      lastSunday,
      nextSunday,
      params.accountID
    );
  
    if (weekOrders.error) {
      response.error = weekOrders.error;
      event.body = response;
      return event;
    }
  
    // get user list for account
    // TO-DO - AWS READ
    let filePath = `accounts/${params.accountID}/masterList.json`;
    let accountUsers = await gFunctions.readAWSJsonFile(filePath);
  
    if (accountUsers.error) {
      response.error = accountUsers.error
        ? accountUsers.error
        : "Error Getting Account Users";
      event.body = response;
      return event;
    }
  
    response.accountUsers = accountUsers.data;
    response.orders = weekOrders.orders;
    response.dates = { lastSunday, nextSunday };
  
    // maybe unneeded?
    response.campaignList = weekOrders.campaignList;
  
    event.body = response;
    return event;
  }
  
  // Get all orders in s3 for specific month/year
  else if (event.httpMethod === "GET" && "routeKey" in event && event.routeKey.includes("/admin/orders")) {
    let response = {
      error: "",
      accounts: [],
      dates: {
        lastSunday: "",
        nextSunday: "",
      },
    };
  
    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.adminGetOrders
    );
  
    if (allowed.error || !allowed.allowed) {
      response.error = "Unauthorized";
      event.body = response;
      return event;
    }
  
    let { lastSunday, nextSunday } = gFunctions.getLastSunday();
  
    // get orders and campaigns #'s
    let weekOrders = await qFunctions.getWeekAccounts(lastSunday, nextSunday);
    // console.log("WE", weekOrders);
  
    if (weekOrders.error) {
      response.error = weekOrders.error;
      event.body = response;
      return event;
    }
  
    // get all campaign user lists and filter out to only get the users
    // TO-DO - AWS READ
    // let userListPromise = Object.keys(response.campaignList).map(
    //   async (campaignID) => {
    //     // TO-DO - switch to AWS
    //     let filePath = `./testData/campaigns/${campaignID}/orders.json`;
    //     let campaignOrders = gFunctions.openLocalJSONFile(filePath);
    //   }
    // );
  
    response.accounts = weekOrders.accounts;
    response.dates = { lastSunday, nextSunday };
    event.body = response;
    return event;
  }
  
   // GET ALL ORDERS FOR CAMPAIGN
  else if (event.httpMethod === "GET" && "pathParameters" in event && event.pathParameters.campaignID) {
    let response = { error: "", campaignOrders: {} };
    
    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.getOrdersDB
    );
    if (allowed.error || !allowed.allowed) {
      response.error = allowed.error ? allowed.error : "Unauthorized";
      event.body = response;
      return event;
    }

    let userEmail = gFunctions.hashString(event.headers.user).result;
    let campaignData = await qFunctions.getCampaignData(
      event.pathParameters.campaignID,
      allowed.userEmail
    );
  
    if (campaignData.error) {

      response.error = campaignData.error;
      event.body = response;
      return event;
    }
  
    let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
    let campaignOrders = await gFunctions.readAWSJsonFile(filePath);
  
    if (campaignOrders.error) {
      response.error = "Error updating campaign orders.";
      event.body = response;
      return event;
    }
    response.campaignOrders = campaignOrders.data;
  
    event.body = response;
    return event;
    
    
  }
   
   // create/upddate mass order list
  else if (event.httpMethod === "POST" && "pathParameters" in event && event.pathParameters.campaignID) {
    console.log("in the post body");
    let response = { error: "", saved: false, completed:[], failed:[] };
    if (!("body" in event)) {
      let response = {error:""};
      response.error = "Missing Requirements";
      event.body = response;
      return event;
    }
  
    let body = JSON.parse(event.body);
  
    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.addOrders
    );
    if (allowed.error || !allowed.allowed) {
      response.error = allowed.error ? allowed.error : "Unauthorized";
      event.body = response;
      return event;
    }
  
    let campaignData = await qFunctions.getCampaignData(
      event.pathParameters.campaignID,
      allowed.userEmail
    );
  
    if (campaignData.error) {
      console.log("failed because no campaign data");
      response.error = campaignData.error;
      event.body = response;
      return event;
    }
  
    // EXAMPLE BODY - create entire list
    // {
    //   orders:{
    //     "0":{
    //       "orderID":"501",
    //       "cost": 45,
    //       "shippingAddress": "1153 north 240 east",
    //       "shippingCity": "Orem",
    //       "shippingState": "UT",
    //       "shippingZip": "84057",
    //       "giftee": 0,
    //       "campaignID": 123,
    //       "groupedID": 23, - or null if giftID
    //       "giftID": 2, - or null if groupedID
    //       "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
    //       "shippingFee": 5.90
    //     },
    //     "1":{
    //       "orderID":"501",
    //       "cost": 45,
    //       "shippingAddress": "1153 north 240 east",
    //       "shippingCity": "Orem",
    //       "shippingState": "UT",
    //       "shippingZip": "84057",
    //       "giftee": 0,
    //       "campaignID": 123,
    //       "groupedID": 23, - or null if giftID
    //       "giftID": 2, - or null if groupedID
    //       "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
    //       "shippingFee": 5.90
    //     },
    //     ...
    //   },
    //   currentOrderList:["0", "1", ...console.]
    // }
  
    let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
    // let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;
  
    let saved = await gFunctions.writeAWSFile(filePath, body.orders);
    // let saved = await gFunctions.writeFile(filePath, body.orders, true);
  
    let removedTempOrders = await qFunctions.removeOldTempOrders(campaignData.campaign.campaignID, body.currentOrderList)

    if (removedTempOrders.error) {
      response.error = removedTempOrders.error;
      event.body = response;
      return event;
    }
  
    let failed = [];
    let completed = [];
    let alreadySent = [];
    let dbSavedOrders = body.currentOrderList.map(async (orderID) => {
      if (
        removedTempOrders.updatedRows.length === 0 || 
        (removedTempOrders.updatedRows.length > 0 &&
        removedTempOrders.updatedRows.includes(parseInt(orderID)))
      ) {
        let saved = await qFunctions.addOrder(body.orders[orderID]);
  
        if (saved.error) {
          failed.push({
            orderID: orderID,
            error: saved.error,
            body: body.orders[orderID],
          });
        } else {
          completed.push(saved.orderID);
        }
      } else {
        alreadySent.push(orderID);
      }
    });
  
    let dbOrderResults = await Promise.all(dbSavedOrders);
  
    response = saved;
    response.failed = failed;
    response.completed = completed;
    response.alreadySent = alreadySent;
    response.removedOrders = removedTempOrders.updatedRows;
  
    event.body = response;
    return event;
  }
  
  // update one order
  else if (event.httpMethod === "PUT" && "pathParameters" in event && event.pathParameters.campaignID) {
    console.log("looking inside of PUT");
    if (!("body" in event)) {
      let response = {error:""};
      response.error = "Missing Requirements";
      event.body = response;
      return event;
    }
    let response = { error: "", saved: false, orderID: null };
    let body = JSON.parse(event.body);
  
    let allowed = await gFunctions.endPointAuthorize(
      event.headers.user,
      appSettings.features.updateOrders
    );
    if (allowed.error || !allowed.allowed) {
      response.error = allowed.error ? allowed.error : "Unauthorized";
      event.body = response;
      return event;
    }
    
    let campaignData = await qFunctions.getCampaignData(
      event.pathParameters.campaignID,
      allowed.userEmail
    );
    console.log("Is there a response with campaignData?");
  
    if (campaignData.error) {
      response.error = campaignData.error;
      event.body = response;
      console.log("yes");
      return event;
    }
    
    console.log("no");
  
    // EXAMPLE BODY - will either replace or add new user
    // {
    //   user:{
    //       "orderID":"501",
    //       "cost": 45,
    //       "shippingAddress": "1153 north 240 east",
    //       "shippingCity": "Orem",
    //       "shippingState": "UT",
    //       "shippingZip": "84057",
    //       "giftee": 0,
    //       "campaignID": 123,
    //       "groupedID": 23, - or null if giftID
    //       "giftID": 2, - or null if groupedID
    //       "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
    //       "shippingFee": 5.90
    //   },
    //   oneTime?:boolean
    //   oneTimeDB?:boolean
    // }
  
    let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
    let campaignOrders = await gFunctions.readAWSJsonFile(filePath);
  
    if (
      campaignOrders.error &&
      "code" in campaignOrders.error &&
      campaignOrders.error.code.includes("NoSuchKey")
    ) {
      campaignOrders.data = {};
      campaignOrders.error = "";
    }
  
    if (campaignOrders.error) {
      response.error = "Error updating campaign orders.";
      event.body = response;
      return event;
    }
  
    if (body.oneTime) {
      // console.log("ONE", body.oneTime);
      let order = campaignOrders.data[body.user.orderID];
      if (order && order.giftee === body.user.giftee) {
        // console.log("same", body.user.orderID, body.user.giftee, order.giftee);
        campaignOrders.data[body.user.orderID] = body.user;
      } else {
        let orderTotal = Object.keys(campaignOrders.data).length;
  
        body.user.orderID = orderTotal + 1;
  
        // console.log("new", orderTotal, campaignOrders.data);
  
        campaignOrders.data[orderTotal + 1] = body.user;
      }
    } else {
      campaignOrders.data[body.user.orderID] = body.user;
    }
  
    let saved = await gFunctions.writeAWSFile(filePath, campaignOrders.data);
    // let saved = await gFunctions.writeFile(filePath, campaignOrders.data, false);
  
    response.saved = saved.saved;
  
    // TO-DO - update DB row if applicable
    let rowUpdate = { error: "", orderID: null };
    if (body.oneTime) {
      if (body.oneTimeDB) {
        rowUpdate = await qFunctions.addOrder(body.user);
      }
    } else {
      rowUpdate = await qFunctions.editOrder(
        body.user,
        body.user.campaignID,
        body.user.orderID
      );
    }
  
    if (rowUpdate.error !== "No Order Found") {
      response.error = rowUpdate.error;
      event.body = response;
      return event;
    }
    response.orderID = rowUpdate.orderID;
  
    event.body = response;
    return event;
  }
  
  event.body = response;
  return event;
};
