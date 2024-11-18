import { View, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import BackButton from "../../../../components/back-button/BackButton"

export default function Page(): React.ReactElement | null {
	return (
		<ImageBackground
			source={require("../../../../assets/images/map-lg.png")}
			style={styles.container}
			contentFit="fill"
		>
			<View style={styles.headerContainer}>
				<BackButton
					color="#000000"
					backgroundColor="#FFFFFF"
					borderColor="#F5F5F5"
				/>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column"
	},
	headerContainer: {
		paddingHorizontal: 20,
		paddingVertical: 35
	}
})
