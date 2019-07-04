import React, { Component } from "react";
import {StyleSheet, View, Image,ScrollView, Text,FlatList, Dimensions } from "react-native";
import {Header, Left, Icon, Right, Title, Container, Content, Body, Button, Card, Tabs,Tab,TabHeading, CardItem,Spinner} from 'native-base'

import HTML from 'react-native-render-html';
import { Div } from 'react-native-div' ;

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height

export default class New_Detail extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
        this.state ={
            isLoading   : true,
            title       : this.props.navigation.state.params.title,
            subtitle    : this.props.navigation.state.params.subtitle,
            htmlContent : this.props.navigation.state.params.content,

            page        : this.props.navigation.state.params.page,
            id          : this.props.navigation.state.params.id,
            imageSource: [],
        }
    }
    componentDidMount(){
        return fetch('http://xxxxxx', { //YOUR API URL 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "api_key": "xxxxxx",  //YOUR API KEY 
            "id": this.state.id,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            imageSource : responseJson.data,
            },
            function(){});
        })
        .catch((error) =>{
            console.error(error);
        });
    };
    news_detail_image(){
        let dat = this.state.imageSource
        return (
        <View>
            <FlatList
                horizontal
                data={this.state.imageSource}
                renderItem={({item,index}) =>
                <Div style={styles.card}>
                    <Image
                        autoPlayWithInterval={3}
                        style={{width: SCREEN_WIDTH + 10, height: 510}}
                        source={{uri: 'https://xxxxxx/'+ item.ed_gallery_news_image_path}} //YOUR API URL 
                    />
                </Div>    
            }/>
            </View>

        )
    }
    
    news_detail_content(){
        let dat = this.state.imageSource
        return (
        <View>
            <Div style={styles.card}>
                <Text style={{ fontSize: 18,fontWeight: 'bold', textAlign: 'left', margin:(5,5,0,5) }}> {this.state.title} </Text>
                <Text style={{ fontSize: 16, textAlign: 'left', margin:(0,5,5,5) }}> {this.state.subtitle} </Text>
                <HTML html      = {this.state.htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
                <Text>  </Text>
                <Text>  </Text>
            </Div>
        </View>

        )
    }




    render() {
        let dat = this.state.imageSource
        return (
            <View style={{flex:1}}>   
                <Container>
                    <Header hasTabs style={{ backgroundColor: '#fff',height:40}} iosBarStyle={"light-content"}
                        androidStatusBarColor="rgba(0,0,0,0.251)" transparent noShadow  >
                            <Div style={{flex: 1, justifyContent:"space-between",alignItems:'center',flexDirection: 'row',position: "absolute",top: 8, left:15 }}>
                                <Left transparent style={{ flex: 1, flexDirection: 'column'}}>
                                    <Icon name='ios-arrow-back' style={{color:'#26a69a' }}
                                    onPress={()=>this.props.navigation.navigate(this.state.page)}/>
                                </Left>
                                <Body style={{position: "absolute",left:(SCREEN_WIDTH/3),alignItems: 'center',justifyContent: "center" }}>
                                    <Title transparent center style={{color:'#26a69a'}}>Petfriends.social  </Title>
                                </Body>
                            </Div>
                    </Header>
                    <Content>
                        <Card>
                            <View style={{height:500}}>
                                {this. news_detail_image()}
                            </View>
                            {this.news_detail_content()}
                        </Card>
                    </Content>
                </Container>
            </View>

        )
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
  
