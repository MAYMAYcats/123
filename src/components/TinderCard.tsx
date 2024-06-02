import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Gesture, GestureDetector, PanGestureHandler, State } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("screen").width;
export const tinderCardWidth = screenWidth * 0.8;

type TinderCard = {
  user: {
    image: string;
    name: string;
  };
  numOfCards: number;
  index: number;
  activeIndex: Animated.SharedValue <number>
  onResponse: (a: boolean) => void;
};

const TinderCard = ({
  user,
  numOfCards,
  index,
  activeIndex,
  onResponse,
}: TinderCard) => {
  const translationX = useSharedValue(0);

  const animatedCard = useAnimatedStyle(()=>({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 5, 1, 1]
    ),
    transform: [
      {
        scaleX: interpolate(
          activeIndex.value, [index - 1, index, index + 1], 
          [0.95,1,1,
        ]),
      },
      {
        scaleY: interpolate(activeIndex.value, [index - 1, index, index + 1], [
          0.95,
          1,
          1,
        ]),
      },
      {
        translateY: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [-30, 0, 0]
        ),
      },
      {
        translateX: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0, translationX.value, -screenWidth]
        ),
      },
      {
        rotateZ: `${interpolate(
          translationX.value,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-15, 0, 15]
        )}deg`,
      },
    ],
  }));

  const gesture = Gesture.Pan()
  
  .onChange((event)=>{
translationX.value = event.translationX;
activeIndex.value = interpolate(
  Math.abs(translationX.value),
  [0, 500],
  [index, index + 0.8]
);
  })

  .onEnd((event)=>{
    if (Math.abs(event.velocityX) > 400 ) {
      translationX.value = withSpring(Math.sign(event.velocityX)* 500,{
        velocity: event.velocityX,
      });
      activeIndex.value =withSpring(index +1);
      runOnJS(onResponse)(event.velocityX >0);
    } else {
      translationX.value = withSpring(0);
    }
  });
 

  
  

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.card,
          animatedCard,
          {
            zIndex: numOfCards - index,
          },
        ]}
      >
        <Image
          style={[StyleSheet.absoluteFillObject, styles.image]}
          source={{ uri: user.image }}
        />

        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />

        <View style={styles.footer}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </Animated.View>
      </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: tinderCardWidth,
    aspectRatio: 1 / 1.67,
    borderRadius: 15,
    justifyContent: "flex-end",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    borderRadius: 15,
  },
  overlay: {
    top: "50%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footer: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    color: "white",
    fontFamily: "InterBold",
  },
});

export default TinderCard;