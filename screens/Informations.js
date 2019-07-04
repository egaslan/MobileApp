import React from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity, View, Text,Dimensions,SafeAreaView,ImageBackground } from "react-native";
import {Header, Left, Icon, Title, Container, Content, Body, Button, Card, Spinner, } from 'native-base'

import HTML from 'react-native-render-html';
import { Div } from 'react-native-div' ;

let SCREEN_WIDTH = Dimensions.get('window').width

export default class Informations extends React.Component {

    static navigationOptions = {
        title: "Bilgiler",
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-information-circle" style={{fontSize:24, color: tintColor}}/>
        )
    };
    constructor(props){
        super(props);
        this.state ={
            initialPage: 1, 
            activeTab: 1,
            dataSource: [],
            loading: false,
        }
    };
    componentDidMount(){
        return fetch('http://xxxxxx', { //YOUR API URL 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "api_key": "xxxxxxx", //YOUR API KEY 
            "start": 0,
            "end": 30
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            dataSource : responseJson.data.informations,
            loading : true,
            },
            function(){});

        })
        .catch((error) =>{
            console.error(error);
        });
    };

    informations_content(){
        let data = this.state.dataSource
        if (!this.state.loading) {
            return (
            <Container>
                <Content>
                    <Spinner color='#26a69a' />
                </Content>
            </Container>
            );
        }else if (this.state.loading){
            return (
                <SafeAreaView style={styles.container}>
                <ScrollView>
                    {data.map((item,index)=>{
                            return (
                                
                                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Information_Detail',{
                                    title : item.ed_information_title,
                                    subtitle: item.ed_information_subtitle,
                                    content : item.ed_information_content,
                                    image : item.ed_information_image_path,
                                    page:"Informations",
                                    }
                                    )}>
                                    <View>
                                        <Div style={styles.card}>
                                            <Image
                                            style={{width: SCREEN_WIDTH, height: (13*SCREEN_WIDTH/20), resizeMode:"cover",borderRadius: 8}}
                                                source={{uri: 'https://xxxxxx/'+ item.ed_information_image_path }}  //YOUR API URL 
                                            />
                                            <View >
                                                <Text style={{ fontSize: 18,fontWeight: 'bold', textAlign: 'left', margin:(5,5,0,5) }}>{item.ed_information_title}</Text>
                                                <Text style={{ fontSize: 14, textAlign: 'left', margin:(0,5,5,5) }}>{item.ed_information_subtitle}</Text>
                                            </View>
                                        </Div>
                                    </View>
                                    </TouchableOpacity>
                                
                            );
                  })}
                </ScrollView>
                </SafeAreaView>
            );
        }
    };
    

    render(){

        return(
            <View style={{flex:1}}>   
                <Container>
                    <Header transparent hasTabs style={{ backgroundColor: '#26a69a',height:80}} iosBarStyle={"light-content"}
                        androidStatusBarColor="rgba(0,0,0,0.251)" transparent noShadow  >
                        <ImageBackground source={require('MobileApp/assets/petfriends1.jpg')} style={{height:85 , width: SCREEN_WIDTH,position: "absolute",top: 0, left:0}}>
                            <Div style={{position: "absolute",top: 5, left:5}} >
                                <Left>
                                    <Button transparent >
                                        <Icon name='ios-menu' onPress={()=>this.props.navigation.openDrawer()}/>
                                    </Button>
                                </Left>
                                <Body style={{position: "absolute",left:(SCREEN_WIDTH/3),alignItems: 'center',justifyContent: "center" }}>
                                    <Title transparent center>Petfriends.social  </Title>
                                </Body>
                            </Div>
                        </ImageBackground>
                    </Header>
                    <Content>
                        <Card>
                            {this.informations_content()}
                        </Card>
                    </Content>
                </Container>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    card:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: (0,5,5,5),
        padding: (0,5,5),
        borderRadius: 8,
    },
    textt:{
        color:'#212121',
        textAlign: 'center',
    },  

  });
  