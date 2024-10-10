import { View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import BackButton from "../../components/back-button/BackButton"

export default function Layout(): React.ReactElement | null {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<BackButton />
			</View>
			<Slot />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white"
	},
	headerContainer: {
		paddingHorizontal: 20,
		paddingVertical: 35
	}
})
