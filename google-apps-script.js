// ============================================
// MAHAVEER PALACE - Google Apps Script
// Paste this code in Google Apps Script Editor
// ============================================
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://sheets.google.com → Create a new spreadsheet
// 2. Name it "Mahaveer Palace Leads"
// 3. In Row 1, add these headers:
//    A1: Timestamp | B1: Name | C1: Phone | D1: Email | E1: Flat Type | F1: Message
// 4. Go to Extensions → Apps Script
// 5. Delete any existing code and paste this entire file
// 6. Click Deploy → New Deployment
// 7. Select Type: Web App
// 8. Set "Execute as": Me
// 9. Set "Who has access": Anyone
// 10. Click Deploy → Copy the Web App URL
// 11. Paste that URL in your index.html where it says YOUR_GOOGLE_SCRIPT_URL

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),           // Timestamp
      data.name || '',      // Full Name
      data.phone || '',     // Phone Number
      data.email || '',     // Email Address
      data.flatType || '',  // Flat Type Interested
      data.message || ''    // Message / Query
    ]);
    
    // Optional: Send email notification
    // Uncomment the lines below and replace with your email
    // MailApp.sendEmail({
    //   to: "your-email@gmail.com",
    //   subject: "🏠 New Mahaveer Palace Enquiry - " + data.name,
    //   body: "New lead received!\n\n" +
    //         "Name: " + data.name + "\n" +
    //         "Phone: " + data.phone + "\n" +
    //         "Email: " + data.email + "\n" +
    //         "Flat Type: " + data.flatType + "\n" +
    //         "Message: " + data.message + "\n\n" +
    //         "Timestamp: " + new Date().toLocaleString()
    // });
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', message: 'Mahaveer Palace form backend is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
