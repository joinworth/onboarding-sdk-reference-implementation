import type { ReactElement } from 'react';

const Features = (): ReactElement => {
  const features = [
    {
      title: 'Automated risk scoring',
      description:
        'Consistent decisions powered by structured data and intelligent rules',
      bgImage: 'bg-gradient-to-br from-green-400/20 to-green-600/20',
    },
    {
      title: 'Configurable workflows',
      description: 'Adapt onboarding to your unique compliance requirements',
      bgImage: 'bg-gradient-to-br from-blue-400/20 to-purple-600/20',
    },
    {
      title: 'Enterprise reliability',
      description:
        'Built for financial institutions demanding precision and speed',
      bgImage: 'bg-gradient-to-br from-amber-400/20 to-orange-600/20',
    },
  ];

  const CubeIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      <path
        d="M32 12L48 20L40 24L24 16L32 12Z"
        fill="currentColor"
        fillOpacity="0.8"
      />
      <path
        d="M24 16L40 24L40 40L24 32L24 16Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M40 24L48 20L48 36L40 40L40 24Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M32 12L48 20M32 12L24 16M24 16L40 24M48 20L40 24M40 24L40 40M24 16L24 32M40 40L24 32M48 20L48 36M48 36L40 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section className="text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <p className="text-sm uppercase tracking-wider text-white/70">
            Features
          </p>
          <h2 className="text-5xl md:text-6xl font-serif text-white">
            Precision in financial underwriting
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Intelligent tools that transform risk assessment for modern
            enterprises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-blue-gray rounded-xl p-8 overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`absolute inset-0 ${feature.bgImage} opacity-50`}
              />
              <div className="relative z-10">
                <div className="mb-6">
                  <CubeIcon />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
