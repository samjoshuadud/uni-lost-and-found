"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/AuthContext"

export default function AuthRequiredDialog({ open, onOpenChange }) {
  const { signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    onOpenChange(false);
    await signInWithGoogle();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in Required</DialogTitle>
          <DialogDescription>
            Please sign in with your UMAK email to access this feature.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSignIn}>
            Continue with Google
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 