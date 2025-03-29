import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";



const SignOutButton = () => {

  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation<{message: string}, Error>(apiClient.signOut, {
    onMutate: () => {
      showToast({message: "Please wait", type: "LOADING"});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="btn"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;