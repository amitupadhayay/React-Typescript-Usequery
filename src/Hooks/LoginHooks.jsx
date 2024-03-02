

//import { Snackbar } from '@material-ui/core';
import { useMutation, useQueryClient } from "react-query";
import useQuery from "use-query";
import APIService from "../Services/APIService";
import { useNavigate } from "react-router-dom"

const useAuthenticated = async () => {
    //const queryClient = useQueryClient();
    //return queryClient.getQueryData(["isAuthenticated"]);
    return await "aSASASASSASAS";
}

export const useLoginHooks = () => {
    useQuery(["isAuthenticated"], useAuthenticated, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

const callLoginApi = async (formData) => {
    return await APIService.post("CheckAuthentication", formData);
}

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(callLoginApi, {
        onSuccess: (response) => {
            queryClient.setQueryData(["isAuthenticated"], true);
            if (response?.UserName) {
                localStorage.setItem('token', response?.Token);
                navigate('/employee');
            }
            else {
            }
        },
        onError: () => {
            queryClient.setQueryData(["isAuthenticated"], false);
        }
    })
}

