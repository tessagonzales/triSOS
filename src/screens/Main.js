import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import Overlay from 'react-native-modal-overlay';
import GreenContact from './GreenContact';
import YellowContact from './YellowContact';

 let apiKeys = require('../../bing-key.json');


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: null,
                longitude: null
            },
            greenModal:false,
            yellowModal:false,
            disabled: true,
            favs: [],
            bingLocation: []
        };
    }

    handleSwitch () {
        this.setState({
            disabled: !this.state.disabled
        })
    }



    // ASK PERMISSION IF NECESSARY AND GET CURRENT LOCATION
    componentWillMount() {
        this.getLocationAsync();

        axios.get('http://localhost:8000/api/favs')
            .then(res => this.setState({
                favs: res.data
            }))
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

    handleLongPress() {
        let resourceSets = this.state.bingLocation.resourceSets ? this.state.bingLocation.resourceSets : [];
        let addressRecieved = resourceSets.map(resource => resource.resources[0].name)[0]

        axios.post('http://localhost:8000/api/message/dispatch', { addressRecieved })
            .then(res => {               
                console.log('res.data =======> \n', res.data)
            })
    }
    // END

    // MODAL METHODS
    showYellowOverlay() {
        this.setState({
            yellowModal: true
        })
    };

    hideYellowOverlay = () => {
        this.setState({
            yellowModal: false
        })
    };

    showGreenOverlay() {
        this.setState({
            greenModal: true
        })
    };

    hideGreenOverlay = () => {
        this.setState({
            greenModal: false
        })
    };
    // END MODAL METHODS


    render() {
        const { buttonStyle, selectedModalStyle } = styles;
        let greenContacts = this.state.favs.map(contact => <GreenContact key={contact.id} contact={contact} />)
        let yellowContacts = this.state.favs.map(contact => <YellowContact key={contact.id} contact={contact} />)

        return (
            <ScrollView contentContainerStyle={{ backgroundColor: '#3b444c' }}>

                {/* MAIN BUTTONS */}
                <Button
                    title="Casual"
                    backgroundColor='#004c00'
                    borderRadius={10}
                    large={true}
                    buttonStyle={buttonStyle}
                    disabled = {this.state.disabled}
                    onPress={() => {
                        this.showGreenOverlay()}}
                />

                <Button
                        title="Mild Warning"
                    backgroundColor='#e8ba00'
                    borderRadius={10}
                    large={true}
                    buttonStyle={buttonStyle}
                    disabled={this.state.disabled}
                    onPress={() => {
                        this.showYellowOverlay()}}
                />

                <Button
                        title="Immediate"
                    backgroundColor='#ff8400'
                    borderRadius={10}
                    large={true}
                    buttonStyle={buttonStyle}
                    disabled={this.state.disabled}
                    onLongPress={() => {
                        this.handleLongPress()
                    }}
                />

                <Text 
                    style={{ alignSelf: 'center', fontSize: 12, marginTop: 120, marginBottom:10, color:'#56D5FA', fontWeight:'bold'}}>Undisable buttons if you have read our ABOUT page already</Text>
                <Switch
                    style={{alignSelf:'center', marginBottom: 20}}
                    tintColor='#56D5FA'
                    onTintColor='lightgrey'
                    onValueChange={() => this.handleSwitch()}
                    value={this.state.disabled}
                    
                />

                
                {/* GREEN BUTTON MODAL */}
                <Overlay visible={this.state.greenModal}
                    closeOnTouchOutside
                    animationType="fadeInUp"
                    containerStyle={{ backgroundColor: 'rgba(0, 8, 10, 0.9)' }}
                    childrenWrapperStyle={{ backgroundColor: '#3b444c', borderWidth: 1, borderColor: '#56D5FA' }}
                    onClose={this.hideGreenOverlay}
                >
                    <Text style={selectedModalStyle}>
                        SEND LOCATION TO
                        <Icon
                            name="send"
                            color="#56D5FA"
                            size={20}
                            iconStyle={{ marginLeft: 15 }}
                        />
                    </Text>
                    <Text style={{ color:'#778899'}}>_____________________________________</Text>
                    <ScrollView>{greenContacts}</ScrollView>
                </Overlay>

                
                {/* YELLOW BUTTON MODAL */}
                <Overlay visible={this.state.yellowModal}
                    closeOnTouchOutside
                    animationType="fadeInUp"
                    containerStyle={{ backgroundColor: 'rgba(0, 8, 10, 0.9)' }}
                    childrenWrapperStyle={{ backgroundColor: '#3b444c', borderWidth: 1, borderColor: '#56D5FA' }}
                    onClose={this.hideYellowOverlay}
                > 
                    <Text style={selectedModalStyle}>
                        SEND LOCATION TO
                        <Icon
                            name="send"
                            color="#56D5FA"
                            size={20}
                            iconStyle={{marginLeft:15}}
                        />
                    </Text>
                    <Text style={{ color: '#778899' }}>_____________________________________</Text>
                    <ScrollView>{yellowContacts}</ScrollView>
                </Overlay>


            </ScrollView>
        )
    }
};

const styles = {
    buttonStyle: {
        marginBottom: 20,
        marginTop: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    selectedModalStyle: {
        marginBottom: 5,
        color: '#EEE',
        fontWeight: 'bold',
        fontSize: 20
    },
}


export default Main;



