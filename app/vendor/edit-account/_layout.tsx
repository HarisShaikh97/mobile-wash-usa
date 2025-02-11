import { Slot } from "expo-router"
import ProfileLayout from "../../../components/profile-layout/ProfileLayout"

export default function Layout(): React.ReactElement | null {
	return (
		// Main profile layout with dynamic content
		<ProfileLayout title="Edit Account">
			{/* Dynamic content slot */}
			<Slot />
		</ProfileLayout>
	)
}
