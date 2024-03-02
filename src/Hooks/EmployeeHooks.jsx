
import { useQuery } from "react-query";
import APIService from "../Services/APIService";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useGetDataByKey } from "./CommonHooks";

export const fetchEmployeeList = async () => {
    var data = await APIService.get("GetEmployeeList()");
    return data;
}

export const useEmployeeQuery = () => {
    return useQuery("employee", fetchEmployeeList, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
}

export const saveEmployeeApi = async (formData) => {
    return await APIService.post("AddEditEmployee", formData);
}

export const deleteEmployeeApi = async (id) => {
    return await APIService.delete("DeleteEmployee(employeeId=" + id + ")");
}




