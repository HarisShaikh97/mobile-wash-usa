import { Slot } from "expo-router"
import ProfileLayout from "../../../../components/profile-layout/ProfileLayout"

export default function Layout(): React.ReactElement | null {
	return (
		<ProfileLayout title="Profile">
			<Slot />
		</ProfileLayout>
	)
}
