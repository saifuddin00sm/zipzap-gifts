class adminMenuButton {
  text: string;
  link: string;

  constructor(text: string, link: string) {
    this.text = text;
    this.link = link;
  }
}

class userItem {
  itemID: number;
  name: string;
  description: string;
  mainPicture: string;
  price: number;
  quantity: number;
  pictures: Array<string>;
  quantityAvailable: number;
  detailFields: { [key: string]: any } = {};
  isActive: boolean;

  constructor(
    itemID: number,
    name: string,
    description: string,
    mainPicture: string,
    price: number,
    quantity: number,
    pictures: Array<string>,
    quantityAvailable: number,
    isActive: boolean
  ) {
    this.itemID = itemID;
    this.name = name;
    this.description = description;
    this.mainPicture = mainPicture;
    this.price = price;
    this.quantity = quantity;
    this.pictures = pictures;
    this.quantityAvailable = quantityAvailable;
    this.isActive = isActive;
  }
}

class userGroupedItem {
  groupedID: number;
  itemsArray: Array<number>;
  priceOverride: number;
  name: string;
  description: string;
  mainPicture: string;
  pictures: Array<string>;
  isActive: boolean;

  constructor(
    groupedID: number,
    name: string,
    description: string,
    mainPicture: string,
    priceOverride: number,
    pictures: Array<string>,
    itemsArray: Array<number>,
    isActive: boolean
  ) {
    this.groupedID = groupedID;
    this.name = name;
    this.description = description;
    this.mainPicture = mainPicture;
    this.priceOverride = priceOverride;
    this.pictures = pictures;
    this.itemsArray = itemsArray;

    this.isActive = isActive;
  }
}

class adminItem extends userItem {
  purchasedFrom: string;
  weight: number;
  cost: number;
  brandingAvailable: boolean;
  constructor(
    itemID: number,
    name: string,
    description: string,
    mainPicture: string,
    price: number,
    quantity: number,
    pictures: Array<string>,
    quantityAvailable: number,
    isActive: boolean,
    purchasedFrom: string,
    weight: number,
    cost: number,
    brandingAvailable: boolean
  ) {
    super(
      itemID,
      name,
      description,
      mainPicture,
      price,
      quantity,
      pictures,
      quantityAvailable,
      isActive
    );

    this.purchasedFrom = purchasedFrom;
    this.weight = weight;
    this.cost = cost;
    this.brandingAvailable = brandingAvailable;
  }
}

class adminGroupedItem extends userGroupedItem {
  constructor(
    groupedID: number,
    name: string,
    description: string,
    mainPicture: string,
    priceOverride: number,
    pictures: Array<string>,
    itemsArray: Array<number>,
    isActive: boolean
  ) {
    super(
      groupedID,
      name,
      description,
      mainPicture,
      priceOverride,
      pictures,
      itemsArray,
      isActive
    );
  }
}

class adminAccount {
  accountID: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  orderCount: number;
  constructor(
    accountID: number,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    orderCount: number
  ) {
    this.accountID = accountID;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.orderCount = orderCount;
  }
}

class shippingDetails {
  fulfillmentDate: string;
  shippmentDate: string;
  trackingNumber: string;
  labelURL: string;
  parcelNumber: string;

  constructor(
    fulfillmentDate: string,
    shippmentDate: string,
    trackingNumber: string,
    labelURL: string,
    parcelNumber: string
  ) {
    this.fulfillmentDate = fulfillmentDate;
    this.shippmentDate = shippmentDate;
    this.trackingNumber = trackingNumber;
    this.labelURL = labelURL;
    this.parcelNumber = parcelNumber;
  }
}

class eventOrder {
  orderID: number;
  cost: number;
  shippingAddress: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingZip: string | null;
  giftee: number | string;
  campaignID: number;
  groupedID: number | null;
  giftID: number | null;
  notes: string;
  shippingFee: number;
  shippingDate: string;
  shippingDetails: null | shippingDetails;
  isActive: boolean;

