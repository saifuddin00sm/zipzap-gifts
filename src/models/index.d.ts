import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export enum GiftType {
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING",
}

export enum GiftDateType {
  BIRTHDAY = "BIRTHDAY",
  ANNIVERSARY = "ANNIVERSARY",
}

type UserMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type CompanyMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type AddressMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type RecipientMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type ProfileFavoriteMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type GiftEventMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type GiftMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type ItemMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type GiftImageMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type DepartmentMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type OrderMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type TodoMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phoneNumber?: string;
  readonly company?: Company;
  readonly profilePhoto?: string;
  readonly accessGroups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(
    source: User,
    mutator: (
      draft: MutableModel<User, UserMetaData>
    ) => MutableModel<User, UserMetaData> | void
  ): User;
}

export declare class Company {
  readonly id: string;
  readonly name: string;
  readonly address?: Address;
  readonly users?: (User | null)[];
  readonly recipients?: (Recipient | null)[];
  readonly giftEventsByDate?: (GiftEvent | null)[];
  readonly accessGroups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly companyAddressId?: string;
  constructor(init: ModelInit<Company, CompanyMetaData>);
  static copyOf(
    source: Company,
    mutator: (
      draft: MutableModel<Company, CompanyMetaData>
    ) => MutableModel<Company, CompanyMetaData> | void
  ): Company;
}

export declare class Address {
  readonly id: string;
  readonly address1: string;
  readonly address2?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zip: string;
  readonly accessGroups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Address, AddressMetaData>);
  static copyOf(
    source: Address,
    mutator: (
      draft: MutableModel<Address, AddressMetaData>
    ) => MutableModel<Address, AddressMetaData> | void
  ): Address;
}

export declare class Recipient {
  readonly id: string;
  readonly company?: Company;
  readonly recipientType?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly shippingAddress?: Address;
  readonly email?: string;
  readonly phone?: string;
  readonly jobTitle?: string;
  readonly birthday?: string;
  readonly startDate?: string;
  readonly departmentID?: string;
  readonly profilePhoto?: string;
  readonly favorites?: (ProfileFavorite | null)[];
  readonly giftHistory?: (GiftEvent | null)[];
  readonly welcomed?: string;
  readonly accessGroups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly recipientShippingAddressId?: string;
  constructor(init: ModelInit<Recipient, RecipientMetaData>);
  static copyOf(
    source: Recipient,
    mutator: (
      draft: MutableModel<Recipient, RecipientMetaData>
    ) => MutableModel<Recipient, RecipientMetaData> | void
  ): Recipient;
}

export declare class ProfileFavorite {
  readonly id: string;
  readonly type?: string;
  readonly value?: string;
  readonly accessGroups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly recipientFavoritesId?: string;
  constructor(init: ModelInit<ProfileFavorite, ProfileFavoriteMetaData>);
  static copyOf(
    source: ProfileFavorite,
    mutator: (
      draft: MutableModel<ProfileFavorite, ProfileFavoriteMetaData>
    ) => MutableModel<ProfileFavorite, ProfileFavoriteMetaData> | void
  ): ProfileFavorite;
}

export declare class GiftEvent {
  readonly id: string;
  readonly companyID: string;
  readonly orderID?: string;
  readonly recipient?: Recipient;
  readonly giftType?: GiftType | keyof typeof GiftType;
  readonly dateType?: GiftDateType | keyof typeof GiftDateType;
  readonly date?: string;
  readonly gift: Gift;
  readonly finalPrice?: string;
  readonly shippingCost?: string;
  readonly fullfilled?: string;
  readonly accessGroups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly giftEventGiftId: string;
  constructor(init: ModelInit<GiftEvent, GiftEventMetaData>);
  static copyOf(
    source: GiftEvent,
    mutator: (
      draft: MutableModel<GiftEvent, GiftEventMetaData>
    ) => MutableModel<GiftEvent, GiftEventMetaData> | void
  ): GiftEvent;
}

export declare class Gift {
  readonly id: string;
  readonly name: string;
  readonly items?: (Item | null)[];
  readonly price?: string;
  readonly description?: string;
  readonly pictures?: (GiftImage | null)[];
  readonly active?: boolean;
  readonly needs_subscription?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Gift, GiftMetaData>);
  static copyOf(
    source: Gift,
    mutator: (
      draft: MutableModel<Gift, GiftMetaData>
    ) => MutableModel<Gift, GiftMetaData> | void
  ): Gift;
}

export declare class Item {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly weight?: string;
  readonly price?: string;
  readonly pictures?: (GiftImage | null)[];
  readonly active?: boolean;
  readonly source?: string;
  readonly brandingAvailable?: boolean;
  readonly quantityAvailable?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly giftItemsId?: string;
  constructor(init: ModelInit<Item, ItemMetaData>);
  static copyOf(
    source: Item,
    mutator: (
      draft: MutableModel<Item, ItemMetaData>
    ) => MutableModel<Item, ItemMetaData> | void
  ): Item;
}

export declare class GiftImage {
  readonly id: string;
  readonly alt: string;
  readonly src: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly giftPicturesId?: string;
  readonly itemPicturesId?: string;
  constructor(init: ModelInit<GiftImage, GiftImageMetaData>);
  static copyOf(
    source: GiftImage,
    mutator: (
      draft: MutableModel<GiftImage, GiftImageMetaData>
    ) => MutableModel<GiftImage, GiftImageMetaData> | void
  ): GiftImage;
}

export declare class Department {
  readonly id: string;
  readonly name: string;
  readonly recipients?: (Recipient | null)[];
  readonly accessGroups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Department, DepartmentMetaData>);
  static copyOf(
    source: Department,
    mutator: (
      draft: MutableModel<Department, DepartmentMetaData>
    ) => MutableModel<Department, DepartmentMetaData> | void
  ): Department;
}

export declare class Order {
  readonly id: string;
  readonly name: string;
  readonly note?: string;
  readonly giftEvents?: (GiftEvent | null)[];
  readonly createdBy: string;
  readonly totalPrice?: string;
  readonly completed?: string;
  readonly orderType?: GiftType | keyof typeof GiftType;
  readonly orderDateType?: GiftDateType | keyof typeof GiftDateType;
  readonly accessGroups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(
    source: Order,
    mutator: (
      draft: MutableModel<Order, OrderMetaData>
    ) => MutableModel<Order, OrderMetaData> | void
  ): Order;
}

export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(
    source: Todo,
    mutator: (
      draft: MutableModel<Todo, TodoMetaData>
    ) => MutableModel<Todo, TodoMetaData> | void
  ): Todo;
}
