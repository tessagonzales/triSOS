import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Text, Button } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';

class LoginForm extends Component {

    state = {
        modalVisible: false
    }

    showOverlay() {
        this.setState({
            modalVisible: true
        })
    }

    hideOverlay = () => {
        this.setState({
            modalVisible: false
        })
    }

    render() {

        const { textStyle, inputStyle } = styles;


        return (
            <View style={{flex:1, justifyContent: 'center'}}>
            <Text h1>Login</Text>
            <FormLabel>Phone Number</FormLabel>
            <FormInput 
                placeholder="555555555"
                keyboardType="numeric"
            />
            
            <FormLabel>password</FormLabel>
                <FormInput
                    secureTextEntry={true}
                />
                <Text style={textStyle}
                    onPress={this.showOverlay.bind(this)}
                >Not a user? Sign-up!</Text>




            <Overlay visible={this.state.modalVisible}
                closeOnTouchOutside 
                animationType="fadeIn"
                containerStyle={{ backgroundColor: 'rgba(0, 8, 10, 0.9)' }}
                childrenWrapperStyle={{ backgroundColor: '#eee', borderWidth:1, borderColor:'blue'}}
                onClose={this.hideOverlay}
            >
                <FormLabel>First Name</FormLabel>
                <FormInput
                    inputStyle={inputStyle}
                />

                <FormLabel labelStyle={{marginTop:35}}>Last Name</FormLabel>
                <FormInput
                    inputStyle={inputStyle}
                />

                <FormLabel labelStyle={{ marginTop: 35 }}>Phone Number</FormLabel>
                <FormInput
                    inputStyle={inputStyle}
                    keyboardType = "numeric"
                />

                <FormLabel labelStyle={{ marginTop: 35 }}>Password</FormLabel>
                <FormInput
                    inputStyle={inputStyle}
                    secureTextEntry={true}
                />

                <FormLabel labelStyle={{ marginTop: 35 }}>Confirm Password</FormLabel>
                <FormInput
                    inputStyle={inputStyle}
                    secureTextEntry={true}
                />

                    <Button
                        title='Sign Up'
                        buttonStyle={{
                            backgroundColor:'purple',
                            width: 300,
                            marginTop: 20
                        }}
                    />

            </Overlay>


            </View>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 12, 
        marginTop: 15, 
        alignSelf: 'center',
        color: '#3D6DCC',
    },
    inputStyle: {
        width: 300,
        alignContent: 'center'
    }
}

export default LoginForm;