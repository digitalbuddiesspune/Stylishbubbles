const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light tracking-widest mb-6 text-gray-900">
            PRIVACY POLICY
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 italic">Your Privacy Matters to Us</p>
        </div>

        {/* Policy Content */}
        <div className="max-w-4xl mx-auto">
          
          {/* Section 1: Introduction */}
          <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-amber-600 mr-3">1.</span>
              Introduction
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Stylish Bubbles, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
            </p>
          </div>

          {/* Section 2: Information We Collect */}
          <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-amber-600 mr-3">2.</span>
              Information We Collect
            </h2>
            <ul className="text-lg text-gray-700 leading-relaxed space-y-2 list-disc list-inside">
              <li>Name, email, phone number, and shipping address</li>
              <li>Payment details processed securely via PayU</li>
              <li>Website usage data via cookies</li>
            </ul>
          </div>

          {/* Section 3: How We Use Your Information */}
          <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-amber-600 mr-3">3.</span>
              How We Use Your Information
            </h2>
            <ul className="text-lg text-gray-700 leading-relaxed space-y-2 list-disc list-inside">
              <li>To process and fulfill orders</li>
              <li>To improve customer service</li>
              <li>To communicate promotions and updates</li>
            </ul>
          </div>

          {/* Section 4: Data Security */}
          <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-amber-600 mr-3">4.</span>
              Data Security
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We implement advanced security measures to protect your data. Transactions are encrypted and processed securely.
            </p>
          </div>

          {/* Section 5: Third-Party Sharing */}
          <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-amber-600 mr-3">5.</span>
              Third-Party Sharing
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We do not sell your personal data. However, we may share it with trusted partners like payment processors and logistics providers.
            </p>
          </div>

          {/* Section 6: Data Retention Policy */}
          <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-amber-600 mr-3">6.</span>
              Data Retention Policy
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We retain your data according to the following retention periods:
            </p>
            <ul className="text-lg text-gray-700 leading-relaxed space-y-2 list-disc list-inside">
              <li>Customer account information is retained while the account is active and up to 3 years after closure.</li>
              <li>Order, invoice, payment, and GST-related records are retained for a minimum of 8 years as required by law.</li>
              <li>KYC documents, where applicable, are retained during the business relationship and for 5 years thereafter.</li>
              <li>Marketing and analytics data is retained until consent is withdrawn or for a maximum of 24 months.</li>
              <li>Data is securely deleted or anonymized once the retention period expires, unless legally required otherwise.</li>
            </ul>
          </div>

          {/* Section 7: Your Rights */}
          <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-amber-600 mr-3">7.</span>
              Your Rights
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              You can request data deletion or modification by contacting us at <a href="mailto:support@glamhut.in" className="text-amber-600 hover:text-amber-700 underline">support@glamhut.in</a>.
            </p>
          </div>

          {/* Section 8: Contact Us */}
          <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-amber-600 mr-3">8.</span>
              Contact Us
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              For privacy concerns, email us at <a href="mailto:support@stylishbubbles.in" className="text-amber-600 hover:text-amber-700 underline">support@stylishbubbles.in</a>.
            </p>
          </div>

        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Questions About Privacy?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about our Privacy Policy, please feel free to contact our customer service team.
            </p>
            <a 
              href="/contact" 
              className="inline-block mt-4 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Privacy;

