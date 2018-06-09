import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Location, Permissions } from 'expo';
import axios from 'axios';

let apiKeys = require('../../bing-key.json');


class GreenContact extends Component {

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

        axios.get(`http://dev.virtualearth.net/REST/v1/Locations/${this.state.region.latitude},${this.state.region.longitude}?&key=${apiKeys["bing-key"]}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    bingLocation: res.data
                })
            })
    }


    handlePress(id) {
        let resourceSets = this.state.bingLocation.resourceSets ? this.state.bingLocation.resourceSets : [];
        let addressRecieved = resourceSets.map(resource => resource.resources[0].name)[0]

        console.log('plzzzzz WORK \n', addressRecieved)

        axios.post(`http://localhost:8000/api/message/green/dispatch/${id}`, { addressRecieved })
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
                > {contact.name.toUpperCase()}</Text>
        )
    }
};

const styles = {
    listStyle: {
        fontSize: 15,
        padding: 10,
        color: '#56D5FA',
        fontWeight: 'bold'
    }
}

export default GreenContact;