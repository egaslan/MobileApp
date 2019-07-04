import React, { Component } from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, View, Text,Dimensions,SafeAreaView,Alert,ImageBackground} from "react-native";
import {Header, Left, Icon, Right, Title, Container, Content, Body, Button, Card, Tabs,Tab,TabHeading, CardItem,Spinner, Thumbnail} from 'native-base'

import HTML from 'react-native-render-html';
import { Div } from 'react-native-div' ;
let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height


export default class Categories extends React.Component {

    static navigationOptions = {
        title: "Soru/Cevap",
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-chatbubbles" style={{fontSize:24, color: tintColor}}/>
        )
    };
    constructor(props){
        super(props);
        this.state ={
            dataSource: [],
            loading: false,
        }
    };
    componentDidMount(){
        return fetch('http://xxxxxx/api', {  //YOUR API URL
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "api_key": "xxxxxx", //YOUR API KEY
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            dataSource : responseJson.data.categories,
            loading : true,
            },
            function(){});

        })
        .catch((error) =>{
            console.error(error);
        });
    };

    categories_content(){
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
                <ScrollView>
                    {data.map((item,index)=>{
                        return (
                            <TouchableOpacity key={item.pf_share_question_category_id} onPress={()=> this.props.navigation.navigate('Questions',{
                            title    : item.pf_share_question_category_name,
                            content  : item.pf_share_question_category_description,
                            id       : item.pf_share_question_category_id,
                            page     : "Categories",
                            }
                            )}>  
                                <Card style={{backgroundColor:'#ddd'}}>
                                    <CardItem style={{borderColor:"#26a69a", borderWidth: 2}}>
                                        <Left>
                                            <Thumbnail
                                            key={item.pf_share_question_category_id}
                                            style={{width: 50, height: 50}}
                                            source={{uri: 'https://xxxxxxx/'+ item.pf_share_question_category_image }}
                                            />
                                            <Body>
                                                <Text style={{color: "#26a69a",fontSize: 18,fontWeight: 'bold'}}>{item.pf_share_question_category_name}</Text>
                                                <HTML html={item.pf_share_question_category_description}/>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    </Card>
                            </TouchableOpacity>
                        );
                  })}
                </ScrollView>
            );
        }    
    };
    render(){
        return(
            <View style={{flex:1}}>   
                <Container>
                    <Header transparent hasTabs style={{ backgroundColor: '#26a69a',height:80}} iosBarStyle={"light-content"}
                        androidStatusBarColor="rgba(0,0,0,0.251)" transparent noShadow  >
                        <ImageBackground source={require('MobileApp/assets/petfriends2.jpg')} style={{height:85 , width: SCREEN_WIDTH,position: "absolute",top: 0, left:0}}>
                            <Div style={{position: "absolute",top: 6, left:5}} >
                                <Left>
                                    <Button transparent >
                                        <Icon style={{fontWeight: 'bold',fontSize:40}} name='ios-menu' onPress={()=>this.props.navigation.openDrawer()}/>
                                    </Button>
                                </Left>
                                <Body style={{position: "absolute",left:(SCREEN_WIDTH/3),alignItems: 'center',justifyContent: "center" }}>
                                    <Title style={{fontWeight: 'bold'}} transparent center>Petfriends.social  </Title>
                                </Body>
                            </Div>
                        </ImageBackground>
                    </Header>
                    <Content style={{backgroundColor:'#ddd'}}>
                        {this.categories_content()}
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
  