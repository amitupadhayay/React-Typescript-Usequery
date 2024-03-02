import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, MenuItem } from "@material-ui/core";
import { Save } from '@material-ui/icons';

import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { GlobalVariable } from '../../Constant/GlobalVariable';
import TextboxComponent from '../../Controls/TextboxComponent';
import NumberComponent from '../../Controls/NumberComponent';
import { saveEmployeeApi } from '../../Hooks/EmployeeHooks';
import { useQueryClient } from 'react-query';

const EmployeeForm = (props: any) => {

    //const [row] = useState<any>(props?.data);
    const queryClient = useQueryClient();
    const row = queryClient.getQueryData("EmployeeForm") as any;
    const dispatch = useDispatch();
    const [employeeTypeList, setEmployeeTypeList] = useState<any[]>([]);


    const { mutate: saveEmployeeMutation, isLoading, isError, error } = useMutation(saveEmployeeApi, {
        onSuccess: () => {
            props.handleDialogClose(false);
        },
        onError: (error) => {
            props.handleDialogClose(false);
        }
    })

    useEffect(() => {
        getEmployeeTypeList();
    }, []);

    const getEmployeeTypeList = () => {
        let list = [];
        list.push({ Text: "Permanent", Value: 0 });
        list.push({ Text: "Temporary", Value: 1 });
        list.push({ Text: "Contract", Value: 2 });
        list.push({ Text: "Payroll", Value: 3 });
        list.push({ Text: "Third Party", Value: 4 });
        setEmployeeTypeList(list);
    }

    const setInitialValue = () => {
        return {
            firstname: row ? row.FirstName : "",
            lastname: row ? row.LastName : "",
            salary: row ? row.Salary : "",
            address1: row ? row.Address1 : "",
            address2: row ? row.Address2 : "",
            employeetype: row ? row.EmployeeType : "",
            email: row ? row.Email : "",
        }
    };

    const validationSchema = yup.object({
        firstname: yup.string().required("First Name is required"),
        lastname: yup.string().required("Last Name is required"),
        //salary: yup.number().integer().required("Salary is required"),
        salary: yup.string().required('Salary is required')
            .matches(GlobalVariable.DecimalOnly, GlobalVariable.DecimalOnlyMsg),
        address1: yup.string().required("Address1 is required"),
        address2: yup.string().required("Address2 is required"),
        employeetype: yup.string().nullable().required("Employee Type is required"),
    });

    const formik = useFormik({
        initialValues: setInitialValue(),
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
        },
    });

    const handleBlur = (e: any) => {
        formik.setFieldTouched(e.target.name, true);
    }

    const saveEmployee = () => {
        if (formik.isValid) {
            let formData = {
                Id: row == null ? null : row?.Id,
                FirstName: formik.values.firstname,
                LastName: formik.values.lastname,
                Salary: parseFloat(formik.values.salary),
                Address1: formik.values.address1,
                Address2: formik.values.address2,
                EmployeeTypeId: formik.values.employeetype,
                EmployeeTypeText: employeeTypeList?.find(x => x.Value == formik.values?.employeetype)?.Text,
                Email: formik.values.email,
            };

            //saveEmployeeMutate(formData);
            saveEmployeeMutation(formData);
        }
    }


    return (
        <div>
            <form className='form' onSubmit={formik.handleSubmit} onBlur={handleBlur} autoComplete="off">

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextboxComponent name="firstname" label="First Name" value={formik.values.firstname}
                            formik={formik}></TextboxComponent>
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxComponent name="lastname" label="Last Name" value={formik.values.lastname}
                            formik={formik}></TextboxComponent>
                    </Grid>
                    <Grid item xs={6}>
                        <NumberComponent name="salary" label="Salary" value={formik.values.salary}
                            formik={formik}></NumberComponent>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth select variant="outlined" name="employeetype" label="Employee Type" value={formik.values.employeetype}
                            onChange={formik.handleChange} error={formik.touched.employeetype && Boolean(formik.errors.employeetype)}
                            helperText={formik?.touched?.employeetype && Boolean(formik?.errors?.employeetype)}>
                            {employeeTypeList.map((option) => (
                                <MenuItem key={option.Value} value={option.Value}>
                                    {option.Text}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth multiline minRows={2} maxRows={4} variant="outlined"
                            name="address1" label="Address 1" value={formik.values.address1}
                            onChange={formik.handleChange} error={formik.touched.address1 && Boolean(formik.errors.address1)}
                            helperText={formik.touched?.address1 && Boolean(formik.errors?.address1)}
                        ></TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth multiline minRows={2} maxRows={4} variant="outlined"
                            name="address2" label="Address 2" value={formik.values.address2}
                            onChange={formik.handleChange} error={formik.touched.address2 && Boolean(formik.errors.address2)}
                            helperText={formik.touched.address2 && Boolean(formik.errors.address2)}
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                    <TextboxComponent name="email" label="Email" value={formik.values.email}
                            formik={formik}></TextboxComponent>
                    </Grid>

                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" type="submit" onClick={saveEmployee}>
                            <Save className='btn-icon'></Save> Save Employee
                        </Button>

                    </Grid>


                </Grid>

            </form>


        </div >
    )
}

export default EmployeeForm;