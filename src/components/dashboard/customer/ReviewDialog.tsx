// src/components/dashboard/customer/ReviewDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { createReviewAction } from "@/actions/review.action";


export function ReviewDialog({ order }: { order: any }) {
  const [selectedMedId, setSelectedMedId] = useState(
    order.items[0]?.sellerMedicine?.medicine?.id || "",
  );
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMedId) return toast.error("Medicine selection is required");
    if (!comment.trim()) return toast.error("Please add a comment");

    setLoading(true);
    try {
      const res = await createReviewAction({
        medicineId: selectedMedId,
        orderId: order.id, // Mandatory as per your requirement
        rating,
        comment,
      });

      if (res.success) {
        toast.success("Review submitted successfully!");
        setOpen(false);
        setComment("");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("An error occurred while submitting your review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
        >
          <Star className="h-4 w-4 mr-1 fill-emerald-600" /> Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PackageCheck className="h-5 w-5 text-emerald-600" />
            Rate Your Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Medicine Selection (if multiple items in one order) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Select Medicine
            </label>
            <select
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              value={selectedMedId}
              onChange={(e) => setSelectedMedId(e.target.value)}
            >
              {order.items?.map((item: any) => (
                <option key={item.id} value={item.sellerMedicine?.medicine?.id}>
                  {item.sellerMedicine?.medicine?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Star Rating */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Your Rating
            </label>
            <div className="flex justify-center gap-3 p-2 bg-slate-50 rounded-lg">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-8 w-8 cursor-pointer transition-all hover:scale-110 ${
                    s <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300"
                  }`}
                  onClick={() => setRating(s)}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Comment
            </label>
            <Textarea
              placeholder="Share your experience with this medicine..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] border-slate-200 focus:border-emerald-500"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
