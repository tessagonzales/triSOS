import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Text, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Overlay from 'react-native-modal-overlay';
import axios from 'axios';

class LoginForm extends Component {

    state = {
        users: [],
        f_name: '',
        l_name: '',
        phone_num: '',
        pw: '',
        modalVisible: false
    };

    componentWillMount() {
        axios.get('http://localhost:8000/api/users')
            .then(res => this.setState({
                users: res.data
            }))
    };
    
    handlePress = ( ) => {
        const newUser = {
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            phone_num: this.state.phone_num,
            pw: this.state.pw
        }

        axios.post('http://localhost:8000/api/users', { newUser })
            .then(res => {
                console.log('res.data \n', res.data)
            })
    };


    showOverlay() {
        this.setState({
            modalVisible: true
        })
    };

    hideOverlay = () => {
        this.setState({
            modalVisible: false
        })
    };

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

                <Button
                    title="Login"
                    buttonStyle={{marginTop:15, backgroundColor:'purple'}}
                    onPress={Actions.Home}
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
                    value = { this.state.f_name }
                    onChangeText={f_name => this.setState({ f_name })}
                />

                <FormLabel labelStyle={{marginTop:35}}>Last Name</FormLabel>
                <FormInput
                    inputStyle={inputStyle}
                    value={this.state.l_name}
                    onChangeText={l_name => this.setState({ l_name })}
                />

                <FormLabel labelStyle={{ marginTop: 35 }}>Phone Number</FormLabel>
                <FormInput
                    inputStyle={inputStyle}
                    keyboardType = "numeric"
                    value={this.state.phone_num}
                    onChangeText={phone_num => this.setState({ phone_num })}
                />

                <FormLabel labelStyle={{ marginTop: 35 }}>Password</FormLabel>
                <FormInput
                    inputStyle={inputStyle}
                    secureTextEntry={true}
                    value={this.state.pw}
                    onChangeText={pw => this.setState({ pw })}
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
                        onPress={ () => {
                            this.handlePress()
                            Actions.refresh({key: Math.random()})
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