import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { Slot, useRouter } from "expo-router"

export default function Layout(): React.ReactElement | null {
	const router = useRouter()

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
					<TouchableOpacity
						style={styles.crossButton}
						onPress={() => {
							router.back()
						}}
					>
						<Image
							source={require("../../../../assets/icons/cross.svg")}
							style={styles.crossIcon}
							contentFit="contain"
						/>
					</TouchableOpacity>
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
