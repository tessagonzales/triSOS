import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Location, Permissions } from 'expo';
import axios from 'axios'


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: null,
                longitude: null
            }
        };
    }


    componentWillMount() {
        this.getLocationAsync();
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
        await this.setState({ region });
    }

    handleLongPress() {
        const region = {
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }

        axios.post('/api/message/send', { region })
            .then(res => {
                console.log('res.data \n', res.data)
            })
    }


    render() {
        const { buttonStyle } = styles;

        return (
            <View>
                <Button
                    title='BUTTON'
                    backgroundColor='#06ab03'
                    borderRadius={10}
                    large={true}
                    buttonStyle={buttonStyle}
                    onPress={Actions.Login}
                />

                <Button
                    title='BUTTON'
                    backgroundColor='#ffcc14'
                    borderRadius={10}
                    large={true}
                    buttonStyle={buttonStyle}
                    onPress={() => {
                        console.log('Button Clicked')
                    }}
                />

                <Button
                    title='BUTTON'
                    backgroundColor='#ff8400'
                    borderRadius={10}
                    large={true}
                    buttonStyle={buttonStyle}
                    onLongPress={() => {
                        this.handleLongPress()
                        console.log(this.state.region)
                    }}
                />
            </View>
        )
    }
};

const styles = {
    buttonStyle: {
        marginBottom: 20,
        marginTop: 20,
        paddingTop: 30,
        paddingBottom: 30
    }
}


export default Main;



