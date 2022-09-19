import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  updateUser,
  createAddress,
  updateAddress,
  createCompany,
  updateCompany,
} from "../graphql/mutations";
import { getUser } from "../graphql/queries";

const saveAddress = async (address) => {
  const { data } = await API.graphql(
    graphqlOperation(address.id ? updateAddress : createAddress, {
      input: address,
    })
  );

  const id = data?.[`${address.id ? "updateAddress" : "createAddress"}`]?.id;

  return id;
};

const saveCompany = async (company) => {
  const { data } = await API.graphql(
    graphqlOperation(company.id ? updateCompany : createCompany, {
      input: company,
    })
  );

  const id = data?.[`${company.id ? "updateCompany" : "createCompany"}`]?.id;

  return id;
};

const editUser = async ({
  id,
  name,
  email,
  phoneNumber,
  companyID,
  companyName,
  addressID,
  address1,
  address2,
  city,
  state,
  zip,
}) => {
  if (!name) {
    throw new Error("Missing User Name");
  }

  const address = {
    id: addressID,
    address1,
    address2,
    city,
    state,
    zip,
  };
  if (!addressID) {
    delete address.id;
  }
  const addressId = await saveAddress(address);
  const company = {
    id: companyID,
    name: companyName,
    companyAddressId: addressId,
  };
  if (!companyID) {
    delete company.id;
  }
  const companyId = await saveCompany(company);

  const user = { id, name, email, phoneNumber, companyUsersId: companyId };
  // We have to null out the email and phone if they're empty because they're special AWS types in GraphQL
  if (!email) {
    user.email = null;
  }
  if (!phoneNumber) {
    user.phoneNumber = null;
  }

  const response = await API.graphql(
    graphqlOperation(updateUser, {
      input: user,
    })
  );
  return response;
};

const useUsers = (userID) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: { data: { getUser: user = {} } = {} } = {},
  } = useQuery(
    ["users", userID],
    () => API.graphql(graphqlOperation(getUser, { id: userID })),
    { enabled: !!userID }
  );

  const mutation = useMutation(editUser, {
    onSuccess: () => {
      // Invalidate and refresh all of the user queries
      queryClient.invalidateQueries("users");
    },
  });

  return {
    user,
    isLoading,
    isError,
    error,
    editUser: mutation.mutateAsync,
  };
};

export { useUsers, editUser };
