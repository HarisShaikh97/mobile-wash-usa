import { View, ScrollView, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { Slot } from "expo-router"

export default function Layout(): React.ReactElement | null {
	return (
		<ImageBackground
			source={require("../../../../assets/images/screen-bg.png")}
			style={styles.bgImage}
			contentFit="fill"
		>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.scrollContainer}>
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
