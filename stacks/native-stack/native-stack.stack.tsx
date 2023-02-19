import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsRoute from "../../routes/details/details.route";

import HomeRoute from "../../routes/home/home.route";
import ResultsRoute from "../../routes/results/results.route";
import colors from "../../utils/color.util";

import { NativeStackParamList } from "./native-stack.types";

const Stack = createNativeStackNavigator<NativeStackParamList>();

const NativeStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					headerStyle: { backgroundColor: colors.white },
				}}
			>
				<Stack.Screen name="Home" component={HomeRoute} />
				<Stack.Screen
					name="Results"
					component={ResultsRoute}
					options={{
						headerShown: true,
						headerTitle: "Results",
					}}
				/>
				<Stack.Screen
					name="Details"
					component={DetailsRoute}
					options={{
						headerShown: true,
						headerTitle: "Details",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default NativeStack;
