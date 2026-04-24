import { Document, Page, Font, Text, View, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
})

const styles = StyleSheet.create({

  /* === STRONA === */
  page: {
    flexDirection: 'row',
    fontFamily: "Roboto",
    fontSize: 11,
    lineHeight: 1.5
  },

  /* === SIDEBAR (LEWA) === */
  sidebar: {
    width: '30%',
    backgroundColor: '#f2f2f2',
    padding: 24,
    borderRight: '1 solid black'
  },

  /* === MAIN (PRAWA) === */
  main: {
    width: '70%',
    padding: 24,
  },

  /* === HEADER BOX === */
  headerBlock: {
    marginBottom: 18,
    paddingBottom: 12,
    borderBottom: '1 solid black'
  },

  /* === IMIĘ + NAZWISKO === */
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 10,
    lineHeight: 1
  },

  /* === STANOWISKO === */
  role: {
    fontSize: 10,
    color: '#444',
    textTransform: 'uppercase',
    paddingTop:10
  },

  /* === SEKCJE === */
  section: {
    marginBottom: 14
  },

  /* === TYTUŁY === */
  title: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    borderBottom: '1 solid black',
    paddingBottom: 3
  },

  /* === TEKST === */
  text: {
    marginBottom: 4
  },

  /* === MAŁY TEKST (sidebar) === */
  small: {
    fontSize: 10,
    marginBottom: 3
  }
})

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* ===================== */}
      {/* SIDEBAR */}
      {/* ===================== */}
      <View style={styles.sidebar}>

        {/* HEADER */}
        <View style={styles.headerBlock}>

          <Text style={styles.name}>
            {data.firstName} {data.lastName}
          </Text>

          <Text style={styles.role}>
            {data.title || "Frontend Developer"}
          </Text>

        </View>

        {/* KONTAKT */}
        <View style={styles.section}>
          <Text style={styles.title}>Kontakt</Text>
          <Text style={styles.small}>{data.email}</Text>
          <Text style={styles.small}>{data.phone}</Text>
        </View>

        {/* JĘZYKI */}
        <View style={styles.section}>
          <Text style={styles.title}>Języki</Text>
          <Text style={styles.small}>{data.languages}</Text>
        </View>

        {/* CERTYFIKATY */}
        <View style={styles.section}>
          <Text style={styles.title}>Certyfikaty</Text>
          <Text style={styles.small}>{data.certificates}</Text>
        </View>

      </View>

      {/* ===================== */}
      {/* MAIN */}
      {/* ===================== */}
      <View style={styles.main}>

        {/* O MNIE */}
        <View style={styles.section}>
          <Text style={styles.title}>O mnie</Text>
          <Text style={styles.text}>{data.description}</Text>
        </View>

        {/* DOŚWIADCZENIE */}
        <View style={styles.section}>
          <Text style={styles.title}>Doświadczenie</Text>
          <Text style={styles.text}>{data.experience}</Text>
        </View>

        {/* EDUKACJA */}
        <View style={styles.section}>
          <Text style={styles.title}>Edukacja</Text>
          <Text style={styles.text}>{data.education}</Text>
        </View>

      </View>

    </Page>
  </Document>
)

export default MyDocument
