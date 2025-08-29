# Kybertappoketju

## Johdanto
Kotitehtävä h1 Kybertappoketju Tero Karvisen Tunkeutumistestaus 2025 syksy -kurssille. [Linkki kurssisivulle](https://terokarvinen.com/tunkeutumistestaus/)
Alla kokonaisuudessaan tehtävänanto, mikä on otettu kurssisivulta

x) Lue/katso/kuuntele ja tiivistä. (Tässä x-alakohdassa ei tarvitse tehdä testejä tietokoneella, vain lukeminen tai kuunteleminen ja tiivistelmä riittää. Tiivistämiseen riittää muutama ranskalainen viiva.)
Herrasmieshakkerit (RSS) tai Darknet Diaries (RSS) , yksi vapaavalintainen jakso jommasta kummasta. Voi kuunnella myös lenkillä, pyykiä viikatessa tms. Siisti koti / hyvä kunto kaupan päälle.
Hutchins et al 2011: Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary Campaigns and Intrusion Kill Chains, chapters Abstract, 3.2 Intrusion Kill Chain.
€ Santos et al: The Art of Hacking (Video Collection): 4.3 Surveying Essential Tools for Active Reconnaissance. Sisältää porttiskannauksen. 5 videota, yhteensä noin 20 min.
KKO 2003:36.

a) Asenna Kali virtuaalikoneeseen. (Jos asennuksessa ei ole mitään ongelmia tai olet asentanut jo aiemmin, tarkkaa raporttia tästä alakohdasta ei tarvita. Kerro silloin kuitenkin, mikä versio ja millä asennustavalla. Jos on ongelmia, niin tarkka ja toistettava raportti).

b) Irrota Kali-virtuaalikone verkosta. Todista testein, että kone ei saa yhteyttä Internetiin (esim. 'ping 8.8.8.8')
c) Porttiskannaa 1000 tavallisinta tcp-porttia omasta koneestasi (nmap -T4 -A localhost). Selitä komennon paramterit. Analysoi ja selitä tulokset.

d) Asenna kaksi vapaavalintaista demonia ja skannaa uudelleen. Analysoi ja selitä erot.

e) Asenna Metasploitable 2 virtuaalikoneeseen

f) Tee koneiden välille virtuaaliverkko. Jos säätelet VirtualBoxista
Kali saa yhteyden Internettiin, mutta sen voi laittaa pois päältä
Kalin ja Metasploitablen välillä on host-only network, niin että porttiskannatessa ym. koneet on eristetty intenetistä, mutta ne saavat yhteyden toisiinsa
Vaihtoehtoisesti voit tehdä molempien koneiden asennuksen ja virtuaaliverkon vagrantilla. Silloin molemmat koneet samaan Vagrantfile:n.

g) Etsi Metasploitable porttiskannaamalla (nmap -sn). Tarkista selaimella, että löysit oikean IP:n - Metasploitablen weppipalvelimen etusivulla lukee Metasploitable.

h) Porttiskannaa Metasploitable huolellisesti ja kaikki portit (nmap -A -T4 -p-). Poimi 2-3 hyökkääjälle kiinnostavinta porttia. Analysoi ja selitä tulokset näiden porttien osalta.

## Tiivistys podcasteista, artikkeleista jne
### Podcast
Kuuntelin Herrasmieshakkereiden jakson "RIkos, Jonka voit tilata netistä | Yhteistyössä Kyberrosvot [Linkki podcastiin Spotifyssa](https://open.spotify.com/episode/63NKaapqkllmBqr6cv4AKJ?si=ddbc7113adac43f5) jonka julkaisupäivä Spotifyssa on 27.3.2024 Jakso oli tehty yhteistyössä DNA:n oman kyberpodcastin Kyberrosvot kanssa. 
Muutama muistiinpano / mielenkiintoinen asia mitä jäi mieleen

- Kiristyshaittaohjelmat ovat vuosittain yli miljardin euron bisnes.
- CaaS & RaaS: Cybercrime/Ransomware as a service
- Verkkorikollisuus yleistynyt ja ammatimaistunut huomattavasti. Ennen hyökkäyksiä tehtiin ns trollauksena. Tekeminen oli ennen "harrastemaista".
- Kryptot helpottanut tekemistä ja vaurastanut rikollisia, koska esimerkiksi Bitcoinin hinta noussut huimasti.
- Passkey tulee toivottavasti yleistymään tulevaisuudessa.

