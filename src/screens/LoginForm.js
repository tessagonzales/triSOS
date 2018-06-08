import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Text, Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Overlay from 'react-native-modal-overlay';
import axios from 'axios';

class LoginForm extends Component {

    state = {
        users: [],
        f_name: '',
        l_name: '',
        phone_num: '+1',
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
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#3b444c'}}>


                <Icon
                    name="vpn-key"
                    color="#FFF"
                    size={120}
                />

                <Text h1 style={{ color: '#56D5FA'}}>Login</Text>
            <FormLabel>Phone Number</FormLabel>
            <FormInput 
                placeholder="+1555555555"
                placeholderTextColor="#778899"
                keyboardType="numeric"
            />
            
            <FormLabel>password</FormLabel>
                <FormInput
                    secureTextEntry={true}
                />

                <Button
                    title="Login"
                    buttonStyle={{ marginTop: 15, backgroundColor:'#56D5FA'}}
                    onPress={Actions.Home}
                    color='#000'
                />


                <Text style={textStyle}
                    onPress={() => {
                        this.showOverlay()}}
                >Not a user? Sign-up!</Text>




            <Overlay visible={this.state.modalVisible}
                closeOnTouchOutside 
                animationType="bounceIn"
                containerStyle={{ backgroundColor: 'rgba(0, 8, 10, 0.9)' }}
                    childrenWrapperStyle={{ backgroundColor: '#3b444c', borderWidth: 1, borderColor:'#56D5FA'}}
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
                    <Text style={{ fontSize: 11, color: '#56D5FA'}}>(include area code, no symbols)</Text>
                <FormInput
                    inputStyle={inputStyle}
                    keyboardType = "numeric"
                    value={this.state.phone_num}
                    onChangeText={phone_num => this.setState({  phone_num })}
                    placeholderTextColor="#778899"
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
                        color='#000'
                        buttonStyle={{
                            backgroundColor:'#5bcfef',
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
        color: '#56D5FA',
    },
    inputStyle: {
        width: 300,
        alignContent: 'center'
    }
}

export default LoginForm;