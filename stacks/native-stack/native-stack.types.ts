import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type NativeStackParamList = {
	Home: undefined;
	Results: undefined;
	Details: undefined;
};

export type Props<T extends keyof NativeStackParamList> = NativeStackScreenProps<
	NativeStackParamList,
	T
>;
