import { View, Text, StyleSheet } from "react-native"

export default function Tab(): React.ReactElement | null {
	return (
		<View style={styles.bodyContainer}>
			<Text>home</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 25,
		gap: 10
	}
})
