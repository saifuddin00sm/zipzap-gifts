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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      department {
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
      department {
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
      department {
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
        department {
          id
          name
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
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
        department {
          id
          name
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
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
        department {
          id
          name
          accessGroups
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createGift = /* GraphQL */ `
  mutation CreateGift(
    $input: CreateGiftInput!
    $condition: ModelGiftConditionInput
  ) {
    createGift(input: $input, condition: $condition) {
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
export const updateGift = /* GraphQL */ `
  mutation UpdateGift(
    $input: UpdateGiftInput!
    $condition: ModelGiftConditionInput
  ) {
    updateGift(input: $input, condition: $condition) {
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
export const deleteGift = /* GraphQL */ `
  mutation DeleteGift(
    $input: DeleteGiftInput!
    $condition: ModelGiftConditionInput
  ) {
    deleteGift(input: $input, condition: $condition) {
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
