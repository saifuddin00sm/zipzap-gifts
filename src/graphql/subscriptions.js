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
export const onCreateProfileFavorite = /* GraphQL */ `
  subscription OnCreateProfileFavorite($owner: String) {
    onCreateProfileFavorite(owner: $owner) {
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
export const onUpdateProfileFavorite = /* GraphQL */ `
  subscription OnUpdateProfileFavorite($owner: String) {
    onUpdateProfileFavorite(owner: $owner) {
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
export const onDeleteProfileFavorite = /* GraphQL */ `
  subscription OnDeleteProfileFavorite($owner: String) {
    onDeleteProfileFavorite(owner: $owner) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String) {
    onCreateOrder(owner: $owner) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String) {
    onUpdateOrder(owner: $owner) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String) {
    onDeleteOrder(owner: $owner) {
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
export const onCreateGift = /* GraphQL */ `
  subscription OnCreateGift {
    onCreateGift {
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
export const onUpdateGift = /* GraphQL */ `
  subscription OnUpdateGift {
    onUpdateGift {
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
export const onDeleteGift = /* GraphQL */ `
  subscription OnDeleteGift {
    onDeleteGift {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
export const onCreateGiftImage = /* GraphQL */ `
  subscription OnCreateGiftImage {
    onCreateGiftImage {
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
export const onUpdateGiftImage = /* GraphQL */ `
  subscription OnUpdateGiftImage {
    onUpdateGiftImage {
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
export const onDeleteGiftImage = /* GraphQL */ `
  subscription OnDeleteGiftImage {
    onDeleteGiftImage {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
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
    }
  }
`;
export const onCreateGiftItems = /* GraphQL */ `
  subscription OnCreateGiftItems {
    onCreateGiftItems {
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
export const onUpdateGiftItems = /* GraphQL */ `
  subscription OnUpdateGiftItems {
    onUpdateGiftItems {
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
export const onDeleteGiftItems = /* GraphQL */ `
  subscription OnDeleteGiftItems {
    onDeleteGiftItems {
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
