
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const airtable = require("airtable");

const base = new airtable({
    apiKey: AIRTABLE_API_KEY,
  }).base(AIRTABLE_BASE_ID);

exports.handler = async function(context, event, callback) {
  /// Find the current event
  number = event.number.substring(1).trim();
  const result = await base('event_language').select({
      filterByFormula: `{number}=${number}`
    }).all().then((records) => {
      // Get the fields for the event based on phone number
      return records[0]
    });

  console.log(result);
  
  console.log("Returned on ", new Date().toLocaleString('en-US', { timeZone: 'America/Denver' }));

  return callback(null, result.fields);
};