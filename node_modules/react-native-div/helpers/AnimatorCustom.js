import {
  Animated,
  Easing,
} from 'react-native'

//this.state.animatedStartValue = 0;

const _cycleAnimation = function( payload ) {
  Animated.sequence( payload.sequence ).start(() => {
    _cycleAnimation( payload );
  });
}

const _buildSingleAnimation = function ( payload ) {
  var duration = payload.t * 1000 ;
  var type = 'timing' ;
  if ( typeof payload.f == 'number' ) type = 'spring' ;
  if ( typeof payload.x == 'number' ) return Animated[ type ]( this.state.animation[ 'translateX' ] , { useNativeDriver : true , toValue : payload.x , duration : duration , friction : payload.f } )  ;
  if ( typeof payload.y == 'number' ) return Animated[ type ]( this.state.animation[ 'translateY' ] , { useNativeDriver : true , toValue : payload.y , duration : duration , friction : payload.f } )  ;
  if ( typeof payload.s == 'number' ) return Animated[ type ]( this.state.animation[ 'scale' ] , { useNativeDriver : true , toValue : payload.s , duration : duration , friction : payload.f } )  ;
  if ( typeof payload.r == 'number' ) return Animated[ type ]( this.state.animation[ 'rotate' ] , { useNativeDriver : true , toValue : payload.r , duration : duration , friction : payload.f } )  ;
  if ( typeof payload.o == 'number' ) return Animated[ type ]( this.state.animation[ 'opacity' ] , { useNativeDriver : true , toValue : payload.o , duration : duration , friction : payload.f } )  ;
}

const _buildParallelAnimation = function( payload ) {
  var step = [] ;
  if ( typeof payload.x == 'number' ) step.push( _buildSingleAnimation.call( this , { x : payload.x , t : payload.t , f : payload.f } ) ) ;
  if ( typeof payload.y == 'number' ) step.push( _buildSingleAnimation.call( this , { y : payload.y , t : payload.t , f : payload.f } ) ) ;
  if ( typeof payload.s == 'number' ) step.push( _buildSingleAnimation.call( this , { s : payload.s , t : payload.t , f : payload.f } ) ) ;
  if ( typeof payload.r == 'number' ) step.push( _buildSingleAnimation.call( this , { r : payload.r , t : payload.t , f : payload.f } ) ) ;
  if ( typeof payload.o == 'number' ) step.push( _buildSingleAnimation.call( this , { o : payload.o , t : payload.t , f : payload.f } ) ) ;
  return Animated.parallel( step );
}

const AnimatorCustom = function( payload ) {
  var me = this ;
  var steps = [] ;
  var anim = payload.anim ;
  const { callback } = payload ;

  var animation = {
    translateX : new Animated.Value( 0 )
  , translateY : new Animated.Value( 0 )
  , scale : new Animated.Value( 1 )
  , rotate : new Animated.Value( 0 )
  , opacity : new Animated.Value( 1 )
  } ;

  try { 
    this.setState( { animation : animation } ) ;
    var seqs = [] ;
    for( let x = 0 ; x < anim.length ; ++x ){
      if ( !anim[ x ].x ) anim[ x ].x = 0 ;
      if ( !anim[ x ].y ) anim[ x ].y = 0 ;
      if ( !anim[ x ].s ) anim[ x ].s = 1 ;
      if ( !anim[ x ].o ) anim[ x ].o = 1 ;
      if ( !anim[ x ].r ) anim[ x ].r = 0 ;

      seqs.push( _buildParallelAnimation.call( this , { y : anim[ x ].y , x : anim[ x ].x , t : anim[ x ].t , r : anim[ x ].r , s : anim[ x ].s , o : anim[ x ].o , f : anim[ x ].f } ) )
    }
    Animated.sequence( seqs ).start() ;


  } catch( e ) {

  }

  if ( typeof callback == 'function' ) setTimeout( ()=>{ callback() ; } , 100 ) ;

}

export default AnimatorCustom 