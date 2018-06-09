import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Text } from 'react-native-elements';

const About = () => {
    const { container, sampleSMS } = styles;

    return (
        <ScrollView contentContainerStyle={container}>
            <Text h4 style={{ fontWeight: 'bold', marginTop: 10, color: '#56D5FA'}}> How To Use Tri-SOS </Text>

            <Text style={{ fontSize: 12, color: '#56D5FA', fontWeight: 'bold' }}>If you are in a situation where there is a crime being/to be committed or you feel that you are in danger, close app and call 911.</Text>

            <Text style={{ fontSize: 13, color: '#ff3232', marginTop: 10, fontWeight: 'bold'}}>* Disclaimer: This app does NOT notify emergency services.</Text>

            <Text style={{ marginTop: 20, color: '#EEE', fontWeight: 'bold'}}>ADD CONTACTS BEFORE USING BUTTONS</Text>

            <Text style={{ backgroundColor: '#004c00', padding: 5, color: '#FFF', fontSize: 16, marginTop: 30, marginBottom:10 }}>Green button</Text>
            <Text style={{ color: '#56D5FA', fontWeight:'bold'}}>Casually send your location to selected contacts</Text>
            <Text style={sampleSMS}>
                Sample SMS Message to Chosen Contact(s):
                 {'\n\n'}
                TRI-SOS USER has sent his/her location to your number specifically. Action not required. USER is currently safe and checking in.
                {'\n\n'}
                Last known location:
                {'\n'}
                1313 Disneyland Dr, Anaheim, CA 92802
                {'\n\n'}
                --From TRI-SOS   
            </Text>


            <Text style={{ backgroundColor: '#e8ba00', padding: 5, color: '#FFF', fontSize: 16, marginTop: 30, marginBottom:10}}>Yellow button</Text>
            <Text style={{ color: '#56D5FA', fontWeight: 'bold' }}>Send your location to selected contacts. This incites a "warning label" that you might be in a mildly uncomfortable area and/or with a person that you are cautious with but does not warrant any immediate action.</Text>
            <Text style={sampleSMS}>
                Sample SMS Message to Chosen Contact(s):
                {'\n\n'}
                TRI-SOS USER has sent his/her location to your number specifically. Immediate action not required, but a mild warning has been issued. USER may feel uncomfortable in a situation but does not feel threatened. USER is checking in and does not need any help until further notice.
                {'\n\n'} 
                Last known location: 
                {'\n'}
                 1313 Disneyland Dr, Anaheim, CA 92802
                {'\n\n'}
                --From TRI-SOS
            </Text>

            <Text style={{ backgroundColor: '#ff8400', padding: 5, color: '#FFF', fontSize: 16, marginBottom:10, marginTop:30 }}>Orange button</Text>
            <Text style={{ color: '#56D5FA', fontWeight: 'bold'}}>Hold down on button and it will discreetly send your location to all contacts. This incites that you are in fact in a suspicious area and/or with a suspicious person that does not warrant you to call the police and you wish to be picked up / to get out of that area when you can.</Text>
            <Text style={sampleSMS}>
                Sample SMS Message to All Contacts:
                {'\n\n'}
                TRI-SOS USER has sent his/her location to all of their chosen contacts including your number. Immediate action required. Please contact USER as soon as possible.
                 {'\n\n'} 
                 Last known location:
                 {'\n'} 
                 1313 Disneyland Dr, Anaheim, CA 92802
                 {'\n\n'} 
                 --From TRI-SOS
                 {'\n\n'} 
                 FYI - USER has been warned by TRI-SOS to dial emergency if situation is dangerous. 
            </Text>

        </ScrollView>
    )
};

styles = {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#3b444c',
    },
    sampleSMS: {
        margin: 30, 
        color: '#EEE', 
        borderStyle: 'solid', 
        borderColor:'#56D5FA', 
        borderWidth:1, 
        padding: 10,
        borderRadius: 20
    },
}

export default About;