import { z } from "zod";

export const demoRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  jobTitle: z.string().optional(),
  country: z.string().optional(),
  companySize: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export const updateDemoStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "SCHEDULED", "CLOSED"]),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type UpdateDemoStatusInput = z.infer<typeof updateDemoStatusSchema>;
