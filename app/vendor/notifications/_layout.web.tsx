import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"
import { theme } from "../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		// Main scrollable container
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Content wrapper */}
			<View style={styles.scrollContainer}>
				{/* Header section with background image */}
				<ImageBackground
					source={require("../../../assets/images/profile-header-bg-web.png")}
					style={styles.headerContainer}
					contentFit="cover"
				>
					{/* Navigation back button */}
					<BackButton
						size="large"
						color="#000000"
						backgroundColor="#ffffff"
						borderColor="transparent"
					/>
					{/* Page title */}
					<Text style={styles.titleText}>Notifications</Text>
					{/* Read all notifications button */}
					<TouchableOpacity>
						<Text style={styles.readAllText}>Read all</Text>
					</TouchableOpacity>
				</ImageBackground>
				{/* Main content container */}
				<View style={styles.bodyContainer}>
					{/* Slot component for rendering child routes */}
					<Slot />
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "#F3F8FE"
	},
	scrollContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		paddingBottom: 25
	},
	headerContainer: {
		height: 160,
		width: "100%",
		backgroundColor: theme.colors.primary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 35
	},
	titleText: {
		fontSize: 35,
		fontFamily: "Montserrat-SemiBold",
		color: "white",
		textTransform: "capitalize",
		letterSpacing: 0.5
	},
	readAllText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Regular",
		color: "white",
		marginRight: 20
	},
	bodyContainer: {
		width: "75%",
		padding: 30,
		borderRadius: 15,
		backgroundColor: "white"
	}
})
