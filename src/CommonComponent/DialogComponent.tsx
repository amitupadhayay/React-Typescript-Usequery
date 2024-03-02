import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Cancel } from '@material-ui/icons';
import { Slide } from "@material-ui/core";
import { useQueryClient } from 'react-query';
import { DialogModel } from '../Models/CommonModel';
import { useSetDataByKey } from '../Hooks/CommonHooks';

//TransitionComponent={Transition}
const Transition = (props: any, ref: any) => {
    return <Slide direction="left" ref={ref} {...props} />;
};

const DialogComponent = (props: any) => {

    //const [dialogData] = useState(props.data);
    const queryClient = useQueryClient();
    const dialogData = queryClient.getQueryData("DialogModel") as DialogModel;

    const HandleDialogClose = (val: any) => {
        props.handleDialogClose(val);
    }

    return (
        <Dialog open={true} aria-labelledby="form-dialog-title" >
            <div style={{
                width: dialogData?.Width,
                height: dialogData?.Height,
            }}>
                <DialogTitle className='dialog-title'>
                    <div className="flex full-width title-pad">
                        <div className='width-95 text-left pl-8'>{dialogData?.Title}</div>
                        <div className='width-5 text-right '>
                            <Cancel className='dialog-close-btn' onClick={() => HandleDialogClose(false)}></Cancel>
                        </div>
                    </div>
                </DialogTitle>
            </div>
            <div className='app-dialog-space'>
                {dialogData?.Component}
            </div>
        </Dialog >
    )
};

export default DialogComponent;