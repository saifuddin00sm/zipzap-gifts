const db = require("./database/index");
const gFunctions = require("./genericFunctions");

const checkFeature = async (featureName, roleID, planID) => {
  let response = { error: "", allowed: false };

  if (!featureName || !roleID || !planID) {
    response.error = "Unauthorized to access feature";
    return response;
  }

  let featureCheckQuery = await db.query(
    `
    SELECT fp.*
    FROM feature_permissions fp
    WHERE
    fp.feature_name = $1
    AND exists(
      select *
        from jsonb_array_elements(fp.allowed_roles) as x(o)
        where x.o @> $2)
    AND exists(
      select *
        from jsonb_array_elements(fp.allowed_plans) as x(o)
        where x.o @> $3)
    AND fp.is_active = true
    `,
    // feature name, roleID, planID
    [featureName, roleID, planID]
  ); // returns query rows with rowCount else error
  if (featureCheckQuery.error) {
    response.error = featureCheckQuery.error.stack;
    return response;
  } else if (featureCheckQuery.rowCount > 0) {
    response.allowed = true;
  }

  return response;
};

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
const getAllItems = async (admin) => {
  let response = { error: "", items: {} };

  let getQuery = { error: "", rows: [], rowCount: 0 };
  if (admin) {
    getQuery = await db.query(
      `
        SELECT
            i.item_id as "itemID",
            i."name", i.description,
            i.main_picture as "mainPicture",
            i.price, i.quantity,
            i.pictures,
            i.quantity_available as "quantityAvailable",
            i.is_active as "isActive",
            i.detail_fields as "detailFields",
            i.purchased_from as "purchasedFrom",
            i.weight,
            i.cost,
            i.branding_available as "brandingAvailable"
        FROM items i
        ORDER BY i.item_id
        `,
      []
    ); // returns query rows with rowCount else error
  } else {
    getQuery = await db.query(
      `
          SELECT
              i.item_id as "itemID",
              i."name", i.description,
              i.main_picture as "mainPicture",
              i.price, i.quantity,
              i.pictures,
              i.quantity_available as "quantityAvailable",
              i.is_active as "isActive",
              i.detail_fields as "detailFields"
          FROM items i
          ORDER BY i.item_id
          `,
      []
    ); // returns query rows with rowCount else error
  }

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

// TO-DO - Allow detail fields to be added
const addItem = async (data) => {
  let {
    name,
    description,
    mainPicture,
    price,
    quantity,
    pictures,
    quantityAvailable,
    purchasedFrom,
    weight,
    cost,
    brandingAvailable,
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
    !quantityAvailable ||
    !purchasedFrom ||
    weight === null ||
    weight === undefined ||
    cost === null ||
    cost === undefined ||
    brandingAvailable === undefined
  ) {
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `INSERT INTO items (
        "name",
        description,
        main_picture,
        price,
        quantity,
        pictures,
        quantity_available,
        purchased_from,
        weight,
        cost,
        branding_available
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
      purchasedFrom,
      weight,
      cost,
      brandingAvailable,
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
            i.is_active as "isActive",
            i.detail_fields as "detailFields"
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

// TO-DO - Allow detail fields to be added
const updateItem = async (data, itemID) => {
  let {
    name,
    description,
    mainPicture,
    price,
    quantity,
    pictures,
    quantityAvailable,
    purchasedFrom,
    weight,
    cost,
    brandingAvailable,
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
    !quantityAvailable ||
    !purchasedFrom ||
    weight === null ||
    weight === undefined ||
    cost === null ||
    cost === undefined ||
    brandingAvailable === undefined
  ) {
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `UPDATE items
     SET "name" = $1,
         description = $2,
         main_picture = $3,
         price = $4,
         quantity = $5,
         pictures = $6,
         quantity_available = $7,
         purchased_from = $9
         weight = $10
         cost = $11
         branding_available = $12
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
      purchasedFrom,
      weight,
      cost,
      brandingAvailable,
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
const getAllGroupedItems = async (admin, userEmail) => {
  let response = { error: "", items: {} };

  let getQuery = { error: "", rows: [], rowCount: 0 };
  if (admin) {
    getQuery = await db.query(
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
  } else if (userEmail) {
    getQuery = await db.query(
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
      LEFT JOIN accounts a ON a.account_id = gi.account
      LEFT JOIN contacts c ON c.account_id = a.account_id
      WHERE gi.account IS NULL OR c.email = $1
      ORDER BY gi.grouped_id
      `,
      [userEmail]
    ); // returns query rows with rowCount else error
  }

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
    account,
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
    `INSERT INTO grouped_items ("name", description, main_picture, pictures, items_array, price_override, account)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING grouped_items.grouped_id as "itemID"
      `,
    [
      name,
      description,
      mainPicture,
      JSON.stringify(pictures),
      JSON.stringify(itemsArray),
      priceOverride,
      account ? account : null,
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
  let { name, description, mainPicture, pictures, itemsArray, priceOverride } =
    data;
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
const getAllCampaigns = async (userEmail) => {
  // ORDERED BY START DATE, THEN ARCHVIED
  let response = { error: "", campaigns: {} };

  if (!userEmail) {
    response.error = "Missing Requirements";
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
      ac.default_grouped_item_id as "defaultGroupedItemID",
      ac.default_details as "defaultDetails"
    FROM account_campaigns ac
    JOIN contacts c ON c.account_id = ac.account_id
    WHERE ac.is_active = TRUE
    AND c.email = $1
    ORDER BY ac.start_date, ac.archived
    `,
    [userEmail]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  }

  let finalItemList = {};
  let itemSortPromise = getQuery.rows.map((item) => {
    finalItemList[item.campaignID] = item;
  });

  let itemSortResult = await Promise.all(itemSortPromise);

  response.campaigns = finalItemList;

  return response;
};

const addCampaign = async (data, userEmail) => {
  let {
    name,
    criteria,
    startDate,
    endDate,
    userList,
    defaultItemID,
    defaultGroupedItemID,
    defaultDetails,
  } = data;
  let response = { error: "", campaignID: null };

  if (!name || !criteria || !startDate || !endDate || !userList || !userEmail) {
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `INSERT INTO account_campaigns ("name", criteria, start_date, end_date, user_list, default_item_id, default_grouped_item_id, account_id, default_details)
    SELECT $1, $2, $3, $4, $5, $6, $7, c.account_id, $9
      FROM contacts c
      WHERE c.email = $8
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
      userEmail,
      JSON.stringify(
        defaultDetails
          ? defaultDetails
          : { note: "", customGift: { name: "", items: [], instructions: "" } }
      ),
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

const getCampaignData = async (campaignID, userEmail) => {
  let response = {
    error: "",
    campaign: {
      campaignID: null,
      name: "",
      criteria: {},
      startDate: "",
      endDate: "",
      archived: false,
      endEarly: false,
      userList: [],
      defaultItemID: null,
      defaultGroupedItemID: null,
      defaultDetails: {
        note: "",
        eventIcon: 2,
        customGift: { id: "", name: "", items: [], instructions: "" },
      },
    },
  };

  campaignID = parseInt(campaignID);

  if (!campaignID || isNaN(campaignID) | !userEmail) {
    response.error = "Missing Requirements";
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
      ac.default_grouped_item_id as "defaultGroupedItemID",
      ac.default_details as "defaultDetails"
    FROM account_campaigns ac
    JOIN contacts c ON c.account_id = ac.account_id
    WHERE ac.is_active = TRUE
    AND ac.a_campaign_id = $1
    AND c.email = $2
    ORDER BY ac.start_date, ac.archived
    `,
    [campaignID, userEmail]
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

const updateCampaignData = async (data, campaignID, userEmail) => {
  let {
    name,
    criteria,
    startDate,
    endDate,
    userList,
    defaultItemID,
    defaultGroupedItemID,
    defaultDetails,
  } = data;
  let response = { error: "", campaignID: null };

  campaignID = parseInt(campaignID);

  if (!campaignID || isNaN(campaignID)) {
    response.error = "Missing campaignID";
    return response;
  }

  if (!name || !criteria || !startDate || !endDate || !userList || !userEmail) {
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
        default_grouped_item_id = $7,
        default_details = $10
      FROM (
        SELECT
          ac.a_campaign_id as "campaignID"
        FROM account_campaigns ac
        JOIN contacts c ON c.account_id = ac.account_id
        WHERE ac.is_active = TRUE
        AND ac.a_campaign_id = $8
        AND c.email = $9
      ) as "campaign_table"
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
      userEmail,
      JSON.stringify(defaultDetails ? defaultDetails : {}),
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

//ORDER QUERIES
const addOrder = async (data) => {
  let {
    orderID,
    shippingDate,
    cost,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZip,
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
    orderID === undefined ||
    !shippingDate ||
    cost === undefined ||
    shippingAddress === undefined ||
    shippingCity === undefined ||
    shippingState === undefined ||
    shippingZip === undefined ||
    giftee === undefined ||
    !campaignID ||
    (groupedID === undefined && giftID === undefined) ||
    shippingFee === undefined
  ) {
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `
    INSERT INTO temp_orders (
        order_id,
        shipping_date,
        "cost",
        shipping_address,
        giftee,
        campaign_id,
        grouped_id,
        gift_id,
        notes,
        shipping_fee,
        is_active,
        shipping_city,
        shipping_state,
        shipping_zip
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
      shippingCity,
      shippingState,
      shippingZip,
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
    shippingCity,
    shippingState,
    shippingZip,
    giftee,
    groupedID,
    giftID,
    notes,
    shippingFee,
    isActive,
  } = data;
  let response = { error: "", orderID: null };

  if (
    orderID === undefined ||
    !shippingDate ||
    cost === undefined ||
    shippingAddress === undefined ||
    shippingCity === undefined ||
    shippingState === undefined ||
    shippingZip === undefined ||
    giftee === undefined ||
    !campaignID ||
    (groupedID === undefined && giftID === undefined) ||
    shippingFee === undefined
  ) {
    console.log(
      "REQ",
      shippingDate,
      cost,
      shippingAddress,
      giftee,
      groupedID,
      giftID,
      notes,
      shippingFee,
      isActive
    );
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
        shipping_date = $2,
        "cost" = $3,
        shipping_address = $4,
        giftee = $5,
        campaign_id = $6,
        grouped_id = $7,
        gift_id = $8,
        notes = $9,
        shipping_fee = $10,
        is_active = $11,
        shipping_city = $14,
        shipping_state = $15,
        shipping_zip = $16
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
      shippingCity,
      shippingState,
      shippingZip,
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
    a.address,
    a.city,
    a.state,
    a.zip,

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

const getWeekOrders = async (
  startDate,
  endDate,
  accountID,
  makeOrderObject,
  makeDateObject
) => {
  let response = {
    error: "",
    orders: [],
    campaignList: {},
    orderObject: {},
    dateObject: {},
  };

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
  let orderObject = {};
  let dateObject = {};

  let itemSortPromise = getQuery.rows.map((item) => {
    if (!(item.campaignID in campaignList)) {
      campaignList[item.campaignID] = { users: {}, count: 0 };
    }

    campaignList[item.campaignID].count += 1;

    if (!(item.campaignID in orderObject)) {
      orderObject[item.campaignID] = {};
    }

    let date = new Date(item.shippingDate).toDateString();
    // if (!(date in orderObject[item.campaignID])) {
    //   orderObject[item.campaignID][date] = {};
    // }

    if (!(date in dateObject)) {
      dateObject[date] = {};
    }

    // orderObject[item.campaignID][date][item.orderID] = item;
    orderObject[item.campaignID][item.orderID] = item;

    dateObject[date][item.orderID] = item;
  });

  let itemSortResult = await Promise.all(itemSortPromise, orderObject);

  if (makeOrderObject) {
    response.orderObject = orderObject;
  }

  if (makeDateObject) {
    response.dateObject = dateObject;
  }

  response.orders = getQuery.rows;
  response.campaignList = campaignList;

  return response;
};

const getAccountData = async (userEmail) => {
  let response = {
    error: "",
    account: {
      accountID: null,
      planID: null,
      roleID: null,
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      stripeID: "",
    },
  };

  if (!userEmail) {
    response.error = "Missing Requirements";
    return response;
  }

  let getQuery = await db.query(
    `SELECT
        a.account_id as "accountID",
        a.plan_id as "planID",
        c.role_id as "roleID",
        a."name",
        a.address,
        a.city,
        a."state",
        a.zip,
        a.stripe_id as "stripeID"
      FROM accounts a
      JOIN contacts c ON c.account_id = a.account_id
      WHERE c.email = $1
      `,
    [userEmail]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount === 0) {
    response.error = "No Account Found";
    return response;
  }

  response.account.accountID = getQuery.rows[0].accountID;
  response.account.planID = getQuery.rows[0].planID;
  response.account.roleID = getQuery.rows[0].roleID;
  response.account.name = getQuery.rows[0].name;
  response.account.address = getQuery.rows[0].address;
  response.account.city = getQuery.rows[0].city;
  response.account.state = getQuery.rows[0].state;
  response.account.zip = getQuery.rows[0].zip;
  response.account.stripeID = getQuery.rows[0].stripeID;

  return response;
};

// USER QUERIES
const queryUser = async (userEmail) => {
  let response = {
    error: "",
    validUser: false,
    user: {
      email: null,
    },
  };

  if (!userEmail) {
    response.error = "Missing Requirements";
    return response;
  }

  let getQuery = await db.query(
    `
    SELECT
      c.email,
      c.account_id as "accountID"
    FROM contacts c
    WHERE c.email =  $1
      `,
    [userEmail]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount === 0) {
    response.error = "No User Found";
    return response;
  }

  response.user = getQuery.rows[0];
  response.validUser = true;
  return response;
};

const queryAccount = async (data) => {
  let { Company: company, City: companyCity, State: companyState } = data;

  let response = {
    error: "",
    validCompany: false,
    company: {
      Company: "",
      City: "",
      State: "",
    },
  };

  if (!company || !companyCity || !companyState) {
    response.error = "Missing Requirements";
    return response;
  }

  let getQuery = await db.query(
    `
    SELECT a."name" as "Company", a.city as "City", a.state as "State"
    FROM accounts a
    WHERE LOWER(a."name") = $1
    AND LOWER(a.city) = $2
    AND LOWER(a.state) = $3
      `,
    [
      company.toLowerCase(),
      companyCity.toLowerCase(),
      companyState.toLowerCase(),
    ]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    return response;
  } else if (getQuery.rowCount > 0) {
    response.company = getQuery.rows[0];
    response.validCompany = false;
    return response;
  }

  response.validCompany = true;
  return response;
};

const createNewUser = async (userEmail, data, accountID, roleID = 1) => {
  // TO-DO - CHANGE ROLE

  let response = { error: "", userID: null };

  let {
    Email: rawEmail,
    "First Name": firstName,
    "Last Name": lastName,
  } = data;

  let eFirstName = gFunctions.encryptStringLocal(firstName); // TO-DO - CHANGE
  let eLastName = gFunctions.encryptStringLocal(lastName); // TO-DO - CHANGE
  let eEmail = gFunctions.encryptStringLocal(rawEmail); // TO-DO - CHANGE

  let encryptPromise = await Promise.all([eFirstName, eLastName, eEmail]).then(
    (values) => {
      eFirstName = values[0].result;
      eLastName = values[1].result;
      eEmail = values[2].result;
    }
  );

  if (!userEmail || !eFirstName || !eLastName || !eEmail || !accountID) {
    response.error = "Missing User Requirements";
    return response;
  }

  let insertQuery = await db.query(
    `
    INSERT INTO contacts (email, e_email, first_name, last_name, account_id, role_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING contact_id as "userID"
      `,
    [userEmail, eEmail, eFirstName, eLastName, accountID, roleID]
  ); // returns query rows with rowCount else error
  if (insertQuery.error) {
    response.error = insertQuery.error.stack;
    return response;
  } else if (insertQuery.rowCount === 0) {
    response.error = "Error Creating User";
    return response;
  }

  response.userID = insertQuery.rows[0].userID;
  return response;
};

const createNewCompanyAccount = async (data) => {
  let response = { error: "", accountID: null };

  let { Company, Address, City, State, Zip } = data;

  if (!Company || !Address || !City || !State || !Zip) {
    response.error = "Missing Company Account Requirements";
    return response;
  }

  // TO-DO - CHANGE THIS
  let planID = 1;

  let insertQuery = await db.query(
    `
    INSERT INTO accounts (name, plan_id, address, city, state, zip)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING account_id as "accountID"
      `,
    [Company, planID, Address, City, State, Zip]
  ); // returns query rows with rowCount else error
  if (insertQuery.error) {
    response.error = insertQuery.error.stack;
    return response;
  } else if (insertQuery.rowCount === 0) {
    response.error = "Error Creating Company Account";
    return response;
  }

  response.accountID = insertQuery.rows[0].accountID;
  return response;
};

const updateAccountContact = async (accountID, userID) => {
  let response = { error: "", accountID: "" };

  if (!accountID || isNaN(userID)) {
    response.error = "Missing Update Requirements";
    return response;
  }

  let postQuery = await db.query(
    `
    UPDATE accounts
    SET main_contact_id = $1
      FROM (
        SELECT
          *
        FROM contacts c
        WHERE c.contact_id = $1
        AND c.account_id = $2
      ) as "accounts_table"
    WHERE accounts.account_id = $2
    RETURNING accounts.account_id as "campaignID"
      `,
    [userID, accountID]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "No Account or User Found";
    return response;
  }

  response.accountID = postQuery.rows[0].accountID;

  return response;
};

const removeOldTempOrders = async (campaignID, orderList) => {
  let response = { error: "", updated: false, updatedRows: [] };

  if (!campaignID || !orderList) {
    response.error = "Missing Update Requirements";
    return response;
  }

  let deleteQuery = await db.query(
    `
      DELETE FROM temp_orders te
      WHERE te.campaign_id = $1
      AND te.order_id = ANY($2)
      AND te.shipment_details = '{}'
      RETURNING te.order_id as "orderID"
      `,
    [campaignID, orderList]
  ); // returns query rows with rowCount else error
  if (deleteQuery.error) {
    response.error = deleteQuery.error.stack;
    return response;
  }

  let updatedRows = [];
  let rowSort = deleteQuery.rows.map((row) => {
    updatedRows.push(row.orderID);
  });

  let rowSortPromise = await Promise.all(rowSort);

  response.updatedRows = updatedRows;
  response.updated = true;

  return response;
};

const updateAccountStripeID = async (stripeID, accountID) => {
  let response = { error: "", added: false, accountID: null };

  if (!stripeID || !accountID) {
    response.error = "Missing Requirements";
    return response;
  }

  let postQuery = await db.query(
    `UPDATE accounts
        SET stripe_id = $1
      WHERE accounts.account_id = $2
      RETURNING accounts.account_id as "accountID"
      `,
    [stripeID, accountID]
  ); // returns query rows with rowCount else error
  if (postQuery.error) {
    response.error = postQuery.error.stack;
    return response;
  } else if (postQuery.rowCount === 0) {
    response.error = "No Account Found";
    return response;
  }

  response.accountID = postQuery.rows[0].accountID;
  response.added = true;

  return response;
};

exports.checkFeature = checkFeature;
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
exports.getAccountData = getAccountData;
exports.queryUser = queryUser;
exports.queryAccount = queryAccount;
exports.createNewCompanyAccount = createNewCompanyAccount;
exports.createNewUser = createNewUser;
exports.updateAccountContact = updateAccountContact;
exports.removeOldTempOrders = removeOldTempOrders;
exports.updateAccountStripeID = updateAccountStripeID;
