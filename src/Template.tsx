import {
  Document,
  Page,
  Font,
  Text,
  View,
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
    fontSize: 12
  },

  /* FAKE BACKGROUND SHAPE */
  bgShape: {
    position: 'absolute',
    bottom: 0,
    right: -80,
    width: 300,
    height: 300,
    backgroundColor: '#000',
    transform: 'rotate(20deg)',
    opacity: 0.08
  },

  sidebar: {
    width: '32%',
    backgroundColor: '#f3f4f6',
    padding: 24,
    borderRight: '2 solid #000'
  },

  main: {
    width: '68%',
    padding: 28
  },

  firstName: {
    fontSize: 28,
    fontWeight: 700,
    color: '#000'
  },

  lastName: {
    fontSize: 28,
    color: '#000',
    marginBottom: 8
  },

  role: {
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: 14,
    color: '#333'
  },

  divider: {
    borderBottom: '1 solid #000',
    marginVertical: 8
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: 6,
    color: '#000'
  },

  text: {
    fontSize: 12,
    color: '#111',
    lineHeight: 1.4,
    marginBottom: 2
  },

  mainTitle: {
    fontSize: 15,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: 6
  },

  block: {
    marginBottom: 12
  },

  itemTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#000'
  },

  itemSub: {
    fontSize: 11,
    color: '#444',
    marginBottom: 3
  },

  itemText: {
    fontSize: 12,
    lineHeight: 1.4,
    color: '#111'
  }
})

const MyDocument = ({ data }) => (
  <Document>

    <Page size="A4" style={styles.page}>

      {/* PSEUDO BACKGROUND */}
      <View style={styles.bgShape} />

      {/* SIDEBAR */}
      <View style={styles.sidebar}>

        <Text style={styles.firstName}>{data.firstName}</Text>
        <Text style={styles.lastName}>{data.lastName}</Text>

        <Text style={styles.role}>{data.title}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Kontakt</Text>
        <Text style={styles.text}>{data.email}</Text>
        <Text style={styles.text}>{data.phone}</Text>
        <Text style={styles.text}>{data.address}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Umiejętności</Text>
        <Text style={styles.text}>{data.skills}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Języki</Text>
        <Text style={styles.text}>{data.languages}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Certyfikaty</Text>
        <Text style={styles.text}>{data.certificates}</Text>

      </View>

      {/* MAIN */}
      <View style={styles.main}>

        <View style={styles.block}>
          <Text style={styles.mainTitle}>O mnie</Text>
          <Text style={styles.itemText}>{data.description}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.block}>
          <Text style={styles.mainTitle}>Doświadczenie</Text>
          <Text style={styles.itemTitle}>{data.experienceTitle}</Text>
          <Text style={styles.itemSub}>{data.experienceDate}</Text>
          <Text style={styles.itemText}>{data.experience}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.block}>
          <Text style={styles.mainTitle}>Edukacja</Text>
          <Text style={styles.itemTitle}>{data.educationTitle}</Text>
          <Text style={styles.itemSub}>{data.educationDate}</Text>
          <Text style={styles.itemText}>{data.education}</Text>
        </View>

      </View>

    </Page>

  </Document>
)

export default MyDocument