### White Paper
[Linkki White Paperiin](https://lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/LM-White-Paper-Intel-Driven-Defense.pdf)

Kybertappoketju on seitsemän vaihenen tapahtumien ketju, jossa kerrotaan eri vaiheet kybertappoketjusta.
- Tiedustelu: Valitaan kohde/kohteet ja etsitään mahdollisimman paljon tietoa kohteesta.
- Aseistaminen: Valmistetaan hyötykuorma, eli jokin scripti jne jonka avulla voidaan mahdollisesti tunkeutua kohteeseen.
- Toimittaminen: Toimitetaan hyötykuorma kohteeseen.
- Hyväksikäyttö: Kun hyötykuorma on toimitettu onnistuneesteesti kohteeseen, pitäisi sen pystyä suorittamaan sen koodi.
- Asennus: Asennetaan takaovi kohteeseen, eli esimerkiksi Bind tai Reverse Shell
- Koneen hallitseminen: Hyökkääjä ottaa koneen kokonaan haltuunsa, eli hankkii admin/root oikeudet.
- Tavoitteiden suorittaminen: Tehdään se mitä oltiin tultu tekemään, eli esimerkiksi otetaan haltuun yrityksen henkilöstön henkilötiedot, levitetään tämän koneen kautta haittaohjelma toisen yrityksen koneeseen.

### The art of Hacking
[Linkki videoon](https://learning.oreilly.com/videos/the-art-of/9780135767849/9780135767849-SPTT_04_00)
- Videolla esiteltiin eri porttiskannereita, esim masscan sekä  Nmap, 
- Parametreilla erittäin suuri merkitys porttiskanauksia tehdessä. 
- EyeWitness, ottaa näytönkaappaukset annetuiden ip osoitteiden nettisivuista. Helpottaa skannausta jos haluaa skannata monta ip osoitetta nopeasti. 

### Finlex Ennakkopäätös
[Linkki Finlexin sivulle](https://finlex.fi/fi/oikeuskaytanto/korkein-oikeus/ennakkopaatokset/2003/36#OT0_OT0)

Henkilö skannasi luvattomasti Osuuspankkikeskuksen (OPK) tietojärjestelmiä 2000-luvun vaihteessa. Henkilö skannaili netistä avoimia välityspalvelinta tai jotain muuta kiinnostavaa. Hän joko sattumalta tai tahalleen päätti skannata OPK:n avoimet portit. Henkilön puolustus oli se, että hän ei yrittänyt tunkeutua palvelimelle, hän halusi vain mielenkiinnosta selvittää onko kyseisellä palvelimella mitään avoimia portteja. Eli toisin sanoin hän huvikseen kulki yöllä testaten omakotitalojen ovia ja mikäli ovi olisi ollut auki, ei hän olisi mennyt sisälle.

## Käytännön osuudet

### Kali Linuxin asennus
a)
VMBoxien asentaminen oli jo tuttua ennen kurssia, joten tämä onnistui helposti. Latasin Kali Linux Installer imagen heidän  [kotisivuiltaan](https://www.kali.org/get-kali/#kali-installer-images). Tämän jälkeen asensin sen Oracle Virtualboxiin toimivaksi Virtual Machineksi (Jatkossa tekstillä VM). Versiona toimii uusin Kali Linux, eli 2025.2.
### Internet pois VM:sta
b)
Mieleen tuli kaksi tapaa ottaa netti VM:sta, joko suoraan Virtualboxin asetuksista tai sitten itse VM:sta. Esimerkiksi suoraan VM:sta komennolla

    nmcli network off

Tai sitten laittaa Virtualiboxin asetuksista networkadapterin not attached. 
<img width="698" height="406" alt="image" src="https://github.com/user-attachments/assets/05f7a80b-295d-4d83-bde2-f41136fdccaf" />

Molemmat tavat toimivat. Kunhan vain muistaa aina testata ettei nettiä ole ennen nmap komentoja :)
### Porttiskannaus
c)
Löysin erittäin hyvän cheat sheetin GitHubista Nmapin käyttöön [Linkki repoon](https://github.com/jasonniebauer/Nmap-Cheatsheet). Itse cheat sheetista ei löytynyt selitystä mitä agressiivinen skannaus tekee, muuta kuin ole agressiivinen 😠💥. Tai oikeastaan mistään mitään selitystä. Tähän löytyi hyvä dokumentti NMapin omilta sivuilta [Linkki sivulle](https://nmap.org/book/man-briefoptions.html) sekä parempi selitys mitä -A tekee [Linkki sivulle](https://nmap.org/book/man-misc-options.html) 

    nmap -T4 -A localhost

  - -T4 = Nopea skannaus. Parametrit ovat -T0 - -T4. Mitä pienempi numero sitä tarkempi skannaus
  - -A = Agressiivinen skannaus. Ottaa käyttöön seuraavat parametrit
      - -o = Käyttöjärjestelmän havainnointi
      - -sV = Version skannaus, kertoo mikä versio esimerkiksi Apachesta on
      - -sC = Skriptien skannaus.
      - --traceroute = Näyttää minkä reitin kautta paketit kulkee hostille

Seuraavaksi runasin annetun nmap komennon 
 
    nmap -T4 -A localhost
<img width="1329" height="527" alt="image" src="https://github.com/user-attachments/assets/cccd7e92-0ad1-4c76-a528-ec334652affa" />

### Mitä Nmapin vastaus kertoo kun yhtään porttia ei ole auki
- Kertoo mihin kellonaikaan sekä päivään komento suoritettiin
- Kertoo kohteen ip:n mihin scannaus suoritettiin, tässä tapauksessa 127.0.0.1
- Host is up, kohde on saavutettavissa 
- Kaikki localhostin 1000 yleisintä porttia ovat kiinni.
- Liian monta mahdollista osumaa, joten käyttöjärjestelmää ei voitu tunnistaa
- Koska skannaus tehtiin omaan koneeseen, on network distance 0 hops
- Scannauksen kesto 2.09 sekunttia

### Laiteaan päälle daemonit
d)
Seuraavaksi laitoin päälle kaksi d(a)emonia :smiling_imp: jotta pystyin tutkimaan mitä komento tulostaa kun muutama portti on auki. 
  - SSH 
  - apache2 

