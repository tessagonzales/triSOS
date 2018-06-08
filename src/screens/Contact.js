import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon, FormInput, FormLabel, Button } from 'react-native-elements';
import axios from 'axios';
import Overlay from 'react-native-modal-overlay';
import { Actions } from 'react-native-router-flux';

class Contact extends Component {

    state = {
        modalVisible: false,
        name: this.props.contact.name || '',
        phone_num: this.props.contact.phone_num || ''
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

    onEditPress = (id) => {
        const updatedContact = {
            name: this.state.name,
            phone_num: this.state.phone_num,
        }

        axios.put(`http://localhost:8000/api/favs/${id}`, { updatedContact })
            .then(res => {
                console.log('updated \n', res.data)
            })
    }

    onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/favs/${id}`)
            .then(res => {
                console.log('deleted \n', res.data)
            })
    }

    render() {

        const { listStyle, container, inputStyle } = styles;
        const contact = this.props.contact

        return (
            <View style={container}>
                <Text style={listStyle} onPress={() => this.showOverlay()}>
                    <Icon
                        name="edit"
                        color='#FFF'
                        size={35}
                        iconStyle={{ marginRight: 30 }}
                    />
                    {contact.name} 
                    
                    <Icon
                        name="arrow-forward"
                        color='#FFF'
                        size={20}
                        iconStyle={{ marginLeft: 10, marginRight: 15 }}
                    />

                    {contact.phone_num}
                </Text>


                <Overlay visible={this.state.modalVisible}
                    closeOnTouchOutside
                    animationType="fadeIn"
                    containerStyle={{ backgroundColor: 'rgba(0, 8, 10, 0.9)' }}
                    childrenWrapperStyle={{ backgroundColor: '#3b444c', borderWidth: 1, borderColor: '#56D5FA' }}
                    onClose={this.hideOverlay}
                >
                    <FormLabel>Name</FormLabel>
                    <FormInput
                        defaultValue={contact.name}
                        placeholderTextColor="#778899"
                        inputStyle={inputStyle}
                        onChangeText={name => this.setState({ name })}
                    />

                    <FormLabel>Phone Number</FormLabel>
                    <FormInput
                        defaultValue={contact.phone_num}
                        inputStyle={inputStyle}
                        keyboardType="numeric"
                        onChangeText={phone_num => this.setState({ phone_num })}
                    />
                    <Button
                        title='Update'
                        color="#000"
                        buttonStyle={{
                            backgroundColor: '#56D5FA',
                            width: 300,
                            marginTop: 20,
                            marginBottom: 20
                        }}
                        onPress={() => {
                            this.onEditPress(contact.id)
                            Actions.refresh({ key: Math.random() })
                        }}
                    />

                    <Icon
                        name="delete-forever"
                        color='red'
                        size={50}
                        onPress={() => {
                            this.onDelete(contact.id)
                            Actions.refresh({ key: Math.random() })
                        }}
                        
                    />
                </Overlay>

            </View>
        )
    }
};

const styles = {
    listStyle: {
        fontSize:14,
        marginLeft: 25,
        marginBottom: 10,
        color: '#56D5FA',
        fontWeight: 'bold'
    },
    container: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        width: 350,
        backgroundColor: '#3b444c'
    },
    inputStyle: {
        width: 300,
        alignContent: 'center'
    }
}

export default Contact