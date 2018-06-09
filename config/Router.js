import React from 'react';
import { Scene, Router, Actions, Modal, Drawer } from 'react-native-router-flux';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import Main from '../src/screens/Main'
import About from '../src/screens/About';
import ContactsList from '../src/screens/ContactsList';
import Center from '../src/screens/header/Center';
import LoginForm from '../src/screens/LoginForm';
import DrawerContent from '../src/screens/header/DrawerContent';
import AccountSettings from '../src/screens/AccountSettings'
import CurLocation from '../src/screens/CurLocation';

const RouterComponent = () => {

    const contactsIcon = () => {
        return (
            <View>
                <Icon
                    name="contacts"
                    color="#FFF"
                />
            </View>
        );
    }

    const aboutIcon = () => {
        return (
            <View>
                <Icon
                    name="help"
                    color="#FFF"
                />
            </View>
        );
    }

    const homeIcon = () => {
        return (
            <View>
                <Icon
                    name="home"
                    color="#FFF"
                />
            </View>
        );
    }

    return (
        <Router>
            <Scene key='root'>

                <Scene
                    key="login"
                    title="Login"
                    component={LoginForm}
                    navigationBarStyle={{ backgroundColor: '#23282d' }}
                    hideTabBar={true}
                    swipeEnabled={false}
                    renderTitle={Center}
                    
                    back={false}
                    initial
                />

                
                {/* ---------------- TABS ---------------- */}
                <Scene key="tabbar"
                    tabs
                    swipeEnabled={true}
                    tabBarStyle={{ backgroundColor: '#23282d'}}
                    activeTintColor="#56D5FA"
                    hideNavBar={true}
                >

                <Scene key="Home" title="HOME" icon={homeIcon} >

                {/* -------- DRAWER -------- */}
                <Scene
                    key='drawer'
                    drawer={true}
                    drawerPosition="right"
                    drawerImage={require('./settings-icon.png')}
                    hideNavBar={true}
                    contentComponent={DrawerContent}
                    drawerWidth={200}
                >

                    <Scene 
                        key='Home' 
                        component={Main} 
                        renderTitle={Center}
                        navigationBarStyle={{ backgroundColor:'#23282d'}}
                        initial
                    />
                </Scene>
                </Scene>
                {/* -------- END DRAWER -------- */}


                <Scene key="Contacts" title="CONTACTS" icon={contactsIcon} >
                    <Scene
                        back={true}
                        key='contacts' 
                        renderTitle={Center}
                        component={ContactsList} 
                        title="Contacts"
                        navigationBarStyle={{ backgroundColor: '#23282d' }}
                        initial />
                    </Scene>

                <Scene key="About" title="ABOUT" icon={aboutIcon} >
                    <Scene 
                        back={true}
                        key='about' 
                        component={About} 
                        renderTitle={Center}
                        title="About"
                        navigationBarStyle={{ backgroundColor: '#23282d' }}
                        initial
                    />
                </Scene>

                </Scene>
                {/* ---------------- END TABS ---------------- */}

                <Scene 
                    key="login" 
                    title="Login" 
                    component={LoginForm}
                    navigationBarStyle={{ backgroundColor: '#23282d' }} 
                    back={false}
                />

                <Scene
                    back={true}
                    key='update'
                    component={AccountSettings}
                    title="Account Settings"
                    renderTitle={Center}
                    navigationBarStyle={{ backgroundColor: '#23282d' }}
                />

                <Scene
                    back={true}
                    key='location'
                    component={CurLocation}
                    title="Current Location"
                    renderTitle={Center}
                    navigationBarStyle={{ backgroundColor: '#23282d' }}
                />

            </Scene>
        </Router>
    )
}

export default RouterComponent