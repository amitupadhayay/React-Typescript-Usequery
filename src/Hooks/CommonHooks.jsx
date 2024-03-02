import { useQueryClient, useQuery } from "react-query";

export const useGetDataByKey = (key) => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(key);
};

export const useSetDataByKey = (key, value) => {
    const queryClient = useQueryClient();
    return queryClient.setQueryData(key, value);
};