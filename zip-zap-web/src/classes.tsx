class adminMenuButton {
  text: string;
  link: string;

  constructor(text: string, link: string) {
    this.text = text;
    this.link = link;
  }
}

class adminItem {
  itemID: number;
  name: string;
  description: string;
  mainPicture: string;
  price: number;
  quantity: number;
  pictures: Array<string>;
  quantityAvailable: number;
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

class adminGroupedItem {
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

class adminAccount {
  accountID: number;
  name: string;
  orderCount: number;
  constructor(accountID: number, name: string, orderCount: number) {
    this.accountID = accountID;
    this.name = name;
    this.orderCount = orderCount;
  }
}

class shippingDetails {
  fulfillmentDate: string;
  shippmentDate: string;
  trackingNumber: string;

  constructor(
    fulfillmentDate: string,
    shippmentDate: string,
    trackingNumber: string
  ) {
    this.fulfillmentDate = fulfillmentDate;
    this.shippmentDate = shippmentDate;
    this.trackingNumber = trackingNumber;
  }
}

class adminOrder {
  orderID: number;
  shippingDate: string;
  cost: number;
  shippingAddress: string | null;
  giftee: number;
  campaignID: number;
  groupedID: number | null;
  giftID: number | null;
  notes: string;
  shippingFee: number;
  isActive: boolean;
  shippingDetails: null | shippingDetails;
  campaignName: string;
  constructor(
    orderID: number,
    shippingDate: string,
    cost: number,
    shippingAddress: string | null,
    giftee: number,
    campaignID: number,
    groupedID: number | null,
    giftID: number | null,
    notes: string,
    shippingFee: number,
    isActive: boolean,
    shippingDetails: null | shippingDetails,
    campaignName: string
  ) {
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
    this.isActive = isActive;
    this.shippingDetails = shippingDetails;
    this.campaignName = campaignName;
  }
}

export {
  adminMenuButton,
  adminItem,
  adminGroupedItem,
  adminAccount,
  adminOrder,
  shippingDetails,
};
