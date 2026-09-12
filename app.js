// The client trusts the record number supplied in the URL. This intentionally models the IDOR flaw.
const records = {
  1: {
    title: "Night's Watch inventory",
    summary: 'A routine inventory of provisions and arms stationed at Castle Black.',
    details: 'LOCATION  CASTLE BLACK\nACCESS    NIGHT\'S WATCH\nSTATUS    Nothing unusual reported.\n\nThe quartermaster requests another shipment of lamp oil before the next patrol.'
  },
  2: {
    title: 'Royal intelligence // PRIVATE',
    summary: 'A sealed report intended for the Hand of the King. Access should require authorization.',
    details: 'LOCATION  KING\'S LANDING\nACCESS    HAND OF THE KING\nSTATUS    COMPROMISED\n\nThe royal court has more eyes than walls. The message hidden in this record is the challenge flag:\n\nWW{idor_is_fun}',
    flag: true
  },
  3: {
    title: 'House of the Dragon records',
    summary: 'Fragments recovered from a burned archive beneath an old tower.',
    details: 'LOCATION  DRAGONSTONE\nACCESS    ARCHIVE KEEPER\nSTATUS    PARTIAL\n\nMost of the record was lost to flame. Only the seal remains legible.'
  }
};

const params = new URLSearchParams(window.location.search);
const requestedId = params.get('id') || '1';
const record = records[requestedId] || records[1];
document.querySelector('#record-id').textContent = requestedId.padStart(2, '0');
document.querySelector('#record-title').textContent = record.title;
document.querySelector('#record-summary').textContent = record.summary;
document.querySelector('#record-details').textContent = record.details;
if (record.flag) {
  document.querySelector('#record-state').textContent = 'UNAUTHORIZED VIEW';
  document.querySelector('#record-details').innerHTML = record.details.replace('WW{idor_is_fun}', '<strong>WW{idor_is_fun}</strong>');
}