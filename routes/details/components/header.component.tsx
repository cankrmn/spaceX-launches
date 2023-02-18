import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import colors from "../../../utils/color.util";

interface HeaderArgs {
	image: string;
	title: string;
	date: Date;
}

const { width, height } = Dimensions.get("screen");

const Header = ({ image, title, date }: HeaderArgs) => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: image }}
				style={{ aspectRatio: 1, height: "80%", marginRight: width * 0.02 }}
			/>
			<View style={{ marginLeft: width * 0.03 }}>
				<Text style={styles.text_header}>{title}</Text>
				<View style={{ height: height * 0.005 }} />
				<Text style={styles.text_small}>{`${date.toDateString()} ${date
					.toLocaleTimeString()
					.slice(0, date.toLocaleTimeString().lastIndexOf(":"))}`}</Text>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		height: height * 0.12,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "transparent",
		paddingHorizontal: width * 0.03,
		borderBottomWidth: 1,
		borderBottomColor: colors.blues[500],
	},
	text_header: {
		fontWeight: "900",
		fontSize: width * 0.056,
	},
	text_small: {
		fontWeight: "400",
		fontSize: width * 0.04,
	},
});
