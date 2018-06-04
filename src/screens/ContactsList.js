import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import Contact from './Contact'
import { Text, Icon } from 'react-native-elements'

class ContactsList extends Component {

    state = {
        contacts: []
    }

    componentWillMount() {
        axios.get('http://localhost:8000/api/favs')
            .then(res => this.setState({
                contacts: res.data
            }))
    };

    render() {
        const { iconTextStyle } = styles;
        const allContacts = this.state.contacts.map(contact => <Contact key={contact.id} contact={contact} /> )

        return (
            <View>

                <Text h4 style={iconTextStyle}>
                    <Icon
                        name='add-circle'
                        color='#3D6DCC'
                        size={35}
                    />
                
                    Add Contact
                </Text>


                <Text>{allContacts}</Text>
            </View>
        );
    }
}

const styles = {
    iconTextStyle: {
        marginBottom: 40,
        marginTop: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
}

export default ContactsList;