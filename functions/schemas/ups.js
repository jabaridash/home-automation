module.exports = {
  event: {
    "id": "/ups-event",
    "type": "object",
    "properties": {
      "type": { "type": "string" },
      "status": {
        "type": "object",
        "properties": {
          "date": { "type": "string" },
          "hostname": { "type": "string" },
          "upsname": { "type": "string" },
          "status": { "type": "string" },
          "loadpct": { "type": "string" },
          "bcharge": { "type": "string" },
          "timeleft": { "type": "string" },
          "tonbatt": { "type": "string" },
        },
        "required": [
          "date",
          "hostname",
          "upsname",
          "status",
          "loadpct",
          "bcharge",
          "timeleft",
          "tonbatt",
        ],
      },
    },
    "required": ["status", "type"],
  }
}
