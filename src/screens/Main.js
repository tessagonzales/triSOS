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

        // axios.get(`http://dev.virtualearth.net/REST/v1/Locations/${this.state.region.latitude},${this.state.region.longitude}key=AnssadiJjNvl1hLmxhD5hcmdZ4YHgfrjLUowqUVufZXDfF4Uif7B8pSZx1PVZbdI`)
        //     .then(res => this.setState({
        //         bingLocation: res.data
        //     }))
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

        console.log('bing maps =====> \n', this.state.bingLocation)

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
                    style={{ alignSelf: 'center', fontSize: 10, marginTop: 120, marginBottom:10, color:'#56D5FA'}}>Undisable buttons if you have read our ABOUT page already</Text>
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
                    <Text h4 style={{ marginBottom: 20, color: '#56D5FA'}}>Send Location To</Text>
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
                    <Text h4 style={{ marginBottom: 20, color: '#56D5FA' }}>Send Location To</Text>
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



