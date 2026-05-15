import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from '@react-pdf/renderer'

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
})

const styles = StyleSheet.create({

  page: {
    fontFamily: 'Roboto',
    fontSize: 11,
    backgroundColor: '#f8fafc',
    padding: 24
  },

  /* HEADER FULL WIDTH */

  header: {
    backgroundColor: '#111827',
    padding: 20,
    marginBottom: 18
  },

  name: {
    fontSize: 26,
    color: '#fff'
  },

  role: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase'
  },

  /* GRID */

  grid: {
    flexDirection: 'row',
    gap: 10
  },

  col: {
    width: '50%',
    padding: 10
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 10,
    border: '1 solid #e5e7eb'
  },

  title: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    color: '#111827',
    textTransform: 'uppercase'
  },

  text: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5
  },

  contactBox: {
    backgroundColor: '#e0f2fe',
    padding: 10,
    marginBottom: 10
  },

  contactText: {
    fontSize: 10,
    color: '#0f172a'
  }
})

const MyDocument2 = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {data.firstName} {data.lastName}
        </Text>
        <Text style={styles.role}>{data.title}</Text>
      </View>

      {/* GRID */}
      <View style={styles.grid}>

        {/* LEFT */}
        <View style={styles.col}>

          <View style={styles.card}>
            <Text style={styles.title}>Kontakt</Text>
            <Text style={styles.contactText}>{data.email}</Text>
            <Text style={styles.contactText}>{data.phone}</Text>
            <Text style={styles.contactText}>{data.address}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Umiejętności</Text>
            <Text style={styles.text}>{data.skills}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Języki</Text>
            <Text style={styles.text}>{data.languages}</Text>
          </View>

        </View>

        {/* RIGHT */}
        <View style={styles.col}>

          <View style={styles.card}>
            <Text style={styles.title}>O mnie</Text>
            <Text style={styles.text}>{data.description}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Doświadczenie</Text>
            <Text style={styles.text}>
              {data.experienceTitle}{"\n"}
              {data.experienceDate}{"\n"}
              {data.experience}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Edukacja</Text>
            <Text style={styles.text}>
              {data.educationTitle}{"\n"}
              {data.educationDate}{"\n"}
              {data.education}
            </Text>
          </View>

        </View>

      </View>

    </Page>
  </Document>
)

export default MyDocument2