import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import { theme } from "../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const handleSave = useCallback(() => {
		router.back()
	}, [router])

	const handleCancel = useCallback(() => {
		router.back()
	}, [router])

	return (
		<View>
			<Text>Security</Text>
		</View>
	)
}

const styles = StyleSheet.create({})
