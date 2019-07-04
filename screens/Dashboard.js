import React from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity, View, Text,Dimensions,SafeAreaView,StatusBar } from "react-native";
import {Header, Left, Icon, Title, Container, Content, Body, Button, Card, Tabs,Tab,TabHeading,ScrollableTab } from 'native-base'

import { Div } from 'react-native-div' ;
import Expo from "expo";

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height

export default class Dashboard extends React.Component {

    static navigationOptions = {
        title: "Anasayfa",
        drawerIcon: ({tintColor}) => (
            <Icon name="home" style={{fontSize:24, color: tintColor}}/>
        )
    }
    constructor(props){
        super(props);
        this.state ={
            dataSource: [],
            loading: true,
        }
    }

    componentDidMount(){
        StatusBar.setHidden(true);
        return fetch('http://xxxxxx', { //YOUR API URL
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "api_key": "xxxxxx", //YOUR API KEY
            "start": 0,
            "limit": 30,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            dataSource : responseJson.data,
            },
            function(){});
        })
        .catch((error) =>{
            console.error(error);
        });
    };
  

    dashboard_content(){
        let data = this.state.dataSource
            return (
                <SafeAreaView style={styles.container}>
                <ScrollView>
                    {data.map((item,index)=>{

                        if(item.ed_information_title!=null){

                             return (
                                <TouchableOpacity key={index} onPress={()=> this.props.navigation.navigate('Information_Detail',{
                                   title : item.ed_information_title,
                                   subtitle: item.ed_information_subtitle,
                                   content : item.ed_information_content,
                                   image : item.ed_information_image_path,
                                   page:"Dashboard",
                                   }
                                )}>
                                <View>
                                    <Div style={styles.card}>
                                    
                                        <Image 
                                            style={{width: SCREEN_WIDTH, height: (13*SCREEN_WIDTH/20), resizeMode:"cover",borderRadius: 8}}
                                            source={{uri: 'https://xxxxxx/'+ item.ed_information_image_path }} //YOUR API URL 
                                        />
                                        <View>
                                            <Text style={{ fontSize: 18,fontWeight: 'bold', textAlign: 'left', margin:(5,5,0,5) }}>{item.ed_information_title}</Text>
                                            <Text style={{ fontSize: 14, textAlign: 'left', margin:(0,5,5,5) }}>{item.ed_information_subtitle}</Text>
                                           
                                        </View>
                                    </Div>
                                </View>
                              
                                </TouchableOpacity>

                            );
                        }else if(item.ed_gallery_news_title!=null){
                            return (
                                <TouchableOpacity key={index} onPress={()=> this.props.navigation.navigate('New_Detail',{
                                   title : item.ed_gallery_news_title,
                                   subtitle: item.ed_gallery_news_subtitle,
                                   content : item.ed_gallery_news_content,
                                   id : item.ed_gallery_news_id,
                                   page:"Dashboard",
                                   }
                                )}>
                                    <View>
                                        <Div style={styles.card}>
                                            
                                            <Image
                                                style={{width: SCREEN_WIDTH, height: 300}}
                                                source={{uri: 'https://xxxxxx/'+ item.images[0].ed_gallery_news_image_path}} //YOUR API URL 
                                            />
                                            <Icon transparent name="images" style={{fontSize: 30, color: '#fff', position: "absolute", top: 5, left:5  }} ></Icon>
                                            <View>
                                                <Text style={{fontSize: 18, textAlign: 'left', margin:(5,5,5),fontWeight: 'bold' }}>{item.ed_gallery_news_title}</Text>
                                                <Text style={{fontSize: 16, textAlign: 'left', margin:(5,5,5,5)}}>{item.ed_gallery_news_subtitle}</Text>
                                            </View>
                                        </Div>
                                    </View>
                                </TouchableOpacity>
                            );
                        }else if(item.pf_share_question_header!=null){
                            return (
                                <TouchableOpacity key={index} onPress={()=> this.props.navigation.navigate('Question_Detail',{
                                    id   : item.pf_share_question_id,
                                    page : "Dashboard",
                                    }
                                )}>
                                <View>
                                    <Div>
                                        <Image 
                                            style={{width: 50, height: 50}}
                                            source={{uri: 'https://xxxxxx/'+ item.pf_owner_profile_image}} //YOUR API URL 
                                        />
                                        <Text>{item.pf_owner_name} {data.pf_owner_surname} tarafından</Text>
                                        <Text>{item.pf_share_question_created} tarihinde paylaşıldı</Text>
                                    </Div>
                                    <View>
                                        <Text>{item.pf_share_question_header}</Text>
                                        <Text>{item.pf_share_question_description}</Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </ScrollView>
                </SafeAreaView>
            );
    };
    dashboard_information_content(){
        let data = this.state.dataSource
            return (
                <SafeAreaView style={styles.container}>
                <ScrollView>
                    {data.map((item,index)=>{

                        if(item.ed_information_title!=null){

                             return (
                                <TouchableOpacity key={index} onPress={()=> this.props.navigation.navigate('Information_Detail',{
                                   title : item.ed_information_title,
                                   subtitle: item.ed_information_subtitle,
                                   content : item.ed_information_content,
                                   image : item.ed_information_image_path,
                                   page:"Dashboard",
                                   }
                                )}>
                                <View>
                                    <Div style={styles.card}>
                                        <Image 
                                            style={{width: SCREEN_WIDTH, height: (13*SCREEN_WIDTH/20), resizeMode:"cover",borderRadius: 8}}
                                            source={{uri: 'https://xxxxxx/'+ item.ed_information_image_path }} //YOUR API URL 
                                        />
                                        <View>
                                            <Text style={{ fontSize: 18,fontWeight: 'bold', textAlign: 'left', margin:(5,5,0,5) }}>{item.ed_information_title}</Text>
                                            <Text style={{ fontSize: 14, textAlign: 'left', margin:(0,5,5,5) }}>{item.ed_information_subtitle}</Text>
                                           
                                        </View>
                                    </Div>
                                </View>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </ScrollView>
                </SafeAreaView>
            );
    };
    dashboard_new_content(){
        let data = this.state.dataSource
            return (
                <SafeAreaView style={styles.container}>
                <ScrollView>
                    {data.map((item,index)=>{

                        if(item.ed_gallery_news_title!=null){
                            return (
                                <TouchableOpacity key={index} onPress={()=> this.props.navigation.navigate('New_Detail',{
                                   title : item.ed_gallery_news_title,
                                   subtitle: item.ed_gallery_news_subtitle,
                                   content : item.ed_gallery_news_content,
                                   id : item.ed_gallery_news_id,
                                   page:"Dashboard",
                                   }
                                )}>
                                    <View>
                                        <Div style={styles.card}>
                                            
                                            <Image
                                                style={{width: SCREEN_WIDTH, height: 300}}
                                                source={{uri: 'https://xxxxxxx/'+ item.images[0].ed_gallery_news_image_path}} //YOUR API URL 
                                            />
                                            <Icon transparent name="images" style={{fontSize: 30, color: '#fff', position: "absolute", top: 5, left:5  }} ></Icon>
                                            <View>
                                                <Text style={{fontSize: 18, textAlign: 'left', margin:(5,5,5),fontWeight: 'bold' }}>{item.ed_gallery_news_title}</Text>
                                                <Text style={{fontSize: 16, textAlign: 'left', margin:(5,5,5,5)}}>{item.ed_gallery_news_subtitle}</Text>
                                            </View>
                                        </Div>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </ScrollView>
                </SafeAreaView>
            );
    };
    async componentWillMount() {
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });
    }
    
    render(){
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return(
            <View style={{flex:1}}>   
                <Container>
                    <Header hasTabs style={{ backgroundColor: '#26a69a',height:50}} iosBarStyle={"light-content"}
                        androidStatusBarColor="rgba(0,0,0,0.251)" transparent noShadow  >
                        <Div style={{flex: 1, justifyContent:"space-between",alignItems:'center',flexDirection: 'row',position: "absolute",top: 5, left:5 }}>
                            <Left>
                                <Button transparent >
                                    <Icon name='ios-menu' onPress={()=>this.props.navigation.openDrawer()}/>
                                </Button>
                            </Left>
                            <Body style={{position: "absolute",left:(SCREEN_WIDTH/3),alignItems: 'center',justifyContent: "center" }}>
                                <Title transparent center style={{fontWeight: 'bold'}}>Petfriends.social  </Title>
                            </Body>
                        </Div>
                    </Header>
                    <Content>
                        <Tabs transparent renderTabBar={()=> <ScrollableTab style={{ backgroundColor: "#26a69a" }} />}>
                        
                            <Tab heading={ <TabHeading style={{ backgroundColor: "#26a69a" }}><Icon name="home"  /><Text style={{ color: "#fff",fontWeight: 'bold'}}> Anasayfa </Text></TabHeading>}>
                                <Card>
                                    {this.dashboard_content()}
                                </Card>
                            </Tab>

                            <Tab heading={ <TabHeading style={{ backgroundColor: "#26a69a" }}><Text style={{ color: "#fff",fontWeight: 'bold'}}> Bilgiler </Text></TabHeading>} >
                                <Card>
                                    {this.dashboard_information_content()}
                                </Card>
                            </Tab>
                            <Tab heading={ <TabHeading style={{ backgroundColor: "#26a69a" }}><Text style={{ color: "#fff",fontWeight: 'bold'}}> Haberler </Text></TabHeading>}>
                                <Card>
                                    {this.dashboard_new_content()}
                                </Card>
                            </Tab>
                        </Tabs> 
                    </Content>
                </Container>
            </View>
        );
    }
}

const tabProps = {
    underlineStyle: {
        borderColor: '#000',
        boderWidth: 5,
        backgroundColor: '#26a69a',
        color: '#26a69a',
    }
};

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
