import { View, Text, StyleSheet } from "react-native"
import { usePathname } from "expo-router"

export default function Tab(): React.ReactElement | null {
	const pathname = usePathname()
	return (
		<View style={styles.bodyContainer}>
			<Text>{pathname}</Text>
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
