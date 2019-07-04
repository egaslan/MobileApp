# react-native-div
This is a wrapper of the View element that speeds up the process of creating graphic layouts for your React Native app; it's easy to configure and it allows you to implement animations either predefined either custom.

# Installation

`$ npm i --save react-native-div`

```javascript
import { Div } from 'react-native-div' ;

...

render(){
  return <Div w="200" h="200" bgColor="green"></Div>
}
```

# Props

prop | typeof | value | description
------ | ---- | ------- | ----
w | `string`,`number` | "200",200 | shortcut to define the Width , if the `perc` prop is true the value becomes a percentage based on the parent
h | `string`,`number` | "100",100 | shortcut to define the Height , if the `perc` prop is true the value becomes a percentage based on the parent
perc | `boolean` | true,false | defines the `Width` and the `Height` as percentage of the parent element 
align | `string` | left,center,right | alignment in horizontal mode
vAlign | `string` | top,center,bottom | alignment in vertical mode
bgColor | `string` | red,#ffcc00,.. | background color with the same values of the normal styling
column | `boolean` | true,false | align the content vertically
_onPress | `function` | func... | call a function on touch event
animate | `string` | bounceIn,bounceOutIn,.. | animate the element with a [predefined animation](#predefinedanimations)
animateCustom | `array` | [{x,y,r,s,o,t,f},{..] | animate the element with a [custom animation](#customanimation)
delay | `number` | 0,.5,1.2,.. | seconds of delay for this animation


# <a name="predefinedanimations"></a>Predefined Animations

bounceIn
bounceOutIn
bounceLeft
bounceRight
bounceUp
bounceDown
..

# <a name="customanimation"></a>Custom Animations

```javascript
render(){
  var elasticUp = [ { y : 100 , f : 1 } ] ;
  return <Div w="100" h="100" bgColor="red" animateCustom={ elasticUp } ></Div>
}
```

```javascript
render(){
  var leftRightCenter = [ { x : -100 , t : 1 } , { x : 100 , t : 2 } , { x : 0 , t : 1 } ] ;
  return <Div w="100" h="100" bgColor="red" animateCustom={ leftRightCenter } ></Div>
}
```
