import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Location, Permissions } from 'expo'

const deltas = {
    latitudeDelta: 9,
    longitudeDelta: 9
};

class CurLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude : null , 
                longitude : null
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
            longitude: location.coords.longitude,
            ...deltas
        };
        await this.setState({ region });
    }


    render() {
        console.log(this.state);
        const { map, container } = styles;
        let {latitude, longitude} = this.state.region ;
        latitude = latitude !== null ? latitude : 112.0740;
        longitude = longitude !== null ? longitude : 33.4484 

        return (
                <MapView style={map} initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: .10,
                    longitudeDelta: .10,
                    
            }} showsUserLocation={true}>

                </MapView>
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
};
export default CurLocation;