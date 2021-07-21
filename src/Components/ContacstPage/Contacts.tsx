import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {ContactType} from "../MainPage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto'

        },
    }),
);

type PropsTypes = {
    filter: string
    contacts: Array<ContactType>
    onDeleteContact: (id: string) => void
}

export const Contacts: React.FC<PropsTypes> = ({contacts, filter, onDeleteContact}) => {
    const classes = useStyles();
    const contactsRender = (function (constants, filter) {
        if (filter) {
            return contacts.filter(item => item.name.includes(filter))
        }
        return contacts
    })(contacts, filter)



    return (
        <div className={classes.root}>
            <List>
                {contactsRender.map(item => <ListItem key={item.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircleIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.name}
                        secondary={item.number}
                    />
                    <ListItemSecondaryAction>

                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => onDeleteContact(item.id)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                )}
            </List>
        </div>
    );
}