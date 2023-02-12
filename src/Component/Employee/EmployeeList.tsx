import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { EditRounded, DeleteForever, People } from '@material-ui/icons';

import { useMutation, useQuery } from "react-query";

import { deleteEmployee, getEmployeeList } from '../../Services/EmployeeService';
import CommonService from '../../Services/CommonService';
import EmployeeForm from './EmployeeForm';
import DialogComponent from '../../CommonComponent/DialogComponent';
import { useNavigate } from 'react-router-dom';
import ConfirmComponent from '../../CommonComponent/ConfirmComponent';


const EmployeeList = (props: any) => {

    const [columns, setColumns] = useState<any[]>([]);
    const [openEmployeePopup, setOpenEmployeePopup] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [dialogData, setDialogData] = useState({});

    const navigate = useNavigate();
    const { isLoading, error, data: employeeList, refetch: fetchEmployeeList } = useQuery("employee", getEmployeeList);

    const { mutate: deleteEmployeeMutate, isLoading: deleteLoading, error: errorDelete } = useMutation(deleteEmployee, {
        onSuccess: () => {
            setConfirmPopup(false);
            fetchEmployeeList();
        },
        onError: (error) => {
            //toast.error(`something wrong`);
        }
    })

    useEffect(() => {
        getColumns();
    }, []);

    const getColumns = () => {
        let cols = [];
        cols.push({
            name: 'Action', sortable: false, className: 'action-width',
            cell: (row: any, index: any) => <div>
                <EditRounded className='main-color' onClick={() => handleEdit(row)}></EditRounded>
                <DeleteForever className='main-color' onClick={() => handleDelete(row)}></DeleteForever>
            </div>
        });
        let allRows = CommonService.getEmployeeColumns();
        for (let r of allRows) {
            cols.push(r);
        }
        setColumns(cols);
    }

    const handleDelete = (row: any) => {
        let message = 'Are you sure?';
        setDialogData({
            // width: '30vh',
            // height: '10vh',
            title: 'confirmation',
            component: <ConfirmComponent id={row?.Id} message={message} confirmDailogClose={confirmDailogClose}></ConfirmComponent>
        });
        setConfirmPopup(true);
    }

    const confirmDailogClose = (id: any, resp: any) => {
        if (resp) {
            deleteEmployeeMutate(id);
        }
        else {
            setConfirmPopup(false);
        }
    }

    const handleRowSelection = (state: any) => {
        console.log('Selected Rows: ', state.selectedRows);
    }

    const handleRowClicked = (row: any) => {
        //navigate(`/employee/${row.Id}`);
        //navigate(`/employee/${row.id}`);
    };

    const handleEdit = (row: any) => {
        attachDialogData(row);
    }

    const attachDialogData = (row: any) => {
        setDialogData({
            row: row,
            title: row?.Id == null ? 'Add Employee' : "Edit Employee",
            component: <EmployeeForm data={row} handleDialogClose={handleDialogClose}></EmployeeForm>
        });
        setOpenEmployeePopup(true);
    }

    const handleDialogClose = (resp: any) => {
        setOpenEmployeePopup(resp);
        setConfirmPopup(resp);
        fetchEmployeeList();
    };

    const goToEmployeeServer = () => {
        navigate('/employeeserver');
    }

    return (
        <div>

            <div className='sub-header pl-16'>
                <span onClick={() => attachDialogData(null)}><People></People>  Add Employee</span>
            </div>

            <div className='pt-36'>
                <DataTable
                    title=""
                    columns={columns}
                    data={employeeList}
                    pagination
                    highlightOnHover
                    progressPending={isLoading}
                    //progressComponent={<CommonLoaderIcon size={40} text='Loading... Please Wait' />}
                    persistTableHead
                    selectableRows // add for checkbox selection
                    selectableRowsHighlight
                    onSelectedRowsChange={handleRowSelection}
                    onRowClicked={handleRowClicked}
                />
            </div>

            <div>
                <span onClick={() => goToEmployeeServer()}><People></People> Employee Server</span>
            </div>

            {openEmployeePopup ? (
                <DialogComponent data={dialogData} handleDialogClose={handleDialogClose}>
                </DialogComponent>
            ) : null}

            {confirmPopup ? (
                <DialogComponent data={dialogData} handleDialogClose={handleDialogClose}>
                </DialogComponent>
            ) : null}

        </div >
    );

}
export default EmployeeList;