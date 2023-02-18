import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Launch from "../../@types/launch.type";
import { Props } from "../../stacks/native-stack/native-stack.types";
import commonStyles from "../../utils/style.util";
import Header from "./components/header.component";

const ContentToBeShown: {
	title: string;
	key: keyof Launch;
	getValue?: (val: any) => string;
}[] = [
	{
		title: "Details",
		key: "details",
	},
	{
		title: "Ship Ids",
		key: "ships",
		getValue: (shipArray: string[]) => {
			return shipArray.join(", ");
		},
	},
];

const { width, height } = Dimensions.get("screen");

const DetailsRoute = ({ navigation, route }: Props<"Details">) => {
	const { launch } = route.params;

	const {
		name,
		links: {
			patch: { small },
		},
		date_utc,
	} = launch;

	return (
		<SafeAreaView edges={["bottom", "left", "right"]} style={[commonStyles.container]}>
			<Header title={name} image={small} date={new Date(date_utc)} />
			<FlatList
				contentContainerStyle={styles.content_wrapper}
				data={ContentToBeShown}
				renderItem={({ item }) => {
					const { key, title, getValue } = item;
					return (
						<>
							<Text style={styles.text_title}>
								{title}:{" "}
								<Text style={styles.text_content}>
									{getValue ? getValue(launch[key]) : launch[key].toString()}
								</Text>
							</Text>
						</>
					);
				}}
				ItemSeparatorComponent={() => <View style={{ height: height * 0.02 }} />}
			/>
		</SafeAreaView>
	);
};

export default DetailsRoute;

const styles = StyleSheet.create({
	content_wrapper: {
		paddingHorizontal: width * 0.03,
		paddingTop: height * 0.02,
	},
	text_title: {
		fontWeight: "800",
		fontSize: width * 0.04,
	},
	text_content: {
		fontWeight: "400",
		fontSize: width * 0.04,
	},
});
