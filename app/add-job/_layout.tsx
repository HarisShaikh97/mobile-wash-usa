import {
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	StyleSheet
} from "react-native"
import { Slot } from "expo-router"

export default function Layout(): React.ReactElement | null {
	return (
		<KeyboardAvoidingView
			style={styles.scrollView}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Slot />
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white"
	}
})
