import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 }
})

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Moje CV</Text>
        </View>
      </Page>
    </Document>
  )
}