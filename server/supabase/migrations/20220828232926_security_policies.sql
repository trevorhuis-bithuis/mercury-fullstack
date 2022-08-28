-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE POLICY "Enable actions for authenticated users only"
    ON public.categories
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable actions for authenticated users only"
    ON public.groups
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only"
    ON public.profiles
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING ((auth.uid() = user_id))
    WITH CHECK (true);

REVOKE ALL ON TABLE public.budgets FROM authenticated;
REVOKE ALL ON TABLE public.budgets FROM service_role;
REVOKE ALL ON TABLE public.budgets FROM postgres;
GRANT ALL ON TABLE public.budgets TO authenticated;

GRANT ALL ON TABLE public.budgets TO postgres;

GRANT ALL ON TABLE public.budgets TO service_role;

ALTER TABLE IF EXISTS public.budgets
    RENAME id TO month;

ALTER TABLE public.budgets
    ALTER COLUMN month TYPE integer;
ALTER TABLE IF EXISTS public.budgets
    ALTER COLUMN month DROP DEFAULT;

ALTER TABLE IF EXISTS public.budgets
    RENAME id TO year;

ALTER TABLE public.budgets
    ALTER COLUMN year TYPE integer;
ALTER TABLE IF EXISTS public.budgets
    ALTER COLUMN year DROP DEFAULT;

ALTER TABLE IF EXISTS public.budgets
    RENAME id TO profile_id;

ALTER TABLE IF EXISTS public.budgets
    ALTER COLUMN profile_id DROP DEFAULT;

ALTER TABLE IF EXISTS public.budgets
    RENAME id TO result;

ALTER TABLE public.budgets
    ALTER COLUMN result TYPE double precision;
ALTER TABLE IF EXISTS public.budgets
    ALTER COLUMN result DROP DEFAULT;

ALTER TABLE IF EXISTS public.budgets
    ALTER COLUMN result DROP NOT NULL;

ALTER TABLE IF EXISTS public.budgets
    RENAME id TO is_closed;

ALTER TABLE public.budgets
    ALTER COLUMN is_closed TYPE boolean;
ALTER TABLE IF EXISTS public.budgets
    ALTER COLUMN is_closed SET DEFAULT false;

COMMENT ON COLUMN public.budgets.is_closed
    IS 'Describes whether the user logged all of their transactions for the month.';

ALTER TABLE IF EXISTS public.budgets
    ADD COLUMN user_id uuid NOT NULL;
ALTER TABLE IF EXISTS public.budgets DROP CONSTRAINT IF EXISTS budgets_pkey;

ALTER TABLE IF EXISTS public.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (year, month, profile_id);

ALTER TABLE IF EXISTS public.budgets
    ADD CONSTRAINT budgets_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

CREATE POLICY "Enable insert for authenticated users only"
    ON public.budgets
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING ((auth.uid() = user_id))
    WITH CHECK (true);

REVOKE ALL ON TABLE public.transactions FROM authenticated;
REVOKE ALL ON TABLE public.transactions FROM service_role;
REVOKE ALL ON TABLE public.transactions FROM postgres;
GRANT ALL ON TABLE public.transactions TO authenticated;

GRANT ALL ON TABLE public.transactions TO postgres;

GRANT ALL ON TABLE public.transactions TO service_role;

ALTER TABLE IF EXISTS public.transactions
    RENAME id TO budget_id;

ALTER TABLE IF EXISTS public.transactions
    ALTER COLUMN budget_id DROP DEFAULT;

ALTER TABLE IF EXISTS public.transactions
    ADD COLUMN user_id uuid NOT NULL;

ALTER TABLE IF EXISTS public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

CREATE POLICY "Enable insert for authenticated users only"
    ON public.transactions
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING ((auth.uid() = user_id))
    WITH CHECK (true);