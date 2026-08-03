import z from 'zod'

export const SurveyStudentSchema = z.object({
  labCode: z.string(),
})

export const SurveyProfessorSchema = z.object({
  schoolName: z.string().min(1),
  departmentName: z.string().min(1),
  labName: z.string().min(1),
})

export type SurveyStudentValues = z.infer<typeof SurveyStudentSchema>
export type SurveyProfessorValues = z.infer<typeof SurveyProfessorSchema>
