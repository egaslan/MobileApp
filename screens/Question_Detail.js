import React, { Component } from "react";
import { StyleSheet,View, ScrollView, Text, Dimensions, ImageBackground} from "react-native";
import {Header, Left, Icon, Title, Container, Content, Body, Button, Card, CardItem, Thumbnail} from 'native-base';

import { Div } from 'react-native-div';

let SCREEN_WIDTH = Dimensions.get('window').width

export default class Question_Detail extends React.Component {

    static navigationOptions = {
        title: "Question_Detail",

    };
    constructor(props){
        super(props);
        this.state ={
            isLoading   : true,
            id   : this.props.navigation.state.params.id,
            page : this.props.navigation.state.params.page,
            dataComment : [],
            dataSource  : [],
        }
    };
    
    componentDidMount(){
        return (
            fetch('http://xxxxxx', {  //YOUR API URL 
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                "api_key": "xxxxxx",  //YOUR API KEY 
                "question_id": this.state.id,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                dataSource  : responseJson.data.question,
                dataComment : responseJson.data.comments,
                },
                function(){});

            })
            .catch((error) =>{
                console.error(error);
            })
        );
    };
    question_detail_content(){
        let comment = this.state.dataComment;
        let data = this.state.dataSource;
        if(comment !==""){
            return (
                <ScrollView>
                    <View>
                        <Card style={{flex: 0}}>
                            <CardItem>
                                <Left>
                                    <Thumbnail style={{width: 70, height: 70}}
                                    source={{uri: 'https://xxxxxx/'+ data.pf_owner_profile_image}} /*YOUR API URL  */ /> 
                                    <Body>
                                        <Text  style={{color: "#26a69a",fontSize: 18}}>{data.pf_share_question_header}</Text>
                                        <Text>{data.pf_share_question_description}</Text>
                                        <Text style={{color: '#ccc', fontWeight: 'bold'}}>{data.pf_owner_name} {data.pf_owner_surname} tarafından,</Text>
                                        <Text>{data.pf_share_question_created} tarihinde paylaşıldı.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Text> Petfriends.social üyelerinin cevapları:</Text>
                        <Card style={{flex: 0}}>
                            {comment.map((item,index)=>
                                <CardItem>
                                    <Left>
                                        <Thumbnail style={{width: 70, height: 70}}
                                        source={{uri: 'https://xxxxxxx/'+ item.pf_owner_profile_image}} /* YOUR API URL  */ /> 
                                        <Body>
                                        <Text style={{color: '#26a69a', fontWeight: 'bold' }}>{item.pf_owner_name}</Text>
                                        <Text>{item.pf_comment_text}</Text>
                                        <Text>{item.pf_comment_created}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            )}
                        </Card>
                    </View>
                </ScrollView>
            );
        }
    }
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
                    <Content>
                        
                            {this.question_detail_content()}
                        
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
  