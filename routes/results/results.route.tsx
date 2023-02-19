import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Launch from "../../@types/launch.type";
import useRequest from "../../hooks/use-request.hook";
import { Props } from "../../stacks/native-stack/native-stack.types";
import colors from "../../utils/color.util";
import commonStyles from "../../utils/style.util";
import ListItem from "./components/list-item.component";

const { height } = Dimensions.get("screen");

const ResultsRoute = ({ route }: Props<"Results">) => {
	const { date } = route.params;

	const [results, setResults] = useState<Launch[]>();

	const request = useRequest();

	useEffect(() => {
		const getLaunch = async () => {
			const result = await request({
				date: new Date(date),
			});

			setResults(result ?? []);
		};

		getLaunch();
	}, [date]);

	if (results == undefined) {
		return (
			<SafeAreaView
				edges={["bottom", "left", "right"]}
				style={[commonStyles.container, { justifyContent: "center" }]}
			>
				<ActivityIndicator size="large" color={colors.blues[400]} />
			</SafeAreaView>
		);
	}

	if (results.length === 0) {
		return (
			<SafeAreaView
				edges={["bottom", "left", "right"]}
				style={[commonStyles.container, { justifyContent: "center", alignItems: "center" }]}
			>
				<Text>{`There are no launches on ${new Date(date).toLocaleDateString()}`}</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView edges={["bottom", "left", "right"]} style={commonStyles.container}>
			<FlatList
				data={results ?? []}
				renderItem={({ item }) => {
					return <ListItem data={item} />;
				}}
				ItemSeparatorComponent={() => <View style={styles.seperator} />}
			/>
		</SafeAreaView>
	);
};

export default ResultsRoute;

const styles = StyleSheet.create({
	seperator: {
		height: height * 0.01,
	},
});
