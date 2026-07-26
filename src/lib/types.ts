export type UserRole = "coach" | "client";
export type SubscriptionTier = "none" | "low_ticket" | "high_ticket";
export type SubscriptionStatus = "inactive" | "active" | "past_due" | "canceled";
export type SessionStatus = "requested" | "confirmed" | "completed" | "canceled";

export interface Profile {
  id: string;
  role: UserRole;
  name: string | null;
  avatar_url: string | null;
  subscription_status: SubscriptionStatus;
  subscription_tier: SubscriptionTier;
  current_streak: number;
  longest_streak: number;
  last_log_date: string | null;
  trial_ends_at: string;
  created_at: string;
}

export interface Badge {
  id: string;
  client_id: string;
  badge_key: string;
  earned_at: string;
}

export interface Program {
  id: string;
  coach_id: string;
  title: string;
  description: string | null;
  created_at: string;
}

export interface Workout {
  id: string;
  program_id: string;
  name: string;
  sort_order: number;
  notes: string | null;
}

export interface Exercise {
  id: string;
  workout_id: string;
  name: string;
  sets: number | null;
  reps: number | null;
  weight_target: string | null;
  notes: string | null;
}

export interface ProgressLog {
  id: string;
  client_id: string;
  log_date: string;
  weight: number | null;
  measurements: Record<string, number> | null;
  notes: string | null;
  created_at: string;
}

export interface ProgressPhoto {
  id: string;
  client_id: string;
  storage_path: string;
  log_date: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  created_at: string;
  read_at: string | null;
}

export interface CoachingSession {
  id: string;
  client_id: string;
  coach_id: string;
  scheduled_at: string;
  status: SessionStatus;
  notes: string | null;
  created_at: string;
}

export interface MealLog {
  id: string;
  client_id: string;
  storage_path: string;
  description: string | null;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  created_at: string;
}
