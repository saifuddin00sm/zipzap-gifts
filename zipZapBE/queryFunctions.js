const db = require("./database/index");

const updateFeatures = async (featureIDs, allowedPlans) => {
  let response = { error: "", featuresUpdated: false };

  if (!featureIDs || !allowedPlans) {
    response.error = "Missing Requirements for feature update";
    return response;
  }

  let updateQuery = await db.query(
    `
      UPDATE features_permissions fp
      SET allowed_plans = $1
      WHERE fp.feature_id = ANY ($2)
      RETURNING fp.feature_name as "featureName"
      `,
    [JSON.stringify(allowedPlans), featureIDs]
  ); // returns query rows with rowCount else error
  if (updateQuery.error) {
    response.error = updateQuery.error.stack;
    return response;
  } else if (updateQuery.rowCount === 0) {
    response.error = `No Feature Found`;
    return response;
  }

  response.featuresUpdated = true;
  return response;
};

const getFeaturesList = async () => {
  let response = { error: "", featuresList: {} };

  let featureCheckQuery = await db.query(
    `SELECT
          fp.feature_id as "featureID",
          fp.feature_name as "featureName",
          fp.allowed_users as "allowedPlans",
          fp.is_active as "featureActive"
       FROM features_permissions fp
       ORDER BY fp.feature_id
       `,
    []
  ); // returns query rows with rowCount else error

  let featureSort = featureCheckQuery.rows.map((feature) => {
    response.featuresList[feature.featureName] = feature;
  });

  let featureResult = await Promise.all(featureSort);

  return response;
};

const getAdminUsers = async (userEmail) => {
  let response = { error: "", allowed: false };

  let getQuery = await db.query(
    `
    SELECT au.email
    FROM admin_users au
    WHERE au.email = $1
        `,
    [userEmail]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount > 0) {
    response.allowed = true;
  }

  return response;
};

// ITEM QUERIES
const getAllItems = async () => {
  let response = { error: "", items: {} };

  let getQuery = await db.query(
    `
        SELECT
            i.item_id as "itemID",
            i."name", i.description,
            i.main_picture as "mainPicture",
            i.price, i.quantity,
            i.pictures,
            i.quantity_available as "quantityAvailable",
            i.is_active as "isActive"
        FROM items i
        ORDER BY i.item_id
        `,
    []
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  }

  let finalItemList = {};
  let itemSortPromise = getQuery.rows.map((item) => {
    finalItemList[item.itemID] = item;
  });

  let itemSortResult = await Promise.all(itemSortPromise);

  response.items = finalItemList;

  return response;
};

const addItem = async (data) => {
  let {
    name,
    description,
    mainPicture,
    price,
    quantity,
    pictures,
    quantityAvailable,
  } = data;
  let response = { error: "", itemsID: null };

  if (
    !name ||
    !description ||
    mainPicture === undefined ||
    mainPicture === null ||
    price === undefined ||
    price === null ||
    !quantity ||
    !pictures ||
    !quantityAvailable
  ) {
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `INSERT INTO items ("name", description, main_picture, price, quantity, pictures, quantity_available)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING items.item_id as "itemID"
      `,
    [
      name,
      description,
      mainPicture,
      price,
      quantity,
      JSON.stringify(pictures),
      quantityAvailable,
    ]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "Error Making New Item";
    return response;
  }

  response.itemsID = postQuery.rows[0].itemID;

  return response;
};

const getItems = async (itemID) => {
  let response = { error: "", item: {} };

  itemID = parseInt(itemID);

  if (!itemID || isNaN(itemID)) {
    response.error = "Missing ItemID";
    return response;
  }

  let getQuery = await db.query(
    `
        SELECT
            i.item_id as "itemID",
            i."name", i.description,
            i.main_picture as "mainPicture",
            i.price, i.quantity,
            i.pictures,
            i.quantity_available as "quantityAvailable",
            i.is_active as "isActive"
        FROM items i
        WHERE i.item_id = $1
        `,
    [itemID]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount === 0) {
    response.error = "No Item Found";
    return response;
  }

  response.item = getQuery.rows[0];

  return response;
};

