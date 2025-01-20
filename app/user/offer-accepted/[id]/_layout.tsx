import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { Slot, useRouter } from "expo-router"

export default function Layout(): React.ReactElement | null {
	// Initialize router for navigation
	const router = useRouter()

	return (
		// Main background image container
		<ImageBackground
			source={require("../../../../assets/images/screen-bg.png")}
			style={styles.bgImage}
			contentFit="fill"
		>
			{/* Scrollable content container */}
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{/* Main content wrapper with padding */}
				<View style={styles.scrollContainer}>
					{/* Close/back button */}
					<TouchableOpacity
						style={styles.crossButton}
						onPress={() => {
							router.back()
						}}
					>
						{/* Close icon */}
						<Image
							source={require("../../../../assets/icons/cross.svg")}
							style={styles.crossIcon}
							contentFit="contain"
						/>
					</TouchableOpacity>
					{/* Slot for child route content */}
					<Slot />
				</View>
			</ScrollView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	bgImage: {
		flex: 1,
		backgroundColor: "white"
	},
	scrollView: {
		flex: 1
	},
	scrollContainer: {
		paddingHorizontal: 25,
		position: "relative"
	},
	crossButton: {
		height: 32.5,
		width: 32.5,
		borderWidth: 1,
		borderRadius: 7.5,
		borderColor: "#F5F5F5",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 25,
		left: 25
	},
	crossIcon: {
		height: 8.5,
		width: 8.5
	}
})
