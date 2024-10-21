import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	return (
		<View>
			<Text>Edit</Text>
		</View>
	)
}

const styles = StyleSheet.create({})
