import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { Props } from "../../stacks/native-stack/native-stack.types";
import commonStyles from "../../utils/style.util";
import { useState } from "react";
import { formatDate } from "../../utils/date.util";
import colors from "../../utils/color.util";

const { width, height } = Dimensions.get("screen");
const isAndroid = Platform.OS === "android";

const HomeRoute = ({ navigation }: Props<"Home">) => {
	const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<Date>();

	const openPicker = () => {
		setIsPickerVisible(true);
	};

	const closePicker = () => {
		setIsPickerVisible(false);
	};

	const handleChangeDate = (event: DateTimePickerEvent, date?: Date) => {
		const { type } = event;

		switch (type) {
			case "dismissed":
				break;
			case "set":
				if (date) setSelectedDate(date);
				break;
			case "neutralButtonPressed":
				console.log("neutralButtonPressed:", { event, date });
				break;
			default:
				console.log("UNKNOWN TYPE:", { type });
				break;
		}
		closePicker();
	};

	const handleSearch = () => {
		if (selectedDate) {
			navigation.navigate("Results", { date: selectedDate.toString() });
			return;
		}
		// TODO: implement error handling!
	};

	return (
		<SafeAreaView style={[commonStyles.container, styles.container]}>
			<StatusBar translucent={true} style="dark" />
			<Text style={[styles.text_header, { paddingBottom: height * 0.05 }]}>Welcome</Text>
			<Text style={[styles.text_large, { textAlign: "center" }]}>
				Choose a date to see all the SpaceX launches on that day
			</Text>
			<View style={{ height: height * 0.05 }} />
			{isAndroid && (
				<TextInput
					onPressIn={openPicker}
					value={selectedDate ? formatDate(selectedDate) : undefined}
					placeholder="dd/mm/yyyy"
					style={[styles.textInput]}
					editable={false}
				/>
			)}
			{(!isAndroid || isPickerVisible) && (
				<DateTimePicker
					display="calendar"
					value={selectedDate ?? new Date()}
					onChange={handleChangeDate}
				/>
			)}
			<Pressable
				style={[styles.search_button, { marginTop: height * 0.05 }]}
				onPress={handleSearch}
			>
				<Text style={[styles.text_medium, { color: colors.white }]}>Search</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default HomeRoute;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: width * 0.075,
	},
	text_header: {
		fontWeight: "900",
		fontSize: commonStyles.size[300],
	},
	text_large: {
		fontWeight: "300",
		fontSize: commonStyles.size[200],
	},
	text_medium: {
		fontWeight: "600",
		fontSize: commonStyles.size[200],
	},
	textInput: {
		width: width * 0.36,
		height: height * 0.036,
		textAlign: "center",
		backgroundColor: colors.white,
		color: colors.black,
		borderRadius: height * 0.012,
	},
	search_button: {
		width: width * 0.5,
		height: height * 0.06,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.blues[500],
		borderRadius: height * 0.012,
	},
});
