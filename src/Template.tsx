import {
  Document,
  Page,
  Font,
  Text,
  View,
  Image,
  StyleSheet
} from '@react-pdf/renderer'

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
    fontSize: 11
  },

  sidebar: {
    width: '35%',
    backgroundColor: '#1a1a1a',
    padding: 28,
    flexDirection: 'column'
  },

  main: {
    width: '65%',
    padding: 36,
    backgroundColor: '#ffffff'
  },

  photoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    marginBottom: 16,
    border: '2 solid #444444'
  },

  photo: {
    width: 90,
    height: 90
  },

  photoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2a2a2a',
    marginBottom: 16
  },

  firstName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 1
  },

  lastName: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 6
  },

  role: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    color: '#666666',
    letterSpacing: 2,
    marginBottom: 18
  },

  divider: {
    borderBottom: '1 solid #2e2e2e',
    marginVertical: 12
  },

  dividerMain: {
    borderBottom: '1 solid #eeeeee',
    marginVertical: 14
  },

  sectionLabel: {
    fontSize: 7,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#555555',
    letterSpacing: 2,
    marginBottom: 8
  },

  sideText: {
    fontSize: 9.5,
    color: '#bbbbbb',
    lineHeight: 1.7,
    marginBottom: 2
  },

  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },

  skillDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    marginRight: 8
  },

  skillText: {
    fontSize: 9.5,
    color: '#cccccc'
  },

  /* MAIN */
  nameBlock: {
    marginBottom: 22
  },

  mainFirstName: {
    fontSize: 30,
    fontWeight: 700,
    color: '#111111',
    marginBottom: 0
  },

  mainLastName: {
    fontSize: 30,
    color: '#cccccc',
    marginBottom: 6
  },

  mainRole: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#999999',
    marginBottom: 4
  },

  accentLine: {
    width: 36,
    height: 2,
    backgroundColor: '#111111',
    marginTop: 8
  },

  sectionTitle: {
    fontSize: 7.5,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#999999',
    marginBottom: 10
  },

  block: {
    marginBottom: 18
  },

  itemTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#111111',
    marginBottom: 2
  },

  itemSub: {
    fontSize: 8.5,
    color: '#aaaaaa',
    marginBottom: 6,
    letterSpacing: 0.5
  },

  itemText: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: '#444444'
  }
})

const MyDocument = ({ data, t }) => {
  // Dodatkowe, rygorystyczne sprawdzenie poprawności adresu URL / base64 obrazu przed przekazaniem do biblioteki
  const hasValidPhoto = data.photo && (data.photo.startsWith('data:image/') || data.photo.startsWith('blob:'));

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* SIDEBAR */}
        <View style={styles.sidebar}>

          {hasValidPhoto
            ? <View style={styles.photoWrapper}><Image src={data.photo} style={styles.photo} /></View>
            : <View style={styles.photoPlaceholder} />
          }

          <View style={styles.divider} />

          {/* Poprawka: Zmiana statycznego tekstu na klucz językowy pobierany dynamicznie */}
          <Text style={styles.sectionLabel}>{t('email')} / {t('phone')} / {t('address')}</Text>
          <Text style={styles.sideText}>{data.email}</Text>
          <Text style={styles.sideText}>{data.phone}</Text>
          <Text style={styles.sideText}>{data.address}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>{t('skills')}</Text>
          {data.skills ? data.skills.split(/[,\n]+/).map((s, i) => s.trim() && (
            <View key={i} style={styles.skillRow}>
              <View style={styles.skillDot} />
              <Text style={styles.skillText}>{s.trim()}</Text>
            </View>
          )) : null}

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>{t('languages')}</Text>
          {data.languages ? data.languages.split(/[,\n]+/).map((l, i) => l.trim() && (
            <View key={i} style={styles.skillRow}>
              <View style={styles.skillDot} />
              <Text style={styles.skillText}>{l.trim()}</Text>
            </View>
          )) : null}

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>{t('certificates')}</Text>
          {data.certificates ? data.certificates.split(/[,\n]+/).map((c, i) => c.trim() && (
            <View key={i} style={styles.skillRow}>
              <View style={styles.skillDot} />
              <Text style={styles.skillText}>{c.trim()}</Text>
            </View>
          )) : null}

        </View>

        {/* MAIN */}
        <View style={styles.main}>

          <View style={styles.nameBlock}>
            <Text style={styles.mainFirstName}>{data.firstName}</Text>
            <Text style={styles.mainLastName}>{data.lastName}</Text>
            <Text style={styles.mainRole}>{data.title}</Text>
            <View style={styles.accentLine} />
          </View>

          <View style={styles.block}>
            <Text style={styles.sectionTitle}>{t('description')}</Text>
            <Text style={styles.itemText}>{data.description}</Text>
          </View>

          <View style={styles.dividerMain} />

          <View style={styles.block}>
            <Text style={styles.sectionTitle}>{t('experience')}</Text>
            <Text style={styles.itemTitle}>{data.experienceTitle}</Text>
            <Text style={styles.itemSub}>{data.experienceDate}</Text>
            <Text style={styles.itemText}>{data.experience}</Text>
          </View>

          <View style={styles.dividerMain} />

          <View style={styles.block}>
            <Text style={styles.sectionTitle}>{t('education')}</Text>
            <Text style={styles.itemTitle}>{data.educationTitle}</Text>
            <Text style={styles.itemSub}>{data.educationDate}</Text>
            <Text style={styles.itemText}>{data.education}</Text>
          </View>

        </View>

      </Page>
    </Document>
  )
}

export default MyDocument