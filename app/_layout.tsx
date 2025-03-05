import { useState, useEffect, useCallback } from "react"
import { View, StatusBar, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Stack } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useReactQueryDevTools } from "@dev-plugins/react-query"
import { Asset } from "expo-asset"
import Toastable from "react-native-toastable"
import { store } from "../store/store"
import { theme } from "../utils/constants"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

// Initialize the query client for caching data
const queryClient = new QueryClient()

export default function Layout(): React.ReactElement | null {
	// State variable to track when the app is ready
	const [appIsReady, setAppIsReady] = useState(false)

	// Hook to enable React Query DevTools
	useReactQueryDevTools(queryClient)

	// Memoized callback to prefetch images
	const cacheImages = useCallback(
		async (images: (string | number)[]): Promise<void> => {
			// Prefetch images using the Image and Asset modules
			await Promise.all(
				// Map through images and prefetch them
				images.map(async (image) => {
					// If the image is a string, prefetch it using the Image module else download it using the Asset module
					if (typeof image === "string") {
						await Image.prefetch(image)
					} else {
						await Asset.fromModule(image).downloadAsync()
					}
				})
			)
		},
		[Image, Asset]
	)

	// Callback to handle the layout of the root view
	const onLayoutRootView = useCallback(async () => {
		// If the app is ready, hide the splash screen
		if (appIsReady) {
			await SplashScreen.hideAsync()
		}
	}, [appIsReady, SplashScreen])

	// Effect to load fonts and prefetch images
	useEffect(() => {
		;(async () => {
			try {
				// Set the navigation bar visibility to hidden
				await NavigationBar.setVisibilityAsync("hidden")

				// Load fonts using the Font module
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

				// Prefetch images using the cacheImages function
				await cacheImages([
					require("../assets/logo/logo.png"),
					require("../assets/images/add-job-header.png"),
					require("../assets/images/background-web1.png"),
					require("../assets/images/background-web2.png"),
					require("../assets/images/background-web3.png"),
					require("../assets/images/background-web4.png"),
					require("../assets/images/background1.png"),
					require("../assets/images/background2.png"),
					require("../assets/images/background3.png"),
					require("../assets/images/background4.png"),
					require("../assets/images/bottom-nav.png"),
					require("../assets/images/card-bg.png"),
					require("../assets/images/chat-header-bg.png"),
					require("../assets/images/customer-sign-up-header.png"),
					require("../assets/images/help-and-support-arc.png"),
					require("../assets/images/home-screen-bg.png"),
					require("../assets/images/login-image-web.png"),
					require("../assets/images/login-image.png"),
					require("../assets/images/map-lg-web.png"),
					require("../assets/images/map-lg.png"),
					require("../assets/images/map.png"),
					require("../assets/images/map2.png"),
					require("../assets/images/map3.png"),
					require("../assets/images/modal-background.png"),
					require("../assets/images/profile-bg.png"),
					require("../assets/images/profile-header-bg-web.png"),
					require("../assets/images/profile.png"),
					require("../assets/images/profile2.png"),
					require("../assets/images/screen-bg.png"),
					require("../assets/images/security-arc.png"),
					require("../assets/images/service-1.png"),
					require("../assets/images/service-2.png"),
					require("../assets/images/service-3.png"),
					require("../assets/images/side-nav-bg.png"),
					require("../assets/images/sign-up-bg-web.png"),
					require("../assets/images/sign-up-bg-web2.png"),
					require("../assets/images/sign-up-bg.png"),
					require("../assets/images/sign-up-image-web.png"),
					require("../assets/images/sign-up-image-web2.png"),
					require("../assets/images/vendor-profile.png"),
					require("../assets/images/vendor-profile2.png"),
					require("../assets/images/vendor-profile3.png"),
					require("../assets/images/vendor-sign-up-header.png"),
					require("../assets/images/verify-account-bg.png"),
					require("../assets/images/welcome-card-bg.png"),
					require("../assets/icons/account-status-blue.svg"),
					require("../assets/icons/account-status.svg"),
					require("../assets/icons/alert.svg"),
					require("../assets/icons/camera.svg"),
					require("../assets/icons/card.svg"),
					require("../assets/icons/card2.svg"),
					require("../assets/icons/chat.svg"),
					require("../assets/icons/cross.svg"),
					require("../assets/icons/date.svg"),
					require("../assets/icons/delete.svg"),
					require("../assets/icons/delete2.svg"),
					require("../assets/icons/delete3.svg"),
					require("../assets/icons/edit-profile-blue.svg"),
					require("../assets/icons/edit-profile.svg"),
					require("../assets/icons/edit.svg"),
					require("../assets/icons/facebook.svg"),
					require("../assets/icons/filter.svg"),
					require("../assets/icons/google.svg"),
					require("../assets/icons/help-and-support-blue.svg"),
					require("../assets/icons/help-and-support.svg"),
					require("../assets/icons/home-blue.svg"),
					require("../assets/icons/home.svg"),
					require("../assets/icons/invalid.svg"),
					require("../assets/icons/location.svg"),
					require("../assets/icons/location2.svg"),
					require("../assets/icons/location3.svg"),
					require("../assets/icons/logout-blue.svg"),
					require("../assets/icons/logout.svg"),
					require("../assets/icons/map-marker.svg"),
					require("../assets/icons/master-card.svg"),
					require("../assets/icons/message.svg"),
					require("../assets/icons/messages-blue.svg"),
					require("../assets/icons/messages.svg"),
					require("../assets/icons/my-jobs-blue.svg"),
					require("../assets/icons/my-jobs.svg"),
					require("../assets/icons/notification-black.svg"),
					require("../assets/icons/notification-off.svg"),
					require("../assets/icons/notification-outline.svg"),
					require("../assets/icons/notification.svg"),
					require("../assets/icons/pay-on-delivery.svg"),
					require("../assets/icons/paypal.svg"),
					require("../assets/icons/privacy-policy-blue.svg"),
					require("../assets/icons/privacy-policy.svg"),
					require("../assets/icons/profile-blue.svg"),
					require("../assets/icons/profile.svg"),
					require("../assets/icons/search-job.svg"),
					require("../assets/icons/security-blue.svg"),
					require("../assets/icons/security.svg"),
					require("../assets/icons/security2.svg"),
					require("../assets/icons/send.svg"),
					require("../assets/icons/star.svg"),
					require("../assets/icons/successful.svg"),
					require("../assets/icons/time.svg"),
					require("../assets/icons/user.svg"),
					require("../assets/icons/user2.svg"),
					require("../assets/icons/warning.svg")
				])
			} catch (e) {
				console.warn(e)
			} finally {
				// Set appIsReady to true
				setAppIsReady(true)
			}
		})()
	}, [])

	// Return null if the app is not ready
	if (!appIsReady) {
		return null
	}

	return (
		// Root container with flex styling and layout handler
		<View style={styles.wrapper} onLayout={onLayoutRootView}>
			{/* React Query provider for data fetching and caching */}
			<QueryClientProvider client={queryClient}>
				{/* Redux store provider for state management */}
				<Provider store={store}>
					{/* Hide the status bar */}
					<StatusBar hidden />
					{/* Toastable component for displaying toasts */}
					<Toastable
						statusMap={{
							success: "#28A745",
							danger: "#DC3545",
							warning: "#EF6C00",
							info: theme.colors.primary
						}}
						position="top"
						offset={15}
					/>
					{/* Stack navigator with hidden headers */}
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
