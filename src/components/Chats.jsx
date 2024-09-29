import React from "react";
import List from '@mui/material/List';
import { Chat } from "./index";

const Chats = (props) => {

    return (
        <List sx={{ height: "400px", padding: "0", overflow: "auto" }} id="scroll-area">
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index.toString} />
            })}
        </List>
    )
}

export default Chats;
