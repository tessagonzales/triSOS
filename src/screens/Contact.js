import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';

const Contact = ({ contact }) => {
    const { listStyle, container } = styles;

    return (
        <View>
            <Text style={listStyle}>
                <Icon 
                    name="delete-forever"
                    color='red'
                    size={35}
                />
                {contact.name} <Text style={{fontWeight:'bold'}}>+{contact.phone_num}</Text>
            </Text>
        </View>
    )
};

const styles = {
    listStyle: {
        fontSize:20,
        marginLeft: 25,
        borderColor:'lightgrey',
        borderStyle: 'solid',
        borderBottomWidth: 1,
    }
}

export default Contact