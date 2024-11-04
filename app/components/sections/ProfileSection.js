"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Settings } from "lucide-react"

export default function ProfileSection({ user, onUpdateUser }) {
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser(editedUser)
    setEditMode(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Profile
          {!editMode && (
            <Button variant="outline" onClick={() => setEditMode(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={editedUser.avatar} alt={editedUser.name} />
                <AvatarFallback>{editedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Change Avatar
              </Button>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editedUser.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={editedUser.notifications}
                onCheckedChange={(checked) => setEditedUser({ ...editedUser, notifications: checked })}
              />
              <Label htmlFor="notifications">Receive email notifications</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p>{user.notifications ? "Enabled" : "Disabled"}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 