'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Briefcase } from 'lucide-react';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';

function InterviewItemCard({ interview }) {
  const router = useRouter();
  const [answerCount, setAnswerCount] = useState(0);

  const fetchAnswerCount = async () => {
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, interview?.mockId));
        setAnswerCount(result.length);
  }
  useEffect(() => {
    fetchAnswerCount();
  }, []);

    
      

  const onStart = () => {
    router.push('dashboard/interview/' + interview?.mockId);
  };

  const onFeedback = () => {
    router.push('dashboard/interview/' + interview?.mockId + '/feedback');
  };

  const isCompleted = answerCount >= 5;

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="p-6 shadow-md border rounded-xl hover:shadow-lg transition-all">
        <div className="flex flex-col items-center space-y-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {interview?.jobPosition}
          </h2>
        </div>
        <hr className="my-4" />
        <CardContent className="space-y-2 text-center sm:flex-col">
          <p className="flex items-center justify-center gap-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            Created At: {interview?.createdAt}
          </p>
          <p className="text-sm text-gray-600">
            Experience: {interview?.jobExperience} Years
          </p>

          {answerCount !== null && (
            <Badge
              variant="outline"
              className={`mt-2 ${
                isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'
              }`}
            >
              {isCompleted ? 'Completed' : 'In Progress'}
            </Badge>
          )}

          <div className="flex flex-col gap-3 mt-6">
            <Button onClick={onFeedback} variant="outline" className="w-full">
              Feedback
            </Button>
            <Button onClick={onStart} className="w-full bg-blue-500 text-white">
              Start
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default InterviewItemCard;




// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Calendar, Briefcase } from 'lucide-react';
// import { UserAnswer } from '@/utils/schema';
// import { eq, count } from "drizzle-orm";
// import { db } from "@/utils/db";

// function InterviewItemCard({ interview }) {
//     const router = useRouter();

//     const onStart = () => {
//         router.push('dashboard/interview/' + interview?.mockId);
//     };

//     const onFeedback = () => {
//         router.push('dashboard/interview/' + interview?.mockId + '/feedback');
//     };

//     const result =  db
//   .select({ count: count() })
//   .from(UserAnswer)
//   .where(eq(UserAnswer.interview?.mockId, interview?.mockId));
//   console.log(result)

//     return (
//         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Card className="p-6 shadow-md border rounded-xl hover:shadow-lg transition-all">
//                 <div className="flex flex-col items-center space-y-3">
//                     <div className="p-2 bg-blue-100 rounded-full">
//                         <Briefcase className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-800">
//                         {interview?.jobPosition}
//                     </h2>
//                 </div>
//                 <hr className="my-4" />
//                 <CardContent className="space-y-2 text-center sm: flex-col">
//                     <p className="flex items-center justify-center gap-1 text-sm text-gray-500">
//                         <Calendar className="h-4 w-4" />
//                         Created At: {interview?.createdAt}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                         Experience: {interview?.jobExperience} Years
//                     </p>
//                     <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-600">
//                         In Progress
//                     </Badge>
//                     <div className="flex flex-col gap-3 mt-6">
//                         <Button onClick={onFeedback} variant="outline" className="w-full">
//                             Feedback
//                         </Button>
//                         <Button onClick={onStart} className="w-full bg-blue-500 text-white">
//                             Start
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </motion.div>
//     );
// }

// export default InterviewItemCard;
