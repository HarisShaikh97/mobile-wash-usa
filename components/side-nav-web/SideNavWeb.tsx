import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"
import { deleteSession } from "../../features/auth/authSlice"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import NavItemWeb from "../nav-item-web/NavItemWeb"
import { theme, WEB_SIDE_NAV_WIDTH } from "../../utils/constants"

export default function SideNavWeb({
	state,
	descriptors,
	navigation,
	insets
}: BottomTabBarProps): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	const dispatch = useDispatch() // Initializing the dispatch function for Redux

	// Memoized function to handle logout
	const handleLogout = useCallback((): void => {
		// Dispatching the deleteSession action to remove the user's session
		dispatch(deleteSession())

		// Navigating to the welcome page after logout
		router.navigate("/")
	}, [router, dispatch, deleteSession])

	return (
		// Main container for the side navigation
		<View style={styles.sideNavWrapper}>
			{/* Background image container */}
			<ImageBackground
				source={require("../../assets/images/side-nav-bg.png")}
				style={styles.sideNavContainer}
				contentFit="fill"
			>
				{/* Company logo */}
				<Image
					source={require("../../assets/logo/logo.png")}
					style={styles.logoImage}
					contentFit="contain"
				/>
				{/* Container for navigation items */}
				<View style={styles.navItemsWrapper}>
					{/* Map through routes to create navigation items */}
					{state.routes.map((route, index) => (
						<NavItemWeb
							state={state}
							descriptors={descriptors}
							navigation={navigation}
							insets={insets}
							route={route}
							index={index}
							key={index}
						/>
					))}
				</View>
				{/* Logout button */}
				<TouchableOpacity
					style={styles.navItemContainer}
					onPress={handleLogout}
				>
					{/* Logout icon */}
					<Image
						source={require("../../assets/icons/logout-blue.svg")}
						style={styles.navIcon}
						contentFit="contain"
					/>
					{/* Logout text */}
					<Text style={styles.titleText}>Logout</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	sideNavWrapper: {
		height: "100%",
		width: WEB_SIDE_NAV_WIDTH,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 100,
		paddingVertical: 25,
		paddingLeft: 27.5
	},
	sideNavContainer: {
		flex: 1,
		borderRadius: 22.5,
		backgroundColor: "white",
		flexDirection: "column",
		padding: 17.5,
		gap: 25
	},
	logoImage: {
		height: 100,
		width: 100
	},
	navItemsWrapper: {
		flex: 1,
		flexDirection: "column",
		gap: 10
	},
	navItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12.5,
		height: 65,
		width: "100%",
		borderRadius: 12.5,
		borderWidth: 1,
		paddingHorizontal: 15,
		backgroundColor: "white",
		borderColor: "#F5F5F5"
	},
	navIcon: {
		height: 20,
		width: 20
	},
	titleText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.tertiary
	}
})
