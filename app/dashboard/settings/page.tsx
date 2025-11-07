"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Lock, Eye, Mail, Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "system",
    notifications: true,
    emailDigest: true,
    soundEnabled: true,
    privacy: "public",
  })

  const handleThemeChange = (value: string) => {
    setSettings({ ...settings, theme: value })
  }

  const handleSaveSettings = () => {
    // Toast notification would show here
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences and notifications</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Theme</label>
              <Select value={settings.theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">Choose how Learnora looks to you</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground mt-1">Get notified about challenges and group activity</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Email Digest</p>
                <p className="text-sm text-muted-foreground mt-1">Weekly summary of your learning progress</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailDigest}
                onChange={(e) => setSettings({ ...settings, emailDigest: e.target.checked })}
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Sound Effects</p>
                <p className="text-sm text-muted-foreground mt-1">Play sounds for achievements and notifications</p>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => setSettings({ ...settings, soundEnabled: e.target.checked })}
                className="w-5 h-5"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Profile Visibility</label>
              <Select value={settings.privacy} onValueChange={(value) => setSettings({ ...settings, privacy: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">Control who can see your profile and achievements</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Two-Factor Authentication
            </Button>
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-destructive text-sm">Danger Zone</p>
                <p className="text-xs text-destructive/80 mt-1">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" size="sm" className="mt-3">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
