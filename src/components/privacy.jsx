import React, { useState, useEffect } from 'react';
import './styles/styles.css';
import { Link } from 'react-router-dom';

// Chatgpt helped most of the privacy policy page
function Privacy() {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const fireTrackLogo = "../../img/FireTrack_Logo.png";
  // Generate table of contents when component mounts
  useEffect(() => {
    const generateTableOfContents = () => { 
      const toc = document.getElementById('privacy-toc');
      const headings = document.querySelectorAll('.section-title');
      
      if (!toc || headings.length === 0) return;
      
      // Clear existing content
      toc.innerHTML = '';
      
      headings.forEach(heading => {
        const id = heading.id;
        const text = heading.textContent;
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = `#${id}`;
        link.textContent = text;
        
        listItem.appendChild(link);
        toc.appendChild(listItem);
      });
    };
    
    // Small delay to ensure DOM is fully rendered
    const timerId = setTimeout(() => {
      generateTableOfContents();
    }, 100);
    
    return () => clearTimeout(timerId);
  }, []);
  
  // Handle back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      
      e.preventDefault();
      
      const targetId = target.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  // Handle back to top button click
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <div className="logo-container">
          <img src={fireTrackLogo} alt="FireTrack Logo" className="logo" />
        </div>
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="last-updated">Last Updated: March 14, 2025</p>
      </header>

      <div className="table-of-contents">
        <h2>Table of Contents</h2>
        <ul id="privacy-toc"></ul>
      </div>

      <section id="introduction" className="privacy-section">
        <h2 id="section-introduction" className="section-title">1. Introduction</h2>
        <p className="privacy-text">
          FireTrack ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
          how we collect, use, disclose, and safeguard your information when you use our FireTrack application, 
          website, and related services (collectively, the "Service").
        </p>
        <p className="privacy-text">
          Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you 
          have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies 
          and practices, please do not use our Service.
        </p>
      </section>

      <section id="information-we-collect" className="privacy-section">
        <h2 id="section-information-we-collect" className="section-title">2. Information We Collect</h2>
        
        <h3 id="personal-information" className="subsection-title">2.1 Personal Information</h3>
        <p className="privacy-text">We may collect personal information that you voluntarily provide to us when you:</p>
        <ul className="privacy-list">
          <li>Register for an account</li>
          <li>Complete a profile</li>
          <li>Report fires</li>
          <li>Participate in community forums or fundraisers</li>
          <li>Contact us with inquiries or feedback</li>
        </ul>
        <p className="privacy-text">This information may include:</p>
        <ul className="privacy-list">
          <li>Identity information (name, username, email address)</li>
          <li>Contact information (email address, phone number)</li>
          <li>Profile information (profile picture, biography)</li>
          <li>Location data (when reporting fires or setting your home area)</li>
          <li>Content you post in forums or fundraisers</li>
          <li>Any other information you choose to provide</li>
        </ul>
        
        <h3 id="automatically-collected" className="subsection-title">2.2 Automatically Collected Information</h3>
        <p className="privacy-text">
          When you access or use our Service, we may automatically collect certain information, including:
        </p>
        <ul className="privacy-list">
          <li>Device information (device type, operating system, unique device identifiers)</li>
          <li>Log information (IP address, browser type, pages visited, time spent)</li>
          <li>Location information (precise location when fire reporting features are used, general location based on IP address)</li>
          <li>Usage information (interactions with the Service, content viewed)</li>
        </ul>
        
        <h3 id="cookies" className="subsection-title">2.3 Cookies and Similar Technologies</h3>
        <p className="privacy-text">
          We use cookies and similar tracking technologies to track activity on our Service and hold certain information. 
          Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct 
          your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept 
          cookies, you may not be able to use some portions of our Service.
        </p>
      </section>

      <section id="how-we-use" className="privacy-section">
        <h2 id="section-how-we-use" className="section-title">3. How We Use Your Information</h2>
        <p className="privacy-text">We use the information we collect for various purposes, including to:</p>
        <ul className="privacy-list">
          <li>Provide, maintain, and improve our Service</li>
          <li>Process and display fire reports on our interactive map</li>
          <li>Create and maintain your account</li>
          <li>Send you notifications about nearby fires, community updates, and other service-related messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Understand how users interact with our Service</li>
          <li>Detect, prevent, and address technical issues, fraud, or illegal activity</li>
          <li>Comply with legal obligations</li>
          <li>Enforce our Terms of Service and other policies</li>
        </ul>
      </section>

      <section id="how-we-share" className="privacy-section">
        <h2 id="section-how-we-share" className="section-title">4. How We Share Your Information</h2>
        
        <h3 id="with-other-users" className="subsection-title">4.1 With Other Users</h3>
        <ul className="privacy-list">
          <li>Fire reports (including location data and timestamp) are visible to all users on the interactive map</li>
          <li>Profile information is visible to other users according to your privacy settings</li>
          <li>Content you post in community forums or fundraiser sections is visible to other users</li>
        </ul>
        
        <h3 id="with-service-providers" className="subsection-title">4.2 With Service Providers</h3>
        <p className="privacy-text">
          We may share your information with third-party vendors, service providers, contractors, or agents 
          who perform services for us or on our behalf.
        </p>
        
        <h3 id="for-legal-reasons" className="subsection-title">4.3 For Legal Reasons</h3>
        <p className="privacy-text">
          We may disclose your information if required to do so by law or in response to valid requests by 
          public authorities (e.g., a court or government agency).
        </p>
        
        <h3 id="business-transfers" className="subsection-title">4.4 Business Transfers</h3>
        <p className="privacy-text">
          If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information 
          may be transferred as part of that transaction.
        </p>
        
        <h3 id="with-consent" className="subsection-title">4.5 With Your Consent</h3>
        <p className="privacy-text">
          We may share your information for any other purpose with your consent.
        </p>
      </section>

      <section id="data-storage" className="privacy-section">
        <h2 id="section-data-storage" className="section-title">5. Data Storage and Security</h2>
        
        <h3 id="storage" className="subsection-title">5.1 Data Storage</h3>
        <p className="privacy-text">
          Your information is stored on secure servers located in the United States. We retain your information 
          for as long as your account is active or as needed to provide you services, comply with our legal 
          obligations, resolve disputes, and enforce our agreements.
        </p>
        
        <h3 id="security" className="subsection-title">5.2 Data Security</h3>
        <p className="privacy-text">
          We have implemented appropriate technical and organizational security measures designed to protect 
          the security of any personal information we process. However, please note that no method of transmission 
          over the Internet or method of electronic storage is 100% secure.
        </p>
      </section>

      <section id="data-rights" className="privacy-section">
        <h2 id="section-data-rights" className="section-title">6. Your Data Rights</h2>
        <p className="privacy-text">
          Depending on your location, you may have certain rights regarding your personal information, including:
        </p>
        
        <h3 id="access-update" className="subsection-title">6.1 Access and Update</h3>
        <p className="privacy-text">
          You can access and update certain information about you from within your account settings.
        </p>
        
        <h3 id="data-portability" className="subsection-title">6.2 Data Portability</h3>
        <p className="privacy-text">
          You have the right to receive a copy of your personal information in a structured, commonly used, 
          and machine-readable format.
        </p>
        
        <h3 id="deletion" className="subsection-title">6.3 Deletion</h3>
        <p className="privacy-text">
          You can request deletion of your account and personal information at any time through your account 
          settings or by contacting us. Note that some information may remain in our records after deletion 
          of your account.
        </p>
        
        <h3 id="opt-out" className="subsection-title">6.4 Opt-Out</h3>
        <p className="privacy-text">
          You can opt out of receiving promotional communications from us by following the instructions in 
          those communications.
        </p>
        
        <h3 id="withdrawing-consent" className="subsection-title">6.5 Withdrawing Consent</h3>
        <p className="privacy-text">
          If we are processing your information based on your consent, you have the right to withdraw that 
          consent at any time.
        </p>
        <p className="privacy-text">
          To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
        </p>
      </section>

      <section id="location-information" className="privacy-section">
        <h2 id="section-location-information" className="section-title">7. Location Information</h2>
        
        <h3 id="collection-location" className="subsection-title">7.1 Collection of Location Data</h3>
        <p className="privacy-text">FireTrack collects precise location data when you:</p>
        <ul className="privacy-list">
          <li>Report a fire (to accurately place the report on the map)</li>
          <li>Set your home or work location (to provide relevant alerts)</li>
          <li>Opt-in to location tracking for nearby fire alerts</li>
        </ul>
        
        <h3 id="usage-location" className="subsection-title">7.2 Usage of Location Data</h3>
        <p className="privacy-text">We use this location data to:</p>
        <ul className="privacy-list">
          <li>Display fire reports on the interactive map</li>
          <li>Send you notifications about fires near your saved locations</li>
          <li>Analyze fire patterns and improve our Service</li>
        </ul>
        
        <h3 id="control-location" className="subsection-title">7.3 Control Over Location Data</h3>
        <p className="privacy-text">You can control the collection of your location data through:</p>
        <ul className="privacy-list">
          <li>Device settings (enabling/disabling location services)</li>
          <li>App settings (configuring location permissions)</li>
          <li>Account settings (deleting saved locations)</li>
        </ul>
      </section>

      <section id="childrens-privacy" className="privacy-section">
        <h2 id="section-childrens-privacy" className="section-title">8. Children's Privacy</h2>
        <p className="privacy-text">
          The Service is not directed to anyone under the age of 18 ("Children"). We do not knowingly collect 
          personally identifiable information from anyone under 18. If you are a parent or guardian and you are 
          aware that your Child has provided us with personal information, please contact us. If we become aware 
          that we have collected personal information from children without verification of parental consent, 
          we take steps to remove that information from our servers.
        </p>
      </section>

      <section id="do-not-track" className="privacy-section">
        <h2 id="section-do-not-track" className="section-title">9. Do Not Track Signals</h2>
        <p className="privacy-text">
          We do not currently respond to "Do Not Track" signals or other mechanisms that provide a method to 
          opt out of the collection of information across websites or other online services.
        </p>
      </section>

      <section id="international-data" className="privacy-section">
        <h2 id="section-international-data" className="section-title">10. International Data Transfers</h2>
        <p className="privacy-text">
          Your information may be transferred to and maintained on computers located outside of your state, 
          province, country, or other governmental jurisdiction where the data protection laws may differ from 
          those in your jurisdiction. If you are located outside the United States and choose to provide 
          information to us, please note that we transfer the data to the United States and process it there.
        </p>
      </section>

      <section id="policy-changes" className="privacy-section">
        <h2 id="section-policy-changes" className="section-title">11. Changes to This Privacy Policy</h2>
        <p className="privacy-text">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
          new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this 
          Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they 
          are posted on this page.
        </p>
      </section>

      <section id="third-party" className="privacy-section">
        <h2 id="section-third-party" className="section-title">12. Third-Party Services</h2>
        <p className="privacy-text">
          Our Service may contain links to other websites, apps, or services that are not operated by us. 
          If you click on a third-party link, you will be directed to that third party's site. We strongly 
          advise you to review the Privacy Policy of every site you visit. We have no control over and assume 
          no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>
      </section>

      <section id="contact-us" className="privacy-section">
        <h2 id="section-contact-us" className="section-title">13. Contact Us</h2>
        <p className="privacy-text">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <ul className="privacy-list">
          <li>Email: privacy@firetrack.com</li>
          <li>Mailing Address: [Your Company's Address]</li>
        </ul>
        <p className="privacy-text">
          For data subject requests or to exercise your rights, please email: datarights@firetrack.com
        </p>
      </section>

      <div className="nav-links">
        <Link to="/terms" className="btn">View Terms of Service</Link>
        <Link to="/" className="btn">Return to FireTrack</Link>
      </div>
      
      <Link
        to="#" 
        className={`back-to-top ${isBackToTopVisible ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </Link>
      
      <footer className="privacy-footer">
    
        <div className="footer-links">
          <Link to="/terms" className="footer-link">Terms of Service</Link> |
          <Link to="/privacy" className="footer-link">Privacy Policy</Link> |
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}

export default Privacy;