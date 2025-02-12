import { View, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// Background image container
		<ImageBackground
			source={require("../../../assets/images/sign-up-bg-web.png")}
			style={styles.container}
			contentFit="fill"
		>
			{/* Back navigation button */}
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			{/* Main content container */}
			<View style={styles.bodyContainer}>
				{/* Card container for the payment form */}
				<View style={styles.cardContainer}>
					{/* Slot component for nested route content */}
					<Slot />
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		flexDirection: "column",
		padding: 35
	},
	bodyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	cardContainer: {
		width: 620,
		backgroundColor: "white",
		borderRadius: 25,
		paddingVertical: 50,
		paddingHorizontal: 110
	}
})
