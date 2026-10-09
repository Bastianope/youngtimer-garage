-- La clé service (envoi des alertes, désinscription) n'hérite pas des droits par défaut sur ce projet :
-- on accorde explicitement le strict nécessaire. Relançable sans risque.
grant select on public.vehicle_listings, public.vehicles, public.car_generations, public.car_models, public.car_makes
  to service_role;
grant select, delete on public.listing_alerts to service_role;

notify pgrst, 'reload schema';
