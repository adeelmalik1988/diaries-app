import React, { FC, useEffect } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../rootReducer'
import http from '../../services/api'
import { Entry } from '../../interfaces/entry.interface'
import { setEntries } from '../entry/entriesSlice'
import { setCurrentlyEditing, setCanEdit } from '../entry/editorSlice'
import dayjs from 'dayjs'
import { useAppDispatch } from '../../store'
import Editor from '../entry/Editor'


import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import { AccordionSummary, Box, Button } from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },


    }),
);



const DiaryEntriesListNew = () => {
    const { entries } = useSelector((state: RootState) => state)
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const { id } = useParams()

    useEffect(() => {
        if (id != null) {
            http
                .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
                .then(
                    ({ entries: _entries }) => {
                        if (_entries) {
                            const sortByLastUpdate = _entries.sort((a, b) => {
                                return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
                            }

                            )
                            dispatch(setEntries(sortByLastUpdate))

                        }

                    }
                )

        }
    }, [id, dispatch])

    return (
        <div>
            <div className='entries' >
                <header>

                    <Link to='/' >
                        <h3>← Go Back</h3>

                    </Link>

                </header>

                <Editor />

            </div>
            <div className={classes.root}>
                {entries.map((entry) => (<Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id={entry.id}
                    >
                        <Typography className={classes.heading}>{entry.title}</Typography>

                    </AccordionSummary>
                    <Box display='flex'>
                        <AccordionDetails >
                            <Box p={1}
                                flexGrow={2}
                            >
                                <Typography>{entry.content}</Typography>
                            </Box>
                            <Box p={1} >
                                <EditIcon

                                    fontSize="small"
                                    color="primary"
                                    onClick={
                                        () => {
                                            dispatch(setCurrentlyEditing(entry))
                                            dispatch(setCanEdit(true))
                                        }
                                    }
                                />
                            </Box>

                        </AccordionDetails>
                    </Box>
                </Accordion>))

                }



            </div>




        </div>
    )


}

export default DiaryEntriesListNew