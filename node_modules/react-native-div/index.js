
import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  Easing,
  Dimensions,
  Text,
  PanResponder,
} from 'react-native'

import * as Styler from './helpers/Styler'
import * as Status from './status/index'
import Animator from './helpers/Animator'
import AnimatorCustom from './helpers/AnimatorCustom'

let displayWidth = Status.displayWidth
,   displayHeight = Status.displayHeight
,   orientation = Status.orientation

export class Div extends Component {

  static propTypes = {
    ...View.propTypes,
  }

  constructor(props) {
    super(props)
    this._onPress = this._onPress.bind( this );
    this._handleScroll = this._handleScroll.bind( this );
    this._needsToBeAnimated = this._needsToBeAnimated.bind( this ) ;
    this._animate = this._animate.bind( this) ;
    this._animateCustom = this._animateCustom.bind( this) ;
    this._initAnimation = this._initAnimation.bind( this ) ;
    this._initPan = this._initPan.bind( this ) ;
    this.Status = {}
  } ;

  // TOUCH EVENTS ON SCREEN

  _panResponder = {} ;


  _handleStartShouldSetPanResponder( e , gestureState ){
    return true
  }

  _handleMoveShouldSetPanResponder( e , gestureState ){
    return true
  }

  _handlePanResponderGrant( e , gestureState ){
    Status.touch = { moveX : gestureState.x0 , moveY : gestureState.y0 };
  }

  _handlePanResponderMove( e , gestureState ){
    Status.touch = { moveX : gestureState.moveX , moveY : gestureState.moveY };
  }

  _handlePanResponderEnd( e , gestureState ){
    //console.log( 'end' ) ;
  }

