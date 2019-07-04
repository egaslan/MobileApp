import React from 'react';
import { Text, View,Dimensions} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon,Header, Left, Title,  Body, Button, Card, CardItem,Form} from 'native-base';

import { Div } from 'react-native-div' ;
let SCREEN_WIDTH = Dimensions.get('window').width

export default class Contact extends React.Component {
    static navigationOptions = {
        title: "İletişim",
        //header: null // burası olursa title görünmez
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-contacts" style={{fontSize:24, color: tintColor}}/>
        )
    }

    constructor(props){
        super(props);
        this.state ={
            secondForm : false,
            name       : '' ,
            email      : '',
            subject    : '',
            message    : '',
        }
    }
    
     componentDidMount(isLoading){
        let collection ={}
        collection.name=this.state.name,
        collection.email=this.state.email,
        collection.subject=this.state.subject,
        collection.message=this.state.message
        if(isLoading){
            return fetch('http://xxxxxxx', { //YOUR API URL
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                "api_key": "xxxxxx",  //YOUR API KEY
                "pf_admin_messages_name": collection.name,
                "pf_admin_messages_email": collection.email,
                "pf_admin_messages_subject": collection.subject,
                "pf_admin_messages_text": collection.message,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource : responseJson.data.informations,
                    secondForm : true
                },
                function(){});

            })
            .catch((error) =>{
                console.error(error);
            });
        }
    };
    updateValue(text,field){
        if(field=='name'){
            this.setState({
                name:text,
            })
        } 
        else if(field=='email'){
            this.setState({
                email:text,
            })
        }
        else if(field=='subject'){
            this.setState({
                subject:text,
            })
        } 
        else if(field=='message'){
            this.setState({
                message:text,
            })
        }
    }


    render() {
       
        if(!this.state.secondForm){
            return (
                <View style={{flex:1}}>   
                    <Container>
                        <Header hasTabs style={{ backgroundColor: '#26a69a',height:70}} iosBarStyle={"light-content"}
                            androidStatusBarColor="rgba(0,0,0,0.251)" transparent noShadow  >
                            <Div style={{flex: 1, justifyContent:"space-between",alignItems:'center',flexDirection: 'row',position: "absolute",top: 5, left:5 }}>
                                <Left>
                                    <Button transparent >
                                        <Icon name='ios-menu' onPress={()=>this.props.navigation.openDrawer()}/>
                                    </Button>
                                </Left>
                                <Body style={{position: "absolute",left:(SCREEN_WIDTH/3),alignItems: 'center',justifyContent: "center" }}>
                                    <Title transparent center>Petfriends.social  </Title>
                                </Body>
                            </Div>
                        </Header>
                        <Content>
                            <Card>
                                <CardItem header>
                                    <Text style={{fontSize: 26}}>Bize Mesaj Bırakın</Text>
                                </CardItem>
                                <CardItem>
                                <Form>
                                    <Text>Editörlerimizle iletişime geçmeniz sizleri daha iyi anlamalarını sağlar. 
                                            Bu yüzden mesaj yazarken çekinmeden düşüncelerinizi bize iletebilirsiniz.</Text>
                                        <List>
                                            <ListItem>
                                                <InputGroup>
                                                    <Icon name="ios-person" style = {{ color: '#26a69a' }}/>
                                                    <Input required placeholder="İsim Soyisim *" label="name" 
                                                        onChangeText={(text)=> this.updateValue(text, 'name')}
                                                        returnKeyType="next" />
                                                </InputGroup>
                                            </ListItem>

                                            <ListItem>
                                                <InputGroup>
                                                    <Icon name="ios-mail"  style = {{ color: '#26a69a' }}/>
                                                    <Input required placeholder="E-posta *" label="email" 
                                                        onChangeText={(text)=> this.updateValue(text, 'email')} 
                                                        returnKeyType="next" />
                                                </InputGroup>
                                            </ListItem>

                                            <ListItem>
                                                <InputGroup >
                                                    <Input required inlineLabel label="subject" placeholder="Konu *" 
                                                        onChangeText={(text)=> this.updateValue(text, 'subject')} 
                                                        returnKeyType="tab" />
                                                </InputGroup>
                                            </ListItem>

                                            <ListItem>
                                                <InputGroup >
                                                    <Input required multiline label="message" required  bordered placeholder="Mesajınız *"
                                                     style={{minHeight:60, maxHeight: 150}} 
                                                     onChangeText={(text)=> this.updateValue(text, 'message')} 
                                                        returnKeyType="tab" />
                                                </InputGroup>
                                            </ListItem>

                                        </List>
                                        <Button submit block style = {{ backgroundColor: '#26a69a' }}
                                            onPress={()=>this.componentDidMount(true)}>
                                                <Text>Gönder</Text>
                                        </Button>
                                    </Form>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                </View>
            );
        }else if(this.state.secondForm){
            return (
                <View style={{flex:1}}>   
                    <Container>
                        <Header hasTabs style={{ backgroundColor: '#26a69a',height:70}} iosBarStyle={"light-content"}
                            androidStatusBarColor="rgba(0,0,0,0.251)" transparent noShadow  >
                            <Div style={{flex: 1, justifyContent:"space-between",alignItems:'center',flexDirection: 'row',position: "absolute",top: 5, left:5 }}>
                                <Left>
                                    <Button transparent >
                                        <Icon name='ios-menu' onPress={()=>this.props.navigation.openDrawer()}/>
                                    </Button>
                                </Left>
                                <Body style={{position: "absolute",left:(SCREEN_WIDTH/3),alignItems: 'center',justifyContent: "center" }}>
                                    <Title transparent center>Petfriends.social  </Title>
                                </Body>
                            </Div>
                        </Header>
                        <Content>
                            <Card>
                                <CardItem>
                                    <Text style={{fontSize: 20}}> Mesajınız bize ulaştı. </Text>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text style={{fontSize: 18}}> Teşekkür ederiz. </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                </View>
            );
        }
    }
}


