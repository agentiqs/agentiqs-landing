
const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            About Us
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our founding team brings deep experience in AI, Agents, and enterprise integrations, 
            having worked at leading technology companies including <span className="font-semibold text-ai-blue">Cohere</span>, 
            <span className="font-semibold text-ai-blue"> Google</span>, 
            <span className="font-semibold text-ai-blue"> Microsoft</span>, 
            <span className="font-semibold text-ai-blue"> MuleSoft</span>, 
            <span className="font-semibold text-ai-blue"> Salesforce</span>, and 
            <span className="font-semibold text-ai-blue"> Booking.com</span>. 
            We're passionate about democratizing AI agent technology and making it accessible 
            to developers everywhere through open-source tools and frameworks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
