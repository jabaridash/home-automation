const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

//------------------------------------------------------------------------------

async function save(doc, collection_name) {
  return db.collection(collection_name).add(doc).then(saved_document => {
    console.log(`Document saved to collection: ${collection_name}`)

    doc.id = saved_document.id

    console.log(JSON.stringify(doc, null, 2))

    return doc
  })
}

//------------------------------------------------------------------------------

module.exports = {
  ups_events: {
    save: async (event) => save(event, 'ups-events')
  }
}
