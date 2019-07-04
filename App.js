import React, { Component } from "react";
import { Image, View, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { createStackNavigator, createDrawerNavigator, DrawerItems}  from 'react-navigation';

import Dashboard from           './screens/Dashboard';
import Informations from        './screens/Informations';
import News from                './screens/News';
import Categories from          './screens/Categories';
import Contact from             './screens/Contact';
import Information_Detail from  './screens/Information_Detail';
import New_Detail from          './screens/New_Detail';
import Questions from           './screens/Questions';
import Question_Detail from     './screens/Question_Detail';

const {width} = Dimensions.get('window') //tam ekran

export default class App extends React.Component {
  render() {
    return (
        <AppStackNavigator/>,  
        <AppDrawerNavigator/>
    );
  }
}

const CustomDrawerComponent = (props) =>(

  <SafeAreaView style={{flex:1, }}>
    <View style={{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('./assets/petfriends_social.jpg')} style={{height:120, width: 120, borderRadius: 60}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({

    Dashboard           : Dashboard,
    Informations        : Informations,
    News                : News,
    Categories          : Categories,
    Contact             : Contact,

    Information_Detail: {
        screen: Information_Detail,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    New_Detail: {
      screen: New_Detail,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Questions: {
      screen: Questions,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Question_Detail: {
      screen: Question_Detail,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    
},{
   contentComponent: CustomDrawerComponent,
   drawerWidth: (3*width/4), //tam ekran
   contentOptions:{
        activeTintColor: '#26a69a'
   },
});

const AppStackNavigator = createStackNavigator({

    Dashboard          : Dashboard,
    Informations       : Informations,
    News               : News,
    Categories         : Categories,
    Contact            : Contact,
    Information_Detail : Information_Detail,
    New_Detail         : New_Detail,
    Questions          : Questions,
    Question_Detail    : Question_Detail,
});
