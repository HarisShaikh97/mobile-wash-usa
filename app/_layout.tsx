import { View, StatusBar, StyleSheet } from "react-native"
import { Stack } from "expo-router"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useReactQueryDevTools } from "@dev-plugins/react-query"
import { store } from "../store/store"

const queryClient = new QueryClient()

export default function Layout(): React.ReactElement | null {
	useReactQueryDevTools(queryClient)

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<View style={styles.wrapper}>
					<StatusBar hidden />
					<Stack screenOptions={{ headerShown: false }} />
				</View>
			</Provider>
		</QueryClientProvider>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	}
})
