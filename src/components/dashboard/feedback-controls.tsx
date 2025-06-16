'use client'

import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const FeedbackControls = () => {
  const handlePositiveFeedback = () => {
    toast.success('Positive feedback received. Thank you!')
  }

  const handleNegativeFeedback = () => {
    toast("We'll work on improving this. Thank you for your feedback!", {
      className: 'bg-amber-50',
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePositiveFeedback}
        className={cn(
          'text-green-600 hover:bg-green-50 hover:text-green-700',
          'dark:text-green-400 dark:hover:bg-green-950 dark:hover:text-green-300',
        )}
        aria-label="Send positive feedback"
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNegativeFeedback}
        className={cn(
          'text-red-600 hover:bg-red-50 hover:text-red-700',
          'dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300',
        )}
        aria-label="Send negative feedback"
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default FeedbackControls
