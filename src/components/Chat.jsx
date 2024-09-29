import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Cat from "../assets/img/cat_icon.jpg";
import Squirrel from "../assets/img/squirrel_icon.jpg";

const Chat = (props) => {
    const isQuestion = (props.type === "question");
    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

    return (
        <ListItem className={classes}>
            <ListItemAvatar>
                {isQuestion ? (
                    <Avatar alt="icon" src={Cat} />
                ): (
                    <Avatar alt="icon" src={Squirrel} />
                )}
            </ListItemAvatar>
            <div className="p-chat__bubble">{props.text}</div>
        </ListItem>
    )
}

export default Chat;