
import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./account-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Topic Generator</h3>
        <p className="text-sm text-muted-foreground">
          This is the Place where the AI takes control of your implementation
        </p>
      </div>
      <Separator />
      <AccountForm />

    </div>
  )
}