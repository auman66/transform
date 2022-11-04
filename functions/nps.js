// This is your new function. To start, set the name and path on the left.
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const airtable = require("airtable");

const base = new airtable({
    apiKey: AIRTABLE_API_KEY,
  }).base(AIRTABLE_BASE_ID);

exports.handler = async function(context, event, callback) {
    fields ={
        'flow': [event.event_id],
        'language': [event.lang_id],
        "phone": event.phone
    };
    let answers = event.response.split("---");

    answers.forEach((ans, i) => {
        if (i > 0) {
            fields[`Q${i}`] = parseInt(ans);
        };
    });
    console.log(event);
    console.log(fields);
    base('results').create([{
        "fields": fields
    }], (err, records) => {
        if (err) {
        console.error(err);
        return callback(err, response);
        }
        console.log("first ID:", records[0].getId());

        return callback(null, {
            'at_id': records[0].getId()
        });
    });
};