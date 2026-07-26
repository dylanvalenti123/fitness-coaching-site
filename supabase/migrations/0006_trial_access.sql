-- 7-day free trial: new clients get full access to the core tools, then they
-- lock until subscription_tier moves off 'none'.

alter table profiles
  add column trial_ends_at timestamptz not null default (now() + interval '7 days');
