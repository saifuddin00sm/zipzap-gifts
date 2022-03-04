/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($owner: String) {
    onCreateCompany(owner: $owner) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($owner: String) {
    onUpdateCompany(owner: $owner) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($owner: String) {
    onDeleteCompany(owner: $owner) {
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
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress($owner: String) {
    onCreateAddress(owner: $owner) {
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
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress($owner: String) {
    onUpdateAddress(owner: $owner) {
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
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress($owner: String) {
    onDeleteAddress(owner: $owner) {
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
export const onCreateRecipient = /* GraphQL */ `
  subscription OnCreateRecipient($owner: String) {
    onCreateRecipient(owner: $owner) {
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
export const onUpdateRecipient = /* GraphQL */ `
  subscription OnUpdateRecipient($owner: String) {
    onUpdateRecipient(owner: $owner) {
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
export const onDeleteRecipient = /* GraphQL */ `
  subscription OnDeleteRecipient($owner: String) {
    onDeleteRecipient(owner: $owner) {
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
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment($owner: String) {
    onCreateDepartment(owner: $owner) {
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
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment($owner: String) {
    onUpdateDepartment(owner: $owner) {
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
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment($owner: String) {
    onDeleteDepartment(owner: $owner) {
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
export const onCreateProfileFavorite = /* GraphQL */ `
  subscription OnCreateProfileFavorite($owner: String) {
    onCreateProfileFavorite(owner: $owner) {
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
export const onUpdateProfileFavorite = /* GraphQL */ `
  subscription OnUpdateProfileFavorite($owner: String) {
    onUpdateProfileFavorite(owner: $owner) {
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
export const onDeleteProfileFavorite = /* GraphQL */ `
  subscription OnDeleteProfileFavorite($owner: String) {
    onDeleteProfileFavorite(owner: $owner) {
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
export const onCreateGiftEvent = /* GraphQL */ `
  subscription OnCreateGiftEvent($owner: String) {
    onCreateGiftEvent(owner: $owner) {
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
          id
          alt
          src
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
export const onUpdateGiftEvent = /* GraphQL */ `
  subscription OnUpdateGiftEvent($owner: String) {
    onUpdateGiftEvent(owner: $owner) {
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
          id
          alt
          src
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
export const onDeleteGiftEvent = /* GraphQL */ `
  subscription OnDeleteGiftEvent($owner: String) {
    onDeleteGiftEvent(owner: $owner) {
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
          id
          alt
          src
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String) {
    onCreateOrder(owner: $owner) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String) {
    onUpdateOrder(owner: $owner) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String) {
    onDeleteOrder(owner: $owner) {
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
export const onCreateGift = /* GraphQL */ `
  subscription OnCreateGift {
    onCreateGift {
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
        id
        alt
        src
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onUpdateGift = /* GraphQL */ `
  subscription OnUpdateGift {
    onUpdateGift {
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
        id
        alt
        src
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onDeleteGift = /* GraphQL */ `
  subscription OnDeleteGift {
    onDeleteGift {
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
        id
        alt
        src
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      name
      description
      weight
      price
      pictures {
        id
        alt
        src
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      name
      description
      weight
      price
      pictures {
        id
        alt
        src
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      name
      description
      weight
      price
      pictures {
        id
        alt
        src
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onCreateGiftImage = /* GraphQL */ `
  subscription OnCreateGiftImage {
    onCreateGiftImage {
      id
      alt
      src
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateGiftImage = /* GraphQL */ `
  subscription OnUpdateGiftImage {
    onUpdateGiftImage {
      id
      alt
      src
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteGiftImage = /* GraphQL */ `
  subscription OnDeleteGiftImage {
    onDeleteGiftImage {
      id
      alt
      src
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
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
