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

const RouterComponent = () => {

    const contactsIcon = () => {
        return (
            <View>
                <Icon
                    name="contacts"
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

                <Scene
                    key="login"
                    title="Login"
                    component={LoginForm}
                    navigationBarStyle={{ backgroundColor: '#3D6DCC' }}
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
                    tabBarStyle={{backgroundColor: '#FFF'}}
                    activeTintColor="#000"
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
                        navigationBarStyle={{ backgroundColor:'#3D6DCC'}}
                        initial
                    />
                </Scene>
                </Scene>
                {/* -------- END DRAWER -------- */}


                <Scene key="Contacts" title="CONTACTS" icon={contactsIcon} >
                    <Scene
                        back={true}
                        key='contacts' 
                        component={ContactsList} 
                        title="Contacts"
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
                {/* ---------------- END TABS ---------------- */}

                <Scene 
                    key="login" 
                    title="Login" 
                    component={LoginForm}
                    navigationBarStyle={{ backgroundColor: '#3D6DCC' }} 
                    back={false}
                />

                <Scene
                    back={true}
                    key='update'
                    component={AccountSettings}
                    title="Account Settings"
                    navigationBarStyle={{ backgroundColor: '#3D6DCC' }}
                />

            </Scene>
        </Router>
    )
}

export default RouterComponent