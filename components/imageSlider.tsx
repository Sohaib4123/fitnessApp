import { sliderImages } from '@/constants/index';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;
const SPACING = (width - ITEM_WIDTH) / 2;

const ImageSlider = () => {
  return (
    <Carousel
      loop
      width={width}
      height={ITEM_HEIGHT}
      autoPlay
      pagingEnabled={true}
      data={sliderImages}
      scrollAnimationDuration={1500}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.85,
        parallaxScrollingOffset: 85,
      }}
      style={{ paddingHorizontal: SPACING }}
      renderItem={({ item, index, animationValue }) => {
        const animatedStyle = useAnimatedStyle(() => {
          const scale = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [0.83, 1, 0.83],
            Extrapolation.CLAMP
          );       
          return {
            transform: [{ scale }],
          };
        });

        return (
          <Animated.View style={[styles.cardContainer, animatedStyle]}>
            <Animated.Image
              source={item}
              style={[styles.image]}
              resizeMode="cover"
            />
          </Animated.View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default ImageSlider;
