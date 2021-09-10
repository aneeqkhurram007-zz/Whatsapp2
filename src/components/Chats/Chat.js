import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, EmojiEmotions, Mic, MoreVert, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Chat.css'
import { db } from '../../Firebase/firebase';
import { useStateValue } from '../../StateProvider'
import { doc, onSnapshot, collection, addDoc, Timestamp, orderBy, query } from 'firebase/firestore'
const Chat = () => {
    const [{ user }] = useStateValue()
    const { roomID, userEmail } = useParams();
    const [name, setname] = useState('')
    const [message, setmessage] = useState('')
    const [messages, setmessages] = useState([])
    useEffect(() => {
        if (roomID) {
            onSnapshot(doc(db, `users/${user.email}/room`, roomID), (snapshot) => {
                setname(snapshot.data().name)
            })

            onSnapshot(query(collection(doc(db, `users/${user.email}/room`, roomID), "messages"), orderBy('timestamp', 'asc')), (snapshot) => {
                // setmessages(snapshot.data())
                setmessages(snapshot.docs.map(doc => doc.data()));
            })
        }
    }, [roomID])

    const sendMessage = (e) => {
        e.preventDefault();
        if (!message) {
            alert("Please enter your message")
        }
        addDoc(collection(doc(db, `users/${user.email}/room`, roomID), "messages"), {
            name: user.displayName,
            message,
            timestamp: Timestamp.now()
        })
        setmessage('')
    }
    // console.log(messages);
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>{name}</h3>
                    <p>
                        {new Date(messages[messages.length - 1]?.timestamp?.seconds * 1000).toLocaleTimeString()}
                    </p>
                </div>
                <div className="header__right">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {
                    messages.map((message) => (
                        <p className={`chat__message ${user.displayName === message.name && "chat__reciever"}`}>
                            <span className="chat__name">
                                {message.name}
                            </span>
                            {message.message}
                            <span className="chat__time">{new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}</span>
                        </p>

                    ))
                }

            </div>

            <div className="chat__footer">
                <EmojiEmotions />
                <AttachFile />
                <form onSubmit={sendMessage}>

                    <input type="text" placeholder="Type your message" onChange={(e) => { setmessage(e.target.value) }} value={message} />
                    <input type="submit" />
                </form>
                <Mic />
            </div>

        </div>
    )
}

export default Chat
