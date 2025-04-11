import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('Jobsim_ai',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull(),
    difficultyLevel:varchar('difficultyLevel').notNull()
})

export const UserAnswer = pgTable('UserAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:varchar('correctAns'),
    userAns:varchar('userAns'),
    rating:varchar('rating'),
    feedback:varchar('feedback'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt')
})

