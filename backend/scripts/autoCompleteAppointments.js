const cron = require('node-cron');
const Appointment = require('../src/models/Appointment');

async function autoCompleteAppointments() {
  const now = new Date();
  const appointments = await Appointment.find({
    status: { $in: ['pending', 'confirmed'] },
    date: { $lte: now }
  });
  for (const appt of appointments) {
    const [hora, min] = appt.time.replace('hs','').split(':');
    const apptMinutes = parseInt(hora) * 60 + parseInt(min);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    if (appt.date < now || (appt.date.toDateString() === now.toDateString() && apptMinutes <= nowMinutes)) {
      appt.status = 'completed';
      await appt.save();
    }
  }
  console.log('Turnos vencidos actualizados');
}

// Ejecutar una vez por día a las 08:00
cron.schedule('0 8 * * *', () => {
  autoCompleteAppointments();
});

module.exports = autoCompleteAppointments;
