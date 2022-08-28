-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.transactions
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    merchant text COLLATE pg_catalog."default",
    amount double precision,
    date date,
    group_id uuid NOT NULL,
    category_id uuid NOT NULL,
    budget_id uuid,
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT transactions_budget_id_fkey FOREIGN KEY (budget_id)
        REFERENCES public.budgets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT transactions_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT transactions_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.transactions
    OWNER to postgres;

ALTER TABLE IF EXISTS public.transactions
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.transactions TO anon;

GRANT ALL ON TABLE public.transactions TO authenticated;

GRANT ALL ON TABLE public.transactions TO postgres;

GRANT ALL ON TABLE public.transactions TO service_role;

CREATE TABLE IF NOT EXISTS public.categories
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text COLLATE pg_catalog."default" DEFAULT 'New Category'::text,
    budget_id uuid NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_budget_id_fkey FOREIGN KEY (budget_id)
        REFERENCES public.budgets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;

ALTER TABLE IF EXISTS public.categories
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.categories TO anon;

GRANT ALL ON TABLE public.categories TO authenticated;

GRANT ALL ON TABLE public.categories TO postgres;

GRANT ALL ON TABLE public.categories TO service_role;

CREATE TABLE IF NOT EXISTS public.groups
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text COLLATE pg_catalog."default" DEFAULT 'New Group'::text,
    expected double precision DEFAULT '0'::double precision,
    category_id uuid NOT NULL,
    budget_id uuid NOT NULL,
    CONSTRAINT groups_pkey PRIMARY KEY (id),
    CONSTRAINT groups_budget_id_fkey FOREIGN KEY (budget_id)
        REFERENCES public.budgets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT groups_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.groups
    OWNER to postgres;

ALTER TABLE IF EXISTS public.groups
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.groups TO authenticated;

GRANT ALL ON TABLE public.groups TO anon;

GRANT ALL ON TABLE public.groups TO service_role;

GRANT ALL ON TABLE public.groups TO postgres;

CREATE TABLE IF NOT EXISTS public.profiles
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profiles
    OWNER to postgres;

ALTER TABLE IF EXISTS public.profiles
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.profiles TO anon;

GRANT ALL ON TABLE public.profiles TO authenticated;

GRANT ALL ON TABLE public.profiles TO postgres;

GRANT ALL ON TABLE public.profiles TO service_role;

ALTER TABLE IF EXISTS public.budgets
    ALTER COLUMN id SET DEFAULT uuid_generate_v4();

ALTER TABLE IF EXISTS public.budgets
    RENAME id TO month;

ALTER TABLE public.budgets
    ALTER COLUMN month TYPE integer;

ALTER TABLE IF EXISTS public.budgets
    RENAME id TO year;

ALTER TABLE public.budgets
    ALTER COLUMN year TYPE integer;

ALTER TABLE IF EXISTS public.budgets
    ADD COLUMN profile_id uuid NOT NULL;

ALTER TABLE IF EXISTS public.budgets
    ADD COLUMN result double precision;

ALTER TABLE IF EXISTS public.budgets
    ADD COLUMN is_closed boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.budgets.is_closed
    IS 'Describes whether the user logged all of their transactions for the month.';
ALTER TABLE IF EXISTS public.budgets DROP CONSTRAINT IF EXISTS budgets_pkey;

ALTER TABLE IF EXISTS public.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (month, year, profile_id);

ALTER TABLE IF EXISTS public.budgets
    ADD CONSTRAINT budgets_id_key UNIQUE (id);
ALTER TABLE IF EXISTS public.budgets
    ADD CONSTRAINT budgets_profile_id_fkey FOREIGN KEY (profile_id)
    REFERENCES public.profiles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
