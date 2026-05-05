import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Check, User } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const DESTINOS_OPTIONS = [
  'Porto de Galinhas',
  'Campos do Jordão',
  'Aparecida do Norte',
  'Serra Gaúcha',
  'Beto Carrero',
  'Natal',
  'Gramado',
  'Fretamento / Outro',
];

export function LeadCapture() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [formData, setFormData] = useState({ nome: '', email: '', whatsapp: '', destino: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (formData.whatsapp.replace(/\D/g, '').length < 10) {
      newErrors.whatsapp = 'Número incompleto';
    }
    if (!formData.destino) newErrors.destino = 'Selecione um destino';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const formatWhatsApp = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  return (
    <section id="contato" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #4A67AB 0, #4A67AB 1px, transparent 0, transparent 50%)`,
        backgroundSize: '20px 20px'
      }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {/* Left - Contact Info */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-lekinhos-gray-dark mb-4">
              Solicite seu orçamento
            </h2>
            <p className="text-lekinhos-gray-medium text-base mb-10 max-w-md">
              Preencha o formulário e nossa equipe entrará em contato em até 24h.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lekinhos-blue-light flex items-center justify-center">
                  <Phone className="w-5 h-5 text-lekinhos-blue" />
                </div>
                <div>
                  <p className="text-xs text-lekinhos-gray-medium uppercase font-semibold">WhatsApp</p>
                  <p className="text-lekinhos-gray-dark font-medium">(11) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lekinhos-blue-light flex items-center justify-center">
                  <Mail className="w-5 h-5 text-lekinhos-blue" />
                </div>
                <div>
                  <p className="text-xs text-lekinhos-gray-medium uppercase font-semibold">E-mail</p>
                  <p className="text-lekinhos-gray-dark font-medium">contato@lekinhostur.com.br</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lekinhos-blue-light flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-lekinhos-blue" />
                </div>
                <div>
                  <p className="text-xs text-lekinhos-gray-medium uppercase font-semibold">Localização</p>
                  <p className="text-lekinhos-gray-dark font-medium">São Paulo - SP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-lekinhos-off-white rounded-2xl p-6 sm:p-8 shadow-card">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display text-2xl text-lekinhos-gray-dark mb-2">Orçamento solicitado!</h3>
                <p className="text-lekinhos-gray-medium">Entraremos em contato em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-lekinhos-gray-dark mb-1.5">
                    <User className="w-4 h-4 text-lekinhos-gray-medium" />
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.nome ? 'border-red-400' : 'border-lekinhos-gray-light'} focus:border-lekinhos-blue focus:ring-2 focus:ring-lekinhos-blue/20 outline-none transition-all text-sm`}
                    placeholder="Seu nome"
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-lekinhos-gray-dark mb-1.5">
                    <Mail className="w-4 h-4 text-lekinhos-gray-medium" />
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-lekinhos-gray-light'} focus:border-lekinhos-blue focus:ring-2 focus:ring-lekinhos-blue/20 outline-none transition-all text-sm`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-lekinhos-gray-dark mb-1.5">
                    <Phone className="w-4 h-4 text-lekinhos-gray-medium" />
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: formatWhatsApp(e.target.value) })}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.whatsapp ? 'border-red-400' : 'border-lekinhos-gray-light'} focus:border-lekinhos-blue focus:ring-2 focus:ring-lekinhos-blue/20 outline-none transition-all text-sm`}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                  />
                  {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-lekinhos-gray-dark mb-1.5">
                    <MapPin className="w-4 h-4 text-lekinhos-gray-medium" />
                    Destino de interesse
                  </label>
                  <select
                    value={formData.destino}
                    onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.destino ? 'border-red-400' : 'border-lekinhos-gray-light'} focus:border-lekinhos-blue focus:ring-2 focus:ring-lekinhos-blue/20 outline-none transition-all text-sm bg-white`}
                  >
                    <option value="">Selecione um destino</option>
                    {DESTINOS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.destino && <p className="text-red-500 text-xs mt-1">{errors.destino}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-lekinhos-gray-dark px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-accent-hover transition-all duration-200 disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-lekinhos-gray-dark/30 border-t-lekinhos-gray-dark rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Solicitar orçamento
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
