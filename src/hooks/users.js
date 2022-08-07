import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { updateUser } from "../graphql/mutations";
import { getUser } from "../graphql/queries";

const editUser = async ({ ...user }) => {
  if (!user.email) {
    user.email = null;
  }
  if (!user.phoneNumber) {
    user.phone = null;
  }
  if (!user.name) {
    new Error("Missing First and Last Name");
    return;
  }
  await API.graphql(graphqlOperation(updateUser, { input: user }));
  console.log("success");
};

const useUsers = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data: user, error } = useQuery("user", getUser);

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

export { useUsers, editUser };