  constructor(
    orderID: number,
    shippingDate: string,
    cost: number,
    shippingAddress: string | null,
    shippingCity: string | null,
    shippingState: string | null,
    shippingZip: string | null,
    giftee: number | string,
    campaignID: number,
    groupedID: number | null,
    giftID: number | null,
    notes: string,
    shippingFee: number,
    shippingDetails: null | shippingDetails,
    isActive: boolean
  ) {
    this.orderID = orderID;
    this.shippingDate = shippingDate;
    this.cost = cost;
    this.shippingAddress = shippingAddress;
    this.shippingCity = shippingCity;
    this.shippingState = shippingState;
    this.shippingZip = shippingZip;
    this.giftee = giftee;
    this.campaignID = campaignID;
    this.groupedID = groupedID;
    this.giftID = giftID;
    this.notes = notes;
    this.shippingFee = shippingFee;
    this.shippingDetails = shippingDetails;
    this.isActive = isActive;
  }
}

class adminOrder extends eventOrder {
  campaignName: string;
  constructor(
    orderID: number,
    shippingDate: string,
    cost: number,
    shippingAddress: string | null,
    shippingCity: string | null,
    shippingState: string | null,
    shippingZip: string | null,
    giftee: number,
    campaignID: number,
    groupedID: number | null,
    giftID: number | null,
    notes: string,
    shippingFee: number,
    shippingDetails: null | shippingDetails,

    isActive: boolean,
    campaignName: string
  ) {
    super(
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
      shippingDetails,
      isActive
    );
    this.orderID = orderID;
    this.shippingDate = shippingDate;
    this.cost = cost;
    this.shippingAddress = shippingAddress;
    this.giftee = giftee;
    this.campaignID = campaignID;
    this.groupedID = groupedID;
    this.giftID = giftID;
    this.notes = notes;
    this.shippingFee = shippingFee;

    this.shippingDetails = shippingDetails;
    this.campaignName = campaignName;
  }
}

class userEvent {
  campaignID: number;
  name: string;
  criteria: { [key: string]: any };
  startDate: string;
  endDate: string;
  archived: boolean;
  endEarly: boolean;
  userList: Array<string>;
  defaultItemID: null | number;
  defaultGroupedItemID: null | number;
  defaultDetails: {
    note: string;
    customGift: {
      id: string;
      name: string;
      items: Array<{ id: number; details: { [key: string]: any } }>;
      instructions: string;
    };
    eventIcon: number;
    eventCard: string;
  } = {
    note: "",
    customGift: {
      id: "",
      name: "",
      items: [],
      instructions: "",
    },
    eventIcon: 1,
    eventCard: "",
  };
  constructor(
    campaignID: number,
    name: string,
    criteria: { [key: string]: any },
    startDate: string,
    endDate: string,
    archived: boolean,
    endEarly: boolean,
    userList: Array<string>,
    defaultItemID: null | number,
    defaultGroupedItemID: null | number
  ) {
    this.campaignID = campaignID;
    this.name = name;
    this.criteria = criteria;
    this.startDate = startDate;
    this.endDate = endDate;
    this.archived = archived;
    this.endEarly = endEarly;
    this.userList = userList;
    this.defaultItemID = defaultItemID;
    this.defaultGroupedItemID = defaultGroupedItemID;
  }
}

// class userMonthOrderList {
//   orders: { [key: string]: { [key: string]: { [key: string]: eventOrder } } };
//   constructor(orders: {
//     [key: string]: { [key: string]: { [key: string]: eventOrder } };
//   }) {
//     this.orders = orders;
//   }
// }

class userMonthOrderList {
  orders: { [key: string]: { [key: string]: eventOrder } };
  constructor(orders: { [key: string]: { [key: string]: eventOrder } }) {
    this.orders = orders;
  }
}

class navButton {
  text: string;
  link: string;
  external?: boolean;
  constructor(text: string, link: string) {
    this.text = text;
    this.link = link;
  }
}