const updateItem = async (data, itemID) => {
  let {
    name,
    description,
    mainPicture,
    price,
    quantity,
    pictures,
    quantityAvailable,
  } = data;
  let response = { error: "", itemsID: null };

  itemID = parseInt(itemID);

  if (!itemID || isNaN(itemID)) {
    response.error = "Missing ItemID";
    return response;
  }

  if (
    !name ||
    !description ||
    !mainPicture ||
    !price ||
    !quantity ||
    !pictures ||
    !quantityAvailable
  ) {
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `UPDATE items
     SET "name" = $1, description = $2, main_picture = $3, price = $4, quantity = $5, pictures = $6, quantity_available = $7
      WHERE item_id = $8
      RETURNING item_id as "itemID"
      `,
    [
      name,
      description,
      mainPicture,
      price,
      quantity,
      JSON.stringify(pictures),
      quantityAvailable,
      itemID,
    ]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "No Item Found";
    return response;
  }

  response.itemsID = postQuery.rows[0].itemID;

  return response;
};

const deactivateItem = async (itemID) => {
  let response = { error: "", itemsID: null };

  itemID = parseInt(itemID);

  if (!itemID || isNaN(itemID)) {
    response.error = "Missing ItemID";
    return response;
  }

  let postQuery = await db.query(
    `UPDATE items
     SET is_active = false
      WHERE item_id = $1
      RETURNING item_id as "itemID"
      `,
    [itemID]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "Error Removing Item";
    return response;
  }

  response.itemsID = postQuery.rows[0].itemID;

  return response;
};

// GROUPED ITEMS QUERIES
const getAllGroupedItems = async () => {
  let response = { error: "", items: {} };

  let getQuery = await db.query(
    `
    SELECT
      gi.grouped_id as "groupedID",
      gi."name",
      gi.description,
      gi.main_picture as "mainPicture",
      gi.pictures,
      gi.items_array as "itemsArray",
      gi.price_override as "priceOverride",
      gi.is_active as "isActive"
    FROM grouped_items gi
    ORDER BY gi.grouped_id
    `,
    []
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  }

  let finalItemList = {};
  let itemSortPromise = getQuery.rows.map((item) => {
    finalItemList[item.groupedID] = item;
  });

  let itemSortResult = await Promise.all(itemSortPromise);

  response.items = finalItemList;

  return response;
};

const getGroupedItems = async (itemID) => {
  let response = { error: "", item: {} };

  itemID = parseInt(itemID);

  if (!itemID || isNaN(itemID)) {
    response.error = "Missing ItemID";
    return response;
  }

  let getQuery = await db.query(
    `
    SELECT
      gi.grouped_id as "groupedID",
      gi."name",
      gi.description,
      gi.main_picture as "mainPicture",
      gi.pictures,
      gi.items_array as "itemsArray",
      gi.price_override as "priceOverride",
      gi.is_active as "isActive"
    FROM grouped_items gi
    WHERE gi.grouped_id = $1
    `,
    [itemID]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount === 0) {
    response.error = "No Item Found";
    return response;
  }

  response.item = getQuery.rows[0];

  return response;
};

const addGroupedItem = async (data) => {
  let {
    name,
    description,
    mainPicture,
    pictures,
    itemsArray,
    priceOverride,
  } = data;
  let response = { error: "", itemsID: null };

  if (
    !name ||
    !description ||
    !mainPicture ||
    !pictures ||
    !itemsArray ||
    priceOverride === undefined ||
    priceOverride === null
  ) {
    console.log(
      name,
      description,
      mainPicture,
      pictures,
      itemsArray,
      priceOverride
    );
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `INSERT INTO grouped_items ("name", description, main_picture, pictures, items_array, price_override)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING grouped_items.grouped_id as "itemID"
      `,
    [
      name,
      description,
      mainPicture,
      JSON.stringify(pictures),
      JSON.stringify(itemsArray),
      priceOverride,
    ]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "Error Making New Item";
    return response;
  }

  response.itemsID = postQuery.rows[0].itemID;

  return response;
};

