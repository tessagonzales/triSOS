import React, { Component } from 'react';
import { Text } from 'react-native';
import { Location, Permissions } from 'expo';
import axios from 'axios';


class YellowContact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: null,
                longitude: null
            }
        };
    }


    // ASK PERMISSION IF NECESSARY AND GET CURRENT LOCATION
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

    handlePress(id) {
        const region = {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
        }

        axios.post(`http://localhost:8000/api/message/green/dispatch/${id}`, { region })
            .then(res => {
                console.log('res.data =======> \n', res.data)
            })
    }

    render() {
        const { listStyle } = styles;
        const contact = this.props.contact

        return (
            <Text
                style={listStyle}
                onPress={() => {
                    this.handlePress(contact.id)
                }}
            > {contact.name}</Text>
        )
    }
};

const styles = {
    listStyle: {
        fontSize: 20,
        padding: 10,
        color: '#56D5FA'
    }
}

export default YellowContact;