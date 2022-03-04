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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        users {
          nextToken
          startedAt
        }
        recipients {
          nextToken
          startedAt
        }
        giftEventsByDate {
          nextToken
          startedAt
        }
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyAddressId
        owner
      }
      profilePhoto
      accessGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          companyAddressId
          owner
        }
        profilePhoto
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyUsersId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
          _version
          _deleted
          _lastChangedAt
          companyAddressId
          owner
        }
        profilePhoto
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyUsersId
        owner
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          companyUsersId
          owner
        }
        nextToken
        startedAt
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
          departmentID
          profilePhoto
          welcomed
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          companyRecipientsId
          recipientShippingAddressId
          owner
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          giftEventGiftId
          owner
        }
        nextToken
        startedAt
      }
      accessGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        users {
          nextToken
          startedAt
        }
        recipients {
          nextToken
          startedAt
        }
        giftEventsByDate {
          nextToken
          startedAt
        }
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyAddressId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCompanies = /* GraphQL */ `
  query SyncCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCompanies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        users {
          nextToken
          startedAt
        }
        recipients {
          nextToken
          startedAt
        }
        giftEventsByDate {
          nextToken
          startedAt
        }
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyAddressId
        owner
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAddresses = /* GraphQL */ `
  query SyncAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAddresses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        users {
          nextToken
          startedAt
        }
        recipients {
          nextToken
          startedAt
        }
        giftEventsByDate {
          nextToken
          startedAt
        }
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        owner
      }
      email
      phone
      jobTitle
      birthday
      startDate
      departmentID
      profilePhoto
      favorites {
        items {
          id
          type
          value
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          recipientFavoritesId
          owner
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          giftEventGiftId
          owner
        }
        nextToken
        startedAt
      }
      welcomed
      accessGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        email
        phone
        jobTitle
        birthday
        startDate
        departmentID
        profilePhoto
        favorites {
          nextToken
          startedAt
        }
        giftHistory {
          nextToken
          startedAt
        }
        welcomed
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyRecipientsId
        recipientShippingAddressId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRecipients = /* GraphQL */ `
  query SyncRecipients(
    $filter: ModelRecipientFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRecipients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        company {
          id
          name
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        email
        phone
        jobTitle
        birthday
        startDate
        departmentID
        profilePhoto
        favorites {
          nextToken
          startedAt
        }
        giftHistory {
          nextToken
          startedAt
        }
        welcomed
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyRecipientsId
        recipientShippingAddressId
        owner
      }
      nextToken
      startedAt
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
          departmentID
          profilePhoto
          welcomed
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          companyRecipientsId
          recipientShippingAddressId
          owner
        }
        nextToken
        startedAt
      }
      accessGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDepartments = /* GraphQL */ `
  query SyncDepartments(
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDepartments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        recipients {
          nextToken
          startedAt
        }
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        recipientFavoritesId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProfileFavorites = /* GraphQL */ `
  query SyncProfileFavorites(
    $filter: ModelProfileFavoriteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProfileFavorites(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        value
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        recipientFavoritesId
        owner
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        email
        phone
        jobTitle
        birthday
        startDate
        departmentID
        profilePhoto
        favorites {
          nextToken
          startedAt
        }
        giftHistory {
          nextToken
          startedAt
        }
        welcomed
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        items {
          nextToken
          startedAt
        }
        price
        description
        pictures {
          nextToken
          startedAt
        }
        active
        needs_subscription
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      finalPrice
      shippingCost
      fullfilled
      accessGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          departmentID
          profilePhoto
          welcomed
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          price
          description
          active
          needs_subscription
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        finalPrice
        shippingCost
        fullfilled
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        giftEventGiftId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGiftEvents = /* GraphQL */ `
  query SyncGiftEvents(
    $filter: ModelGiftEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGiftEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
          departmentID
          profilePhoto
          welcomed
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          price
          description
          active
          needs_subscription
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        finalPrice
        shippingCost
        fullfilled
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        giftEventGiftId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      name
      note
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
          _version
          _deleted
          _lastChangedAt
          giftEventGiftId
          owner
        }
        nextToken
        startedAt
      }
      createdBy
      totalPrice
      completed
      orderType
      orderDateType
      accessGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        name
        note
        giftEvents {
          nextToken
          startedAt
        }
        createdBy
        totalPrice
        completed
        orderType
        orderDateType
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        note
        giftEvents {
          nextToken
          startedAt
        }
        createdBy
        totalPrice
        completed
        orderType
        orderDateType
        accessGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getGift = /* GraphQL */ `
  query GetGift($id: ID!) {
    getGift(id: $id) {
      id
      name
      items {
        items {
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
          _version
          _deleted
          _lastChangedAt
          giftItemsId
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          giftPicturesId
          itemPicturesId
        }
        nextToken
        startedAt
      }
      active
      needs_subscription
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        items {
          nextToken
          startedAt
        }
        price
        description
        pictures {
          nextToken
          startedAt
        }
        active
        needs_subscription
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGifts = /* GraphQL */ `
  query SyncGifts(
    $filter: ModelGiftFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGifts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        items {
          nextToken
          startedAt
        }
        price
        description
        pictures {
          nextToken
          startedAt
        }
        active
        needs_subscription
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
          giftPicturesId
          itemPicturesId
        }
        nextToken
        startedAt
      }
      active
      source
      brandingAvailable
      quantityAvailable
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      giftItemsId
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
          startedAt
        }
        active
        source
        brandingAvailable
        quantityAvailable
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        giftItemsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncItems = /* GraphQL */ `
  query SyncItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        weight
        price
        pictures {
          nextToken
          startedAt
        }
        active
        source
        brandingAvailable
        quantityAvailable
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        giftItemsId
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        giftPicturesId
        itemPicturesId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGiftImages = /* GraphQL */ `
  query SyncGiftImages(
    $filter: ModelGiftImageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGiftImages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        alt
        src
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        giftPicturesId
        itemPicturesId
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTodos = /* GraphQL */ `
  query SyncTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTodos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