  componentWillMount() {
    this._initAnimation();
    if ( this.props.activatePan ) {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handlePanResponderMove,
        onPanResponderRelease: this._handlePanResponderEnd,
        onPanResponderTerminate: this._handlePanResponderEnd,
      });
    }
  }

  _initAnimation(){
    this.setState({
      animation : {
        scale : null,
        opacity : this.props.animateStartVisible || this.props.animateAfter ? null : new Animated.Value( 0 ), // this should always be setted as 0
        translateX : null,
        translateY : null,
        rotate : null,
        rotateDeg : null,
      },
      ready : true,
    })
  }

  componentDidMount() {
    const delay = this.props.delay ;
    const me = this ;
    if ( this.props.animate || this.props.animateCustom ) {
      setTimeout( () => { 
        if ( me.state.animation ) {
          if ( this.props.animate ) { 
            me._animate( this.props.animate ) ;
            console.log( 'animate' )
          } ;
          if ( this.props.animateCustom ) { 
            me._animateCustom( this.props.animateCustom ) ;
            console.log( 'animateCustom' )
          } ;
        }
      } , delay * 1000 ) ;
    }
  }

  _initPan(){
    var me = this;
    if ( me.props.touch ) {
      console.log( 'mounted!' )
      setTimeout( ()=>{
        me.refs.touch.measure( (fx, fy, width, height, px, py) => {
          me.setState({ 
            touchableArea : {
              xStart  : px
            , xEnd    : px + width
            , yStart  : py
            , yEnd    : py + height
            } 
          })
        })
      } , 10 ) ;
      this.touchEngine = setInterval( () => {
        var ta = me.state.touchableArea ;
        if ( ta ) {
          if (  Status.touch.moveX >= ta.xStart  && 
                Status.touch.moveX <= ta.xEnd    &&
                Status.touch.moveY >= ta.yStart  &&
                Status.touch.moveY <= ta.yEnd ) {
            if ( me.refs.anim ) {
              me.refs.anim.setNativeProps({ style : { backgroundColor : 'orange' }});
              me._animate( 'ruzzleLetterOn' );
              if ( this.props.action ) {
                this.props.action() ;
              }
              clearInterval( me.touchEngine )
            }
          }
        }
        
      } , 20 )
    }
  }

  _needsToBeAnimated() {
    let result = false  ;
    this.props.animate  || this.props.animateCustom  || this.props.animateAfter ? result = true : 0 ;
    return result
  }

  _animate( name , callback ) {
    setTimeout( ()=>{
      Animator.bind( this , { name , callback } )() ;
    } , 10 )
    
  }

  _animateCustom( payload , callback ) {
    setTimeout( ()=>{
      AnimatorCustom.bind( this , { anim : payload , callback : callback } )() ;
    } , 10 )
    
  }

  _handleScroll( e ) {
    if ( this.props.scroll ) {
      Status.scroll.y = e.nativeEvent.contentOffset.y ;
    }
  }

  _onPress() {
    var me = this ;
    if ( this.props._onPress ) {
      if ( this.props.animateAfter ) {
        if ( me.state.animation ) {
          if ( this.props.animate ) { 
            me._animate( this.props.animateAfter )           
          }
          if ( this.props.animateCustom ) { 
            me._animateCustom( this.props.animateCustom )           
          }
        }
        setTimeout( () => { 
          this.props._onPress() ;
        } , 1000 ) ;
      } else {
        this.props._onPress() ;
      }
    }
  }

  componentWillReceiveProps( nextProps ) {

  }

  render() {

    // vars bootstrap

    let style           = null
    ,   backgroundImage = null 
    ,   result          = null
    ,   attributes      = {}
    ,   imageSize       = {}
    ,   resizeMode      = 'cover'
    ,   children        = this.props.children
    ,   children2       = [] ;

    // style generator

    if ( this.props.scroll )    { /*console.log( this.props.scroll.y ) ; */              }
    if ( this.props.w )         { attributes.w                = this.props.w ;           }
    if ( this.props.h )         { attributes.h                = this.props.h ;           }
    if ( this.props.perc )      { attributes.perc             = this.props.perc ;        }
    if ( this.props.parentW )   { attributes.parentW          = this.props.parentW ;     } else { attributes.parentW = displayWidth }
    if ( this.props.parentH )   { attributes.parentH          = this.props.parentH ;     } else { attributes.parentH = displayHeight }
    if ( this.props.align )     { attributes.align            = this.props.align ;       }
    if ( this.props.vAlign )    { attributes.vAlign           = this.props.vAlign ;      }
    if ( this.props.overflow )  { attributes.overflow         = this.props.overflow ;    }
    if ( this.props.bgColor )   { attributes.backgroundColor  = this.props.bgColor ;     }
    if ( this.props.row )       { attributes.row              = this.props.row ;         }
    if ( this.props.column )    { attributes.column           = this.props.column ;      }

    style = Styler.style( { 
        name  : this.props.name
      , debug : this.props.debug
      , ...attributes
    } ) ;

    imageSize.width  = style.width ;
    imageSize.height = style.height ; 

    var borderRadius = 0 ;
    if ( this.props.style ) {
      if ( this.props.style.borderRadius ) borderRadius = this.props.style.borderRadius
    }

    if ( this.props.resizeMode ) { resizeMode = this.props.resizeMode }

    // animations manager

    if ( this._needsToBeAnimated() ) {
      animations = [ { transform : [] } ] ;
      this.state.animation.scale      ? animations[ 0 ].transform.push( { scale : this.state.animation[ 'scale' ] } )               : null ;
      this.state.animation.translateX ? animations[ 0 ].transform.push( { translateX : this.state.animation[ 'translateX' ] } )     : null ;
      this.state.animation.translateY ? animations[ 0 ].transform.push( { translateY : this.state.animation[ 'translateY' ] } )     : null ;
      this.state.animation.rotate     ? animations[ 0 ].transform.push( { rotate : this.state.animation[ 'rotate' ].interpolate( { inputRange: [ 0 , 360 ] , outputRange : [ '0deg' , '360deg' ] } ) } )             : null ;
      this.state.animation.opacity    ? animations.push( { opacity : this.state.animation[ 'opacity' ] } )                          : null ;
    }
      
    // Div + background image

    if ( this.props.source ) {
      var source = this.props.source ;
      backgroundImage = <View style={{ position : 'absolute' , top : 0 }}>
                          <Image style={ [ imageSize , { borderRadius : borderRadius } ] } source={ source } resizeMode={ resizeMode } />
                        </View> 
    }

    // Passing the parents' dimensions to the children

    React.Children.map(this.props.children, (child) => { 
      let parentW = 100 , parentH = 100;
      !child.props.parentW ? parentW = style.width : parentW = this.props.parentW ;
      !child.props.parentH ? parentH = style.height : parentH = this.props.parentH ; 
      children2.push( React.cloneElement( child , { parentW : parentW , parentH : parentH } ) ) ;
    });

    children = children2 ;
    
    // Div + touch
    
    if ( this.props._onPress ) {
      children =  <TouchableOpacity onPress={ this._onPress } style={ [ style , { backgroundColor : 'transparent' } ] }>
                    { children }
                  </TouchableOpacity>
    }
                      
    // Div + scroll
    
    if ( this.props.scroll ) {
      result =  <ScrollView onScroll={ this._handleScroll } ref="touch" scrollEventThrottle={ 200 } contentContainerStyle={ [ style , this.props.style ? this.props.style : 0 , { height : null } ] } >
                  { children }
                </ScrollView>
    } else {

      // Div + animation

      if ( this._needsToBeAnimated() ) {

        if ( this.props.touch ) {

          result =  <Animated.View ref="anim" renderToHardwareTextureAndroid style={ [ style , animations , this.props.style ? this.props.style : 0 ] } >
                      <View ref="touch" style={ [ style , { position : 'absolute' , backgroundColor : 'transparent' , width : style.width , height : style.height , left : 0 , top : 0 } ] } onLayout={ this._initPan }>
                        { backgroundImage }
                        { children }
                      </View>
                    </Animated.View>

        } else {

          result =  <Animated.View renderToHardwareTextureAndroid style={ [ style , animations , this.props.style ? this.props.style : 0 ] } >
                      { backgroundImage }
                      { children }
                    </Animated.View>

        }
        
      } else {
        
        // Div

        result =  <View ref="touch" style={ [ style , this.props.style ? this.props.style : 0 ] } {...this._panResponder.panHandlers}>
                    { backgroundImage }
                    { children }
                  </View>
      }
    } 

    return result

  }
}

export class Row extends Component {

  static propTypes = {
    ...View.propTypes,
  }

  constructor(props) {
    super(props)
  }

  render() {
    let style 
    let attributes = {}
    let children = this.props.children
    attributes.w = this.props.w
    attributes.h = this.props.h
    attributes.vAlign = this.props.vAlign
    attributes.textAlign = this.props.align

    style = Styler.style( { 
      name : 'row', 
      debug : this.props.debug,
      ...attributes
    } )


    if ( children ) {
      for ( let x = 0 ; x < children.length ; ++x ) {
        let child = children[ x ] ;
        !child.props.w ? child.props.w = this.props.w : 0 
        !child.props.h ? child.props.h = this.props.h : 0 
      }
    }

    return (
      <View style={ [ style , this.props.style ? this.props.style : 0 ] }>
        { children }
      </View>
    )
  }
}
