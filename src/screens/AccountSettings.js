import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, FormInput, FormLabel } from 'react-native-elements';

class AccountSettings extends Component {

    onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                console.log('deleted \n', res.data)
            })
    }

    render() {

        const { container, inputStyle } = styles;

        return (
            <View style={container}>
                <Text style={{ color: '#56D5FA' }}>Update User Info</Text>

                <FormLabel>First Name</FormLabel>
                <FormInput inputStyle={inputStyle}></FormInput>

                <FormLabel>Last Name</FormLabel>
                <FormInput inputStyle={inputStyle}></FormInput>

                <FormLabel>Phone Number</FormLabel>
                <FormInput inputStyle={inputStyle}></FormInput>

                <FormLabel>Password</FormLabel>
                <FormInput inputStyle={inputStyle}></FormInput>

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
                        console.log('heard')
                    }}
                />
                
                <Button
                    icon={{ name: 'warning', color: '#FFF'}}
                    title="Delete Account"
                    buttonStyle={{ backgroundColor:'#bf0a00', width: 200, marginTop: 50 }}
                    onPress={() => this.onDelete(user.id) }
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b444c'
    },
    inputStyle: {
        width: 300,
        alignContent: 'center'
    }
}

export default AccountSettings;

