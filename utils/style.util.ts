import { Dimensions } from "react-native";
import colors from "./color.util";

const { width, height } = Dimensions.get("screen");

const commonStyles = {
	container: {
		backgroundColor: colors.blues[100],
		flex: 1,
	},

	size: {
		100: width * 0.032,
		200: width * 0.045,
		300: width * 0.056,
	},
};

export default commonStyles;
