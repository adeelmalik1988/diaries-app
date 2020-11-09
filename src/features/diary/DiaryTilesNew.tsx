import React, { FC, useState } from 'react'
import { Diary } from '../../interfaces/diary.interface'
import http from '../../services/api'
import { updateDiary } from './diariesSlice'
import { setCanEdit, setActiveDiaryId, setCurrentlyEditing } from '../entry/editorSlice'
import { showAlert } from '../../util'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface Props {
    diary: Diary
}

const buttonStyle: React.CSSProperties = {
    fontSize: '0.7em',
    margin: '0 0.5em'
};

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        padding: 'inherit',
        maxWidth: '500px',
        width: '500px'
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        width: '100%',
        fontSize: '0.7em',
    }

});


const DiaryTile: FC<Props> = (props) => {
    const classes = useStyles();


    const [diary, setDiary] = useState(props.diary);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch()
    const totalEntries = props.diary?.entryIds?.length;

    const saveChanges = () => {
        http
            .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
            .then((diary) => {
                if (diary) {
                    dispatch(updateDiary(diary))
                    showAlert('Saved', 'success')
                }
            })
            .finally(() => {
                setIsEditing(false)
            })
    }




    return (
        <div className='diary-tile' >
            <Card className={classes.root} >
                <Typography  
                variant="caption"
                >
                    {diary.type.toUpperCase()}
                </Typography>
                <Typography
                    variant='h5'
                    gutterBottom
                    title='Click to Edit'
                    onClick={() => setIsEditing(true)}
                >{isEditing ? (
                    <input
                        value={diary.title}
                        onChange={(e) => {
                            setDiary({
                                ...diary,
                                title: e.target.value,
                            })

                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                saveChanges()

                            }

                        }}

                    />
                ) : (
                        <span>{diary.title}</span>
                    )}
                </Typography >
                <p className='subtitle' > {totalEntries ?? '0'} saved entries</p>
                <div style={{
                    display: 'flex'
                }}>
                    <Button
                        className={classes.button}
                        color='primary'
                        variant="contained"
                        onClick={() => {
                            dispatch(setCanEdit(true))
                            dispatch(setActiveDiaryId(diary.id as string))
                            dispatch(setCurrentlyEditing(null))
                        }}
                    >Add New Entry</Button>
                    <Link
                        to={`diary/${diary.id}`} style={{ width: '100%' }}>
                        <Button
                            className={classes.button}
                            color='primary'
                            variant="contained"
                            style={buttonStyle}>
                            View all →
                    </Button>
                    </Link>

                </div>

            </Card>
        </div>
    )

}

export default DiaryTile