/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const royalBlue100 = "#E6E9F0";
export const royalBlue500 = "#4169E1";
export const royalBlue600 = "#2F50C1";

export const ritual100 = "#F4F2F8";
export const ritual200 = "#EAE7F2";
export const ritual300 = "#CDCAD9";
export const ritual400 = "#A7A3B3";
export const ritual500 = "#757281";

export const Colors = {
  primary: royalBlue600,
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  button: {
    primary: {
      background: royalBlue600,
      text: "white",
      pressedBackground: royalBlue500,
      disabled: ritual200,
      disabledText: ritual400

    },
    secondary: {
      background: "white",
      text: royalBlue600,
      pressedBackground: royalBlue100,
      disabled: ritual100,
      disabledText: ritual300,
    },
  }
};
