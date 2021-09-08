import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { MoreVert, Chat, DonutLarge, Search } from '@material-ui/icons'
import './Sidebar.css'
import { db, auth } from '../../Firebase/firebase'
import { collection, onSnapshot } from '@firebase/firestore'
import SidebarChat from '../SidebarChat/SidebarChat'
import { useStateValue } from '../../StateProvider'
import { signOut } from '@firebase/auth'
const Sidebar = () => {

    const [{ user }] = useStateValue();
    const [rooms, setrooms] = useState([])
    useEffect(() => {
        onSnapshot(collection(db, "room"), (snapshot) => {
            setrooms(snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            }))
        })
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar className="avatar" src={user.photoURL} onClick={() => signOut(auth)} />

                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>

                    <IconButton>
                        <Chat />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>


            </div>
            <div className="sidebar__search">

                <div className="sidebar__searchContainer">
                    <Search />
                    <input type="text" placeholder="Search or Start a new Chat" />
                </div>

            </div>
            <div className="sidebar__Chats">
                <SidebarChat addNewChat />
                {
                    rooms.map((room) => {
                        return <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    })
                }

            </div>
        </div>
    )
}

export default Sidebar
