import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from "react-query";
import { getEmployeeList } from '../../Services/EmployeeService';
import CommonService from '../../Services/CommonService';


const EmployeeServer = (props: any) => {

    const [columns, setColumns] = useState<any[]>([]);
    const { isLoading, error, data: employeeList, refetch: fetchEmployeeList } = useQuery("employee", getEmployeeList);

    useEffect(() => {
        getColumns();
    }, []);

    const getColumns = () => {
        let cols = [];
        let allRows = CommonService.getEmployeeColumns();
        for (let r of allRows) {
            cols.push(r);
        }
        setColumns(cols);
    }

    return (
        <div>

            <div className='pt-36'>
                <DataTable
                    title=""
                    columns={columns}
                    data={employeeList}
                    pagination
                    highlightOnHover
                    progressPending={isLoading}
                    persistTableHead
                    selectableRows // add for checkbox selection
                    selectableRowsHighlight
                />
            </div>

        </div >
    );

}
export default EmployeeServer;