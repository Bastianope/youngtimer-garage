-- Rallyes sur la carte des rassemblements : type d'événement + grands rallyes aux dates 2027 publiées.
-- Relançable sans risque. À lancer AVANT de merger la PR « Dossiers » (le site lit la nouvelle colonne).

alter table public.events add column if not exists event_kind text not null default 'rassemblement';
alter table public.events drop constraint if exists events_event_kind_check;
alter table public.events add constraint events_event_kind_check check (event_kind in ('rassemblement', 'rallye'));
grant select (event_kind) on public.events to anon, authenticated;

-- Dates publiées par les organisateurs, vérifiées le 27/10/2026.
-- Point sur la carte = ville de départ (Monaco pour le Monte-Carlo : 4 départs, arrivée commune).
insert into public.events (
  title, description, start_date, end_date, venue_name, city, region, country,
  latitude, longitude, website_url, source_type, source_url, verification_status, event_kind, created_by
)
select v.title, v.description, v.start_date::date, v.end_date::date, v.venue_name, v.city, 'Grands rallyes', v.country,
  v.lat, v.lng, v.website_url, 'guide_specialise', v.source_url, 'verifie', 'rallye',
  '3f08b5f4-a085-4691-98bc-7205e68d5e65'::uuid
from (values
  ('Rallye Monte-Carlo Historique (29e édition)',
   E'Rallye de régularité réservé aux modèles ayant couru le Rallye Automobile Monte-Carlo entre 1911 et 1986.\nDéparts de Bad Homburg (Allemagne), Barcelone (Espagne), Reims (France) et Monaco, arrivée au Port Hercule le 2 février au soir, soirée de gala le 3 février.',
   '2027-01-27', '2027-02-03', 'Port Hercule', 'Monaco', 'Monaco', 43.737, 7.420,
   'https://acm.mc/en/epreuves/rallye-monte-carlo-historique/', 'https://www.visitmonaco.com/en/events/monaco-s-major-events/rallye-monte-carlo-historique'),
  ('Rallye des Princesses Richard Mille',
   E'Rallye de régularité 100 % féminin pour des voitures construites entre 1946 et 1991, sur sélection.\nParcours 2027 à confirmer ; en 2026 : de Paris à Saint-Tropez par Troyes, Vichy, Aix-les-Bains et Nîmes.',
   '2027-05-22', '2027-05-27', null, 'Paris', 'France', 48.857, 2.352,
   'https://www.peterauto.fr/en/events/rallye-des-princesses-richard-mille/', 'https://www.peterauto.fr/en/events/rallye-des-princesses-richard-mille/'),
  ('1000 Miglia – édition du centenaire',
   E'La « plus belle course du monde » fête ses 100 ans sur le tracé de 1927 : Brescia, Parme, Modène, Florence, Sienne, Rome, Pérouse, retour à Brescia.\nRégularité, réservée aux modèles ayant couru la 1000 Miglia historique (1927-1957).',
   '2027-05-24', '2027-05-29', null, 'Brescia', 'Italie', 45.541, 10.212,
   'https://1000miglia.it', 'https://motori.quotidiano.net/varie/curiosita/1000-miglia-2027-percorso.htm'),
  ('Peking to Paris Motor Challenge (10e édition)',
   E'Rallye d''endurance de la Grande Muraille de Chine à Paris : environ 17 500 km et 12 pays.\nVoitures d''avant 1921 jusqu''aux « Modern Classics » de 1976 à 1985. Complet, liste d''attente.',
   '2028-06-04', '2028-07-16', 'Grande Muraille', 'Pékin', 'Chine', 39.904, 116.407,
   'https://www.hero-era.com/rallies/2028/06/peking-to-paris-2028', 'https://www.hero-era.com/rallies/2028/06/peking-to-paris-2028')
) as v(title, description, start_date, end_date, venue_name, city, country, lat, lng, website_url, source_url)
where not exists (
  select 1 from public.events e where e.title = v.title and e.start_date = v.start_date::date
);

notify pgrst, 'reload schema';

-- Contrôle
select title, start_date, end_date, city, country, event_kind, verification_status
from public.events where event_kind = 'rallye' order by start_date;
