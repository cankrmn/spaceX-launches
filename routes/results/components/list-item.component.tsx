import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Launch from "../../../@types/launch.type";
import { NativeStackParamList } from "../../../stacks/native-stack/native-stack.types";
import colors from "../../../utils/color.util";

const { width, height } = Dimensions.get("screen");

const ListItem = ({ data }: { data: Launch }) => {
	const navigation = useNavigation<NavigationProp<NativeStackParamList>>();

	const { name, details, links } = data;

	const imageUrl = links?.patch?.small;

	const handlePress = () => {
		navigation.navigate("Details", { launch: data });
	};

	return (
		<Pressable onPress={handlePress} style={styles.container}>
			{imageUrl && (
				<Image
					source={{ uri: imageUrl }}
					style={{
						aspectRatio: 1,
						width: width * 0.2,
						marginRight: width * 0.02,
					}}
				/>
			)}
			<View style={{ flex: 1 }}>
				{name && (
					<Text numberOfLines={1} style={styles.title}>
						{name}
					</Text>
				)}
				{details && (
					<Text numberOfLines={3} style={[styles.detail, { marginTop: height * 0.005 }]}>
						{details}
					</Text>
				)}
			</View>
		</Pressable>
	);
};

export default ListItem;

const styles = StyleSheet.create({
	container: {
		height: height * 0.12,
		width: "100%",
		flexDirection: "row",
		backgroundColor: colors.white,
		alignItems: "center",
		paddingHorizontal: width * 0.05,
	},
	title: {
		fontWeight: "800",
		fontSize: height * 0.024,
	},
	detail: {
		fontWeight: "400",
		fontSize: height * 0.016,
	},
});
