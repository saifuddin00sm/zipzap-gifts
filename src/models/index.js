// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const GiftType = {
  ONE_TIME: "ONE_TIME",
  RECURRING: "RECURRING",
};

const GiftDateType = {
  BIRTHDAY: "BIRTHDAY",
  ANNIVERSARY: "ANNIVERSARY",
};

const {
  User,
  Company,
  Address,
  Recipient,
  ProfileFavorite,
  GiftEvent,
  Gift,
  Item,
  GiftImage,
  Department,
  Order,
  Todo,
} = initSchema(schema);

export {
  User,
  Company,
  Address,
  Recipient,
  ProfileFavorite,
  GiftEvent,
  Gift,
  Item,
  GiftImage,
  Department,
  Order,
  Todo,
  GiftType,
  GiftDateType,
};
