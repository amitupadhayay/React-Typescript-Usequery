class CommonService {
    getEmployeeColumns = () => {
        let columnList = [
            { name: 'First Name', selector: 'FirstName', sortable: true, width: '150px', },
            { name: 'Last Name', selector: 'LastName', sortable: true, width: '150px', },
            { name: 'Age', selector: 'Age', sortable: true, width: '100px', },
            { name: 'Salary', selector: 'Salary', sortable: true, width: '150px', },
            { name: 'Employee Type', selector: 'EmployeeTypeText', sortable: true, width: '150px', },
            { name: 'Address1', selector: 'Address1', sortable: true, width: '200px', },
            { name: 'Address2', selector: 'Address2', sortable: true, width: '200px', },
        ];
        return columnList;
    }

    checkToken() {
        let token = localStorage.getItem('token');
        return token === null || token === undefined ? false : true;
    }

}
export default new CommonService();