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

  /* PAGE */

  page: {
    flexDirection: 'row',
    fontFamily: 'Roboto',
    backgroundColor: '#f4f4f4',
    color: '#444',
    fontSize: 10
  },

  /* SIDEBAR */

  sidebar: {
    width: '32%',
    paddingTop: 50,
    paddingHorizontal: 28,
    borderRight: '1 solid #cfcfcf',
    minHeight: '100%'
  },

  /* MAIN */

  main: {
    width: '68%',
    paddingTop: 50,
    paddingHorizontal: 32
  },

  /* HEADER */

  header: {
    marginBottom: 40
  },

  firstName: {
    fontSize: 24,
    color: '#222',
    lineHeight: 1
  },

  lastName: {
    fontSize: 24,
    color: '#222',
    lineHeight: 1,
    marginBottom: 14
  },

  role: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#777',
    letterSpacing: 1.5
  },

  divider: {
    borderBottom: '1 solid #bdbdbd',
    marginVertical: 16
  },

  /* SECTION */

  section: {
    marginBottom: 28
  },

  sectionTitle: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    color: '#333'
  },

  /* TEXT */

  text: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#666'
  },

  smallText: {
    fontSize: 9,
    lineHeight: 1.8,
    color: '#666',
    marginBottom: 4
  },

  /* EXPERIENCE / EDUCATION */

  itemBlock: {
    marginBottom: 22
  },

  itemTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#333',
    marginBottom: 4
  },

  itemSubtitle: {
    fontSize: 9,
    color: '#777',
    marginBottom: 8
  },

  itemDescription: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#666'
  }
})

const MyDocument = ({ data }) => (
  <Document>

    <Page size="A4" style={styles.page}>

      {/* SIDEBAR */}

      <View style={styles.sidebar}>

        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.firstName}>
            {data.firstName}
          </Text>

          <Text style={styles.lastName}>
            {data.lastName}
          </Text>

          <Text style={styles.role}>
            {data.title}
          </Text>

        </View>

        {/* CONTACT */}

        <View style={styles.divider} />

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Kontakt
          </Text>

          <Text style={styles.smallText}>
            {data.email}
          </Text>

          <Text style={styles.smallText}>
            {data.phone}
          </Text>

          <Text style={styles.smallText}>
            {data.address}
          </Text>

        </View>

        {/* SKILLS */}

        <View style={styles.divider} />

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Umiejętności
          </Text>

          <Text style={styles.smallText}>
            {data.skills}
          </Text>

        </View>

        {/* LANGUAGES */}

        <View style={styles.divider} />

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Języki
          </Text>

          <Text style={styles.smallText}>
            {data.languages}
          </Text>

        </View>

        {/* CERTIFICATES */}

        <View style={styles.divider} />

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Certyfikaty
          </Text>

          <Text style={styles.smallText}>
            {data.certificates}
          </Text>

        </View>

      </View>

      {/* MAIN */}

      <View style={styles.main}>

        {/* ABOUT */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            O mnie
          </Text>

          <Text style={styles.text}>
            {data.description}
          </Text>

        </View>

        <View style={styles.divider} />

        {/* EXPERIENCE */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Doświadczenie
          </Text>

          <View style={styles.itemBlock}>

            <Text style={styles.itemTitle}>
              {data.experience}
            </Text>

          </View>

        </View>

        <View style={styles.divider} />

        {/* EDUCATION */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Edukacja
          </Text>

          <View style={styles.itemBlock}>

            <Text style={styles.itemTitle}>
              {data.education}
            </Text>

          </View>

        </View>

      </View>

    </Page>

  </Document>
)

export default MyDocument