import React, { useEffect } from 'react';
import MainScreen from '../../components/MainScreen';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import './MyNotes.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, listNotes } from '../../store/notes-slice';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = ({ search }) => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const { loading, notes, error } = useSelector(state => state.getnoteslist)
    const { userInfo } = useSelector(state => state.login)
    const noteCreate = useSelector((state) => state.createnote);
    const { success: successNote } = noteCreate;
    const { success: updateSuccess } = useSelector(state => state.noteupdate)
    const { success: deleteSuccess } = useSelector(state => state.notedelete)

    useEffect(() => {
        if (!userInfo) {
            navigation('/')
        }
        dispatch(listNotes())
    }, [dispatch, navigation, userInfo, successNote, updateSuccess, deleteSuccess])

    const deleteHandler = (id) => {
        dispatch(deleteNote(id))
    }
    const editHandler = (id) => {
        navigation(`/note/${id}`)
    }
    return (
        <MainScreen title={`Welcome back ${userInfo?.name}..`}>
            <Link to='/createnote'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
                    Create New Note
                </Button>
            </Link>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading />}
            {
                notes?.slice().reverse()
                    .filter((filteredNote) => {
                        if (!search) {
                            return true
                        } else {
                            return filteredNote.title.toLowerCase().includes(search.toLowerCase())
                        }
                    })
                    .map((note) => (
                        <Accordion key={note._id}>
                            <Accordion.Item eventKey={note._id}>
                                <Card style={{ margin: 10 }}>
                                    <Card.Header style={{ display: "flex" }}>
                                        <span style={{
                                            color: "black",
                                            textDecoration: "none",
                                            flex: 1,
                                            cursor: "pointer",
                                            alignSelf: "center",
                                            fontSize: 18,
                                        }}>
                                            <Accordion.Header>
                                                {note.title}
                                            </Accordion.Header>
                                        </span>
                                        <div>
                                            <Button onClick={() => editHandler(note._id)}>Edit</Button>
                                            <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>Delete</Button>
                                        </div>
                                    </Card.Header>
                                    <Accordion.Body>
                                        <Card.Body>
                                            <h4>
                                                <Badge pill bg="success">Category - {note.category}</Badge>
                                            </h4>
                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                    {note.content}
                                                </p>
                                                <footer className="blockquote-footer">
                                                    Created on{" "}
                                                    <cite title="Source Title">
                                                        {note.createdAt.substring(0, 10)}
                                                    </cite>
                                                </footer>
                                            </blockquote>
                                        </Card.Body>
                                    </Accordion.Body>
                                </Card>
                            </Accordion.Item>
                        </Accordion>
                    ))
            }

        </MainScreen>

    )
}

export default MyNotes;