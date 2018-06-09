import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';

const Header = () => {
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems:'center', flexDirection:'row'}}>
            <StatusBar barStyle="light-content" />
            <Text style={{ color: '#56D5FA', fontSize: 30, fontWeight: 'bold', fontFamily: 'Courier-Bold'}}>TRI-SOS </Text>
            
            <Icon
                name="near-me"
                color="#56D5FA"
            />
            
        </View>
    )
};

export default Header;