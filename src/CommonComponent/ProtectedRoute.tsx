import { Navigate, useLocation } from "react-router-dom";
import CommonService from "../Services/CommonService";

const ProtectedRoute = ({ children }: any) => {
    let authenticated = CommonService.checkToken();
    let location = useLocation();

    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
};

export default ProtectedRoute;