Komennot

    sudo systemctl enable --now apache2
    sudo systemctl enable --now ssh

<img width="895" height="784" alt="image" src="https://github.com/user-attachments/assets/cd971f5b-259b-4a76-940a-bf3ccfc0a783" />

### Mitä lisätietoa Nmapin vastaus antaa, jos useita portteja on auki?
- Kertoo että nyt oli 2 porttia auki
      - SSH auki portissa 22. Kertoo myös SSH:n version
      - Apache auki portissa 80. Kertoo myös Apachen version
- Nyt nmap pystyi tunnistamaan käyttöjärjestelmän.
- Scannauksen kesto nousi 2,09 --> 8,79. Tämä siksi, koska muutama portti oli auki, joten niiden skannaamiseen meni aikaa. Tietty pientä varianssia tulee varmasti, jos skannaa samalla tavalla monta kertaa, mutta ei näin suurta.

## Asennetaan Metasploitable 2 virtuaalikoneeseen
e) Asensin Metasploitable 2 zip tiedoston [täältä](https://sourceforge.net/projects/metasploitable/). Sen jälkeen purin tiedoston. Tämän jälkeen loin normaalisti uuden virtuaalikoneen VMBoxissa. Pidin oletusasetukset, paitsi muutin  Hard Disk asetuksen. Tästä laitoin asetuksen "Use existing Virtual Hard Disk file jonka jälkeen laitoin puretun metasploitable.vmdk kyseiseksi tiedostoksi.
### Virtuaaliverkon tekeminen Kalin ja Metasploitablen välille
f)

Koneiden välille saa tehtyä helposti Host Only Networkin laittamalle sen päälle kyseisen virtuaalikoneen Settings --> Network --> Host Only adapter. Itse tein niin, että pidin Kalissa Adapter 1 alkuperäisen adapterin asetukset, jotta saisin yhdistettyä internettiin mikäli niin haluan. Adapter 2 laitoin Host only adapterin. Kun Adapter 1:ssa on kaapeli päällä, sain yhteyden internettiin, niin kuin pitäisikin. Kun laitoin siitä kaapelin pois ja Adapter 2 (Host only) kaapelin päälle en saanut yhteyttä internettiin, eli kaikki toimii tässä vaiheessa niin kuin pitääkin. Metasploitablessa minulla on käytössä vain Host Only adapteri
<img width="901" height="456" alt="image" src="https://github.com/user-attachments/assets/83001a5d-c038-49ac-8e4f-e58a3be03323" />

