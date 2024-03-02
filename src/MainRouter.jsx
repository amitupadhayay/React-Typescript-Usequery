
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './Component/Core/Login';
import ProtectedRoute from './CommonComponent/ProtectedRoute';
import NavBar from './CommonComponent/NavBar';
import EmployeeList from './Component/Employee/EmployeeList';
import EmployeeServer from './Component/Employee/EmployeeServer';
import { Dashboard } from './Component/Dashboard/Dashboard';
import EmployeeReactive from './Component/Employee/EmployeeReactive';
import CommonService from './Services/CoreService'

const MainRouter = () => {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        checkToken();
    }, [authenticated]);


    const checkToken = () => {
        let token = localStorage.getItem('token');
        setAuthenticated(token === null || token === undefined ? false : true);
    }

    return (
        <BrowserRouter>

            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/login" element={<Login />} />

                <Route path='/' element={<ProtectedRoute><NavBar /></ProtectedRoute>} >
                    <Route path='/employee' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
                    <Route path='/employeeserver' element={<ProtectedRoute><EmployeeServer /></ProtectedRoute>} />
                    <Route path='/employeereactive' element={<ProtectedRoute><EmployeeReactive /></ProtectedRoute>} />
                    <Route path='/Dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Route>



            </Routes>
        </BrowserRouter>
    )
}
export default MainRouter;