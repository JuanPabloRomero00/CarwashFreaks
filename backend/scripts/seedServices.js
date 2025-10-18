// scripts/seedServices.js
require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../src/models/Service');

const services = [
  {
    name: 'Lavado exterior',
    description: 'Lavado exterior completo con secado y encerado rápido. Ideal para mantener el brillo. Eliminamos suciedad y polvo, dejando tu auto reluciente.',
    price: 1200,
    duration: 30,
    features: [],
    isActive: true,
    image: '/img/lavado-exterior.jpg'
  },
  {
    name: 'Lavado interior',
    description: 'Aspirado, limpieza de tablero, plásticos y cristales. Opción con shampoo + pulido. Limpieza profunda de alfombras, asientos y paneles.',
    price: 1800,
    duration: 45,
    features: [],
    isActive: true,
    image: '/img/lavado-interior.jpg'
  },
  {
    name: 'Detailing',
    description: 'Tratamientos especiales para pintura, plásticos y tapizados.',
    price: 4500,
    duration: 60,
    features: [],
    isActive: true,
    image: '/img/detailing.jpg'
  },
  {
    name: 'Desinfeccion',
    description: 'Sanitización profesional para tu tranquilidad y seguridad.',
    price: 5200,
    duration: 40,
    features: [],
    isActive: true,
    image: '/img/desinfeccion.jpg'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Service.deleteMany({}); // Limpia servicios previos
    await Service.insertMany(services);
    console.log('Servicios insertados correctamente');
    process.exit(0);
  } catch (err) {
    console.error('Error al insertar servicios:', err);
    process.exit(1);
  }
}

seed();
