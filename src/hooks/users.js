import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { updateUser } from "../graphql/mutations";
import { format, isDate } from "date-fns";
import { getUser } from "../graphql/queries";

const useUsers = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data: user, error } = useQuery("user", getUser);

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
        : new Date(user.startDate);
      user.startDate = format(startDate, "yyyy-MM-dd");
    }
    await API.graphql(graphqlOperation(updateUser, { input: user }));
    console.log("success");
  };

  const mutation = useMutation(editUser, {
    onSuccess: () => {
      // Invalidate and refresh all of the user queries
      queryClient.invalidateQueries("user");
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

export { useUsers };