const updateGroupedItem = async (data, itemID) => {
  let {
    name,
    description,
    mainPicture,
    pictures,
    itemsArray,
    priceOverride,
  } = data;
  let response = { error: "", itemsID: null };

  itemID = parseInt(itemID);

  if (!itemID || isNaN(itemID)) {
    response.error = "Missing ItemID";
    return response;
  }

  if (
    !name ||
    !description ||
    !mainPicture ||
    !pictures ||
    !itemsArray ||
    priceOverride === undefined ||
    priceOverride === null
  ) {
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `UPDATE grouped_items
     SET "name" = $1, description = $2, main_picture = $3, pictures = $4, items_array = $5, price_override = $6
      WHERE grouped_id = $7
      RETURNING grouped_id as "itemID"
      `,
    [
      name,
      description,
      mainPicture,
      JSON.stringify(pictures),
      JSON.stringify(itemsArray),
      priceOverride,
      itemID,
    ]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "No Item Found";
    return response;
  }

  response.itemsID = postQuery.rows[0].itemID;

  return response;
};

const deactivateGroupedItem = async (itemID) => {
  let response = { error: "", itemsID: null };

  itemID = parseInt(itemID);

  if (!itemID || isNaN(itemID)) {
    response.error = "Missing ItemID";
    return response;
  }

  let postQuery = await db.query(
    `UPDATE grouped_items
     SET is_active = false
      WHERE grouped_id = $1
      RETURNING grouped_id as "itemID"
      `,
    [itemID]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "Error Removing Item";
    return response;
  }

  response.itemsID = postQuery.rows[0].itemID;

  return response;
};

// CAMPAIGN QUERIES
const getAllCampaigns = async () => {
  // ORDERED BY START DATE, THEN ARCHVIED
  let response = { error: "", campaigns: [] };

  let getQuery = await db.query(
    `
    SELECT
      ac.a_campaign_id as "campaignID",
      ac."name",
      ac.criteria,
      ac.start_date as "startDate",
      ac.end_date as "endDate",
      ac.archived,
      ac.end_early as "endEarly",
      ac.user_list as "userList",
      ac.default_item_id as "defaultItemID",
      ac.default_grouped_item_id as "defaultGroupedItemID"
    FROM account_campaigns ac
    WHERE ac.is_active = TRUE
    ORDER BY ac.start_date, ac.archived
    `,
    []
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  }

  // let finalItemList = {};
  // let itemSortPromise = getQuery.rows.map((item) => {
  //   finalItemList[item.campaignID] = item;
  // });

  // let itemSortResult = await Promise.all(itemSortPromise);

  response.campaigns = getQuery.rows;

  return response;
};

const addCampaign = async (data) => {
  let {
    name,
    criteria,
    startDate,
    endDate,
    userList,
    defaultItemID,
    defaultGroupedItemID,
  } = data;
  let response = { error: "", campaignID: null };

  if (!name || !criteria || !startDate || !endDate || !userList) {
    console.log(name, criteria, startDate, endDate, userList);
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `INSERT INTO account_campaigns ("name", criteria, start_date, end_date, user_list, default_item_id, default_grouped_item_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING account_campaigns.a_campaign_id as "campaignID"
      `,
    [
      name,
      JSON.stringify(criteria),
      startDate,
      endDate,
      JSON.stringify(userList),
      defaultItemID,
      defaultGroupedItemID,
    ]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "Error Making New Campaign";
    return response;
  }

  response.campaignID = postQuery.rows[0].campaignID;

  return response;
};

