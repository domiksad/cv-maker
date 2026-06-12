import {
  Document,
  Page,
  Text,
  View,
  Image,
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
    backgroundColor: '#ffffff',
    padding: 0
  },

  header: {
    backgroundColor: '#18181b',
    padding: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24
  },

  photoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    border: '2 solid #3f3f46'
  },

  photo: {
    width: 80,
    height: 80
  },

  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#27272a'
  },

  headerText: {
    flex: 1
  },

  name: {
    fontSize: 26,
    color: '#ffffff',
    marginBottom: 4
  },

  role: {
    fontSize: 8.5,
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10
  },

  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },

  contactChip: {
    fontSize: 9,
    color: '#d4d4d8'
  },

  body: {
    flexDirection: 'row'
  },

  leftCol: {
    width: '36%',
    padding: 24,
    backgroundColor: '#fafafa',
    borderRight: '1 solid #e4e4e7'
  },

  rightCol: {
    width: '64%',
    padding: 28,
    backgroundColor: '#ffffff'
  },

  sectionLabel: {
    fontSize: 7,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#71717a',
    marginBottom: 8,
    marginTop: 18
  },

  sectionLabelFirst: {
    fontSize: 7,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#71717a',
    marginBottom: 8
  },

  divider: {
    borderBottom: '1 solid #e4e4e7',
    marginVertical: 10
  },

  tag: {
    backgroundColor: '#f4f4f5',
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 5,
    marginRight: 4
  },

  tagText: {
    fontSize: 9,
    color: '#18181b'
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  text: {
    fontSize: 9.5,
    color: '#27272a',
    lineHeight: 1.7
  },

  block: {
    marginBottom: 18
  },

  blockTitle: {
    fontSize: 7,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#71717a',
    marginBottom: 10
  },

  itemTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#18181b',
    marginBottom: 3
  },

  itemSub: {
    fontSize: 8.5,
    color: '#a1a1aa',
    marginBottom: 6
  },

  itemText: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: '#27272a'
  },

  numberBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4
  },

  number: {
    fontSize: 8,
    color: '#a1a1aa',
    marginRight: 8,
    marginTop: 1,
    width: 12
  }
})

const MyDocument2 = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* HEADER */}
      <View style={styles.header}>

        {data.photo
          ? <View style={styles.photoWrapper}><Image src={data.photo} style={styles.photo} /></View>
          : <View style={styles.photoPlaceholder} />
        }

        <View style={styles.headerText}>
          <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
          <Text style={styles.role}>{data.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactChip}>{data.email}</Text>
            {data.email && data.phone ? <Text style={styles.contactChip}>·</Text> : null}
            <Text style={styles.contactChip}>{data.phone}</Text>
            {data.phone && data.address ? <Text style={styles.contactChip}>·</Text> : null}
            <Text style={styles.contactChip}>{data.address}</Text>
          </View>
        </View>

      </View>

      {/* BODY */}
      <View style={styles.body}>

        {/* LEFT */}
        <View style={styles.leftCol}>

          <Text style={styles.sectionLabelFirst}>Umiejętności</Text>
          <View style={styles.tagsRow}>
            {data.skills ? data.skills.split(',').map((s, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{s.trim()}</Text>
              </View>
            )) : null}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Języki</Text>
          <View style={styles.tagsRow}>
            {data.languages ? data.languages.split(',').map((l, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{l.trim()}</Text>
              </View>
            )) : null}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Certyfikaty</Text>
          {data.certificates ? data.certificates.split(',').map((c, i) => (
            <View key={i} style={styles.numberBlock}>
              <Text style={styles.number}>{i + 1}.</Text>
              <Text style={styles.text}>{c.trim()}</Text>
            </View>
          )) : null}

        </View>

        {/* RIGHT */}
        <View style={styles.rightCol}>

          <View style={styles.block}>
            <Text style={styles.blockTitle}>O mnie</Text>
            <Text style={styles.itemText}>{data.description}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.block}>
            <Text style={styles.blockTitle}>Doświadczenie</Text>
            <Text style={styles.itemTitle}>{data.experienceTitle}</Text>
            <Text style={styles.itemSub}>{data.experienceDate}</Text>
            <Text style={styles.itemText}>{data.experience}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.block}>
            <Text style={styles.blockTitle}>Edukacja</Text>
            <Text style={styles.itemTitle}>{data.educationTitle}</Text>
            <Text style={styles.itemSub}>{data.educationDate}</Text>
            <Text style={styles.itemText}>{data.education}</Text>
          </View>

        </View>

      </View>

    </Page>
  </Document>
)

export default MyDocument2