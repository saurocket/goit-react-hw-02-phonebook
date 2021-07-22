import React from 'react'
import {Header} from "./Header/Header";
import {Form} from "./From/From";
import { ContactsPage } from './ContacstPage/ContactsPage';


export type ContactType = {
    id: string,
    name: string,
    number: string,
}

type IProps = {}
export type IState = {
    contacts: Array<ContactType>
    filter: string
    name: string
    number: string
}

export class MainPage extends React.Component<IProps, IState> {
   constructor(props:IProps) {
       super(props);
       this.state = {
           contacts: [
               {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
               {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
               {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
               {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
           ],
           filter: '',
           name: '',
           number: ''
       }
   }
   componentDidMount(): void {
       const constants = localStorage.getItem('contacts')

       if (constants){
           this.setState({contacts: JSON.parse(constants)})
       }
   }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
       if (this.state.contacts !== prevState.contacts){
           localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
       }
   }

    onChangeName = (value: string) => {
       this.setState(prevState => {
           return {...prevState, name: value}
       })
    }
    onChangePhone = (value: string) => {
       this.setState(preState => {
           return {...preState, number: value}
       })
    }
    onChangeFilter = (value: string) => {
        this.setState(preState => {
            return {...preState, filter: value}
        })
    }
    onSubmitForm = (data: ContactType) => {
       this.setState(prevState => {
           return (
               {...prevState, contacts: [...prevState.contacts, data]}
           )
       })
    }
    onDeleteContact = (id: string) => {
       this.setState(prevState => {
           return {...prevState, contacts: [...prevState.contacts.filter(item => item.id !== id)]}
       })
    }
    onCheckContactList = (name:string) => {
       return (this.state.contacts.find(item => item.name === name))
    }





    render() {

        return (
            <>
                <Header text='PhoneBook'/>
                <Form
                 onCheckContactList={this.onCheckContactList}
                onSubmitForm={this.onSubmitForm}
                name={this.state.name}
                phone={this.state.number}
                onChangeName={this.onChangeName}
                onChangePhone={this.onChangePhone}
                />
                <ContactsPage
                    filter={this.state.filter}
                    onChangeFilter={this.onChangeFilter}
                    contacts={this.state.contacts}
                    onDeleteContact={this.onDeleteContact}
                />
            </>
        )
    }
}