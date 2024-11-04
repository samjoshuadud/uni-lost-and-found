"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft } from "lucide-react"

export default function ItemDetailSection({ item, onBack, onClaim, onFound }) {
  const [studentId, setStudentId] = useState("")
  const [verificationAnswers, setVerificationAnswers] = useState(Array(item.verificationQuestions?.length || 0).fill(""))
  const [showVerification, setShowVerification] = useState(false)

  const handleVerificationAnswer = (index, answer) => {
    const newAnswers = [...verificationAnswers]
    newAnswers[index] = answer
    setVerificationAnswers(newAnswers)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <CardTitle>{item.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Status</h3>
          <Badge variant={item.status === "lost" ? "destructive" : item.status === "found" ? "secondary" : "default"}>
            {item.status === "lost" ? "Lost" : item.status === "found" ? "Found" : "Handed Over"}
          </Badge>
        </div>
        <div>
          <h3 className="font-semibold">Location</h3>
          <p>{item.location}</p>
        </div>
        <div>
          <h3 className="font-semibold">Category</h3>
          <p>{item.category}</p>
        </div>
        <div>
          <h3 className="font-semibold">Description</h3>
          <p>{item.description}</p>
        </div>
        <div>
          <h3 className="font-semibold">Date Reported</h3>
          <p>{item.date}</p>
        </div>
        {item.status !== "handed_over" && (
          <div className="space-y-2">
            <Input
              placeholder="Enter your student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <div className="flex gap-4">
              {item.status === "found" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">This is mine</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Claim Item</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to claim this item? You will need to answer some verification questions.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button onClick={() => setShowVerification(true)}>Proceed to Verification</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {item.status === "lost" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">I found this</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Report Found Item</DialogTitle>
                      <DialogDescription>
                        Important: Please follow these steps in order
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <h4 className="font-semibold">Step 1: Submit Report</h4>
                        <p>Fill in your student ID below and submit this report.</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <h4 className="font-semibold">Step 2: Surrender Item</h4>
                        <p>Please surrender the item to:</p>
                        <p className="font-medium">Student Center - Lost and Found Office (Room 101)</p>
                        <p className="text-sm text-muted-foreground">Office Hours: Monday-Friday, 8:00 AM - 5:00 PM</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <h4 className="font-semibold">Step 3: Verification</h4>
                        <p>Admin will verify and post the item after physical surrender.</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => {
                        onFound(item, studentId);
                        alert("Thank you for reporting! Please surrender the item to the Student Center (Room 101) as soon as possible.");
                      }}>
                        Submit Report
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        )}
      </CardContent>
      {showVerification && (
        <Dialog open={showVerification} onOpenChange={setShowVerification}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verification Questions</DialogTitle>
              <DialogDescription>
                Please answer the following questions to verify your claim.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {item.verificationQuestions.map((question, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-foreground mb-1">{question}</label>
                  <Input
                    value={verificationAnswers[index]}
                    onChange={(e) => handleVerificationAnswer(index, e.target.value)}
                    placeholder="Your answer"
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => {
                onClaim(item, studentId, verificationAnswers)
                setShowVerification(false)
              }}>Submit Claim</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
} 