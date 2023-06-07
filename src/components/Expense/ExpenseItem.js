
import ExpenseDate from "./ExpenseDate";
import Card from '../UI/Card'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import classes from "./ExpenseItem.module.css"
import { Link, useSubmit } from "react-router-dom";
import { Button , styled } from "@mui/material";





function ExpenseItem(props) {

    const expenseItem = props.expenseItem;

    const CustomButton = styled(Button)({
        backgroundColor: '#2a2a2a',
        color: 'white',
        padding: '8px -10px',
        minWidth: '50px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'black',
        },
    });

    const submit = useSubmit();

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure you want to delete this expense item?');

        if (proceed) {
            let formData = new FormData();
            formData.append('id', expenseItem.id);
            submit(formData, { method: 'delete' });

        }
    }




    return (<li>
        <Card className={classes['expense-item']}>

            <ExpenseDate date={expenseItem.date} />

            <div className={classes['expense-item__description_left']}>
                <h2>{expenseItem.location}</h2>
                <p>{expenseItem.item}</p>
            </div>
            <div className={classes['expense-item__description_right']}>
                <div className={classes['expense-item__price']}>₹{(+expenseItem.amount).toFixed(2)}</div>
                <p className={classes.actions}>
                    <Link to={`${expenseItem.id}/edit`}>
                        <CustomButton> <EditIcon /></CustomButton>
                    </Link>
                    <CustomButton onClick={startDeleteHandler}> <DeleteIcon /></CustomButton>
                </p>
            </div>
        </Card>
    </li>)

}

export default ExpenseItem;