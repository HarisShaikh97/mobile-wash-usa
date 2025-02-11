import { ScrollView, View, StyleSheet } from "react-native"
import { Slot, useLocalSearchParams } from "expo-router"
import BackButton from "../../../../../components/back-button/BackButton"
import DeleteButton from "../../../../../components/delete-button/DeleteButton"
import OffersPopup from "../../../../../components/offers-popup/OffersPopup"
import { theme } from "../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	// Using useLocalSearchParams to get the id from the URL
	const { id } = useLocalSearchParams()

	// Converting id to a number
	const jobId = Array.isArray(id) ? +id[0] : +id

	return (
		<View style={styles.wrapper}>
			{/* OffersPopup component is used to display offers related to the job */}
			<OffersPopup job_id={jobId} mode="app" />
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						{/* BackButton component is used for navigation */}
						<BackButton
							size="small"
							color={theme.colors.secondary}
							backgroundColor="transparent"
							borderColor="#F5F5F5"
						/>
						{/* DeleteButton component is used to delete the job */}
						<DeleteButton />
					</View>
					{/* Slot component is used to render dynamic content */}
					<Slot />
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "white",
		position: "relative"
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 25
	},
	container: {
		flexDirection: "column",
		paddingBottom: 200
	},
	headerContainer: {
		width: "100%",
		paddingVertical: 35,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
