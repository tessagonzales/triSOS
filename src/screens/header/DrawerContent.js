import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const DrawerContent = () => {
    const { headerStyle, subHeadStyle, linkStyle, logoutStyle, logoutNow } = styles;
    return (
        <View style={{ backgroundColor:'#23282d'}}>
            <Text h3 style={headerStyle}>Settings</Text>
            <Text style={{ alignSelf: 'center', color: '#9fabb7' }}>____________________________</Text>
            <Text style={subHeadStyle}>User</Text>
            
        {/*}
            <Text 
                style={{
                    alignSelf: 'flex-end',
                    paddingRight: 20,
                    paddingTop: 20,
                    color: '#9fabb7',
                    fontWeight:'bold'
                    
                }}
                onPress={() => Actions.update}
            > 
                ACCOUNT SETTINGS
            </Text>
            */}

            <Text
                style={linkStyle}
                onPress={Actions.location}
            >
                CURRENT LOCATION
            </Text>

        <Text 
            style={logoutNow}
            onPress={Actions.login}
        >
            LOGOUT
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
        fontSize: 25, 
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        color: '#FFF',
        fontWeight: 'bold'
    },
    linkStyle: {
        alignSelf: 'flex-end', 
        paddingRight: 20, 
        paddingTop: 25, 
        color: '#56D5FA',
        fontWeight: 'bold'
    },
    logoutNow: {
        alignSelf: 'flex-end',
        paddingRight: 20,
        paddingTop: 25,
        color: '#56D5FA',
        fontWeight: 'bold',
        paddingBottom: 500,
    },
    logoutStyle: {
        alignSelf: 'flex-end',
        paddingRight: 20,
        paddingTop: 100,
        color: '#56D5FA',
        paddingBottom:500,
        fontWeight: 'bold'
    }
}

export default DrawerContent;