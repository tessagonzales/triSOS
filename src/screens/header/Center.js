import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const Header = () => {
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems:'center', flexDirection:'row'}}>
            <Text style={{ color:'#56D5FA', fontSize:30, fontWeight:'bold'}}>TRI-SOS </Text>
            
            <Icon
                name="near-me"
                color="#56D5FA"
            />
            
        </View>
    )
};

export default Header;