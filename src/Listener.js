const autoBind = require('auto-bind');

class Listener {
  constructor(notesService, mailSender) {
    this._notesService = notesService;
    this._mailSender = mailSender;
    autoBind(this);
  }

  async listen(message) {
    try {
      // console.log(message);

      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const notes = await this._notesService.getNotes(userId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
