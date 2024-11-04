"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export default function ReportSection({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    category: "",
    status: "lost",
    studentId: "",
    additionalDetails: []
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addMoreDescription = () => {
    setFormData({
      ...formData,
      additionalDetails: [...formData.additionalDetails, { title: "", description: "" }]
    })
  }

  const handleAdditionalDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.additionalDetails]
    updatedDetails[index][field] = value
    setFormData({ ...formData, additionalDetails: updatedDetails })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="item-status" className="block text-sm font-medium text-foreground mb-1">Item Status</label>
            <Select name="status" value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="found">Found</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="item-name" className="block text-sm font-medium text-foreground mb-1">Item Name</label>
            <Input id="item-name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Textbook, Water Bottle" required />
          </div>
          <div>
            <label htmlFor="item-location" className="block text-sm font-medium text-foreground mb-1">Location</label>
            <Input id="item-location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Library, Cafeteria" required />
          </div>
          <div>
            <label htmlFor="item-category" className="block text-sm font-medium text-foreground mb-1">Category</label>
            <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Personal Items">Personal Items</SelectItem>
                <SelectItem value="Documents">Documents</SelectItem>
                <SelectItem value="Bags">Bags</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="item-description" className="block text-sm font-medium text-foreground mb-1">Description</label>
            <Textarea
              id="item-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the item"
              rows={4}
              required
            />
          </div>
          <div>
            <label htmlFor="student-id" className="block text-sm font-medium text-foreground mb-1">Student ID</label>
            <Input id="student-id" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Enter your student ID" required />
          </div>
          
          {formData.additionalDetails.map((detail, index) => (
            <div key={index} className="space-y-2">
              <Input
                placeholder="Detail Title"
                value={detail.title}
                onChange={(e) => handleAdditionalDetailChange(index, 'title', e.target.value)}
              />
              <Textarea
                placeholder="Detail Description"
                value={detail.description}
                onChange={(e) => handleAdditionalDetailChange(index, 'description', e.target.value)}
                rows={2}
              />
            </div>
          ))}
          
          <Button type="button" onClick={addMoreDescription} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add More Description
          </Button>

          {formData.status === "found" && (
            <p className="text-sm text-muted-foreground">Please bring the found item to the admin office for verification before submitting this report.</p>
          )}
          <Button type="submit" className="w-full">Submit Report</Button>
        </form>
      </CardContent>
    </Card>
  )
} 