import dummyJson from "../components/GiftCatalog/dummyJson.json";
import { useQuery } from "react-query";

const getAllGifts = () => {
  const data = dummyJson;
  return data.data;
};

const useGifts = () => {
  const { isLoading, isError, data } = useQuery("allGifts", getAllGifts);

  return {
    isLoading,
    isError,
    data,
  };
};

export default useGifts;
