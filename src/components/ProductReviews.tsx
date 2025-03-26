"use client"

import { useState, useEffect } from "react"
import { addReview, getReviews } from "@/utils/api"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  description: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
    email: string
  }
}

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("newest")
  const [newReview, setNewReview] = useState({
    rating: 5,
    description: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
        setLoading(true)
        try {
          const data = await getReviews(productId)
          if (data.error) {
            setError(data.error)
          } else {
            setReviews(data)
          }
        } catch (err) {
            console.log(err)
          setError("Failed to load reviews")
        } finally {
          setLoading(false)
        }
    }
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const data = await getReviews(productId)
      if (data.error) {
        setError(data.error)
      } else {
        setReviews(data)
      }
    } catch (err) {
        console.log(err)
      setError("Failed to load reviews")
    } finally {
      setLoading(false)
    }
}

  const handleAddReview = async () => {
    if (!newReview.description.trim()) {
      alert("Please enter a review description")
      return
    }

    try {
      const result = await addReview({
        productId,
        rating: newReview.rating,
        description: newReview.description,
      })

      if (result.error) {
        alert(result.error)
      } else {
        alert("Your review has been added")
        setNewReview({ rating: 5, description: "" })
        setIsDialogOpen(false)
        fetchReviews()
      }
    } catch (err) {
       console.log(err)
      alert("Failed to add review")
    }
  }

  const calculateRatingStats = () => {
    if (!reviews.length) return { average: 0, counts: [0, 0, 0, 0, 0], percentages: [0, 0, 0, 0, 0] }

    const counts = [0, 0, 0, 0, 0] // 5, 4, 3, 2, 1 stars
    let sum = 0

    reviews.forEach((review) => {
      sum += review.rating
      counts[5 - review.rating]++
    })

    const average = sum / reviews.length
    const percentages = counts.map((count) => (reviews.length ? (count / reviews.length) * 100 : 0))

    return { average, counts, percentages }
  }

  const stats = calculateRatingStats()

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else {
      return a.rating - b.rating
    }
  })

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MM/dd/yyyy")
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">CUSTOMER REVIEWS</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Left side - Overall rating */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.round(stats.average) ? "fill-primary text-primary" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 mb-4">Based on {reviews.length} reviews</p>
        </div>

        {/* Right side - Rating breakdown */}
        <div>
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center mb-2">
              <div className="flex items-center w-24">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? "fill-primary text-primary" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mx-4">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${stats.percentages[index]}%` }}></div>
              </div>
              <div className="flex justify-between w-24">
                <span className="text-sm text-gray-600">{stats.percentages[index].toFixed(0)}%</span>
                <span className="text-sm text-gray-600">({stats.counts[index]})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sort and Add Review */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogTrigger asChild>
    <Button variant="outline">Write a review</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Write a Review</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Star Rating Section */}
      <div className="flex items-center justify-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setNewReview({ ...newReview, rating: star })}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 ${
                star <= newReview.rating ? "fill-primary text-primary" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Review Input */}
      <Textarea
        placeholder="Share your experience with this product..."
        value={newReview.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNewReview({ ...newReview, description: e.target.value })
        }
        className="min-h-[100px]"
      />

      {/* Submit Button */}
      <Button onClick={handleAddReview}>Submit Review</Button>
    </div>
  </DialogContent>
</Dialog>

      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="text-center py-8">Loading reviews...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : sortedReviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No reviews yet. Be the first to review this product!</div>
      ) : (
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                    {review.user ? getInitials(review.user.name) : "?"}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${star <= review.rating ? "fill-primary text-primary" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">{formatDate(review.createdAt)}</span>
                  </div>
                  <h4 className="font-medium">{review.user ? review.user.name : "Anonymous"}</h4>
                  <p className="mt-2 text-gray-700">{review.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

