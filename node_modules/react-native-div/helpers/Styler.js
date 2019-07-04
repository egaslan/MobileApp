
import {
  Dimensions,
  Platform
} from 'react-native'

const os = Platform.OS ;
const android = os == 'android' ;
const ios = os == 'ios' ;

const fixAndroidText = function ( height ) {
	return { lineHeight : height + ( parseInt( height / 6 ) ) };
}

export function style( payload ) {
	let result
	const displayWidth = Dimensions.get('window').width
	const displayHeight = Dimensions.get('window').height
	switch( payload.name ) {

		case 'fullscreen':
		result = { width: displayWidth, height: displayHeight }
		break

		case 'row':
		result = { flexDirection: 'row', alignItems: 'flex-end' }
		break

		case 'cell50':
		result = { width : displayWidth / 2 }
		break

		case 'cell5050':
		result = { width : displayWidth / 2 , height : displayHeight / 2 }
		break

		case 'cell2525':
		result = { width : displayWidth / 4 , height : displayHeight / 4 }
		break

		case 'cell':
		result = { width : displayWidth }
		break

		case 'cell33':
		result = { width : displayWidth / 3}
		break

		case 'cell25':
		result = { width : displayWidth / 4 }
		break

		case 'cell20':
		result = { width : displayWidth / 5 }
		break

		default:
		result = {}
		break
	}
	if ( payload.debug ) {
		const r = parseInt( Math.random() * 255 )
		const g = parseInt( Math.random() * 255 )
		const b = parseInt( Math.random() * 255 )
		result.borderColor = `rgb(${r},${g},${b})`
		result.borderWidth = 1
		result.borderStyle = 'dashed'
	}
	if ( payload.align == 'center' ) {
		result.justifyContent = 'center'
	}
	if ( payload.align == 'left' ) {
		result.justifyContent = 'flex-start'
	}
	if ( payload.align == 'right' ) {
		result.justifyContent = 'flex-end'
	}
	if ( payload.vAlign == 'center' ) {
		result.alignItems = 'center'
	}
	if ( payload.vAlign == 'top' ) {
		result.alignItems = 'flex-start'
	}
	
	if ( typeof payload.w == 'number' ) result.width = payload.w ;
	if ( typeof payload.h == 'number' ) result.height = payload.h ;
	if ( payload.perc ) {
		result.width = result.width * payload.parentW / 100 ;
		result.height = result.height * payload.parentH / 100 ;
	}
	payload.column ? result.flexDirection = 'column' : result.flexDirection = 'row' ;
	result.flexWrap = 'wrap' ;
	typeof payload.backgroundColor != 'undefined' ? result.backgroundColor = payload.backgroundColor : 0
	payload.overflow == 'hidden' ? result.overflow = 'hidden' : 0
	return result
}

export function get( payload ) {
	let result
	const displayWidth = Dimensions.get('window').width
	const displayHeight = Dimensions.get('window').height
	switch( payload ) {

		case 'alertTitle':
		result = { backgroundColor : 'transparent' , fontSize : 24 , ...fixAndroidText( 24 ) }
		break

		case 'alertText':
		result = { backgroundColor : 'transparent' , fontSize : 12 , ...fixAndroidText( 12 ) }
		break

		case 'bodyText':
		result = { backgroundColor : 'transparent' , fontSize : 17 , textAlign : 'justify' , ...fixAndroidText( 17 ) }
		break

		case 'alertButton':
		result = { backgroundColor : 'transparent' , fontSize : 18 , fontWeight : 'bold' , textAlign : 'center' , padding : 10 , ...fixAndroidText( 18 ) }
		break

		case 'listItem':
		result = { backgroundColor : 'transparent' , marginLeft : 20 , fontSize : 17 , ...fixAndroidText( 17 ) }
		break

		case 'iconTitle':
		result = { backgroundColor : 'transparent' , marginTop : 10 , fontSize : 17 , ...fixAndroidText( 17 ) }
		break

		case 'ruzzleLetter':
		result = { backgroundColor : 'transparent' , color : 'white' , fontSize : 24 , fontWeight : 'bold' , ...fixAndroidText( 24 ) }
		break

		case 'twit':
		result = { backgroundColor : 'transparent' , fontSize : 13 , ...fixAndroidText( 13 ) }
		break

		default:
		result = {}
		break
	}
	return result
}