const getCampaignData = async (campaignID) => {
  let response = { error: "", campaign: {} };

  campaignID = parseInt(campaignID);

  if (!campaignID || isNaN(campaignID)) {
    response.error = "Missing ItemID";
    return response;
  }

  let getQuery = await db.query(
    `
    SELECT
      ac.a_campaign_id as "campaignID",
      ac."name",
      ac.criteria,
      ac.start_date as "startDate",
      ac.end_date as "endDate",
      ac.archived,
      ac.end_early as "endEarly",
      ac.user_list as "userList",
      ac.default_item_id as "defaultItemID",
      ac.default_grouped_item_id as "defaultGroupedItemID"
    FROM account_campaigns ac
    WHERE ac.is_active = TRUE
    AND ac.a_campaign_id = $1
    ORDER BY ac.start_date, ac.archived
    `,
    [campaignID]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount === 0) {
    response.error = "No Campaign Found";
    return response;
  }

  // let finalItemList = {};
  // let itemSortPromise = getQuery.rows.map((item) => {
  //   finalItemList[item.campaignID] = item;
  // });

  // let itemSortResult = await Promise.all(itemSortPromise);

  response.campaign = getQuery.rows[0];

  return response;
};

const updateCampaignData = async (data, campaignID) => {
  let {
    name,
    criteria,
    startDate,
    endDate,
    userList,
    defaultItemID,
    defaultGroupedItemID,
  } = data;
  let response = { error: "", campaignID: null };

  campaignID = parseInt(campaignID);

  if (!campaignID || isNaN(campaignID)) {
    response.error = "Missing campaignID";
    return response;
  }

  if (!name || !criteria || !startDate || !endDate || !userList) {
    console.log(name, criteria, startDate, endDate, userList);
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `UPDATE account_campaigns
        SET "name" = $1,
        criteria = $2,
        start_date = $3,
        end_date = $4,
        user_list = $5,
        default_item_id = $6,
        default_grouped_item_id = $7
      WHERE a_campaign_id = $8
      RETURNING a_campaign_id as "campaignID"
      `,
    [
      name,
      JSON.stringify(criteria),
      startDate,
      endDate,
      JSON.stringify(userList),
      defaultItemID,
      defaultGroupedItemID,
      campaignID,
    ]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "No Campaign Found";
    return response;
  }

  response.campaignID = postQuery.rows[0].campaignID;

  return response;
};

const addOrder = async (data) => {
  let {
    orderID,
    shippingDate,
    cost,
    shippingAddress,
    giftee,
    campaignID,
    groupedID,
    giftID,
    notes,
    shippingFee,
    isActive,
  } = data;
  let response = { error: "", orderID: null };

  if (
    !orderID ||
    !shippingDate ||
    cost === undefined ||
    shippingAddress === undefined ||
    !giftee ||
    !campaignID ||
    (groupedID === undefined && giftID === undefined) ||
    shippingFee === undefined
  ) {
    console.log(
      "ERROR",
      orderID,
      shippingDate,
      cost,
      shippingAddress,
      giftee,
      campaignID,
      groupedID,
      giftID,
      notes,
      shippingFee,
      isActive
    );
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `
    INSERT INTO temp_orders (order_id, shipping_date, "cost", shipping_address, giftee, campaign_id, grouped_id, gift_id, notes, shipping_fee, is_active)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING order_id as "orderID"
      `,
    [
      orderID,
      shippingDate,
      cost,
      shippingAddress,
      giftee,
      campaignID,
      groupedID,
      giftID,
      notes,
      shippingFee,
      isActive,
    ]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "Error Making New Order";
    return response;
  }

  response.orderID = postQuery.rows[0].orderID;

  return response;
};

