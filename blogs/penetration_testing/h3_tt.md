# h3 Täysin Laillinen Sertifikaatti
Kotitehtävä h3 Täysin Laillinen Sertifikaatti Tero Karvisen Tunkeutumistestaus 2025 syksy -kurssille. [Linkki kurssisivulle](https://terokarvinen.com/tunkeutumistestaus/)
Jokaisessa kohdassa on alla olevalla "quote" tyylillä kerrottu tehtävänanto.
>Liirum laarum laa...
## Tehtävät

###  x) 
> Lue/katso ja tiivistä. (Tässä x-alakohdassa ei tarvitse tehdä testejä tietokoneella, vain lukeminen tai kuunteleminen ja tiivistelmä riittää. Tiivistämiseen riittää muutama ranskalainen viiva kustakin artikkelista - ei pitkiä esseitä. Kannattaa lisätä myös jokin oma ajatus, idea, huomio tai kysymys.)
OWASP 2021: OWASP Top 10:2021 [A01:2021 – Broken Access Control ](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)(IDOR ja path traversal ovat osa tätä)
PortSwigget Academy:[Insecure direct object references (IDOR)](https://portswigger.net/web-security/access-control/idor)
[Path traversal](https://portswigger.net/web-security/file-path-traversal)
[Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting)
- Broken acces controll on aika laaja käsite, sisältää monta eri haavoittovuutta
  - IDOR, esim example.fi/account?id=1 --> example.fi/account?id=2 
  - Force browsing, esim example.fi/registeruser --> example.fi/registeradmin
  - Path traversal, liikutaan serverillä aluksi taaksepäin esimerkiksi roottiin asti, jonka jälkeen yritetään mennä sinne minne halutaan
- Suojautua voi esimerkiksi logeilla, server side authenticationilla sekä rate limitilla.

### a)
>  Totally Legit Sertificate. Asenna OWASP ZAP, generoi CA-sertifikaatti ja asenna se selaimeesi. Laita ZAP proxyksi selaimeesi. Laita ZAP sieppaamaan myös kuvat, niitä tarvitaan tämän kerran kotitehtävissä. Osoita, että hakupyynnöt ilmestyvät ZAP:n käyttöliittymään. (Ei toimine localhost:lla ilman Foxyproxya)

Asensin Owasp zapin kaliin `sudo apt-get install zaproxy` komennolla. Asennus onnistui ja sain avattua Zapin. En lisännyt mitään add-oneja.
<img width="1540" height="647" alt="image" src="https://github.com/user-attachments/assets/1f79b783-8be7-48d1-9a20-dc5c4b917cd4" />

Tämän jälkeen menin Tools --> Options --> Server Certificates ja tallensin CA-sertifikaatin koneelleni (eli siis Kalille). 
Sitten avasin Firefoxin 🔥🦊, menin Settings --> Search "Cert" --> Klikkasin View Certificates -->  Import --> Valitsin tallennetun sertifikaatin --> Klikkasin "Trust this CA to identify websites" --> Ok

<img width="850" height="836" alt="image" src="https://github.com/user-attachments/assets/c5779c2e-2f2b-4be0-a0d9-580906c7b189" />

Seuraavaksi laitoin Zapin asetuksista Display kohdasta "Process images in http requests/responses" päälle.

### b) 
> Kettumaista. Asenna "FoxyProxy Standard" Firefox Addon, ja lisää ZAP proxyksi siihen. Käytä FoxyProxyn "Patterns" -toimintoa, niin että vain valitsemasi weppisivut ohjataan Proxyyn. (Läksyssä ohjataan varmaankin PortSwigger Labs ja localhost.)

Seuraavaksi asensin FoxyPoxy Standard Firefox addonin Extension kohdasta Firefoxista. Sitten täytin uuden Proxyn parametrit
<img width="831" height="448" alt="image" src="https://github.com/user-attachments/assets/57bdf032-254b-4d01-a05d-3ac19052a2b0" />

Sitten lähdin testaamaan yhteyttä Portswaggering sivustoon joka on haavoittuvainen, joka tulee vastaan c tehtävässä. Ei toiminut.

<img width="1737" height="725" alt="image" src="https://github.com/user-attachments/assets/233c9725-9ea7-4da8-839a-8af7398945df" /> 

Koitin troubleshoottaa varmaan tunnin ja sain Foxyproxyn+Zapin toimimaan keskenään. Käytin tässä apuna ChatGPT-tekoälyä. Käytin myös apuna parin muun tekemää raporttia ([lansiri](https://github.com/lansiri/Tunkeutumistestaus-ici001as3a-3003/blob/main/h5.md#a-totally-legit-certificate) sekä [Robin Niinemets/askdatdude](https://askdatdude.github.io/diary/entries/diary.html?entry=TT25-003&week=Week%2036) jotta näkisin, että miten he olivat laittaneet asetukset. 

Tää oli varmaan aika monesta kohdasta kiinni, esimerkiks siitä etttä Firefoxin network tabista mulla ei oltu asetettu Network connectioneista manual proxya `127.0.0.1:8080`. Seuraavaks laitoin Proxy by patternsit kuntoon. Sit en saanu vieläkään yhteyttä sivulle. Aloin miettimää et mikäköhä täs on ja sit tajusin yhden jutun. Koitin koko ajan ottaa yhteytta suoraan siihen haavoittuvaiseen nettisivuun. Ongelmaks tässä tulee se, että en ollu kirjautunu Kalilla, vaan mun oikealla koneella. Eli siis yritin saavuttaa sivustoa, jonne pääsee vaan kirjautuneena. Olin kyllä laittanut sen spesifin url foxyproxyyn, mut ei se tietenkään toiminut kun en ollut kirjautuneena sisään. Nyt kirjauduin kalillakin tänne sisään ja homma toimii!

Ja no nyt kun testasin tätä, niin toimi tämä myös icognito ikkunassa. Url kummiskin vanhenee tietyn ajan jälkeen, eli sekin varmasti vaikutti tähän ongelmaan. Minulla oli alunperin proxy patternit väärin sekä network connection manual proxy asettamatta, joiden takia tämä ei toiminut. Eli ongelma oli aika monen asian summa, asetukset väärin monessa paikkaa sekä se, että koitin päästä sivulle jota ei enää ollut. Jatkossa pitäisi vain raportoida troubleshoottaaminen tarkemmin ja testata kunnolla jokaisen muutoksen jälkeen.

<img width="876" height="364" alt="image" src="https://github.com/user-attachments/assets/01aa1820-e71a-4b7d-a7b1-d4c5309d872b" />
<img width="1862" height="851" alt="image" src="https://github.com/user-attachments/assets/2b104cb8-a527-4e12-8c9d-91c709de4d59" />

### c,d,e,f,g,h

> PortSwigger Labs. Ratkaise tehtävät. Selitä ratkaisusi: mitä palvelimella tapahtuu, mitä eri osat tekevät, miten hyökkäys löytyi, mistä vika johtuu. Kannattaa käyttää ZAPia, vaikka malliratkaisut käyttävät harjoitusten tekijän maksullista ohjelmaa. Monet tehtävät voi ratkaista myös pelkällä selaimella. Malliratkaisun kopioiminen ZAP:n tai selaimeen ei ole vastaus tehtävään, vaan ratkaisu ja haavoittuvuuden etsiminen on selitettävä ja perusteltava.

### c) [Reflected XSS into HTML context with nothing encoded](https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded)
Luin uudestaan PortSwiggerin artikkelin XSS:sta josta minulla jäi mieleen esimerkki `<script>paha skripti</script>`. Lähdin testaamaan ensiksi muokkaamallaa urlia `?search=<script>alert("haavoittovuus")</script>`. Noh ei näyttänyt toimivan. Testasin samaa `<script>alert("haavoittovuus")</script>`itse hakukenttään html sivulla ja se toimi.
<img width="928" height="520" alt="image" src="https://github.com/user-attachments/assets/e1a1ba9d-1b6c-40c3-99a0-340a9b3a6a01" />
<img width="812" height="233" alt="image" src="https://github.com/user-attachments/assets/0221c230-4f50-4e53-a3ba-c0fb69f8c6d3" />
<img width="954" height="488" alt="image" src="https://github.com/user-attachments/assets/cc021f7b-2a0e-44d6-b6c7-2199770fe64c" />

### d&e) [Stored XSS into HTML context with nothing encoded](https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded)
No tämä oli aika antiklimaattinen. Testasin samaa `<script>alert("haavoittovuus")</script>` kommenttikenttään blogipostauksessa ja se toimi.

XSS haavoittovuudet tapahtuvat käyttäjän verkkoselaimella, eli esimerkiksi serveriin sillä ei voi hyökätä. XSS toimii siten, että hyökkääjä saa lähetettyä haavoittuvaista Javascriptia käyttäjälle selaimen avulla. Itselleni tuli mieleen sellainen skenaario, jossa hyökkääjä voisi esimerkiksi tehdä cookie stealer scriptin. Hän piilottaa scriptin pankin online chat viestiin ja tätä kautta saa kaapattua pankin työntekijän istunnon. Tai hän voisi esimerkiksi tehdä scriptin, joka kirjauttaa käyttäjän ulos ja uudelleenohjaa käyttäjän kirjautumaan sivulle. Sivu olisi sellainen jonka hyökkääjä on pystyttänyt ja olisi samanlainen kuin oikea kirjautumissivu. Tämä olisi vähän enemmän inside job, jotta hyökkääjä tietäisi minkälainen on työntekijän kirjautumissivu. On myös tietenkin mahdollista, että hyökkääjä on nähnyt jollain videolla tai esimerkiksi yritysvierailulla minkälainen kyseinen sivu on.

Yksi syy, miksi tämä toimii on se, että käyttäjän syötettä ei tarkisteta. Esimerkiksi käyttäjän annetaan laittaa "/<*". Sen sijaan käyttäjälle pitäisi antaa oikeus laittaa chattiin vain kirjaimia, välilyöntejä sekä joitain erikoismerkkejä. Yksi tapa, millä tätä vastaan voidaan myös taistella on koodata sivun backend niin, että mielummin kerrotaan mitä saa tulla systeemiin sisään kuin se, että mitä ei saa tulla. On paljon helpompi siis kertoa, että haluan vain nämä kirjaimet ja erikoismerkit, kuin kertoa että näitä kirjaimia en halua.

### f)
> [File path traversal, simple case](https://portswigger.net/web-security/file-path-traversal/lab-simple). Laita tarvittaessa Zapissa kuvien sieppaus päälle.

Ensiksi luin Portswiggerin path traversal sivun uudestaan. Olen jo aikaisemmin tehnyt muutaman path traversal tehtävän [pwncollege](https://pwn.college/) sivulla, joten aihe oli pinnallisesti tuttu. Avasin labin ja right-clickasin random kuvaa ja laitoin "Open picture in a new window" jotta pääsen kuvan url osoitteeseen. Sen jälkeen testasin seuraavaa urlia `https://0a3700e604c39eef806d67ef00e80066.web-security-academy.net/image?filename=../../../../etc/passwd` Sain avattua sivun, jossa oli vain pieni kuva. Testasin sitten laittaa muutaman pathin vähemmän, sekä enemmän (eli siis ../). Muutaman kerran jälkeen palasin takaisin sivulle ja siellä luki "Congratulations, you solved the lab!" Näin jälkeenpäin katsottuna, varmaan ensimmäinen yritys onnistui 

<img width="59" height="54" alt="image" src="https://github.com/user-attachments/assets/da23ba38-1e20-4f02-9d16-59fafe19c831" />

### g)
> [File path traversal, traversal sequences blocked with absolute path bypass](https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass)

Seuraavaksi testasin hetti alkuun samaa temppua `filename=../../../../etc/passwd`. Ei onnistunut. Testasin taas muutaman pathin ylös sekä alas, mutta ei onnistunut. Muistan kummiskin lukeneeni PortSwiggerin Path Traversal sivulta, että myös tiedoston absoluuttista polkua voi käyttää path traversalissa. Päätin testata tätä `filename=/etc/passwd` ja se onnistui. Nyt sivulle tuli taas pieni kuva ja menin tsekkaamaan oikeaa sivustoa ja siellä näkyi että path traversal onnistui.

### h)
> [File path traversal, traversal sequences stripped non-recursively](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively)

Testasin aluksi jo valmiiksi opitut temput `../../ sekä /etc/passwd` jos ne sattuisivat toimimaan. No eivät toimineet. Katsoin uudestaan path traversal sivua ja löysin pienen vinkin, nested traversal sequences. Tässä tavassa huijataan filtteröinti järjestelmää laittamalla tuplana merkit, pois lukien itse polku haluttuun tiedostoon `filename=....//....//....//....//etc/passwd`. Ensimmäisellä oikein, aika harvinaista.

### Havainnot path traversalista
Tehtävät sai tehtyä perus metodeilla, ei tarvinnut esimerkiksi url encodata polkua `%2e%2e%2f = ../`. Path traversalia vastaan toimii oikeastaan samat asiat kuin XSS haavoittuvuutta vastaan. Eli käyttäjän syöttämä data pitäisi filtteröidä ja mielummin kertoa järjestelmälle mitä käyttäjä saa sanoa, kuin mitä ei saa sanoa.  

Minun olisi kannattanut tehdä tehtävät foxyproxyn ja zapin avulla, jotta oppisin näiden käyttämisen. Minulle jäi vain paha maku suuhun näistä troubleshoottaamisen takia. Nämä tehtävät pystyi tekemään helposti ilman kyseisiä apuvälineitä, mutta vaikeampia haavoittuvuuksia ei voi etsiä, exploitata tai testata kovin helposti vain nettiselaimen avulla. Aionkin testata tehdä samat tehtävät apuvälineiden avulla, jotta opin myös niiden käytön. 

### i)
> [Insecure direct object references](https://portswigger.net/web-security/access-control/lab-insecure-direct-object-references)


# Lähteet
- https://github.com/lansiri/Tunkeutumistestaus-ici001as3a-3003/blob/main/h5.md#a-totally-legit-certificate
- https://askdatdude.github.io/diary/entries/diary.html?entry=TT25-003&week=Week%2036
- Chat-GPT, Malli: GPT5 Think-longer setting on
- https://portswigger.net/web-security/cross-site-scripting
- https://portswigger.net/web-security/cross-site-scripting/preventing
- https://portswigger.net/web-security/file-path-traversal
- https://portswigger.net/web-security/access-control#what-is-access-control
- https://portswigger.net/web-security/access-control/idor
- https://owasp.org/www-community/attacks/Path_Traversal
- https://owasp.org/Top10/A01_2021-Broken_Access_Control/

