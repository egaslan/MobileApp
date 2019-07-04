import {
  Animated,
  Easing,
} from 'react-native'

//this.state.animatedStartValue = 0;

const cycleAnimation = function( payload ) {
  Animated.sequence( payload.sequence ).start(() => {
    cycleAnimation( payload );
  });
}

const Animator = function( payload ) {

      const { name , callback } = payload ;

      let animation

      switch ( name ) {

        case 'ruzzleLetterOn':

        try { 
          animation = { 
            scale : new Animated.Value( 1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 1.1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'ruzzleLetterOff':

        try { 
          animation = { 
            scale : new Animated.Value( 1.1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'zoomOut':

        try { 
          animation = { 
            scale : new Animated.Value( 1 ),
            opacity : new Animated.Value( 1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 0 , friction : 10 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 0 , friction : 10 } ).start() ;
        } catch( e ) {

        }

        break

        case 'zoomIn':

        try { 
          animation = { 
            scale : new Animated.Value( 1 ),
            opacity : new Animated.Value( 1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 2 , friction : 10 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 0 , friction : 10 } ).start() ;
        } catch( e ) {

        }

        break

        case 'bounceIn':

        try { 
          animation = { 
            scale : new Animated.Value( 0 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {
          console.log( e )
        }

        break

        case 'bounceInNoOpacity':

        try { 
          animation = { 
            scale : new Animated.Value( 0 ),
            opacity : new Animated.Value( 1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {
          console.log( e )
        }

        break

        case 'bounceInSmall':

        try { 
          animation = { 
            scale : new Animated.Value( .9 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 1 , friction : 3 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'bounceOutIn':

        try { 
          animation = { 
            scale : new Animated.Value( 2 ),
            opacity : new Animated.Value( 1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        case 'loopZoom':

        try { 
          animation = { 
            scale : new Animated.Value( 1.7
             ),
            opacity : new Animated.Value( 1 ),
          } ;
          this.setState( { 
            animation : animation
          } ) ;

          cycleAnimation( {
                            sequence : [
                                          Animated.timing( this.state.animation.scale, {
                                            toValue: 2,
                                            duration: 10000
                                          }),
                                          Animated.timing( this.state.animation.scale, {
                                            toValue: 1.7,
                                            duration: 10000
                                          })
                                        ]
                          } ) 
          
        } catch( e ) {

        }

        break

        case 'bounceDown':

        try { 
          animation = { 
          translateY : new Animated.Value( -500 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'translateY' ] , { useNativeDriver : true , toValue : 0 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'bounceUp':

        try { 
          animation = { 
          translateY : new Animated.Value( 500 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'translateY' ] , { useNativeDriver : true , toValue : 0 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'bounceLeft':

        try { 
          animation = { 
          translateX : new Animated.Value( 500 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'translateX' ] , { useNativeDriver : true , toValue : 0 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'navigatePush':

        try { 
          animation = { 
          translateX : new Animated.Value( 0 ),
            opacity : new Animated.Value( 1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'translateX' ] , { tuseNativeDriver : true , oValue : -displayWidth , friction : 10 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 10 } ).start() ;
        } catch( e ) {

        }

        break

        case 'bounceRight':

        try { 
          animation = { 
          translateX : new Animated.Value( -500 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'translateX' ] , { useNativeDriver : true , toValue : 0 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'bounceFromUpperRight':

        try { 
          animation = { 
          translateX : new Animated.Value( 100 ),
          translateY : new Animated.Value( -100 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'translateX' ] , { useNativeDriver : true , toValue : 0 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'translateY' ] , { useNativeDriver : true , toValue : 0 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'bounceFromLowerLeft':

        try { 
          animation = { 
          translateX : new Animated.Value( -100 ),
          translateY : new Animated.Value( 100 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'translateX' ] , { useNativeDriver : true , toValue : 0 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'translateY' ] , { useNativeDriver : true , toValue : 0 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'stepToLeft':

        try { 
          animation = { 
          translateX : new Animated.Value( 0 ),
            opacity : new Animated.Value( 1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'translateX' ] , { useNativeDriver : true , toValue : -60 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 5 } ).start() ;
        } catch( e ) {

        }

        break

        case 'fadeIn':

        try { 
          animation = { 
            scale : new Animated.Value( 1 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : 1 , friction : 10 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 10 } ).start() ;
        } catch( e ) {

        }

        break

        case 'rotateRight360':

        try { 
          animation = { 
            rotate : new Animated.Value( 0 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'rotate' ] , { useNativeDriver : true , toValue : 360 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 10 } ).start() ;
        } catch( e ) {

        }

        break

        case 'rotateLeft360':

        try { 
          animation = { 
          rotate : new Animated.Value( 0 ),
            opacity : new Animated.Value( 0 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.spring( this.state.animation[ 'rotate' ] , { useNativeDriver : true , toValue : -360 , friction : 5 } ).start() ;
          Animated.spring( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , friction : 10 } ).start() ;
        } catch( e ) {

        }

        break

        case 'twitter':

        try { 
          animation = { 
            rotate : new Animated.Value( 0 ),
            translateX : new Animated.Value( 0 ),
            translateY : new Animated.Value( 0 ),
            scale : new Animated.Value( 1 ),
            opacity : new Animated.Value( 1 ),
          } ;
          this.setState( { animation : animation } ) ;
          Animated.sequence([            
            Animated.parallel([          
              Animated.timing( this.state.animation[ 'rotate' ] , { useNativeDriver : true , toValue : 0 , duration : 200 , easing : Easing.elastic( 3 ) } ),
              Animated.timing( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : 1 , duration : 200 , easing : Easing.elastic( 3 ) } ),
            ]),
            Animated.parallel([          
              Animated.timing( this.state.animation[ 'translateX' ] , { useNativeDriver : true , toValue : 30 , duration : 500 , easing : Easing.elastic() } ),
              Animated.timing( this.state.animation[ 'translateY' ] , { useNativeDriver : true , toValue : 10 , duration : 500 , easing : Easing.elastic( 3 ) } ),
            ]),
            Animated.parallel([          
              Animated.timing( this.state.animation[ 'translateX' ] , { useNativeDriver : true , toValue : 0 , duration : 500 , easing : Easing.elastic() } ),
              Animated.timing( this.state.animation[ 'translateY' ] , { useNativeDriver : true , toValue : 0 , duration : 500 , easing : Easing.elastic( 3 ) } ),
            ])
          ]).start();
        } catch( e ) {

        }

      }

      if ( typeof callback == 'function' ) setTimeout( ()=>{ callback() ; } , 100 ) ;
}

export default Animator 