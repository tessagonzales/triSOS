import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const DrawerContent = () => {
    const { headerStyle, subHeadStyle, linkStyle, logoutStyle } = styles;
    return (
        <View style={{ backgroundColor:'#23282d'}}>
            <Text h4 style={headerStyle}>Settings</Text>
            <Text style={subHeadStyle}>User</Text>
            <Text style={{ alignSelf: 'center', color: '#9fabb7' }}>____________________________</Text>
            
            <Text 
                style={{
                    alignSelf: 'flex-end',
                    paddingRight: 20,
                    paddingTop: 20,
                    color: '#56D5FA'
                }}
                onPress={Actions.update}
            >
                Account Settings
            </Text>

            <Text
                style={linkStyle}
                onPress={Actions.location}
            >
                View Current Location
            </Text>

        <Text 
            style={logoutStyle}
            onPress={Actions.login}
        >
            Logout
        </Text>
        </View>
    )
};

const styles = {
    headerStyle: {
        backgroundColor: '#23282d', 
        paddingTop: 20, paddingBottom: 13, 
        paddingLeft: 10, 
        color: '#56D5FA',
        fontWeight: 'bold'
    },
    subHeadStyle: {
        alignSelf: 'center', 
        paddingTop: 20, 
        paddingRight: 20, 
        fontSize: 20, 
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        color: '#FFF'
    },
    linkStyle: {
        alignSelf: 'flex-end', 
        paddingRight: 20, 
        paddingTop: 20, 
        color: '#56D5FA'
    },
    logoutStyle: {
        alignSelf: 'flex-end',
        paddingRight: 20,
        paddingTop: 100,
        color: '#56D5FA',
        paddingBottom:500
    }
}

export default DrawerContent;