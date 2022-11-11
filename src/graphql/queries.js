/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      phoneNumber
      company {
        id
        name
        address {
          id
          address1
          address2
          city
          state
          zip
          accessGroups
          createdAt
          updatedAt
          owner
        }
        users {
          nextToken
        }
        recipients {
          nextToken
        }
        giftEventsByDate {
          nextToken
        }
        accessGroups
        createdAt
        updatedAt
        companyAddressId
        owner
      }
      profilePhoto
      accessGroups
      stripeID
      createdAt
      updatedAt
      companyUsersId
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        phoneNumber
        company {
          id
          name
          accessGroups
          createdAt
          updatedAt
          companyAddressId
          owner
        }
        profilePhoto
        accessGroups
        stripeID
        createdAt
        updatedAt
        companyUsersId
        owner
      }
      nextToken
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      address {
        id
        address1
        address2
        city
        state
        zip
        accessGroups
        createdAt
        updatedAt
        owner
      }
      users {
        items {
          id
          email
          name
          phoneNumber
          profilePhoto
          accessGroups
          stripeID
          createdAt
          updatedAt
          companyUsersId
          owner
        }
        nextToken
      }
      recipients {
        items {
          id
          recipientType
          firstName
          lastName
          email
          phone
          jobTitle
          birthday
          startDate
          group
          departmentID
          profilePhoto
          welcomed
          accessGroups
          createdAt
          updatedAt
          companyRecipientsId
          recipientShippingAddressId
          owner
        }
        nextToken
      }
      giftEventsByDate {
        items {
          id
          companyID
          recipientID
          orderID
          giftType
          dateType
          date
          finalPrice
          shippingCost
          fullfilled
          accessGroups
          createdAt
          updatedAt
          giftEventGiftId
          owner
        }
        nextToken
      }
      accessGroups
      createdAt
      updatedAt
      companyAddressId
      owner
    }
  }
`;
export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address {
          id
          address1
          address2
          city
          state
          zip
          accessGroups
          createdAt
          updatedAt
          owner
        }
        users {
          nextToken
        }
        recipients {
          nextToken
        }
        giftEventsByDate {
          nextToken
        }
        accessGroups
        createdAt
        updatedAt
        companyAddressId
        owner
      }
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      address1
      address2
      city
      state
      zip
      accessGroups
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        address1
        address2
        city
        state
        zip
        accessGroups
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getRecipient = /* GraphQL */ `
  query GetRecipient($id: ID!) {
    getRecipient(id: $id) {
      id
      company {
        id
        name
        address {
          id
          address1
          address2
          city
          state
          zip
          accessGroups
          createdAt
          updatedAt
          owner
        }
        users {
          nextToken
        }
        recipients {
          nextToken
        }
        giftEventsByDate {
          nextToken
        }
        accessGroups
        createdAt
        updatedAt
        companyAddressId
        owner
      }
      recipientType
      firstName
      lastName
      shippingAddress {
        id
        address1
        address2
        city
        state
        zip
        accessGroups
        createdAt
        updatedAt
        owner
      }
      email
      phone
      jobTitle
      birthday
      startDate
      group
      departmentID
      department {
        id
        name
        recipients {
          nextToken
        }
        accessGroups
        createdAt
        updatedAt
        owner
      }
      profilePhoto
      favorites {
        items {
          id
          type
          value
          accessGroups
          createdAt
          updatedAt
          recipientFavoritesId
          owner
        }
        nextToken
      }
      giftHistory {
        items {
          id
          companyID
          recipientID
          orderID
          giftType
          dateType
          date
          finalPrice
          shippingCost
          fullfilled
          accessGroups
          createdAt
          updatedAt
          giftEventGiftId
          owner
        }
        nextToken
      }
      welcomed
      accessGroups
      createdAt
      updatedAt
      companyRecipientsId
      recipientShippingAddressId
      owner
    }
  }
`;
export const listRecipients = /* GraphQL */ `
  query ListRecipients(
    $filter: ModelRecipientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        company {
          id
          name
          accessGroups
          createdAt
          updatedAt
          companyAddressId
          owner
        }
        recipientType
        firstName
        lastName
        shippingAddress {
          id
          address1
          address2
          city
          state
          zip
          accessGroups
          createdAt
          updatedAt
          owner
        }
        email
        phone
        jobTitle
        birthday
        startDate
        group
        departmentID
        department {
          id
          name
          accessGroups
          createdAt
          updatedAt
          owner
        }
        profilePhoto
        favorites {
          nextToken
        }
        giftHistory {
          nextToken
        }
        welcomed
        accessGroups
        createdAt
        updatedAt
        companyRecipientsId
        recipientShippingAddressId
        owner
      }
      nextToken
    }
  }
`;
export const getDepartment = /* GraphQL */ `
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
      id
      name
      recipients {
        items {
          id
          recipientType
          firstName
          lastName
          email
          phone
          jobTitle
          birthday
          startDate
          group
          departmentID
          profilePhoto
          welcomed
          accessGroups
          createdAt
          updatedAt
          companyRecipientsId
          recipientShippingAddressId
          owner
        }
        nextToken
      }
      accessGroups
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDepartments = /* GraphQL */ `
  query ListDepartments(
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDepartments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        recipients {
          nextToken
        }
        accessGroups
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getProfileFavorite = /* GraphQL */ `
  query GetProfileFavorite($id: ID!) {
    getProfileFavorite(id: $id) {
      id
      type
      value
      accessGroups
      createdAt
      updatedAt
      recipientFavoritesId
      owner
    }
  }
`;
export const listProfileFavorites = /* GraphQL */ `
  query ListProfileFavorites(
    $filter: ModelProfileFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileFavorites(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        value
        accessGroups
        createdAt
        updatedAt
        recipientFavoritesId
        owner
      }
      nextToken
    }
  }
