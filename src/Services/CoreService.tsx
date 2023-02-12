import APIService from "./APIService";
import { Snackbar } from '@material-ui/core';

export const loginApi = async (formData: any) => {
    return await APIService.post("CheckAuthentication", formData);
}