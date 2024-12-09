import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { useRouter, usePathname } from "expo-router"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import AntDesign from "@expo/vector-icons/AntDesign"
import NavItemWeb from "../nav-item-web/NavItemWeb"
import { theme } from "../../utils/constants"

export default function SideNavWeb({
	state,
	descriptors,
	navigation,
	insets
}: BottomTabBarProps): React.ReactElement | null {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<View style={styles.sideNavWrapper}>
			<ImageBackground
				source={require("../../assets/images/side-nav-bg.png")}
				style={styles.sideNavContainer}
				contentFit="fill"
			>
				<Image
					source={require("../../assets/logo/logo.png")}
					style={styles.logoImage}
					contentFit="contain"
				/>
				<View style={styles.navItemsWrapper}>
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
				<TouchableOpacity style={styles.navItemContainer}>
					<Image
						source={require("../../assets/icons/logout-blue.svg")}
						style={styles.navIcon}
						contentFit="contain"
					/>
					<Text style={styles.titleText}>Logout</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	sideNavWrapper: {
		height: "100%",
		width: 385,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 100,
		padding: 25
	},
	sideNavContainer: {
		flex: 1,
		borderRadius: 20,
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
