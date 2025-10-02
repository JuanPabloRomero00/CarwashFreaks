import React from 'react'
import imgDesinfeccion from '../../public/img/desinfeccion.jpg'
import imgDetailing from '../../public/img/detailing.jpg'
import imgExterior from '../../public/img/lavado-exterior.jpg'
import imgInterior from '../../public/img/lavado-interior.jpg'

function Services() {

    const services = [
    {
      id: 1,
      title: 'Lavado exterior',
      description:
        'Lavado exterior completo con secado y encerado rápido. Ideal para mantener el brillo. Eliminamos suciedad y polvo, dejando tu auto reluciente.',
      image: imgExterior,
      price: 1200,
    },
    {
      id: 2,
      title: 'Lavado interior',
      description:
        'Aspirado, limpieza de tablero, plásticos y cristales. Opción con shampoo + pulido. Limpieza profunda de alfombras, asientos y paneles.',
      image: imgInterior,
      price: 1800,
    },
    {
      id: 3,
      title: 'Detailing',
      description:
        'Tratamientos especiales para pintura, plásticos y tapizados.',
      image: imgDetailing,
      price: 4500,
    },
    {
      id: 4,
      title: 'Desinfeccion',
      description:
        'Sanitización profesional para tu tranquilidad y seguridad.',
      image: imgDesinfeccion,
      price: 5200,
    },
  ];

  const formatPrice = (value) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);

  return (
    <section className="services-section">
        <h2 className="services-title">Nuestros servicios</h2>

        <div className="services-flex">
            {services.map((s) => (
                <article key={s.id} className="service-card">
                    <div className="service-img">
                        <img src={s.image} alt={s.title} />
                    </div>

                    <h3>{s.title}</h3>
                    <p>{s.description}</p>

                    <div className="service-footer">
                        <span className="price">{formatPrice(s.price)}</span>
                    </div>
                </article>
            ))}
        </div>
    </section>
  )
}

export default Services