import { Dimensions, PixelRatio } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Default guideline sizes for responsive design (based on common device sizes)
const guidelineBaseWidth = 375;  // iPhone X width
const guidelineBaseHeight = 812; // iPhone X height

// Responsive width function
const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

// Responsive height function
const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

// Moderate scale for elements that shouldn't grow proportionally
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// Font scale that adjusts based on pixel density
const fontScale = (size: number) => {
  const pixelRatio = PixelRatio.get();
  if (pixelRatio >= 3) {
    return moderateScale(size * 0.95);
  } else if (pixelRatio >= 2) {
    return moderateScale(size);
  }
  return moderateScale(size * 1.05);
};

// Device type detection
const isSmallDevice = SCREEN_WIDTH < 375;
const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
const isLargeDevice = SCREEN_WIDTH >= 414;

export {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};