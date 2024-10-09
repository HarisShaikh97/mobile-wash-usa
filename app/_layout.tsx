import { View, StatusBar, StyleSheet } from "react-native"
import { Stack } from "expo-router"

export default function Layout() {
	return (
		<View style={styles.wrapper}>
			<StatusBar hidden />
			<Stack screenOptions={{ headerShown: false }} />
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	}
})