`;
export const getGiftEvent = /* GraphQL */ `
  query GetGiftEvent($id: ID!) {
    getGiftEvent(id: $id) {
      id
      companyID
      recipientID
      orderID
      recipient {
        id
        company {
          id
          name
          accessGroups
          createdAt
          updatedAt
          companyAddressId
          owner
        }
        recipientType
        firstName
        lastName
        shippingAddress {
          id
          address1
          address2
          city
          state
          zip
          accessGroups
          createdAt
          updatedAt
          owner
        }
        email
        phone
        jobTitle
        birthday
        startDate
        group
        departmentID
        department {
          id
          name
          accessGroups
          createdAt
          updatedAt
          owner
        }
        profilePhoto
        favorites {
          nextToken
        }
        giftHistory {
          nextToken
        }
        welcomed
        accessGroups
        createdAt
        updatedAt
        companyRecipientsId
        recipientShippingAddressId
        owner
      }
      giftType
      dateType
      date
      gift {
        id
        name
        category
        items {
          nextToken
        }
        price
        description
        pictures {
          nextToken
        }
        active
        needs_subscription
        no_shipping_fee
        can_schedule_immediately
        createdAt
        updatedAt
      }
      finalPrice
      shippingCost
      fullfilled
      accessGroups
      createdAt
      updatedAt
      giftEventGiftId
      owner
    }
  }
`;
export const listGiftEvents = /* GraphQL */ `
  query ListGiftEvents(
    $filter: ModelGiftEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGiftEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyID
        recipientID
        orderID
        recipient {
          id
          recipientType
          firstName
          lastName
          email
          phone
          jobTitle
          birthday
          startDate
          group
          departmentID
          profilePhoto
          welcomed
          accessGroups
          createdAt
          updatedAt
          companyRecipientsId
          recipientShippingAddressId
          owner
        }
        giftType
        dateType
        date
        gift {
          id
          name
          category
          price
          description
          active
          needs_subscription
          no_shipping_fee
          can_schedule_immediately
          createdAt
          updatedAt
        }
        finalPrice
        shippingCost
        fullfilled
        accessGroups
        createdAt
        updatedAt
        giftEventGiftId
        owner
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      giftID
      giftImage
      giftPrice
      name
      note
      toDate
      fromDate
      recipientIDs
      giftEvents {
        items {
          id
          companyID
          recipientID
          orderID
          giftType
          dateType
          date
          finalPrice
          shippingCost
          fullfilled
          accessGroups
          createdAt
          updatedAt
          giftEventGiftId
          owner
        }
        nextToken
      }
      createdBy
      updatedBy
      totalPrice
      shippingAddressType
      paymentID
      completed
      orderType
      orderDateType
      accessGroups
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        giftID
        giftImage
        giftPrice
        name
        note
        toDate
        fromDate
        recipientIDs
        giftEvents {
          nextToken
        }
        createdBy
        updatedBy
        totalPrice
        shippingAddressType
        paymentID
        completed
        orderType
        orderDateType
        accessGroups
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getGift = /* GraphQL */ `
  query GetGift($id: ID!) {
    getGift(id: $id) {
      id
      name
      category
      items {
        items {
          id
          giftID
          itemID
          createdAt
          updatedAt
        }
        nextToken
      }
      price
      description
      pictures {
        items {
          id
          alt
          src
          createdAt
          updatedAt
          giftPicturesId
          itemPicturesId
        }
        nextToken
      }
      active
      needs_subscription
      no_shipping_fee
      can_schedule_immediately
      createdAt
      updatedAt
    }
  }
`;
export const listGifts = /* GraphQL */ `
  query ListGifts(
    $filter: ModelGiftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category
        items {
          nextToken
        }
        price
        description
        pictures {
          nextToken
        }
        active
        needs_subscription
        no_shipping_fee
        can_schedule_immediately
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      description
      weight
      price
      pictures {
        items {
          id
          alt
          src
          createdAt
          updatedAt
          giftPicturesId
          itemPicturesId
        }
        nextToken
      }
      active
      source
      brandingAvailable
      quantityAvailable
      gifts {
        items {
          id
          giftID
          itemID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        weight
        price
        pictures {
          nextToken
        }
        active
        source
        brandingAvailable
        quantityAvailable
        gifts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGiftImage = /* GraphQL */ `
  query GetGiftImage($id: ID!) {
    getGiftImage(id: $id) {
      id
      alt
      src
      createdAt
      updatedAt
      giftPicturesId
      itemPicturesId
    }
  }
`;
export const listGiftImages = /* GraphQL */ `
  query ListGiftImages(
    $filter: ModelGiftImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGiftImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        alt
        src
        createdAt
        updatedAt
        giftPicturesId
        itemPicturesId
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGiftItems = /* GraphQL */ `
  query GetGiftItems($id: ID!) {
    getGiftItems(id: $id) {
      id
      giftID
      itemID
      gift {
        id
        name
        category
        items {
          nextToken
        }
        price
        description
        pictures {
          nextToken
        }
        active
        needs_subscription
        no_shipping_fee
        can_schedule_immediately
        createdAt
        updatedAt
      }
      item {
        id
        name
        description
        weight
        price
        pictures {
          nextToken
        }
        active
        source
        brandingAvailable
        quantityAvailable
        gifts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGiftItems = /* GraphQL */ `
  query ListGiftItems(
    $filter: ModelGiftItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGiftItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        giftID
        itemID
        gift {
          id
          name
          category
          price
          description
          active
          needs_subscription
          no_shipping_fee
          can_schedule_immediately
          createdAt
          updatedAt
        }
        item {
          id
          name
          description
          weight
          price
          active
          source
          brandingAvailable
          quantityAvailable
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
