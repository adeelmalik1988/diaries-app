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


const DiaryEntriesList: FC = () => {
    const { entries } = useSelector((state: RootState) => state)





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
        <div className='entries' >
            <header>

                <Link to='/' >
                    <h3>← Go Back</h3>

                </Link>

            </header>
            <ul>
                {entries.map((entry) => (
                    <li
                        key={entry.id}
                        onClick={() => {
                            dispatch(setCurrentlyEditing(entry))
                            dispatch(setCanEdit(true))
                        }}
                    >{entry.title}

                        <hr />

                    </li>

                ))}
            </ul>
            <Editor />
            <Outlet />


        </div>
    )


}

export default DiaryEntriesList