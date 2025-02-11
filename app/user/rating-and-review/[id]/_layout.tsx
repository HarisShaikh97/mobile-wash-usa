import { View, ScrollView, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"

export default function Layout(): React.ReactElement | null {
	return (
		// Background image container
		<ImageBackground
			source={require("../../../../assets/images/screen-bg.png")}
			style={styles.bgImage}
			contentFit="fill"
		>
			{/* Scrollable content area */}
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{/* Content container with horizontal padding */}
				<View style={styles.scrollContainer}>
					{/* Slot component for dynamic content */}
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
		paddingHorizontal: 25
	}
})
