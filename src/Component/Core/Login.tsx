import { useEffect } from 'react';

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from '@material-ui/core/Grid';

import { useDispatch } from 'react-redux';
import { CardContent, Card } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { useMutation } from 'react-query';
import { loginApi } from '../../Services/CoreService';
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from '../../Hooks/LoginHooks';


const Login = (props: any) => {

    const navigate = useNavigate();
    const loginMutation = useLoginMutation();

    useEffect(() => {
        localStorage.clear();
    }, [])

    const setInitialValue = () => {
        return {
            UserName: null,
            Password: null,
        }
    };

    // const { mutate: loginMutate, isLoading, isError, error } = useMutation(loginApi, {
    //     onSuccess: (resp: any) => {
    //         if (resp?.UserName) {
    //             localStorage.setItem('token', resp?.Token);
    //             //toast.success('Login done successfully');
    //             navigate('/employee')
    //         }
    //         else {
    //             //toast.error('Username or Password is not correct!');
    //         }
    //     },
    //     onError: (error) => {
    //         // toast.error(`something wrong`);
    //     }
    // })
    // const dispatch = useDispatch();

    const validationSchema = yup.object({
        UserName: yup.string().required("User Name is required"),
        Password: yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: setInitialValue(),
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
        },
        //onChange: () => { }
    });

    const handleBlur = (e: any) => {
        formik.setFieldTouched(e.target.name, true);
    }

    const handleLogin = () => {
        if (formik.isValid) {
            let formData = {
                UserName: formik.values?.UserName,
                Password: formik.values?.Password,
                Token: "",
            };
            //loginMutate(formData);
            loginMutation.mutate(formData);
        }
    }

    return (
        <>
            <div className='full-width flex second-back-color hgt-100 absolute'>
                <div className='width-33'></div>
                <div className='width-33 text-center login-mt'>
                    <Card>
                        <CardContent>
                            <form className='form' onSubmit={formik.handleSubmit} onBlur={handleBlur} autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField fullWidth variant="outlined" name="UserName" label="User Name" value={formik.values.UserName}
                                            onChange={formik.handleChange} error={formik.touched.UserName && Boolean(formik.errors.UserName)}
                                            helperText={formik.touched.UserName && formik.errors.UserName}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField type='password' variant="outlined" fullWidth name="Password" label="Password" value={formik.values.Password}
                                            onChange={formik.handleChange} error={formik.touched.Password && Boolean(formik.errors.Password)}
                                            helperText={formik.touched.Password && formik.errors.Password}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <Button type='submit' variant="contained" onClick={handleLogin}>
                                            <Save></Save>Login
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className='width-33'></div>

            </div>
        </>
    )

}
export default Login;