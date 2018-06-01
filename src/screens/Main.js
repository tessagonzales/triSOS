import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';



const Main = () => {

    const { buttonStyle } = styles;

    return (
        <View>
            <Button
                title='BUTTON'
                backgroundColor='#06ab03'
                borderRadius={10}
                large={true}
                buttonStyle={buttonStyle}
                onPress={Actions.Login}
            />

            <Button
                title='BUTTON'
                backgroundColor='#ffcc14'
                borderRadius={10}
                large={true}
                buttonStyle={buttonStyle}
                onPress={() => {
                    console.log('Button Clicked')
                }}
            />

            <Button
                title='BUTTON'
                backgroundColor='#ff8400'
                borderRadius={10}
                large={true}
                buttonStyle={buttonStyle}
                onPress={() => {
                    console.log('Button Clicked')
                }}
            />
        </View>
    )
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



