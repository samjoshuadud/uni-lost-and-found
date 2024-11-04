"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

export default function LoginButton() {
  const [showModal, setShowModal] = useState(false)

  const handleContinue = () => {
    window.location.href = '/login'
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Login with Google
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Important Notice</DialogTitle>
            <DialogDescription className="space-y-4">
              <span className="block text-red-500 font-semibold">
                Please use your existing UMAK email address (@umak.edu.ph).
              </span>
              <span className="block">
                You will not be able to proceed if you use any other email domain.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleContinue}>
              Continue to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 