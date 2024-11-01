import { ScrollView, View, StyleSheet } from "react-native"
import { Slot, useLocalSearchParams } from "expo-router"
import BackButton from "../../../../../components/back-button/BackButton"
import NotificationButton from "../../../../../components/notification-button/NotificationButton"
import { theme } from "../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<BackButton
						color={theme.colors.secondary}
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					<NotificationButton theme="dark" />
				</View>
				<Slot />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 25
	},
	container: {
		flexDirection: "column",
		paddingBottom: 125
	},
	headerContainer: {
		width: "100%",
		paddingVertical: 35,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
