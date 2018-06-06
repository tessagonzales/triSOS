import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const DrawerContent = () => {
    const { headerStyle, subHeadStyle, linkStyle, logoutStyle } = styles;
    return (
        <View>
            <Text h4 style={headerStyle}>Settings</Text>
            <Text style={subHeadStyle}>User</Text>
            <Text style={{alignSelf:'center'}}>____________________________</Text>
            
            <Text 
                style={linkStyle}
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
        backgroundColor: '#3D6DCC', 
        paddingTop: 20, paddingBottom: 13, 
        paddingLeft: 10, 
        color: '#FFF'
    },
    subHeadStyle: {
        alignSelf: 'center', 
        paddingTop: 20, 
        paddingRight: 20, 
        fontSize: 20, 
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    linkStyle: {
        alignSelf: 'flex-end', 
        paddingRight: 20, 
        paddingTop: 20, 
        color: '#3D6DCC'
    },
    logoutStyle: {
        alignSelf: 'flex-end',
        paddingRight: 20,
        paddingTop: 100,
        color: '#3D6DCC'
    }
}

export default DrawerContent;