const editOrder = async (data, campaignID, orderID) => {
  let {
    shippingDate,
    cost,
    shippingAddress,
    giftee,
    groupedID,
    giftID,
    notes,
    shippingFee,
    isActive,
  } = data;
  let response = { error: "", orderID: null };

  if (
    !orderID ||
    !shippingDate ||
    cost === undefined ||
    shippingAddress === undefined ||
    !giftee ||
    !campaignID ||
    (groupedID === undefined && giftID === undefined) ||
    shippingFee === undefined
  ) {
    response.error = "Missing Requirements";
    return response;
  }

  campaignID = parseInt(campaignID);
  orderID = parseInt(orderID);

  if (!campaignID || isNaN(campaignID) || !orderID || isNaN(orderID)) {
    response.error = "Missing campaignID or orderiD";
    return response;
  }

  let postQuery = await db.query(
    `UPDATE temp_orders
        SET order_id = $1,
        shipping_address = $2,
         "cost" = $3,
         shipping = $4,
         giftee = $5,
         campaign_id = $6,
         grouped_id = $7,
          gift_id = $8,
          notes = $9,
          shipping_fee = $10,
          is_active = $11
      WHERE campaign_id = $12
      AND order_id = $13
      RETURNING order_id as "orderID"
      `,
    [
      orderID,
      shippingDate,
      cost,
      shippingAddress,
      giftee,
      campaignID,
      groupedID,
      giftID,
      notes,
      shippingFee,
      isActive,
      campaignID,
      orderID,
    ]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "No Order Found";
    return response;
  }

  response.orderID = postQuery.rows[0].orderID;

  return response;
};

const getWeekAccounts = async (startDate, endDate) => {
  let response = { error: "", accounts: [] };

  if (!startDate || !endDate) {
    response.error = "Missing Requirements";
    return response;
  }

  let getQuery = await db.query(
    `
    SELECT
    a.account_id as "accountID",
    a."name",

    (SELECT COUNT (*)
      FROM account_campaigns ac
      WHERE ac.account_id = a.account_id
      AND (
      SELECT
        COUNT(*)
      FROM (SELECT
            tmp.order_id as "orderID"
          FROM temp_orders tmp
          WHERE tmp.campaign_id = ac.a_campaign_id
          AND tmp.shipping_date BETWEEN $1 AND $2
      ORDER BY tmp.shipping_date) as "orderCount") > a.account_id
    ) as "campaignCount",

    (SELECT COUNT(*) FROM (SELECT
        tmp.order_id as "orderID"
      FROM temp_orders tmp
      WHERE tmp.campaign_id IN (
        SELECT ac.a_campaign_id
        FROM account_campaigns ac
        WHERE ac.account_id = a.account_id
        )
        AND tmp.shipping_date BETWEEN $1 AND $2
      ORDER BY tmp.shipping_date) as "orderCount")as "orderCount"
  FROM accounts a
    `,
    [startDate, endDate]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount === 0) {
    response.error = "No Orders Found";
    return response;
  }

  // EXAMPLE ROW:
  //  {
  //    accountID
  //    name
  //    campaignCount
  //    orderCount
  //  }

  // let campaignList = {};
  // let itemSortPromise = getQuery.rows.map((item) => {
  //   if (!(item.campaignID in campaignList)) {
  //     campaignList[item.campaignID] = { orders: [], users: {} };
  //   }

  //   campaignList[item.campaignID].orders.push(item);
  // });

  // let itemSortResult = await Promise.all(itemSortPromise);
  // response.campaignList = campaignList;

  response.accounts = getQuery.rows;

  return response;
};

