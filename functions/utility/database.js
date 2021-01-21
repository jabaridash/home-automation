const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

const COLLECTION_NAMES = {
  ADMINISTRATORS: 'administrators',
  API_KEYS: 'api-keys',
  UPS_EVENTS: 'ups-events',
}

//------------------------------------------------------------------------------

async function get_all(collection_name) {
  return db.collection(collection_name).get().then(snapshot => {
    return snapshot.docs.map(doc => {
      const _doc = doc.data()
      _doc.id = doc.id
      return _doc
    })
  })
}

//------------------------------------------------------------------------------

async function save(doc, collection_name) {
  return db.collection(collection_name).add(doc).then(saved_document => {
    doc.id = saved_document.id
    console.log(`Document ${doc.id} saved to collection: ${collection_name}`)
    return doc
  })
}

//------------------------------------------------------------------------------

module.exports = {
  api_keys: {
    get_all: async() => get_all(COLLECTION_NAMES.API_KEYS),
  },
  administrators: {
    get_all: async () => get_all(COLLECTION_NAMES.ADMINISTRATORS),
    save: async (administrator) => save(administrator, COLLECTION_NAMES.ADMINISTRATORS)
  },
  ups_events: {
    save: async (event) => save(event, COLLECTION_NAMES.UPS_EVENTS)
  }
}
