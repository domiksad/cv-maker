import { Document, Page, Font, Text, View, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: "Roboto"},
  section: { marginBottom: 10 },
  title: { fontSize: 24, marginBottom: 10 }
})

const MyDocument = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Dane z formularza:</Text>
        <Text>Imię: {data.firstName}</Text>
        <Text>Nazwisko: {data.lastName}</Text>
        <Text>Opis: {data.description}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;