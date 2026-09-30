import { User, Mail, Palette, Sun, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSetting } from "@/hooks/useSetting";
import useAuth from "@/hooks/useAuth";
import DangerZone from "@/components/DangerZone";

function SettingsPage() {
  const { getSettingsQuery, updateSettingQuery } = useSetting();
  const { user } = useAuth();

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your profile and application preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="size-5" />
                Profile
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {/* Avatar */}
                <Avatar className="size-20">
                  <AvatarFallback className="text-4xl font-bold">
                    {user?.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* User information */}
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-medium">{user?.name}</p>

                    <p className="text-sm text-muted-foreground">
                      Your profile information
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4" />
                    <span>{user?.email}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="size-5" />
                Appearance
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Theme</Label>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose how TuneHub looks on your device.
                  </p>
                </div>

                <Separator />

                <RadioGroup
                  value={getSettingsQuery.data?.theme}
                  onValueChange={(value) =>
                    updateSettingQuery.mutate({
                      theme: value as "light" | "dark",
                    })
                  }
                  className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  {/* Light */}
                  <Label
                    htmlFor="theme-light"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    <RadioGroupItem value="light" id="theme-light" />

                    <Sun className="size-5" />

                    <div>
                      <p className="font-medium">Light</p>

                      <p className="text-xs text-muted-foreground">
                        Always light
                      </p>
                    </div>
                  </Label>

                  {/* Dark */}
                  <Label
                    htmlFor="theme-dark"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    <RadioGroupItem value="dark" id="theme-dark" />

                    <Moon className="size-5" />

                    <div>
                      <p className="font-medium">Dark</p>

                      <p className="text-xs text-muted-foreground">
                        Always dark
                      </p>
                    </div>
                  </Label>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 mb-20">
          <DangerZone />
        </div>
      </div>
    </main>
  );
}

export default SettingsPage;
