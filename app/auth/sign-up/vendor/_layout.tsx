import { Slot } from "expo-router"
import SignUpLayout from "../../../../components/sign-up-layout/SignUpLayout"

export default function Layout(): React.ReactElement | null {
	return (
		// Using SignUpLayout component to wrap the dynamic content
		<SignUpLayout>
			{/*Slot component for dynamic content*/}
			<Slot />
		</SignUpLayout>
	)
}
