import React, { Component } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import axios from 'axios';
import Contact from './Contact'
import { Text, Icon, FormInput, FormLabel, Button } from 'react-native-elements'
import Overlay from 'react-native-modal-overlay';
import { Actions } from 'react-native-router-flux';

class ContactsList extends Component {

    state = {
        contacts: [],
        modalVisible: false,
        refreshing: false,
    }

    componentWillMount() {
        axios.get('http://localhost:8000/api/favs')
            .then(res => this.setState({
                contacts: res.data
            }))
    };

    _onRefresh() {
        this.setState({ refreshing: true });
        
        axios.get('http://localhost:8000/api/favs')
            .then(res => this.setState({
                contacts: res.data
            }))
        
        .then(() => {
            this.setState({ refreshing: false });
        });
    }

    showOverlay = () => {
        this.setState({
            modalVisible: true
        })
    };

    hideOverlay = () => {
        this.setState({
            modalVisible: false
        })
    };

    handlePress = () => {
        const newContact = {
            name: this.state.name,
            phone_num: this.state.phone_num
        }

        axios.post('http://localhost:8000/api/favs', { newContact })
            .then(res => {
                console.log('res.data \n', res.data)
            })
    };


    render() {
        const { iconTextStyle, inputStyle } = styles;
        const allContacts = this.state.contacts.map(contact => <Contact key={contact.id} contact={contact} /> )

        return (
            <ScrollView
                contentContainerStyle={{ backgroundColor:'#3b444c'}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            
            >

                <Text style={{ alignSelf: 'center', fontSize: 11, flex: .2, color:'#56D5FA', fontWeight:'bold' }}>pull down to refresh page </Text>

                <Text h4 style={iconTextStyle} onPress={() => this.showOverlay()}>
                    <Icon
                        name='add-circle'
                        color='#FFF'
                        size={35}
                    />               
                    Add Contact
                </Text>


                <View>{allContacts}</View>

                <Text style={{ color:'#3b444c',marginBottom:500}}>-</Text>




                {/* ------------------- OVERLAY ------------------- */}
                <Overlay visible={this.state.modalVisible}
                    closeOnTouchOutside
                    animationType="fadeIn"
                    containerStyle={{ backgroundColor: 'rgba(0, 8, 10, 0.9)' }}
                    childrenWrapperStyle={{ backgroundColor: '#3b444c', borderWidth: 1, borderColor: '#56D5FA' }}
                    onClose={() => this.hideOverlay()}
                >
                    <FormLabel labelStyle={{ marginTop: 35 }}>Name</FormLabel>
                    <FormInput
                        inputStyle={inputStyle}
                        value={this.state.name}
                        onChangeText={ name => this.setState({ name }) }
                    />

                    <FormLabel labelStyle={{ marginTop: 35 }}>Phone Number</FormLabel>
                    <Text style={{ fontSize: 11 }}>(include area code, no symbols)</Text>
                    <FormInput
                        inputStyle={inputStyle}
                        keyboardType="numeric"
                        defaultValue="+1"
                        value={this.state.phone_num}
                        onChangeText={phone_num => this.setState({ phone_num })}
                    />

                    <Button
                        title='Add Contact'
                        color="#000"
                        buttonStyle={{
                            backgroundColor: '#56D5FA',
                            width: 300,
                            marginTop: 20
                        }}
                        onPress={() => {
                            this.handlePress()
                            Actions.refresh({ key: Math.random() })
                        }}
                    />
                </Overlay>


            </ScrollView>
        );
    }
}

const styles = {
    iconTextStyle: {
        marginBottom: 40,
        marginTop: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#56D5FA'
    },
    inputStyle: {
        width: 300,
        alignContent: 'center'
    },
}

export default ContactsList;