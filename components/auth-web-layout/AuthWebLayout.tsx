import { View, ImageSourcePropType, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import BackButton from "../back-button/BackButton"

// Interface for the props of the component
interface AuthWebLayoutProps {
	bgImage: ImageSourcePropType
	children: React.ReactNode
}

export default function AuthWebLayout({
	bgImage,
	children
}: AuthWebLayoutProps): React.ReactElement | null {
	return (
		// Main background container with image
		<ImageBackground
			source={bgImage}
			style={styles.wrapper}
			contentFit="cover"
		>
			{/* Back navigation button with custom styling */}
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			{/* Container for the form content */}
			<View style={styles.formCardContainer}>{children}</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: "100%",
		width: "100%",
		backgroundColor: "white",
		position: "relative",
		padding: 35
	},
	formCardContainer: {
		width: 585,
		paddingHorizontal: 100,
		paddingVertical: 65,
		borderRadius: 25,
		borderWidth: 3,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		position: "absolute",
		top: 75,
		right: 145,
		zIndex: 50
	}
})
