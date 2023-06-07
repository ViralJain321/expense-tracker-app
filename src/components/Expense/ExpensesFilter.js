import React from 'react';

import classes from './ExpensesFilter.module.css';

const ExpensesFilter = (props) => {

  const dropDownChangeHandler = (event) =>{
    props.onFilterExpenseData(event.target.value);
  }

  return (
    <div className={classes['expenses-filter']}>
      <div className={classes['expenses-filter__control']}>
        <label>Filter by year</label>
        <select value={props.selectedYear} onChange={dropDownChangeHandler}>
        <option value='All Expenses'>All Expenses</option>
         {props.expenseDateYear.map((expenseDateYear) => {
            return <option key={expenseDateYear} value={expenseDateYear}>{expenseDateYear}</option>
         })}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;