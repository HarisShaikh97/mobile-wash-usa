import { View, TouchableOpacity, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { useRouter, usePathname } from "expo-router"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import AntDesign from "@expo/vector-icons/AntDesign"
import NavItem from "../nav-item/NavItem"
import { theme } from "../../utils/constants"

export default function BottomNav({
	state,
	descriptors,
	navigation,
	insets
}: BottomTabBarProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Get the current pathname from the router
	const pathname = usePathname()

	return (
		// Container for bottom navigation with background image
		<ImageBackground
			source={require("../../assets/images/bottom-nav.png")}
			style={styles.bottomNavigationContainer}
			contentFit="fill"
		>
			{/* Floating action button for adding jobs or searching */}
			<TouchableOpacity
				style={styles.addButtonContainer}
				onPress={() => {
					// Navigate to add job page for users
					if (pathname.includes("/user/")) {
						router.navigate("/user/add-job")
					}
					// Navigate to available jobs page for vendors if not already there
					else if (pathname !== "/vendor/available-jobs") {
						router.navigate("/vendor/available-jobs")
					}
				}}
			>
				{/* Show different icons based on user type */}
				{pathname.includes("/user/") ? (
					// Plus icon for users to add new jobs
					<AntDesign name="plus" size={27.5} color="white" />
				) : (
					// Search icon for vendors to find jobs
					<Image
						source={require("../../assets/icons/search-job.svg")}
						style={styles.searchJobIcon}
						contentFit="contain"
					/>
				)}
			</TouchableOpacity>
			{/* Container for navigation items */}
			<View style={styles.navItemsWrapper}>
				{/* Map through routes to render navigation items */}
				{state.routes.map((route, index) => (
					<NavItem
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
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	bottomNavigationContainer: {
		height: 85,
		width: "100%",
		position: "absolute",
		bottom: 0,
		zIndex: 100
	},
	addButtonContainer: {
		height: 55,
		width: 55,
		borderRadius: 30,
		backgroundColor: theme.colors.primary,
		position: "absolute",
		top: -20,
		left: "50%",
		transform: [{ translateX: -27.5 }],
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
		shadowColor: theme.colors.primary,
		shadowOffset: { width: 2.5, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 3
	},
	navItemsWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-evenly",
		marginBottom: 15
	},
	searchJobIcon: {
		height: 27.5,
		width: 27.5
	}
})