class userRecipient {
  ["First Name"]: string;
  ["Last Name"]: string;
  Department: string;
  Title: string;
  Birthday: string;
  ["Date Started"]: string;
  Address: string;
  City: string;
  State: string;
  Zip: string;

  userID?: string;

  constructor(
    Department: string,
    Title: string,
    Birthday: string,
    Address: string,
    City: string,
    State: string,
    Zip: string
  ) {
    this.Birthday = Birthday;
    this.Department = Department;
    this.Title = Title;
    this.Address = Address;
    this.City = City;
    this.State = State;
    this.Zip = Zip;
  }
}

class shippoShipmentRate {
  object_created: string;
  object_id: string;
  object_owner: string;
  shipment: string;
  attributes: Array<any>;
  amount: string;
  currency: string;
  amount_local: string;
  currency_local: string;
  provider: string;
  provider_image_75: string;
  provider_image_200: string;
  servicelevel: {
    name: string;
    token: string;
    terms: string;
  };
  estimated_days: number;
  arrives_by: null;
  duration_terms: string;
  messages: Array<any>;
  carrier_account: string;
  test: true;
  zone?: string;

  constructor(
    object_created: string,
    object_id: string,
    object_owner: string,
    shipment: string,
    attributes: Array<any>,
    amount: string,
    currency: string,
    amount_local: string,
    currency_local: string,
    provider: string,
    provider_image_75: string,
    provider_image_200: string,
    servicelevel: {
      name: string;
      token: string;
      terms: string;
    },
    estimated_days: number,
    arrives_by: null,
    duration_terms: string,
    messages: Array<any>,
    carrier_account: string,
    test: true
  ) {
    this.object_created = object_created;
    this.object_id = object_id;
    this.object_owner = object_owner;
    this.shipment = shipment;
    this.attributes = attributes;
    this.amount = amount;
    this.currency = currency;
    this.amount_local = amount_local;
    this.currency_local = currency_local;
    this.provider = provider;
    this.provider_image_75 = provider_image_75;
    this.provider_image_200 = provider_image_200;
    this.servicelevel = servicelevel;
    this.estimated_days = estimated_days;
    this.arrives_by = arrives_by;
    this.duration_terms = duration_terms;
    this.messages = messages;
    this.carrier_account = carrier_account;
    this.test = test;
  }
}

class stripeCard {
  id: string;
  object: string;
  billing_details: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: null;
      postal_code: string;
      state: string;
    };
    email: string | null;
    name: string;
    phone: string | null;
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: string;
      address_postal_code_check: string;
      cvc_check: string;
    };
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: null;
    last4: string;
    networks: {
      available: Array<string>;
      preferred: null;
    };
    three_d_secure_usage: {
      supported: true;
    };
    wallet: null;
  };
  created: number;
  customer: string;
  type: string;

  constructor(
    id: string,
    object: string,
    billing_details: {
      address: {
        city: string;
        country: string;
        line1: string;
        line2: null;
        postal_code: string;
        state: string;
      };
      email: string | null;
      name: string;
      phone: string | null;
    },
    card: {
      brand: string;
      checks: {
        address_line1_check: string;
        address_postal_code_check: string;
        cvc_check: string;
      };
      country: string;
      exp_month: number;
      exp_year: number;
      fingerprint: string;
      funding: string;
      generated_from: null;
      last4: string;
      networks: {
        available: Array<string>;
        preferred: null;
      };
      three_d_secure_usage: {
        supported: true;
      };
      wallet: null;
    },
    created: number,
    customer: string,
    type: string
  ) {
    this.id = id;
    this.object = object;
    this.billing_details = billing_details;
    this.card = card;
    this.created = created;
    this.customer = customer;
    this.type = type;
  }
}

export {
  adminMenuButton,
  adminItem,
  adminGroupedItem,
  adminAccount,
  adminOrder,
  shippingDetails,
  userEvent,
  userItem,
  userGroupedItem,
  eventOrder,
  userMonthOrderList,
  navButton,
  userRecipient,
  shippoShipmentRate,
  stripeCard,
};
