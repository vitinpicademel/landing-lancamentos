'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [mapView, setMapView] = useState('2d')
  const [progress, setProgress] = useState({
    drenagem: 40,
    paisagismo: 20,
    lazer: 0,
    pavimentacao: 90,
    terraplanagem: 100,
    redeEsgoto: 100,
    iluminacao: 15,
    redeAgua: 50
  })
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    tipoLote: 'residencial',
    parcelas: '180',
    aceitoPrivacidade: false
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      console.log('Enviando dados:', formData)
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Resposta do servidor:', data)

      if (response.ok) {
        setMessage('Dados enviados com sucesso!')
        setFormData({
          nome: '',
          whatsapp: '',
          email: '',
          tipoLote: 'residencial',
          parcelas: '180',
          aceitoPrivacidade: false
        })
      } else {
        setMessage(`Erro ao enviar dados: ${data.message || 'Tente novamente.'}`)
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setMessage('Erro ao enviar dados. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const mapUrls = {
    '2d': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471.68926859604636!2d-47.97444792394567!3d-19.75170073669043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f20.1!3m3!1m2!1s0x94bad03ade558c2d%3A0x9c6b2e49b9b7ab0c!2sR.%20Dona%20Rafa%20Cecilio%2C%2075%20-%20Uberaba%2C%20MG!5e0!3m2!1spt-BR!2sbr!4v1709844877804!5m2!1spt-BR!2sbr',
    '3d': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471.68926859604636!2d-47.97444792394567!3d-19.75170073669043!2m3!1f45!2f45!3f0!3m2!1i1024!2i768!4f20.1!3m3!1m2!1s0x94bad03ade558c2d%3A0x9c6b2e49b9b7ab0c!2sR.%20Dona%20Rafa%20Cecilio%2C%2075%20-%20Uberaba%2C%20MG!5e1!3m2!1spt-BR!2sbr!4v1709844877804!5m2!1spt-BR!2sbr'
  }

  return (
    <main className="min-h-screen bg-white relative">
      {/* WhatsApp Button */}
      <a 
        href="https://api.whatsapp.com/send/?phone=553433339576&text=Ol%C3%A1%2C%20estou%20interessado%20nos%20lotes%20da%20Urba%20%5B001%5D&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#20BA5C] p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
      >
        <svg 
          className="w-8 h-8 text-white"
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/backgroud.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/90 via-white/50 to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-white space-y-8 lg:pl-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-md">
                Condomínio Fechado <br/>
                <span className="text-[#373737] bg-white px-6 py-3 rounded-lg inline-block mt-4 shadow-lg">
                  totalmente planejado
                </span>
                <br/>
                <span className="text-3xl md:text-4xl lg:text-5xl mt-4 block">
                  para seu comércio ou sua casa
                </span>
              </h1>
              <div className="flex justify-center mt-8">
                <a
                  href="https://api.whatsapp.com/send/?phone=553433339576&text=Ol%C3%A1%2C%20estou%20interessado%20nos%20lotes%20da%20Urba%20%5B001%5D&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-[#25D366] hover:bg-[#20BA5C] text-white rounded-full text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <svg 
                    className="w-8 h-8 mr-3"
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Fale com um Consultor Agora
                </a>
              </div>
              <div className="mt-12 flex justify-center">
                <div className="w-48">
                  <Image
                    src="/logo1.png"
                    alt="Logo"
                    width={300}
                    height={150}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-10 lg:mr-8">
              <h2 className="text-3xl font-bold text-[#1B4332] mb-8">Fale com nossos Consultores</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Nome</label>
                  <input 
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#2B4D35] focus:ring-2 focus:ring-[#2B4D35]/20 transition-all duration-300" 
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">E-mail</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">WhatsApp</label>
                  <input 
                    type="tel" 
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Tipo de Lote</label>
                  <select
                    name="tipoLote"
                    value={formData.tipoLote}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="residencial">Residencial</option>
                    <option value="comercial">Comercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Parcelas</label>
                  <select
                    name="parcelas"
                    value={formData.parcelas}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="180">180 parcelas</option>
                    <option value="120">120 parcelas</option>
                    <option value="60">60 parcelas</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="aceitoPrivacidade"
                    checked={formData.aceitoPrivacidade}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Estou de acordo com a política de privacidade e aceito receber contatos</label>
                </div>
                {message && (
                  <div className={`p-4 rounded-lg ${message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white py-4 rounded-xl font-bold text-lg hover:from-[#1B4332] hover:to-[#0B2B1F] transform hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'FALE COM NOSSOS CONSULTORES'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-16 bg-[#F0F7F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B4332] mb-12">
            Planejado para facilitar a sua vida
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative h-72 rounded-2xl overflow-hidden group">
              <Image
                src="/terrenos.jpeg"
                alt="Terrenos a partir de 300m²"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-xl font-bold text-white">Terrenos a partir de 300m²</h3>
              </div>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden group">
              <Image
                src="/lazer.JPG"
                alt="Loteamento fechado, exclusivo e privativo com lazer premium"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-xl font-bold text-white">Loteamento fechado, exclusivo e privativo com lazer premium</h3>
              </div>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden group">
              <Image
                src="/facil.JPG"
                alt="Fácil acesso as Avenidas"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-xl font-bold text-white">Fácil acesso as Avenidas</h3>
                <p className="text-sm text-gray-200 mt-1">Tonico dos Santos e José Marcus Cherem</p>
              </div>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden group">
              <Image
                src="/proximo.JPG"
                alt="Próximo ao Cyrela"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-xl font-bold text-white">Próximo ao Cyrela</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status da Obra Section */}
      <section className="py-16 bg-gradient-to-b from-white via-[#F0F7F4] to-white relative overflow-hidden">
        {/* Elementos decorativos - Galhos grandes */}
        <div className="absolute -left-20 top-20 opacity-20">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="#445840">
            <path d="M10,90 Q30,70 25,50 T35,10 M25,50 Q40,45 55,50 M20,70 Q35,65 50,70 M35,30 Q50,25 65,30"/>
          </svg>
        </div>
        <div className="absolute -right-20 top-20 opacity-20">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="#445840">
            <path d="M90,90 Q70,70 75,50 T65,10 M75,50 Q60,45 45,50 M80,70 Q65,65 50,70 M65,30 Q50,25 35,30"/>
          </svg>
        </div>

        {/* Elementos decorativos - Galhos médios */}
        <div className="absolute left-1/4 -bottom-10 opacity-15">
          <svg width="250" height="250" viewBox="0 0 100 100" fill="#2B4D35">
            <path d="M20,80 Q35,65 30,45 T40,10 M30,45 Q45,40 60,45 M25,65 Q40,60 55,65"/>
          </svg>
        </div>
        <div className="absolute right-1/4 -bottom-10 opacity-15">
          <svg width="250" height="250" viewBox="0 0 100 100" fill="#2B4D35">
            <path d="M80,80 Q65,65 70,45 T60,10 M70,45 Q55,40 40,45 M75,65 Q60,60 45,65"/>
          </svg>
        </div>

        {/* Elementos decorativos - Galhos pequenos */}
        <div className="absolute left-1/3 top-1/3 opacity-10">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="#445840">
            <path d="M30,70 Q45,55 40,35 T50,0 M40,35 Q55,30 70,35"/>
          </svg>
        </div>
        <div className="absolute right-1/3 top-1/3 opacity-10">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="#445840">
            <path d="M70,70 Q55,55 60,35 T50,0 M60,35 Q45,30 30,35"/>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="relative mb-16">
            <div className="absolute -left-4 top-0 w-24 h-24 opacity-90">
              <Image
                src="/logo1.png"
                alt="Logo 1"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1B4332] mb-6 relative">
              PRONTO PARA CONSTRUIR
              <div className="absolute -right-4 top-0 w-24 h-24 opacity-90">
                <Image
                  src="/logo2.png"
                  alt="Logo 2"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </h2>
            <p className="text-center text-gray-600 text-lg mb-16 relative">
              Acompanhe por aqui o andamento da construção do condomínio em detalhes.
              <span className="block w-32 h-1.5 bg-gradient-to-r from-[#8B9D83] via-[#A8B5A2] to-[#8B9D83] mx-auto mt-6 rounded-full"></span>
            </p>
          </div>
          
          {/* Barra de progresso principal */}
          <div className="relative h-12 bg-[#E8EBE4] rounded-full mb-20 shadow-inner">
            <div 
              className="animate-progress-fill relative h-full rounded-full"
              style={{ '--progress-width': '52%' } as React.CSSProperties}
            >
              <div className="absolute -right-2 -top-2 md:-right-4 md:-top-4 w-10 h-10 md:w-14 md:h-14 bg-white border-4 border-[#2D6A4F] flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300 rounded-full">
                <span className="text-[#2D6A4F] font-bold text-xs md:text-sm">52%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
            {[
              {
                name: 'Drenagem',
                progress: 40,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" className="w-10 h-10">
                    <path d="M7 21H3V17M17 21H21V17M17 3H21V7"/>
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                    <path d="M12 9V3M12 21v-6M3 12h6M15 12h6"/>
                  </svg>
                )
              },
              {
                name: 'Paisagismo',
                progress: 20,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" className="w-10 h-10">
                    <path d="M12 19c0-7 7-13 7-13s-7-1-7 7c0-8-7-7-7-7s7 6 7 13"/>
                    <path d="M12 19v3"/>
                    <path d="M8 22h8"/>
                  </svg>
                )
              },
              {
                name: 'Lazer',
                progress: 0,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" className="w-10 h-10">
                    <path d="M22 17H2a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5a3 3 0 0 0 3 3"/>
                    <path d="M6 8h12"/>
                    <path d="M6 12h12"/>
                    <path d="M6 16h12"/>
                  </svg>
                )
              },
              {
                name: 'Pavimentação',
                progress: 90,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" className="w-10 h-10">
                    <path d="M3 8h18v12H3z"/>
                    <path d="M7 8v12"/>
                    <path d="M11 8v12"/>
                    <path d="M15 8v12"/>
                    <path d="M19 8v12"/>
                  </svg>
                )
              },
              {
                name: 'Terraplanagem',
                progress: 100,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" className="w-10 h-10">
                    <path d="M2 22h20"/>
                    <path d="M3 22L8 9l5 8 5-8 3 13"/>
                  </svg>
                )
              },
              {
                name: 'Rede de Esgoto',
                progress: 100,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" className="w-10 h-10">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2v20"/>
                    <path d="M2 12h20"/>
                    <path d="M12 9v6"/>
                    <path d="M9 12h6"/>
                  </svg>
                )
              },
              {
                name: 'Iluminação',
                progress: 15,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" className="w-10 h-10">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                    <path d="M9 18h6"/>
                    <path d="M10 22h4"/>
                  </svg>
                )
              },
              {
                name: 'Rede de Água',
                progress: 50,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" className="w-10 h-10">
                    <path d="M12 2v6"/>
                    <path d="M12 22c3.3 0 6-2.7 6-6 0-4-6-10-6-10S6 12 6 16c0 3.3 2.7 6 6 6z"/>
                  </svg>
                )
              }
            ].map((item) => (
              <div key={item.name} className="p-2 md:p-4 group">
                <div className="relative bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute -right-2 -top-2 md:-right-4 md:-top-4 w-10 h-10 md:w-14 md:h-14 bg-[#2D6A4F] flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300 rounded-full">
                    <span className="text-white font-bold text-xs md:text-sm">{item.progress}%</span>
                  </div>
                  <div className="flex flex-col items-center space-y-4 md:space-y-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                      {item.icon}
                    </div>
                    <div className="h-2 md:h-3 bg-[#E8EBE4] rounded-full w-full overflow-hidden shadow-inner">
                      <div 
                        className="animate-progress-fill h-full rounded-full"
                        style={{ '--progress-width': `${item.progress}%` } as React.CSSProperties}
                      ></div>
                    </div>
                    <p className="text-sm md:text-base font-medium text-center text-gray-700">{item.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center relative">
            <div className="absolute inset-x-0 -top-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <a
              href="https://api.whatsapp.com/send/?phone=553433339576&text=Ol%C3%A1%2C%20estou%20interessado%20nos%20lotes%20da%20Urba%20%5B001%5D&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#445840] via-[#2B4D35] to-[#445840] text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden hover:from-[#2B4D35] hover:via-[#1A3023] hover:to-[#2B4D35]"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></span>
              <span className="relative">FALE COM NOSSOS CONSULTORES</span>
            </a>
          </div>
        </div>
      </section>

      {/* Localização Section */}
      <section className="py-16 bg-[#F0F7F4] relative overflow-hidden">
        {/* Elementos decorativos - Galhos grandes */}
        <div className="absolute -left-20 top-20 opacity-20">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="#445840">
            <path d="M10,90 Q30,70 25,50 T35,10 M25,50 Q40,45 55,50 M20,70 Q35,65 50,70 M35,30 Q50,25 65,30"/>
          </svg>
        </div>
        <div className="absolute -right-20 top-20 opacity-20">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="#445840">
            <path d="M90,90 Q70,70 75,50 T65,10 M75,50 Q60,45 45,50 M80,70 Q65,65 50,70 M65,30 Q50,25 35,30"/>
          </svg>
        </div>

        {/* Elementos decorativos - Galhos médios */}
        <div className="absolute left-1/4 -bottom-10 opacity-15">
          <svg width="250" height="250" viewBox="0 0 100 100" fill="#2B4D35">
            <path d="M20,80 Q35,65 30,45 T40,10 M30,45 Q45,40 60,45 M25,65 Q40,60 55,65"/>
          </svg>
        </div>
        <div className="absolute right-1/4 -bottom-10 opacity-15">
          <svg width="250" height="250" viewBox="0 0 100 100" fill="#2B4D35">
            <path d="M80,80 Q65,65 70,45 T60,10 M70,45 Q55,40 40,45 M75,65 Q60,60 45,65"/>
          </svg>
        </div>

        {/* Elementos decorativos - Galhos pequenos */}
        <div className="absolute left-1/3 top-1/3 opacity-10">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="#445840">
            <path d="M30,70 Q45,55 40,35 T50,0 M40,35 Q55,30 70,35"/>
          </svg>
        </div>
        <div className="absolute right-1/3 top-1/3 opacity-10">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="#445840">
            <path d="M70,70 Q55,55 60,35 T50,0 M60,35 Q45,30 30,35"/>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-8 h-8 text-[#445840]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B4332]">
              Localizado estrategicamente em Uberaba, Minas Gerais
            </h2>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setMapView('2d')}
              className={`inline-flex items-center px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                mapView === '2d' 
                ? 'bg-[#445840] text-white hover:bg-[#2B4D35]' 
                : 'bg-white text-[#445840] border-2 border-[#445840] hover:bg-[#445840] hover:text-white'
              }`}
            >
              Google Maps
            </button>
            <button 
              onClick={() => setMapView('3d')}
              className={`inline-flex items-center px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                mapView === '3d' 
                ? 'bg-[#445840] text-white hover:bg-[#2B4D35]' 
                : 'bg-white text-[#445840] border-2 border-[#445840] hover:bg-[#445840] hover:text-white'
              }`}
            >
              Tour Virtual
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl mb-12 h-[600px] md:h-[700px] lg:h-[800px] relative p-[2px] bg-gradient-to-br from-[#2D6A4F] via-[#1B4332] to-[#2D6A4F]">
            <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
            <iframe
              src={mapUrls[mapView]}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'relative', zIndex: 10 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-[2px] rounded-2xl"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-2xl font-bold text-[#445840] mb-2">12 min</p>
              <p className="text-gray-600">5,5 km</p>
              <h3 className="text-lg font-medium mt-2">Centro de Uberaba</h3>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-2xl font-bold text-[#445840] mb-2">20 min</p>
              <p className="text-gray-600">9,2 km</p>
              <h3 className="text-lg font-medium mt-2">Aeroporto de Uberaba</h3>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-2xl font-bold text-[#445840] mb-2">15 min</p>
              <p className="text-gray-600">9 km</p>
              <h3 className="text-lg font-medium mt-2">Hospital Regional</h3>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-2xl font-bold text-[#445840] mb-2">10 min</p>
              <p className="text-gray-600">5,5 km</p>
              <h3 className="text-lg font-medium mt-2">Praça Shopping Uberaba</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA Consultor */}
      <section className="py-20 bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] relative overflow-hidden">
        {/* Elementos decorativos - Círculos orgânicos */}
        <div className="absolute -left-20 -top-20 opacity-5">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="#FFFFFF">
            <path d="M50,10 C70,10 85,25 85,45 C85,65 70,80 50,80 C30,80 15,65 15,45 C15,25 30,10 50,10 Z" />
          </svg>
        </div>

        {/* Elementos decorativos - Ondas suaves */}
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-5">
          <svg width="300" height="600" viewBox="0 0 100 200" fill="#FFFFFF">
            <path d="M0,100 Q25,75 50,100 T100,100" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Pronto para realizar seu sonho?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nossos consultores estão prontos para te ajudar a encontrar o lote perfeito para você
            </p>
            <div className="pt-8">
              <a
                href="https://api.whatsapp.com/send/?phone=553433339576&text=Ol%C3%A1%2C%20estou%20interessado%20nos%20lotes%20da%20Urba%20%5B001%5D&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-12 py-6 bg-white text-[#2B4D35] rounded-full font-bold text-2xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                <svg className="w-8 h-8 mr-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Falar com um Consultor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B4332] text-white py-16 relative overflow-hidden">
        {/* Elementos decorativos - Círculos e ondas */}
        <div className="absolute -left-20 bottom-0 opacity-5">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="#FFFFFF">
            <path d="M50,20 C65,20 75,30 75,45 C75,60 65,70 50,70 C35,70 25,60 25,45 C25,30 35,20 50,20 Z" />
          </svg>
        </div>
        <div className="absolute right-0 top-0 opacity-5">
          <svg width="300" height="300" viewBox="0 0 100 100" fill="#FFFFFF">
            <path d="M0,50 Q25,25 50,50 T100,50" />
          </svg>
        </div>

        {/* Elementos decorativos - Pontos e linhas */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 w-2 h-2 bg-white rounded-full opacity-5"></div>
          <div className="absolute right-1/3 bottom-1/3 w-3 h-3 bg-white rounded-full opacity-5"></div>
          <div className="absolute left-2/3 top-1/2 w-2 h-2 bg-white rounded-full opacity-5"></div>
          <div className="absolute right-1/4 top-3/4 w-2 h-2 bg-white rounded-full opacity-5"></div>
        </div>

        {/* Elementos decorativos - Linhas curvas */}
        <div className="absolute left-0 bottom-0 opacity-5">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#FFFFFF">
            <path d="M10,90 C30,90 70,50 90,10" />
            <path d="M10,70 C30,70 70,30 90,30" />
          </svg>
        </div>
        <div className="absolute right-0 top-0 opacity-5">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#FFFFFF">
            <path d="M10,50 C30,50 70,10 90,50" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Visite nossa loja física:</h3>
              <p className="text-gray-400">
                Rua Dona Rafa Cecilio, 75, Uberaba - MG
              </p>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-2xl font-bold mb-6">Nossas Redes Sociais</h3>
              <div className="flex gap-6">
                <a 
                  href="https://www.instagram.com/donnaimob/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=100089334065194"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a 
                  href="http://donnanegociacoes.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <span>Site</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2024 | Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </main>
  )
} 