const getWeekCampaigns = async (startDate, endDate, accountID) => {
  let response = { error: "", orders: [] };

  if (!startDate || !endDate || !accountID) {
    response.error = "Missing Requirements";
    return response;
  }

  let getQuery = await db.query(
    `
    SELECT
      ac.a_campaign_id as "campaignID",
      ac."name",
      ac.start_date as "startDate",
      (SELECT COUNT(*) FROM (SELECT
          tmp.order_id as "orderID",
          tmp.shipping_date as "shippingDate",
          tmp."cost",
          tmp.shipping_address as "shippingAddress",
          tmp.giftee,
          tmp.campaign_id as "campaignID",
          tmp.grouped_id as "groupedID",
          tmp.gift_id as "giftID",
          tmp.notes,
          tmp.shipping_fee as "shippingFee",
          tmp.is_active as "isActive",
          tmp.shipment_details as "shippingDetails"
        FROM temp_orders tmp
        WHERE tmp.campaign_id = ac.a_campaign_id
        AND tmp.shipping_date  BETWEEN $1 AND $2
        ORDER BY tmp.shipping_date) as "orderCount")as "orderCount"
    FROM account_campaigns ac
    JOIN accounts a a.account_id = ac.account_id
    WHERE a.account_id = $3
    `,
    [startDate, endDate, accountID]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount === 0) {
    response.error = "No Orders Found";
    return response;
  }

  // let campaignList = {};
  // let itemSortPromise = getQuery.rows.map((item) => {
  //   if (!(item.campaignID in campaignList)) {
  //     campaignList[item.campaignID] = { orders: [], users: {} };
  //   }

  //   campaignList[item.campaignID].orders.push(item);
  // });

  // let itemSortResult = await Promise.all(itemSortPromise);

  response.orders = getQuery.rows;
  // response.campaignList = campaignList;

  return response;
};

const getWeekOrders = async (startDate, endDate, accountID) => {
  let response = { error: "", orders: [], campaignList: {} };

  if (!startDate || !endDate || !accountID) {
    response.error = "Missing Requirements";
    return response;
  }

  let getQuery = await db.query(
    `
    SELECT
      tmp.order_id as "orderID",
      tmp.shipping_date as "shippingDate",
      tmp."cost",
      tmp.shipping_address as "shippingAddress",
      tmp.giftee,
      tmp.campaign_id as "campaignID",
      tmp.grouped_id as "groupedID",
      tmp.gift_id as "giftID",
      tmp.notes,
      tmp.shipping_fee as "shippingFee",
      tmp.is_active as "isActive",
      tmp.shipment_details as "shippingDetails",
      ac."name" as "campaignName"
    FROM temp_orders tmp
    JOIN account_campaigns ac ON ac.a_campaign_id = tmp.campaign_id
    WHERE tmp.shipping_date  BETWEEN $1 AND $2
    AND ac.account_id = $3
    ORDER BY tmp.shipping_date
    `,
    [startDate, endDate, accountID]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount === 0) {
    response.error = "No Orders Found";
    return response;
  }

  // TO-DO - Is this needed because they are all the same account?
  let campaignList = {};
  let itemSortPromise = getQuery.rows.map((item) => {
    if (!(item.campaignID in campaignList)) {
      campaignList[item.campaignID] = { users: {}, count: 0 };
    }

    campaignList[item.campaignID].count += 1;
    // campaignList[item.campaignID].orders.push(item);
  });

  let itemSortResult = await Promise.all(itemSortPromise);

  response.orders = getQuery.rows;
  response.campaignList = campaignList;

  return response;
};

exports.getFeaturesList = getFeaturesList;
exports.getAdminUsers = getAdminUsers;
exports.getAllItems = getAllItems;
exports.addItem = addItem;
exports.getItems = getItems;
exports.updateItem = updateItem;
exports.deactivateItem = deactivateItem;
exports.getAllGroupedItems = getAllGroupedItems;
exports.addGroupedItem = addGroupedItem;
exports.updateGroupedItem = updateGroupedItem;
exports.getGroupedItems = getGroupedItems;
exports.deactivateGroupedItem = deactivateGroupedItem;
exports.getAllCampaigns = getAllCampaigns;
exports.addCampaign = addCampaign;
exports.getCampaignData = getCampaignData;
exports.updateCampaignData = updateCampaignData;
exports.addOrder = addOrder;
exports.editOrder = editOrder;
exports.getWeekOrders = getWeekOrders;
exports.getWeekCampaigns = getWeekCampaigns;
exports.getWeekAccounts = getWeekAccounts;
