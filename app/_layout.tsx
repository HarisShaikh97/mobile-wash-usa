import { useState, useEffect, useCallback } from "react"
import { View, StatusBar, StyleSheet } from "react-native"
import { Stack } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useReactQueryDevTools } from "@dev-plugins/react-query"
import { store } from "../store/store"

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function Layout(): React.ReactElement | null {
	const [appIsReady, setAppIsReady] = useState(false)

	useReactQueryDevTools(queryClient)

	NavigationBar.setVisibilityAsync("hidden")

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])

	useEffect(() => {
		;(async () => {
			try {
				await Font.loadAsync({
					"Montserrat-Black": require("../assets/fonts/Montserrat/Montserrat Black 900.ttf"),
					"Montserrat-ExtraBold": require("../assets/fonts/Montserrat/Montserrat ExtraBold 800.ttf"),
					"Montserrat-Bold": require("../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
					"Montserrat-SemiBold": require("../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
					"Montserrat-Medium": require("../assets/fonts/Montserrat/Montserrat Medium 500.ttf"),
					"Montserrat-Regular": require("../assets/fonts/Montserrat/Montserrat Regular 400.ttf"),
					"Montserrat-Light": require("../assets/fonts/Montserrat/Montserrat Light 300.ttf"),
					"Montserrat-ExtraLight": require("../assets/fonts/Montserrat/Montserrat ExtraLight 275.ttf"),
					"Montserrat-Thin": require("../assets/fonts/Montserrat/Montserrat Thin 250.ttf"),
					"Roboto-Black": require("../assets/fonts/Roboto/Roboto Black 900.ttf"),
					"Roboto-Bold": require("../assets/fonts/Roboto/Roboto Bold 700.ttf"),
					"Roboto-Medium": require("../assets/fonts/Roboto/Roboto Medium 500.ttf"),
					"Roboto-Regular": require("../assets/fonts/Roboto/Roboto 400.ttf"),
					"Roboto-Light": require("../assets/fonts/Roboto/Roboto Light 300.ttf"),
					"Roboto-Thin": require("../assets/fonts/Roboto/Roboto Thin 250.ttf")
				})
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		})()
	}, [])

	if (!appIsReady) {
		return null
	}

	return (
		<View style={styles.wrapper} onLayout={onLayoutRootView}>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<StatusBar hidden />
					<Stack screenOptions={{ headerShown: false }} />
				</Provider>
			</QueryClientProvider>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	}
})
