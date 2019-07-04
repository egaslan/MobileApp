import React from "react";
import {StyleSheet, View, Image,ScrollView, Text, Dimensions, SafeAreaView } from "react-native";
import {Header, Left, Icon, Title, Container, Content, Body, Card } from 'native-base'

import HTML from 'react-native-render-html';
import { Div } from 'react-native-div' ;

let SCREEN_WIDTH = Dimensions.get('window').width

export default class Information_Detail extends React.Component {

    static navigationOptions = {
        title: "Information Detail",
    };

    constructor(props){
        super(props);
        this.state ={
            isLoading   : true,
            title       : this.props.navigation.state.params.title,
            subtitle    : this.props.navigation.state.params.subtitle,
            htmlContent : this.props.navigation.state.params.content,
            image       : this.props.navigation.state.params.image,
            page        : this.props.navigation.state.params.page,
        }
    }


    info_detail(){
        //const htmlContent = {this.state.content};
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        <Div style={styles.card}>
                            <Image
                                style={{width: SCREEN_WIDTH, height: 300, resizeMode:"cover",borderRadius: 7}}
                                source={{uri: 'https://xxxxxx/'+this.state.image}} //YOUR API URL 
                            />
                            <Div></Div>
                            <View>
                                <Text style={{ fontSize: 18,fontWeight: 'bold', textAlign: 'left', margin:(5,5,0,5) }}> {this.state.title} </Text>
                                <Text style={{ fontSize: 16, textAlign: 'left', margin:(0,5,5,5) }}> {this.state.subtitle} </Text>
                                <HTML html={this.state.htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
                                <Text>  </Text>
                                <Text>  </Text>
                            </View>
                        </Div>
                    </View>
                </ScrollView>
            </SafeAreaView>    
        );
    };

    render(){

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
                            {this.info_detail()}
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
  