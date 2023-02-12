import APIService from "./APIService";


export const getEmployeeList = async () => {
    return await APIService.get("GetEmployeeList()");
}

export const getEmployeeDetails = async (employeeId: any) => {
    return await APIService.get(`GetEmployeeDetails(employeeId=${employeeId})`);
}

export const deleteEmployee = async (id: any) => {
    return await APIService.delete("DeleteEmployee(employeeId=" + id + ")");
}

export const saveEmployeeApi = async (formData: any) => {
    return await APIService.post("AddEditEmployee", formData);

}


