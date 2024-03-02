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
import { deleteEmployeeApi, useEmployeeQuery } from '../../Hooks/EmployeeHooks';
import { useQueryClient } from 'react-query';
import { DialogModel } from '../../Models/CommonModel';
import { useGetDataByKey, useSetDataByKey } from '../../Hooks/CommonHooks';


const EmployeeList = (props: any) => {

    const [columns, setColumns] = useState<any[]>([]);
    //const [openEmployeePopup, setOpenEmployeePopup] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [employeePopupState, setEmployeePopupState] = useState(false);
    const [dialogModel] = useState<DialogModel>(new DialogModel);

    const navigate = useNavigate();
    const { isLoading, isError, data: employeeList } = useEmployeeQuery();
    const queryClient = useQueryClient();


    const { mutate: deleteEmployeeMutation, isLoading: deleteLoading, error: errorDelete } = useMutation(deleteEmployeeApi, {
        onSuccess: () => {
            setConfirmPopup(false);
            queryClient.invalidateQueries("employee");
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
        //let message = 'Are you sure?';
        // setDialogData({
        //     // width: '30vh',
        //     // height: '10vh',
        //     title: 'confirmation',
        //     component: <ConfirmComponent id={row?.Id} message={message} confirmDailogClose={confirmDailogClose}></ConfirmComponent>
        // });
        queryClient.setQueryData("EmployeeForm", row);
        dialogModel.Title = 'Are you sure?';
        dialogModel.Component = <ConfirmComponent confirmDailogClose={confirmDailogClose}></ConfirmComponent>;
        queryClient.setQueryData("DialogModel", dialogModel);

        setConfirmPopup(true);
    }

    const confirmDailogClose = (state: boolean) => {
        debugger;
        let employeeForm = queryClient.getQueryData("EmployeeForm") as any;
        if (state) {
            deleteEmployeeMutation(employeeForm?.Id);
        }
        else {
            setConfirmPopup(false);
        }
    }

    // const handleRowSelection = (state: any) => {
    //     console.log('Selected Rows: ', state.selectedRows);
    // }

    // const handleRowClicked = (row: any) => {
    //     //navigate(`/employee/${row.Id}`);
    //     //navigate(`/employee/${row.id}`);
    // };

    const handleEdit = (row: any) => {
        OpenEmployeePopup(row);
    }

    const OpenEmployeePopup = (row: any) => {       
        dialogModel.Title = row?.Id == null ? 'Add Employee' : "Edit Employee";
        dialogModel.Component = <EmployeeForm handleDialogClose={handleDialogClose}></EmployeeForm>;
        queryClient.setQueryData("EmployeeForm", row);
        queryClient.setQueryData("DialogModel", dialogModel);
        setEmployeePopupState(true);
    }

    const handleDialogClose = (resp: any) => {
        setEmployeePopupState(false);
        queryClient.invalidateQueries("employee");
    };

    const goToEmployeeServer = () => {
        navigate('/employeeserver');
    }

    return (
        <div>

            <div className='sub-header pl-16'>
                <span onClick={() => OpenEmployeePopup(null)}><People></People>  Add Employee</span>
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
                //onSelectedRowsChange={handleRowSelection}
                //onRowClicked={handleRowClicked}
                />
            </div>

            <div>
                <span onClick={() => goToEmployeeServer()}><People></People> Employee Server</span>
            </div>

            {/* {openEmployeePopup ? (
                <DialogComponent data={dialogData} handleDialogClose={handleDialogClose}>
                    <EmployeeForm></EmployeeForm>
                </DialogComponent>
            ) : null}

            {confirmPopup ? (
                <DialogComponent data={dialogData} handleDialogClose={handleDialogClose}>
                </DialogComponent>
            ) : null} */}

            {employeePopupState ? (
                <>
                    <DialogComponent handleDialogClose={handleDialogClose}>
                    </DialogComponent>
                </>
            ) : null}

            {confirmPopup ? (
                <DialogComponent>
                </DialogComponent>
            ) : null}

        </div >
    );

}
export default EmployeeList;