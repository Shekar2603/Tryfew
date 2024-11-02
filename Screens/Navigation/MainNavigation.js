import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideBar from './SideBar';
import WelcomeScreen from '../WelcomeScreen';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import VerifyOtp from '../Auth/VerifyOtp';
import TermsAndConditions from '../TermsAndConditions';
import TellAboutSelf from '../TellAboutSelf';
import SuccessfullRegistration from '../SuccessfullRegistration';
import HomePage from '../HomePage';
import ProfileScreen from '../ProfileFlowScreens/ProfileScreen';
import ProfileEdit from '../ProfileFlowScreens/ProfileEdit';
import WalletScreen from '../ProfileFlowScreens/WalletScreen';
import TransactionHistory from '../ProfileFlowScreens/TransactionHistory';
import { NavigationContainer } from '@react-navigation/native';
import PreWelcomeScreen from '../PreWelcomeScreen';


const Drawer = createDrawerNavigator()

export default function MainNavigation() {
    
    const lockScreens = ['PreWelcomeScreen', 'WelcomeScreen', 'Login', 'Register', 'VerifyOtp', 'TermsConditions' , 'Tellusyourself' , 'SuccessFullRegist'];

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='PreWelcomeScreen' 
          screenOptions={({ route }) => ({
            swipeEnabled: !lockScreens.includes(route.name)
          })}
          drawerContent={props => <SideBar {...props} />}>
          <Drawer.Screen
            name='PreWelcomeScreen'
            component={PreWelcomeScreen}
            options={{
                header : () =>  null,
            }}
          />
          <Drawer.Screen
            name='WelcomeScreen'
            component={WelcomeScreen}
            options={{
                header : () =>  null,
            }}
          />
        <Drawer.Screen
            name='Login'
            component={Login}
            options={{
                header : () =>  null
            }}
          />
        <Drawer.Screen
          name='Register'
          component={Register}
          options={{
              header : () =>  null
          }}
        />
        <Drawer.Screen
          name='VerifyOtp'
          component={VerifyOtp}
          options={{
              header : () =>  null
          }}
        />
        <Drawer.Screen
          name='TermsConditions'
          component={TermsAndConditions}
          options={{
              header : () =>  null
          }}
        />
        <Drawer.Screen
            name='Tellusyourself'
            component={TellAboutSelf}
            options={{
                header : () =>  null
            }}
        />
        <Drawer.Screen
            name='SuccessFullRegist'
            component={SuccessfullRegistration}
            options={{
                header : () =>  null
            }}
        />
        <Drawer.Screen 
            name="HomePage" 
            component={HomePage} 
            options={{
              header: () => null
            }} 
        />
        <Drawer.Screen
            name='ProfileScreen'
            component={ProfileScreen}
            options={{
                header : () =>  null
            }}
        />
        <Drawer.Screen
            name='ProfileEdit'
            component={ProfileEdit}
            options={{
                header : () =>  null
            }}
        />
        <Drawer.Screen
            name='WalletScreen'
            component={WalletScreen}
            options={{
                header : () =>  null
            }}
        />
      <Drawer.Screen
            name='Transactions'
            component={TransactionHistory}
            options={{
                header : () =>  null
            }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})