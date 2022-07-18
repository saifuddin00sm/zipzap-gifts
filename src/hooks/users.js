import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { updateUser } from "../graphql/mutations";
import { format, isDate } from "date-fns";

const editUser = async ({ shippingAddress, ...user }) => {
  if (!user.email) {
    user.email = null;
  }
  if (!user.phone) {
    user.phone = null;
  }
  if (!user.name) {
    new Error("Missing First and Last Name");
    return;
  }
  if (user.birthday) {
    const birthday = isDate(user.birthday)
      ? user.birthday
      : new Date(user.birthday);
    user.birthday = format(birthday, "yyyy-MM-dd");
  }
  if (user.startDate) {
    const startDate = isDate(user.startDate)
      ? user.startDate
      : new Date(ruser.startDate);
    user.startDate = format(startDate, "yyyy-MM-dd");
  }
  await API.graphql(graphqlOperation(updateUser, { input: user }));
  console.log("success");

  return {
    user,
    isLoading,
    isError,
    error,
    removeRecipient: removeMutation.mutateAsync,
    updateUser: mutation.mutateAsync,
  };
};

export { editUser };
