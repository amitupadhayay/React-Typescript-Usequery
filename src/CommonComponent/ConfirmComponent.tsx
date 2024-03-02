import Button from "@material-ui/core/Button";
import { CheckCircle } from '@material-ui/icons';
import { useQueryClient } from "react-query";
import { DialogModel } from "../Models/CommonModel";

function ConfirmComponent(props: any) {
    const queryClient = useQueryClient();
    const dialogModel = queryClient.getQueryData("DialogModel") as DialogModel;
    return (
        <div>
            <div className='full-width text-center pb-16'>
                <span>{dialogModel?.Title}</span>
            </div>

            <div className='full-width text-center'>
                <Button variant="contained" onClick={() => props.confirmDailogClose(true)}>
                    <CheckCircle className='pr-8'></CheckCircle> Yes
                </Button>
            </div>

        </div >


    )
}
export default ConfirmComponent;