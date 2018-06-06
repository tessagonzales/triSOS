import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import axios from 'axios';
import Overlay from 'react-native-modal-overlay';

class Contact extends Component {

    state = {
        modalVisible: false
    }

    showOverlay = () => {
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

        const { listStyle, container } = styles;
        const contact = this.props.contact

        return (
            <View style={container}>
                <Text style={listStyle} onPress={this.showOverlay.bind(this)}>
                    <Icon
                        name="edit"
                        color='#3D6DCC'
                        size={35}
                        iconStyle={{ marginRight: 30 }}
                    />
                    {contact.name} +{contact.phone_num}
                </Text>

                <Overlay visible={this.state.modalVisible}
                    closeOnTouchOutside
                    animationType="fadeIn"
                    containerStyle={{ backgroundColor: 'rgba(0, 8, 10, 0.9)' }}
                    childrenWrapperStyle={{ backgroundColor: '#eee', borderWidth: 1, borderColor: 'blue' }}
                    onClose={this.hideOverlay}
                >
                    <Icon
                        name="delete-forever"
                        color='red'
                        size={50}
                        onPress={() => console.log('heard')}
                    />
                </Overlay>

            </View>
        )
    }
};

const styles = {
    listStyle: {
        fontSize:20,
        marginLeft: 25,
        marginBottom: 10,
    },
    container: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        width: 350
    }
}

export default Contact