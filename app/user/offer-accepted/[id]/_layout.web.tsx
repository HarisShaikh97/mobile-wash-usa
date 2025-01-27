import { ScrollView, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		// Main background container with sign up background image
		<ImageBackground
			source={require("../../../../assets/images/sign-up-bg-web.png")}
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
			{/* Secondary background container with screen background image */}
			<ImageBackground
				source={require("../../../../assets/images/screen-bg.png")}
				style={styles.bgImage}
				contentFit="fill"
			>
				{/* Scrollable content container */}
				<ScrollView
					style={styles.bodyScrollView}
					showsVerticalScrollIndicator={false}
				>
					{/* Slot for child components */}
					<Slot />
				</ScrollView>
			</ImageBackground>
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
	bgImage: {
		flex: 1,
		width: 625,
		backgroundColor: "white",
		borderRadius: 25,
		alignSelf: "center",
		paddingHorizontal: 100,
		overflow: "hidden"
	},
	bodyScrollView: {
		flex: 1
	}
})
