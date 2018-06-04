import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class AccountSettings extends Component {
    render() {

        const { container } = styles;

        return (
            <View style={container}>
                <Text>Update User Info</Text>
                
                <Button
                    icon={{ name: 'warning', color: '#FFF'}}
                    title="Delete Account"
                    buttonStyle={{ backgroundColor:'#bf0a00', width:300 }}
                    onPress={() => {
                        Alert.alert(
                            'Confirm Deletion',
                            'Are You Sure?',
                            [
                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                                { text: 'OK', onPress: this.onDeleteBTN },
                            ],
                            { cancelable: false }
                        )
                    }}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

export default AccountSettings;

