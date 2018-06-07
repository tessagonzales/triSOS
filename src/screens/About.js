import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-elements';

const About = () => {
    const { container } = styles;

    return (
        <ScrollView contentContainerStyle={container}>
            <Text h4 style={{fontWeight: 'bold', marginTop: 10}}> How To Use Tri-SOS </Text>

            <Text style={{ fontSize: 12 }}>If you are in a situation where there is a crime being/to be committed or you feel that you are in danger, close app and call 911.</Text>

            <Text style={{ fontSize: 10, color: 'red', marginTop: 10, fontWeight: 'bold' }}>* Disclaimer: This app does NOT notify emergency services.</Text>

            <Text style={{marginTop: 20}}>ADD CONTACTS BEFORE USING BUTTONS</Text>

            <Text style={{ backgroundColor:'#06ab03', padding: 5, color:'#FFF', fontSize:16, marginTop:30 }}>Green button</Text>
            <Text style={{marginBottom: 30}}>Casually send your location to selected contacts</Text>


            <Text style={{ backgroundColor: '#ffcc14', padding: 5, color: '#000', fontSize: 16, }}>Yellow button</Text>
            <Text style={{ marginBottom: 30 }}>Send your location to selected contacts. This incites a "warning label" that you might be in a mildly uncomfortable area and/or with a person that you are cautious with but does not warrant any immediate action.</Text>

            <Text style={{ backgroundColor: '#ff8400', padding: 5, color: '#FFF', fontSize: 16, }}>Orange button</Text>
            <Text style={{ marginBottom: 30 }}>Hold down on button and it will discreetly send your location to all contacts. This incites that you are in fact in a suspicious area and/or with a suspicious person that does not warrant you to call the police and you wish to be picked up / to get out of that area when you can.</Text>

        </ScrollView>
    )
};

styles = {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    }
}

export default About;