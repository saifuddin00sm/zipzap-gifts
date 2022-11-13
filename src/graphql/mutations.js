/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
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
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
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
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
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
export const createRecipient = /* GraphQL */ `
  mutation CreateRecipient(
    $input: CreateRecipientInput!
    $condition: ModelRecipientConditionInput
  ) {
    createRecipient(input: $input, condition: $condition) {
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
export const updateRecipient = /* GraphQL */ `
  mutation UpdateRecipient(
    $input: UpdateRecipientInput!
    $condition: ModelRecipientConditionInput
  ) {
    updateRecipient(input: $input, condition: $condition) {
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
export const deleteRecipient = /* GraphQL */ `
  mutation DeleteRecipient(
    $input: DeleteRecipientInput!
    $condition: ModelRecipientConditionInput
  ) {
    deleteRecipient(input: $input, condition: $condition) {
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
export const createDepartment = /* GraphQL */ `
  mutation CreateDepartment(
    $input: CreateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    createDepartment(input: $input, condition: $condition) {
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
export const updateDepartment = /* GraphQL */ `
  mutation UpdateDepartment(
    $input: UpdateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    updateDepartment(input: $input, condition: $condition) {
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
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment(
    $input: DeleteDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    deleteDepartment(input: $input, condition: $condition) {
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
export const createProfileFavorite = /* GraphQL */ `
  mutation CreateProfileFavorite(
    $input: CreateProfileFavoriteInput!
    $condition: ModelProfileFavoriteConditionInput
  ) {
    createProfileFavorite(input: $input, condition: $condition) {
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
export const updateProfileFavorite = /* GraphQL */ `
  mutation UpdateProfileFavorite(
    $input: UpdateProfileFavoriteInput!
    $condition: ModelProfileFavoriteConditionInput
  ) {
    updateProfileFavorite(input: $input, condition: $condition) {
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
export const deleteProfileFavorite = /* GraphQL */ `
  mutation DeleteProfileFavorite(
    $input: DeleteProfileFavoriteInput!
    $condition: ModelProfileFavoriteConditionInput
  ) {
    deleteProfileFavorite(input: $input, condition: $condition) {
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
export const createGiftEvent = /* GraphQL */ `
  mutation CreateGiftEvent(
    $input: CreateGiftEventInput!
    $condition: ModelGiftEventConditionInput
  ) {
    createGiftEvent(input: $input, condition: $condition) {
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
export const updateGiftEvent = /* GraphQL */ `
  mutation UpdateGiftEvent(
    $input: UpdateGiftEventInput!
    $condition: ModelGiftEventConditionInput
  ) {
    updateGiftEvent(input: $input, condition: $condition) {
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
export const deleteGiftEvent = /* GraphQL */ `
  mutation DeleteGiftEvent(
    $input: DeleteGiftEventInput!
    $condition: ModelGiftEventConditionInput
  ) {
    deleteGiftEvent(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createGift = /* GraphQL */ `
  mutation CreateGift(
    $input: CreateGiftInput!
    $condition: ModelGiftConditionInput
  ) {
    createGift(input: $input, condition: $condition) {
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
export const updateGift = /* GraphQL */ `
  mutation UpdateGift(
    $input: UpdateGiftInput!
    $condition: ModelGiftConditionInput
  ) {
    updateGift(input: $input, condition: $condition) {
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
export const deleteGift = /* GraphQL */ `
  mutation DeleteGift(
    $input: DeleteGiftInput!
    $condition: ModelGiftConditionInput
  ) {
    deleteGift(input: $input, condition: $condition) {
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
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
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
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
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
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
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
export const createGiftImage = /* GraphQL */ `
  mutation CreateGiftImage(
    $input: CreateGiftImageInput!
    $condition: ModelGiftImageConditionInput
  ) {
    createGiftImage(input: $input, condition: $condition) {
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
export const updateGiftImage = /* GraphQL */ `
  mutation UpdateGiftImage(
    $input: UpdateGiftImageInput!
    $condition: ModelGiftImageConditionInput
  ) {
    updateGiftImage(input: $input, condition: $condition) {
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
export const deleteGiftImage = /* GraphQL */ `
  mutation DeleteGiftImage(
    $input: DeleteGiftImageInput!
    $condition: ModelGiftImageConditionInput
  ) {
    deleteGiftImage(input: $input, condition: $condition) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createGiftItems = /* GraphQL */ `
  mutation CreateGiftItems(
    $input: CreateGiftItemsInput!
    $condition: ModelGiftItemsConditionInput
  ) {
    createGiftItems(input: $input, condition: $condition) {
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
export const updateGiftItems = /* GraphQL */ `
  mutation UpdateGiftItems(
    $input: UpdateGiftItemsInput!
    $condition: ModelGiftItemsConditionInput
  ) {
    updateGiftItems(input: $input, condition: $condition) {
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
export const deleteGiftItems = /* GraphQL */ `
  mutation DeleteGiftItems(
    $input: DeleteGiftItemsInput!
    $condition: ModelGiftItemsConditionInput
  ) {
    deleteGiftItems(input: $input, condition: $condition) {
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
