import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../Style/NavBar.css';

import { People, PeopleAlt, PeopleAltOutlined, PeopleAltRounded, BarChart, Link } from '@material-ui/icons';
import CommonService from '../Services/CommonService';
import { MenuModel } from '../Models/CommonModel';

const NavBar = (props: any) => {

    const [sidebar, setSidebar] = useState(true);
    const [appList, setAppList] = useState<MenuModel[]>([]);
    const [pageName, setPageName] = useState("");
    const [currentUrl, setCurrentUrl] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAappMenuList();
    }, []);

    const getAappMenuList = () => {
        let menuList = [] as MenuModel[];
        menuList.push({ AppCode: "Dashboard", AppName: "Dashboard", url: "/dashboard", icon: <People></People> });
        menuList.push({ AppCode: "Employee", AppName: "Employee", url: "/employee", icon: <PeopleAlt></PeopleAlt> });
        menuList.push({ AppCode: "EmployeeServer", AppName: "Employee Server", url: "/employeeserver", icon: <PeopleAltOutlined></PeopleAltOutlined> });
        menuList.push({ AppCode: "EmployeeReactive", AppName: "Employee Reactive", url: "/employeereactive", icon: <PeopleAltRounded></PeopleAltRounded> });
        setAppList(menuList);
    }

    const showSidebar = () => {
        setSidebar(sidebar ? false : true);
    }

    const getPageName = (navUrl: any) => {
        let split = navUrl.split('/');
        let text = split.length > 0 ? '/' + split[1] : '';
        setCurrentUrl(text);
        let result = appList.find(x => x.url == text);
        setPageName(result != undefined ? result.AppName : '');;
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const RedirectToPage = (url: string) => {
        navigate(url);
    }

    return (
        <div>
            <div className="navbar full-width">
                <div className='width-50'>
                    <Link to="#" className="menu-bars">
                        <BarChart onClick={showSidebar}></BarChart>
                        <span className='white-color pl-8'>REACT-DEMO</span>
                    </Link>
                </div>
                <div className='width-25'>
                    <span className='white-color toolbar-spacer text-center'>{pageName}</span>
                </div>
                <div className='width-25 text-right pr-16'>
                    <People onClick={handleLogout}></People>
                </div>

            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle white-color pl-8 pointer' onClick={showSidebar}>
                        App
                    </li>

                    {appList.map((item, index) => (
                        <li key={index} className={currentUrl === item.url ? 'nav-text nav-active' : 'nav-text'}
                            onClick={() => RedirectToPage(item.url)}>
                            {item.icon}
                            <span className='white-color pl-8 pointer'> {item.AppName} </span>
                        </li>
                    ))}

                </ul>

            </nav>

            <main className={sidebar ? 'main-page ml-200' : 'main-page'}>
                <Outlet></Outlet>
            </main>

            <footer>
                ©2023 Revision Legal. All Rights Reserved.
            </footer>

        </div>

    )
}

export default NavBar;