<img width="622" height="272" alt="image" src="https://github.com/user-attachments/assets/125e404c-7d0f-48f6-9b83-cf5270f04170" />


### Metasploitable päälle
Nyt laitetaan viellä Metasploitable päälle ja katsotaan onko se kalin kanssa samassa verkossa. 

Ensiki testasin nmap -sn komentoa. Komento ei antanut tuloksesi mitään, joten koitin muutaman kerran uudestaan ilman tulosta. Lopulta tarkistin metasploitablesta sen ip:n ja curlasin osoitteen Kalilla. Tästä sain varmuuden siitä, että koneet pystyvät puhumaan toisillensa verkon sisällä. 

<img width="1286" height="849" alt="image" src="https://github.com/user-attachments/assets/9b001adb-2cb5-4261-87ae-0aeab5ea25a6" />
  
### Metasploitablen porttiskannaus
Seuraavaksi skannasin Metasploitablen portit. Kuitenkin sitä ennen pingasin varmuuden vuoksi 8.8.8.8 varmistuen siitä, että en varmasti ole yhdistetty internettiin.

    ping 8.8.8.8

Sama nmap komento kuin viimeksi, paitsi nyt vielä -p- parametrilla. -p- Skannaa kaikki portit. 


    nmap -A -T4 -p- 192.168.56.102

