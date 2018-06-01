import React from 'react';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import Main from '../src/screens/Main'
import About from '../src/screens/About';
import MessageForm from '../src/screens/MessageForm';
import Center from '../src/screens/header/Center';
import LoginForm from '../src/screens/LoginForm';

const RouterComponent = () => {

    const messageIcon = () => {
        return (
            <View>
                <Icon
                    name="question-answer"
                    color="#3D6DCC"
                />
            </View>
        );
    }

    const aboutIcon = () => {
        return (
            <View>
                <Icon
                    name="help"
                    color="#3D6DCC"
                />
            </View>
        );
    }

    const homeIcon = () => {
        return (
            <View>
                <Icon
                    name="home"
                    color="#3D6DCC"
                />
            </View>
        );
    }

    return (
        <Router>
            <Scene key='root'>
                
                <Scene key="tabbar"
                tabs
                swipeEnabled={true}
                tabBarStyle={{backgroundColor: '#FFF'}}
                activeTintColor="#000"
                hideNavBar={true}
                >

                <Scene key="Home" drawer title="HOME" icon={homeIcon} >
                    <Scene 
                        rightTitle="Login"
                        onRight={() => { Actions.login()}}
                        rightButtonTextStyle={{color:'#FFF'}}
                        key='main' 
                        component={Main} 
                        renderTitle={Center}
                        navigationBarStyle={{ backgroundColor:'#3D6DCC'}}
                        initial
                    />

                    
                </Scene>

                <Scene key="Messaging" title="MESSAGING" icon={messageIcon} >
                    <Scene
                        back={true}
                        key='message' 
                        component={MessageForm} 
                        title="Messaging"
                        navigationBarStyle={{ backgroundColor: '#3D6DCC' }}
                        initial />
                    </Scene>

                <Scene key="About" title="ABOUT" icon={aboutIcon} >
                    <Scene 
                        back={true}
                        key='about' 
                        component={About} 
                        title="About"
                        navigationBarStyle={{ backgroundColor: '#3D6DCC' }}
                        initial
                    />
                </Scene>

                </Scene>

                <Scene 
                    key="login" 
                    title="LOGIN" 
                    component={LoginForm}
                    navigationBarStyle={{ backgroundColor: '#3D6DCC' }} 
                />

            </Scene>
        </Router>
    )
}

export default RouterComponent