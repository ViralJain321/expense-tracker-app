import classes from './MainNavigation.module.css';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

const MainNavigation = () => {
    const currentUser = useRouteLoaderData('root');

    return (
        <nav className={classes.navbar}>
            <span className={classes.logo}>Expense Tracker</span>
            <ul className={currentUser ? classes.navbarMenuAuth : classes.navbarMenu}>

                <li className={classes.navbarItem} >
                    <NavLink
                        className={classes.navbarLink}
                    >
                        Home
                    </NavLink>
                </li>

                {currentUser && < li className={classes.navbarItem} >
                    <NavLink
                        className={classes.navbarLink}
                        to="/new"
                    >
                        Add Expense
                    </NavLink>
                </li>}

                {currentUser && <li className={classes.navbarItem} >
                    <NavLink className={classes.navbarLink}
                        to="/expenses"
                    >
                        Expenses
                    </NavLink>
                </li>}
            </ul>

            <ul className={currentUser ? classes.navbarMenuAuth : classes.navbarMenu}>
                {currentUser && <span>{currentUser.email}</span>}

                {currentUser && <li className={classes.navbarItem}>
                    <Form action="/logout" method="post">
                        <button>Logout</button>
                    </Form>
                </li>}

                {!currentUser && <li className={classes.navbarItem}>
                    <NavLink className={classes.navbarLink}
                        to="/auth?mode=login"
                    >
                        Authentication
                    </NavLink>
                </li>}

            </ul>
        </nav>
    );
};

export default MainNavigation;
