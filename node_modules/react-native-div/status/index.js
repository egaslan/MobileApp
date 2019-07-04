import {
  Dimensions,
  Platform,
} from 'react-native'

export const os = Platform.OS ;
export const ios = os == 'ios' ? true : false ;
export const android = os == 'android' ? true : false ;
export let displayWidth = Dimensions.get('window').width ;
export let displayHeight = Dimensions.get('window').height ;
export let orientation = displayWidth > displayHeight ? 'landscape' : 'portrait' ;

/*
 *		NAVIGATION
 */


export let page = {
		selected : 'a'
	,	a : {
			name 				: ''
		,	transition 	: ''
		,	target 			: ''
		,	toUpdate 		: false
	}
	,	b : {
			name 				: ''
		,	transition 	: ''
		,	target 			: ''
		,	toUpdate 		: false
	}
	,	modal : {
			name 				: ''
		,	transition 	: ''
		,	target 			: ''
		,	toUpdate 		: false
	}
}

export let touch = {
		moveX : 0
	,	moveY : 0
}

export function setPage( payload ) {
	page[ payload.target ].name = payload.name ;
	page[ payload.target ].transition = payload.transition ;
	page[ payload.target ].target = payload.target ;
	if ( payload.target != 'modal' ) page.selected = payload.target ;
	page[ payload.target ].toUpdate = true ;
}

export function refresh() {
	page[ 'a' ].toUpdate = true ;
	setTimeout( ()=>{ page[ 'b' ].toUpdate = true ; } , 100 ) ;
	setTimeout( ()=>{ page[ 'modal' ].toUpdate = true ; } , 200 ) ;
}

/*
 *		SCROLLING
 */

export let scroll = {
		x 				: 0
	,	y 				: 0
	,	toUpdate 	: false
}
export function setScroll( payload ) {
	scroll.x = payload.x ;
	scroll.y = payload.y ;
	scroll.toUpdate = true ;
}
