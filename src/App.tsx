import './App.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import MainRouter from './MainRouter';

function App() {
  //const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   checkAuthenticated();
  // }, [authenticated]);

  // const checkAuthenticated = () => { // Test
  //   //setAuthenticated(CoreService.checkToken());
  // }
  const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>
      <MainRouter></MainRouter>
    // </QueryClientProvider>
    // <BrowserRouter>

    //   <Routes>
    //     <Route path="*" element={<Login />} />
    //     <Route path="/login" element={<Login />} />

    //     <Route path='/' element={<ProtectedRoute><NavBar /></ProtectedRoute>} >
    //       <Route path='/employee' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
    //       <Route path='/employeeserver' element={<ProtectedRoute><EmployeeServer /></ProtectedRoute>} />
    //       <Route path='/employeereactive' element={<ProtectedRoute><EmployeeReactive /></ProtectedRoute>} />
    //       <Route path='/Dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    //     </Route>



    //   </Routes>
    // </BrowserRouter>
  );

}

export default App;
