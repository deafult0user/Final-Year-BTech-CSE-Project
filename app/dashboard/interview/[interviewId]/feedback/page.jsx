"use client";
import { db } from "@/utils/db";
import { UserAnswer, MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@clerk/nextjs";

function Feedback({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [jobPosition, setJobPosition] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    fetchFeedback();
    fetchJobDetails();
  }, []);

  const fetchFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    calculateOverallRating(result);
  };

  const fetchJobDetails = async () => {
    const result = await db
      .select({
        jobPosition: MockInterview.jobPosition,
        difficultyLevel: MockInterview.difficultyLevel,
      })
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))
      .limit(1);

    if (result.length > 0) {
      setJobPosition(result[0].jobPosition);
      setDifficultyLevel(result[0].difficultyLevel);
    }
  };

  const calculateOverallRating = (feedback) => {
    if (!feedback || feedback.length === 0) {
      setOverallRating(0);
      return;
    }

    const validRatings = feedback
      .map((item) => {
        const rating = parseFloat(item.rating);
        if (isNaN(rating)) {
          console.warn("Invalid rating in item:", item);
        }
        return rating;
      })
      .filter((num) => !isNaN(num));

    const total = validRatings.reduce((sum, num) => sum + num, 0);
    const avg = validRatings.length > 0 ? total / validRatings.length : 0;

    setOverallRating(parseFloat(avg.toFixed(1)));
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-orange-400";
    return "bg-red-500";
  };

  const ratingPercentage = overallRating * 10;
  const progressColor = getProgressBarColor(ratingPercentage);

  return (
    <>
      <Header />
      <div className="mx-10 px-auto py-10">
        <h1 className="flex items-center gap-2 text-3xl gradient-title mb-6">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Interview Feedback
        </h1>
        <h3><strong>Name of Candidate:</strong> {user?.fullName}</h3>
        <h3><strong>Job Position:</strong> {jobPosition}</h3>
        <h3><strong>Level of Difficulty:</strong> {difficultyLevel}</h3>

        <CardContent className="space-y-6">
          {feedbackList.length === 0 ? (
            <div className="text-center text-gray-500 text-2xl font-semibold">
              No Interview Record Found
            </div>
          ) : (
            <>
              {/* Score Overview */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">{ratingPercentage.toFixed(0)}%</h3>
                <Progress
                  value={ratingPercentage}
                  className="w-full"
                />
              </div>

              {/* Questions Review */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg text-muted-foreground">
                  Question Review
                </h3>
                {feedbackList.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 space-y-3 bg-white shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium">{`Q${index + 1}: ${item.question}`}</p>
                      {parseFloat(item.rating) >= 8 ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <strong className="text-red-500">Your answer:</strong>{" "}
                        {item.userAns}
                      </p>
                      <p>
                        <strong className="text-blue-500">Correct answer:</strong>{" "}
                        {item.correctAns}
                      </p>
                      <p>
                        <strong className="text-yellow-500">Rating:</strong>{" "}
                        {item.rating}
                      </p>
                    </div>
                    <div className="text-sm bg-muted p-2 rounded">
                      <p className="font-medium text-green-600">Feedback:</p>
                      <p>{item.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>

        <CardFooter>
          <Button onClick={() => router.replace("/dashboard")} className="w-full">
            Go to Dashboard
          </Button>
        </CardFooter>
      </div>
    </>
  );
}

export default Feedback;