Tulokseksi tuli tällainen rimpsu:

    nmap  -A -T4 -p- 192.168.56.102
    Starting Nmap 7.95 ( https://nmap.org ) at 2025-08-25 00:55 CEST
    mass_dns: warning: Unable to determine any DNS servers. Reverse DNS is disabled. Try using --system-dns or specify valid servers with --dns-servers
    Nmap scan report for 192.168.56.102
    Host is up (0.0024s latency).
    Not shown: 65505 closed tcp ports (reset)
    PORT      STATE SERVICE     VERSION
    21/tcp    open  ftp         vsftpd 2.3.4
    | ftp-syst: 
    |   STAT: 
    | FTP server status:
    |      Connected to 192.168.56.101
    |      Logged in as ftp
    |      TYPE: ASCII
    |      No session bandwidth limit
    |      Session timeout in seconds is 300
    |      Control connection is plain text
    |      Data connections will be plain text
    |      vsFTPd 2.3.4 - secure, fast, stable
    |_End of status
    |_ftp-anon: Anonymous FTP login allowed (FTP code 230)
    22/tcp    open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
    | ssh-hostkey: 
    |   1024 60:0f:cf:e1:c0:5f:6a:74:d6:90:24:fa:c4:d5:6c:cd (DSA)
    |_  2048 56:56:24:0f:21:1d:de:a7:2b:ae:61:b1:24:3d:e8:f3 (RSA)
    23/tcp    open  telnet      Linux telnetd
    25/tcp    open  smtp        Postfix smtpd
    | sslv2: 
    |   SSLv2 supported
    |   ciphers: 
    |     SSL2_RC2_128_CBC_WITH_MD5
    |     SSL2_RC4_128_EXPORT40_WITH_MD5
    |     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5
    |     SSL2_DES_192_EDE3_CBC_WITH_MD5
    |     SSL2_RC4_128_WITH_MD5
    |_    SSL2_DES_64_CBC_WITH_MD5
    | ssl-cert: Subject: commonName=ubuntu804-base.localdomain/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX
    | Not valid before: 2010-03-17T14:07:45
    |_Not valid after:  2010-04-16T14:07:45
    |_smtp-commands: metasploitable.localdomain, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN
    |_ssl-date: 2025-08-24T22:58:07+00:00; -1s from scanner time.
    53/tcp    open  domain      ISC BIND 9.4.2
    | dns-nsid: 
    |_  bind.version: 9.4.2
    80/tcp    open  http        Apache httpd 2.2.8 ((Ubuntu) DAV/2)
    |_http-title: Metasploitable2 - Linux
    |_http-server-header: Apache/2.2.8 (Ubuntu) DAV/2
    111/tcp   open  rpcbind     2 (RPC #100000)
    | rpcinfo: 
    |   program version    port/proto  service
    |   100000  2            111/tcp   rpcbind
    |   100000  2            111/udp   rpcbind
    |   100003  2,3,4       2049/tcp   nfs
    |   100003  2,3,4       2049/udp   nfs
    |   100005  1,2,3      33215/tcp   mountd
    |   100005  1,2,3      41407/udp   mountd
    |   100021  1,3,4      33179/udp   nlockmgr
    |   100021  1,3,4      34282/tcp   nlockmgr
    |   100024  1          55031/tcp   status
    |_  100024  1          55069/udp   status
    139/tcp   open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
    445/tcp   open  netbios-ssn Samba smbd 3.0.20-Debian (workgroup: WORKGROUP)
    512/tcp   open  exec        netkit-rsh rexecd
    513/tcp   open  login
    514/tcp   open  shell       Netkit rshd
    1099/tcp  open  java-rmi    GNU Classpath grmiregistry
    1524/tcp  open  bindshell   Metasploitable root shell
    2049/tcp  open  nfs         2-4 (RPC #100003)
    2121/tcp  open  ftp         ProFTPD 1.3.1
    3306/tcp  open  mysql       MySQL 5.0.51a-3ubuntu5
    | mysql-info: 
    |   Protocol: 10
    |   Version: 5.0.51a-3ubuntu5
    |   Thread ID: 9
    |   Capabilities flags: 43564
    |   Some Capabilities: Speaks41ProtocolNew, Support41Auth, SupportsCompression, LongColumnFlag, SupportsTransactions, SwitchToSSLAfterHandshake, ConnectWithDatabase
    |   Status: Autocommit
    |_  Salt: )lf:.t$NA:@p5S&^,\n4
    3632/tcp  open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4))
    5432/tcp  open  postgresql  PostgreSQL DB 8.3.0 - 8.3.7
    |_ssl-date: 2025-08-24T22:58:07+00:00; -1s from scanner time.
    | ssl-cert: Subject: commonName=ubuntu804-base.localdomain/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX
    | Not valid before: 2010-03-17T14:07:45
    |_Not valid after:  2010-04-16T14:07:45
    5900/tcp  open  vnc         VNC (protocol 3.3)
    | vnc-info: 
    |   Protocol version: 3.3
    |   Security types: 
    |_    VNC Authentication (2)
    6000/tcp  open  X11         (access denied)
    6667/tcp  open  irc         UnrealIRCd
    6697/tcp  open  irc         UnrealIRCd
    8009/tcp  open  ajp13       Apache Jserv (Protocol v1.3)
    |_ajp-methods: Failed to get a valid response for the OPTION request
    8180/tcp  open  http        Apache Tomcat/Coyote JSP engine 1.1
    |_http-title: Apache Tomcat/5.5
    |_http-server-header: Apache-Coyote/1.1
    |_http-favicon: Apache Tomcat
    8787/tcp  open  drb         Ruby DRb RMI (Ruby 1.8; path /usr/lib/ruby/1.8/drb)
    33215/tcp open  mountd      1-3 (RPC #100005)
    34282/tcp open  nlockmgr    1-4 (RPC #100021)
    48560/tcp open  java-rmi    GNU Classpath grmiregistry
    55031/tcp open  status      1 (RPC #100024)
    MAC Address: 08:00:27:6E:86:67 (PCS Systemtechnik/Oracle VirtualBox virtual NIC)
    Device type: general purpose
    Running: Linux 2.6.X
    OS CPE: cpe:/o:linux:linux_kernel:2.6
    OS details: Linux 2.6.9 - 2.6.33
    Network Distance: 1 hop
    Service Info: Hosts:  metasploitable.localdomain, irc.Metasploitable.LAN; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
    
    Host script results:
    |_nbstat: NetBIOS name: METASPLOITABLE, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
    | smb-os-discovery: 
    |   OS: Unix (Samba 3.0.20-Debian)
    |   Computer name: metasploitable
    |   NetBIOS computer name: 
    |   Domain name: localdomain
    |   FQDN: metasploitable.localdomain
    |_  System time: 2025-08-24T18:57:57-04:00
    |_smb2-time: Protocol negotiation failed (SMB2)
    | smb-security-mode: 
    |   account_used: <blank>
    |   authentication_level: user
    |   challenge_response: supported
    |_  message_signing: disabled (dangerous, but default)
    |_clock-skew: mean: 59m58s, deviation: 2h00m00s, median: -1s
    
    TRACEROUTE
    HOP RTT     ADDRESS
    1   2.42 ms 192.168.56.102
    
    OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
    Nmap done: 1 IP address (1 host up) scanned in 168.30 seconds

## h) Kaksi mielenkiintoisinta aukinaista porttia Metasploit VM:ssa

### Portti 21
Ensimmäisenä silmiin pisti portti 21, FTP. 

        21/tcp    open  ftp         vsftpd 2.3.4
    | ftp-syst: 
    |   STAT: 
    | FTP server status:
    |      Connected to 192.168.56.101
    |      Logged in as ftp
    |      TYPE: ASCII
    |      No session bandwidth limit
    |      Session timeout in seconds is 300
    |      Control connection is plain text
    |      Data connections will be plain text
    |      vsFTPd 2.3.4 - secure, fast, stable
    |_End of status
    |_ftp-anon: Anonymous FTP login allowed (FTP code 230)


Portissa 21 toimii FTP (File Transfer Protocol), jonka avulla asiakasohjelma voi siirtää ja vastaanottaa tiedostoja palvelimelta. Kyseinen portti on haavoittuvainen monella eri tavalla. Kuten tekstistä lukee on sen molemmat yhteydet plain text, eli siinä ei käytetä mitään salausta. Jos joku pääsee käsiksi liikenteeseen, näkee hän suoraan mitä dataa kulkee asiakasohjelman sekä palvelimen välillä. Varmistin vielä asian Googlettamalla "FTP Plain text" ja avasin Microsoftin sivun [Linkki sivulle](https://learn.microsoft.com/en-us/iis/configuration/system.applicationhost/sites/sitedefaults/ftpserver/security/authentication/basicauthentication) joka varmisti päätelmäni siitä, että FTP:ssa käyttäjänimet sekä salasanat kulkevat tekstimuodossa ilman mitään salausta.

Toinen haavoittuvuus mikä itselle tulee mieleen on se, että kyseisellä palvelimella ei ole asetettu rajaa  istunnon kaistanleveydelle (No session bandiwth limit). Jos joku pääsee käsiksi ftp yhteyteen voi hän lähettää ja ladata niin paljon dataa kuin haluaa. 

Kolmas haavoittuvuus tässä portissa jonka havaitsin on Anonymous FTP login, joka on päällä. En ollut aluksi varma mitä tämä kunnolla tarkoittaa, mutta Googlettamalla "FTP Anonymous login" löysin hyvän ja tiiviin Microsoftin FTP Learn pagen [Linkki sivulle](https://learn.microsoft.com/en-us/iis/configuration/system.applicationhost/sites/site/ftpserver/security/authentication/anonymousauthentication), missä asia selitettiin hyvin ytimekkäästi "This form of authentication allows access to an FTP site without a user account on your server or domain". Eli kyseiseen palvelimeen kuka tahansa voi ottaa yhteyden ilman mitään autentikointia.

### Portti 1524
Selaillin Nmapin antamaa rimpsua ja silmään pisti sanat "root" ja "shell" portin 1524 kohdalla

    1524/tcp  open  bindshell   Metasploitable root shell

Lähdin selvittämään asiaa googlettamalla "bindshell" ja löysin Complex Security nimisen sivuston [Linkki sivulle](https://knowledge.complexsecurity.io/security/bindshell/) joka kertoi bindshellista lisää. Hetken luetttuani tätä, tuli muistiini se että kävimme tätä aihetta myös tunnilla. Bind shell on shelli kohteen koneella, johon hyökkääjä voi yhdistää. Toinen saman tyyppinen on reverse shell, jossa kohteen kone yhdistää hyökkääjän koneeseen. 

Oma ymmärrykseni tästä on se, että tämä portti ei ole auki haavoittuvaisella koneella, ellei siihen ole jo murtauduttu jollain tavalla. Toisin kuin esimerkiksi FTP, joka on voinut vahingossa jäädä päälle, tämä ei ole sellainen. Tapahtumien kulku olisikin se, että esimerkiksi FTP:n kautta hyökkääjä jättää reverse/bind shellin ja tätä kautta pääsee koneeseen käsiksi esimerkiksi portin 1524 kautta.


