import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useAppDispatch} from '../../store'
import { setAuthState } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();

    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(
        (state: RootState) => state.auth.isAuthenticated
      )

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Diary App
          </Typography>{
              isLoggedIn ?

                    <Button onClick={()=> dispatch(setAuthState(false))} color="inherit">Logout</Button>: ''
          }
                </Toolbar>
            </AppBar>
        </div>
    );
}
