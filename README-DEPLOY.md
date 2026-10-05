# Bygentreprise.dk – deploy

Statisk site (ingen WordPress, ingen database). Alt ligger i roden af denne mappe.

## Upload via GitHub til Simply
1. Opret et repository og læg ALLE filer fra zip'en i roden (inkl. den skjulte fil .htaccess).
2. Brug Simply's Git-deploy (eller GitHub Action med FTP) til at deploye roden til `public_html`.
3. Aktivér gratis SSL i Simply-kontrolpanelet – .htaccess tvinger https://bygentreprise.dk (uden www).
4. Tilføj domænet i Google Search Console og indsend https://bygentreprise.dk/sitemap.xml

## Efter launch
- Ret forfatter-bio og evt. tilføj portrætfoto (assets/emil.jpg) i build.py.
- Tjek priser løbende og opdatér DATE i build.py ved ændringer.
- Denne fil blokeres for offentligheden via .htaccess.
