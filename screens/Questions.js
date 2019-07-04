import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Dimensions, ImageBackground} from "react-native";
import {Header, Left, Icon, Title, Container, Content, Body, Button, Card, CardItem, Thumbnail} from 'native-base'

import { Div } from 'react-native-div' ;

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height


export default class Questions extends React.Component {

    static navigationOptions = {
        title: "Questions",


    };
    constructor(props){
        super(props);
        this.state ={
            dataSource: [],
            isLoading   : true,
            id          : this.props.navigation.state.params.id,
            title       : this.props.navigation.state.params.title,
            htmlContent : this.props.navigation.state.params.content,
            page        : this.props.navigation.state.params.page,
        }
    };

    componentDidMount(){
        return fetch('http://xxxxxxx', { //YOUR API URL 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "api_key": "xxxxxx",  //YOUR API KEY 
            "question_category_id": this.state.id,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            dataSource : responseJson.data.questions,
            },
            function(){});

        })
        .catch((error) =>{
            console.error(error);
        });
    };

    questions_content(){
        let data = this.state.dataSource;
        let counter = 0;
            return (
                <ScrollView>
                    {data.map((item,index)=>{
                        return (
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Question_Detail',{
                                id        : item.pf_share_question_id,
                                page     : "Questions",
                                }
                            )}> 
                                <Card style={{backgroundColor:'#ddd'}}>
                                    <CardItem style={{borderColor:"#26a69a", borderWidth: 2}}>
                                        <Left>
                                            <Thumbnail
                                            key={item.pf_share_question_category_id}
                                            style={{width: 70, height: 70}}
                                            source={{uri: 'https://xxxxxx/'+ item.owner.pf_owner_profile_image}} //YOUR API URL 
                                            />
                                            <Body>
                                                <Text style={{color: "#26a69a",fontSize: 18}}>{item.pf_share_question_header}</Text>
                                                <Text>{item.pf_share_question_description}</Text>
                                                <Text style={{color: "#ccc"}}>{item.owner.pf_owner_name} {item.owner.pf_owner_surname}</Text>
                                                <Text>{item.pf_share_question_created}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        );
                  })}
                </ScrollView>
            );
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
                        {this.questions_content()}
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
  