<script setup lang="ts">
const title = 'Datenschutzerklärung / Privacy policy'
const description = 'How subodhdahal.com handles personal data: hosting, cookieless analytics and your rights under the GDPR.'
const url = 'https://subodhdahal.com/privacy/'

useHead({ title, link: [{ rel: 'canonical', href: url }] })
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogUrl: url })
</script>

<template>
  <main class="container my-10">
    <article class="blog-page">
      <h1>Datenschutzerklärung</h1>
      <p class="font-sans text-sm">
        <a href="#de">Deutsch</a> · <a href="#en">English</a>
      </p>

      <!-- ───────────────────────── Deutsch ───────────────────────── -->
      <section id="de" lang="de">
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO)
          ist:
        </p>
        <p>
          {{ LEGAL.name }}<br />
          {{ LEGAL.street }}<br />
          {{ LEGAL.city }}<br />
          {{ LEGAL.country }}<br />
          E-Mail: <a :href="`mailto:${LEGAL.email}`">{{ LEGAL.email }}</a>
        </p>

        <h2>2. Überblick</h2>
        <p>
          Dies ist eine private Website mit Blog, Fotos und kleinen Werkzeugen. Es gibt keine Benutzerkonten, keine
          Kontaktformulare, keine Kommentare und keine Cookies. Schriftarten und alle Inhalte werden von dieser Domain
          ausgeliefert, nicht von Drittanbietern. Das
          <NuxtLink to="/tools/instagram-carousel/">Instagram-Karussell-Werkzeug</NuxtLink> verarbeitet deine Bilder
          ausschließlich in deinem Browser; sie werden nicht hochgeladen.
        </p>
        <p>Personenbezogene Daten werden nur in den unten beschriebenen Fällen verarbeitet.</p>

        <h2>3. Hosting über GitHub Pages</h2>
        <p>
          Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street,
          San Francisco, CA 94107, USA. Beim Aufruf einer Seite verarbeitet GitHub technisch notwendige Daten,
          insbesondere deine IP-Adresse, Datum und Uhrzeit des Abrufs, die aufgerufene Adresse, den Referrer und den
          User-Agent deines Browsers. GitHub nutzt diese Daten, um die Seite auszuliefern und die Sicherheit des
          Dienstes zu gewährleisten, und kann sie in Server-Logdateien speichern.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in einer sicheren und
          zuverlässigen Bereitstellung der Website. Die Übermittlung in die USA stützt sich auf den
          Angemessenheitsbeschluss der EU-Kommission zum EU-US Data Privacy Framework (Art. 45 DSGVO), unter dem GitHub
          zertifiziert ist. Details enthält die
          <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener noreferrer" target="_blank">Datenschutzerklärung von GitHub</a>.
        </p>

        <h2>4. Reichweitenmessung mit Rybbit</h2>
        <p>
          Um zu verstehen, welche Beiträge gelesen werden, nutze ich den Analysedienst Rybbit der Tomato.gg LLC,
          1276 Rothwell Dr, Troy, MI 48084, USA. Rybbit setzt keine Cookies und speichert nichts auf deinem Gerät.
        </p>
        <p>Beim Seitenaufruf werden folgende Daten erfasst:</p>
        <ul>
          <li>aufgerufene Seite, Seitentitel, Referrer und Kampagnen-Parameter (UTM)</li>
          <li>Browser, Betriebssystem, Gerätetyp, Bildschirmgröße, Sprache und Zeitzone</li>
          <li>ungefährer Standort (Land, Region, Stadt), der aus der IP-Adresse abgeleitet wird</li>
        </ul>
        <p>
          Deine IP-Adresse wird nur kurzzeitig für die Standortbestimmung verwendet und nicht gespeichert. Um Besuche
          zu zählen, bildet Rybbit einen Hashwert aus IP-Adresse und User-Agent, der täglich mit einem neuen Zufallswert
          erzeugt wird. Du kannst daher nicht über mehrere Tage hinweg wiedererkannt werden.
        </p>
        <p>
          Rybbit verarbeitet die Daten in meinem Auftrag auf Grundlage eines Auftragsverarbeitungsvertrags
          (Art. 28 DSGVO). Die Daten werden bei der Hetzner Online GmbH in Deutschland und Finnland gespeichert.
          Unterauftragsverarbeiter ist außerdem Cloudflare, Inc. (USA), über deren Netzwerk die Anfragen laufen. Für
          Übermittlungen in die USA gelten die EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO); Cloudflare ist
          zudem unter dem EU-US Data Privacy Framework zertifiziert. Die Auswertungen werden gespeichert, bis ich sie
          lösche oder das Konto bei Rybbit beende. Weitere Informationen:
          <a href="https://rybbit.com/privacy" rel="noopener noreferrer" target="_blank">Datenschutzerklärung von Rybbit</a>.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt darin, die Website anhand
          anonymer Nutzungsstatistiken zu verbessern.
        </p>
        <p>
          <strong>Widerspruch:</strong> Du kannst der Reichweitenmessung jederzeit widersprechen. Wenn dein Browser
          „Global Privacy Control“ oder „Do Not Track“ sendet, wird Rybbit gar nicht erst geladen. Alternativ kannst du
          die Messung hier abschalten. Dafür wird ein Vermerk im lokalen Speicher deines Browsers abgelegt:
        </p>
        <AnalyticsOptOut lang="de" />

        <h2>5. Lokaler Speicher deines Browsers</h2>
        <p>
          Wenn du zwischen hellem und dunklem Farbschema wechselst, wird deine Wahl im lokalen Speicher (localStorage)
          deines Browsers abgelegt; dasselbe gilt für einen Widerspruch gegen die Reichweitenmessung. Diese Angaben
          verlassen dein Gerät nicht und dienen nur dazu, die von dir gewünschte Einstellung beizubehalten
          (§ 25 Abs. 2 Nr. 2 TDDDG). Du kannst sie jederzeit über die Einstellungen deines Browsers löschen.
        </p>

        <h2>6. Kontakt per E-Mail</h2>
        <p>
          Wenn du mir eine E-Mail schreibst, verarbeite ich deine E-Mail-Adresse und den Inhalt deiner Nachricht, um
          sie zu beantworten (Art. 6 Abs. 1 lit. f DSGVO). Ich lösche die Nachricht, sobald sie erledigt ist und keine
          gesetzlichen Aufbewahrungspflichten bestehen.
        </p>
        <p>
          Mein E-Mail-Postfach wird von Gmail bereitgestellt, einem Dienst der Google Ireland Limited, Gordon House,
          Barrow Street, Dublin 4, Irland. E-Mails an mich werden daher auf Servern von Google gespeichert, auch
          außerhalb der EU, etwa in den USA. Google ist unter dem EU-US Data Privacy Framework zertifiziert
          (Art. 45 DSGVO). Weitere Informationen:
          <a href="https://policies.google.com/privacy?hl=de" rel="noopener noreferrer" target="_blank">Datenschutzerklärung von Google</a>.
        </p>

        <h2>7. Links zu anderen Websites</h2>
        <p>
          Diese Website verlinkt auf andere Angebote, etwa GitHub, LinkedIn, XING, Stack Overflow und Instagram. Es
          handelt sich um einfache Links ohne eingebettete Inhalte; Daten werden erst übertragen, wenn du einen Link
          anklickst. Für die verlinkten Seiten gelten die Datenschutzbestimmungen der jeweiligen Anbieter.
        </p>

        <h2>8. Deine Rechte</h2>
        <p>Du hast gegenüber mir folgende Rechte hinsichtlich deiner personenbezogenen Daten:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Wende dich dazu an die oben genannte E-Mail-Adresse. Außerdem kannst du dich bei einer
          Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für mich zuständig ist der Landesbeauftragte für den
          Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart,
          <a href="https://www.baden-wuerttemberg.datenschutz.de" rel="noopener noreferrer" target="_blank">www.baden-wuerttemberg.datenschutz.de</a>.
        </p>

        <p class="text-sm">Stand: {{ LEGAL.updated.de }}</p>
      </section>

      <!-- ───────────────────────── English ───────────────────────── -->
      <section id="en" lang="en">
        <h2>Privacy policy (English)</h2>
        <p>
          This is a translation for convenience. The German version above is the legally binding one.
        </p>

        <h3>1. Controller</h3>
        <p>
          The controller for this website under the General Data Protection Regulation (GDPR) is {{ LEGAL.name }},
          {{ LEGAL.street }}, {{ LEGAL.city }}, {{ LEGAL.countryEn }}. Email:
          <a :href="`mailto:${LEGAL.email}`">{{ LEGAL.email }}</a>.
        </p>

        <h3>2. Overview</h3>
        <p>
          This is a personal website with a blog, photos and small tools. There are no user accounts, contact forms,
          comments or cookies. Fonts and all content are served from this domain, not from third parties. The
          <NuxtLink to="/tools/instagram-carousel/">Instagram carousel tool</NuxtLink> processes your images only in
          your browser; they are never uploaded. Personal data is processed only in the cases below.
        </p>

        <h3>3. Hosting on GitHub Pages</h3>
        <p>
          This site is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco,
          CA 94107, USA. When you open a page, GitHub processes technically necessary data, in particular your IP
          address, the date and time, the requested address, the referrer and your browser's user agent. GitHub uses
          this data to deliver the site and keep the service secure, and may keep it in server logs.
        </p>
        <p>
          The legal basis is Art. 6(1)(f) GDPR: my legitimate interest in delivering the site securely and reliably.
          The transfer to the USA is based on the European Commission's adequacy decision for the EU-US Data Privacy
          Framework (Art. 45 GDPR), under which GitHub is certified. See
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener noreferrer" target="_blank">GitHub's privacy statement</a>.
        </p>

        <h3>4. Analytics with Rybbit</h3>
        <p>
          To see which posts people read, I use Rybbit, an analytics service of Tomato.gg LLC, 1276 Rothwell Dr, Troy,
          MI 48084, USA. Rybbit sets no cookies and stores nothing on your device. For each page view it records the
          page, page title, referrer and campaign (UTM) parameters; your browser, operating system, device type, screen
          size, language and time zone; and an approximate location (country, region, city) derived from your IP
          address.
        </p>
        <p>
          Your IP address is used only briefly to work out the location and is not stored. To count visits, Rybbit
          hashes your IP address and user agent with a random value that changes every day, so you cannot be
          recognised from one day to the next.
        </p>
        <p>
          Rybbit processes the data on my behalf under a data processing agreement (Art. 28 GDPR). The data is stored
          with Hetzner Online GmbH in Germany and Finland. Cloudflare, Inc. (USA) is a sub-processor whose network the
          requests pass through. Transfers to the USA are covered by the EU Standard Contractual Clauses
          (Art. 46(2)(c) GDPR), and Cloudflare is also certified under the EU-US Data Privacy Framework. The
          statistics are kept until I delete them or close my Rybbit account. See
          <a href="https://rybbit.com/privacy" rel="noopener noreferrer" target="_blank">Rybbit's privacy policy</a>.
        </p>
        <p>
          The legal basis is Art. 6(1)(f) GDPR: my legitimate interest in improving the site based on anonymous usage
          statistics.
        </p>
        <p>
          <strong>Objection:</strong> you can object to analytics at any time. If your browser sends Global Privacy
          Control or Do Not Track, Rybbit is not loaded at all. You can also turn it off here, which saves a note in
          your browser's local storage:
        </p>
        <AnalyticsOptOut lang="en" />

        <h3>5. Your browser's local storage</h3>
        <p>
          When you switch between the light and dark theme, your choice is saved in your browser's local storage, as
          is an analytics opt-out. This never leaves your device and only keeps the setting you asked for
          (§ 25(2) no. 2 TDDDG). You can delete it in your browser settings at any time.
        </p>

        <h3>6. Contacting me by email</h3>
        <p>
          If you email me, I process your email address and message to reply (Art. 6(1)(f) GDPR) and delete it once
          the matter is closed, unless the law requires me to keep it.
        </p>
        <p>
          My mailbox is provided by Gmail, a service of Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
          Ireland, so emails to me are stored on Google's servers, including outside the EU, for example in the USA.
          Google is certified under the EU-US Data Privacy Framework (Art. 45 GDPR). See
          <a href="https://policies.google.com/privacy?hl=en" rel="noopener noreferrer" target="_blank">Google's privacy policy</a>.
        </p>

        <h3>7. Links to other websites</h3>
        <p>
          This site links to other services such as GitHub, LinkedIn, XING, Stack Overflow and Instagram. These are
          plain links with no embedded content, so no data is sent until you click one. The linked sites' own privacy
          policies apply there.
        </p>

        <h3>8. Your rights</h3>
        <p>
          You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of
          processing (Art. 18), data portability (Art. 20), and to object to processing based on Art. 6(1)(f)
          (Art. 21). Email me to use them. You can also complain to a data protection supervisory authority
          (Art. 77 GDPR). Mine is the Landesbeauftragter für den Datenschutz und die Informationsfreiheit
          Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart, Germany,
          <a href="https://www.baden-wuerttemberg.datenschutz.de" rel="noopener noreferrer" target="_blank">www.baden-wuerttemberg.datenschutz.de</a>.
        </p>

        <p class="text-sm">Last updated: {{ LEGAL.updated.en }}</p>
      </section>
    </article>
  </main>
</template>
