import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import Overlay from 'react-native-modal-overlay';
import GreenContact from './GreenContact';
import YellowContact from './YellowContact';

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
            favs: []
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
    }

    handleLongPress() {
        const region = {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
        }

        console.log('long press', region)

        axios.post('http://localhost:8000/api/message/dispatch', { region })
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
        const { buttonStyle } = styles;
        
        let greenContacts = this.state.favs.map(contact => <GreenContact key={contact.id} contact={contact} />)
        let yellowContacts = this.state.favs.map(contact => <YellowContact key={contact.id} contact={contact} />)

        return (
            <ScrollView>

                {/* MAIN BUTTONS */}
                <Button
                    title='BUTTON'
                    backgroundColor='#06ab03'
                    borderRadius={10}
                    large={true}
                    buttonStyle={buttonStyle}
                    disabled = {this.state.disabled}
                    onPress={() => {
                        this.showGreenOverlay()}}
                />

                <Button
                    title='BUTTON'
                    backgroundColor='#ffcc14'
                    borderRadius={10}
                    large={true}
                    buttonStyle={buttonStyle}
                    disabled={this.state.disabled}
                    onPress={() => {
                        this.showYellowOverlay()}}
                />

                <Button
                    title='BUTTON'
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
                    style={{ alignSelf: 'center', fontSize: 10, marginTop: 130}}>Undisable buttons if you have read our ABOUT page already</Text>
                <Switch
                    style={{alignSelf:'center'}}
                    tintColor='limegreen'
                    onTintColor='lightgrey'
                    onValueChange={() => this.handleSwitch()}
                    value={this.state.disabled}
                    
                />

                
                {/* GREEN BUTTON MODAL */}
                <Overlay visible={this.state.greenModal}
                    closeOnTouchOutside
                    animationType="fadeInUp"
                    containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    childrenWrapperStyle={{ backgroundColor: '#eee', borderWidth: 1, borderColor: 'blue' }}
                    onClose={this.hideGreenOverlay}
                >
                    <Text h4 style={{marginBottom:20}}>Send Location To</Text>
                    <ScrollView>{greenContacts}</ScrollView>
                </Overlay>

                
                {/* YELLOW BUTTON MODAL */}
                <Overlay visible={this.state.yellowModal}
                    closeOnTouchOutside
                    animationType="fadeInUp"
                    containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    childrenWrapperStyle={{ backgroundColor: '#eee', borderWidth: 1, borderColor: 'blue' }}
                    onClose={this.hideYellowOverlay}
                > 
                    <Text h4 style={{ marginBottom: 20 }}>Send Location To</Text>
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
    }
}


export default Main;



