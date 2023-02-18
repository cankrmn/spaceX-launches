import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Launch from "../../@types/launch.type";

export type NativeStackParamList = {
	Home: undefined;
	Results: { date: string };
	Details: { launch: Launch };
};

export type Props<T extends keyof NativeStackParamList> = NativeStackScreenProps<
	NativeStackParamList,
	T
>;
