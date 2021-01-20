const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

const COLLECTION_NAMES = {
  ADMINISTRATORS: 'administrators',
  UPS_EVENTS: 'ups-events',
}

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
  administrators: {
    save: async (administrator) => save(administrator, COLLECTION_NAMES.ADMINISTRATORS)
  },
  ups_events: {
    save: async (event) => save(event, COLLECTION_NAMES.UPS_EVENTS)
  }
}
