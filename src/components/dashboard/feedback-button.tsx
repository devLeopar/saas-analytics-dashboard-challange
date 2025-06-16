'use client'

import { MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

const FeedbackButton = () => {
  const handleFeedback = () => {
    toast.success('Feedback sent!', {
      description: 'Thank you for helping us improve.',
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleFeedback}
      aria-label="Send feedback"
    >
      <MessageSquare className="mr-1" />
      Feedback
    </Button>
  )
}

export default FeedbackButton
