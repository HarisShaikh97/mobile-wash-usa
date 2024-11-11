import { View, StatusBar, StyleSheet } from "react-native"
import { Stack } from "expo-router"
import { Provider } from "react-redux"
import { store } from "../store/store"

export default function Layout(): React.ReactElement | null {
	return (
		<Provider store={store}>
			<View style={styles.wrapper}>
				<StatusBar hidden />
				<Stack screenOptions={{ headerShown: false }} />
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	}
})
