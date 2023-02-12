import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Routes, Link, Route } from 'react-router-dom';
import Login from './Component/Core/Login';
import ProtectedRoute from './CommonComponent/ProtectedRoute';
import NavBar from './CommonComponent/NavBar';
import EmployeeList from './Component/Employee/EmployeeList';
import EmployeeServer from './Component/Employee/EmployeeServer';
import { Dashboard } from './Component/Dashboard/Dashboard';
import EmployeeReactive from './Component/Employee/EmployeeReactive';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthenticated();
  }, [authenticated]);

  const checkAuthenticated = () => { 
    //setAuthenticated(CoreService.checkToken());
  }

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path='/' element={<ProtectedRoute><NavBar /></ProtectedRoute>} >
          <Route path='/employee' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
          <Route path='/employeeserver' element={<ProtectedRoute><EmployeeServer /></ProtectedRoute>} />
          <Route path='/employeereactive' element={<ProtectedRoute><EmployeeReactive /></ProtectedRoute>} />
          <Route path='/Dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );

}

export default App;
