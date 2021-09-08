import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { db } from '../../Firebase/firebase'
import { collection, addDoc, doc, onSnapshot, query, orderBy } from '@firebase/firestore'
import { useHistory } from 'react-router-dom'
const SidebarChat = ({ addNewChat, id, name }) => {

    const [seed, setSeed] = useState(" ")
    const [lastMessage, setLastMessage] = useState('')
    const photoURL = `https://avatars.dicebear.com/api/avataaars/${seed}.svg`
    useEffect(() => {


        if (id) {
            onSnapshot(query(collection(doc(db, "room", id), "messages"), orderBy('timestamp', 'desc')), snapshot => setLastMessage(
                snapshot.docs.map(doc => doc.data())))
        }

        setSeed(Math.floor(Math.random() * 5000))

    }, [])
    const createChat = () => {
        const room = prompt("Please enter room name")
        if (room) {
            addDoc(collection(db, "room"), {
                name: room
            })
        }
    }
    const history = useHistory()
    return (
        !addNewChat ? (

            <div className="siderbar__chat" onClick={() => history.push('/room/' + id)}>
                <Avatar src={photoURL} />
                <div className="sidebar__chatInfo">
                    <h2>{name}</h2>
                    <p>{lastMessage[0]?.message}</p>
                </div>

            </div>

        ) : (

            <div className="siderbar__chat">
                <h2 onClick={createChat}>Add New Chat</h2>
            </div>
        )

    )
}

export default SidebarChat
