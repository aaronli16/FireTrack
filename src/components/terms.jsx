import React, { useState, useEffect } from 'react';
import './styles/termsAndPrivacy.css';

// Chatgpt generated most of the Terms and Services, didn't know what to write for terms of service
function Terms() {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false); // State to manage visibility of "Back to Top" button
  const fireTrackLogo = "../../img/FireTrack_Logo.png";// Path to your logo image

  useEffect(() => { // Function to generate table of contents
    const generateTableOfContents = () => {
      const toc = document.getElementById('toc');
      const headings = document.querySelectorAll('.section-title');
      
      if (!toc || headings.length === 0) return;
      
  
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
    

    const timerId = setTimeout(() => { // Delay to ensure all elements are loaded
      generateTableOfContents();
    }, 100);
    
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => { // Function to handle scroll event
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
  

  useEffect(() => { // Function to handle anchor link clicks
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
  

  const scrollToTop = (e) => { // Function to scroll to the top of the page
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="terms-container">
      <header className="terms-header">
        <div className="logo-container">
          <img src={fireTrackLogo} alt="FireTrack Logo" className="logo" />
        </div>
        <h1 className="terms-title">Terms of Service</h1>
        <p className="last-updated">Last Updated: March 14, 2025</p>
      </header>
      
      <div className="table-of-contents">
        <h2>Table of Contents</h2>
        <ul id="toc"></ul>
      </div>
      
      <section id="introduction" className="terms-section">
        <h2 id="section-introduction" className="section-title">1. Introduction</h2>
        <p className="terms-text">
          Welcome to FireTrack, a community-based platform designed to help users report and track fires on an interactive map. 
          These Terms of Service ("Terms") govern your access to and use of the FireTrack application, website, and services 
          (collectively, the "Service").
        </p>
        <p className="terms-text">
          By accessing or using FireTrack, you agree to be bound by these Terms. If you disagree with any part of the Terms, 
          you may not access the Service. FireTrack reserves the right to update these Terms at any time. We will notify you 
          of any changes by posting the new Terms on the platform and updating the "Last Updated" date. Your continued use of 
          the Service following the posting of revised Terms constitutes your acceptance of such changes.
        </p>
      </section>
      
      <section id="eligibility" className="terms-section">
        <h2 id="section-eligibility" className="section-title">2. Eligibility</h2>
        <p className="terms-text">
          You must be at least 18 years old to use FireTrack. By using the Service, you represent and warrant that you are 
          at least 18 years of age and have the legal capacity to enter into these Terms. If we discover or have reason to 
          believe that you are under 18 years of age, we reserve the right to suspend or terminate your account immediately.
        </p>
      </section>
      
      <section id="account-registration" className="terms-section">
        <h2 id="section-account-registration" className="section-title">3. Account Registration</h2>
        
        <h3 id="user-accounts" className="subsection-title">3.1 User Accounts</h3>
        <p className="terms-text">
          To access certain features of the Service, you must register for an account. You agree to provide accurate, current, 
          and complete information during the registration process and to update such information to keep it accurate, current, 
          and complete.
        </p>
        
        <h3 id="account-security" className="subsection-title">3.2 Account Security</h3>
        <p className="terms-text">
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions 
          under your password. You agree not to disclose your password to any third party. You must notify us immediately upon 
          becoming aware of any breach of security or unauthorized use of your account.
        </p>
      </section>
      
      <section id="user-responsibilities" className="terms-section">
        <h2 id="section-user-responsibilities" className="section-title">4. User Responsibilities</h2>
        
        <h3 id="fire-reporting" className="subsection-title">4.1 Fire Reporting</h3>
        <p className="terms-text">When reporting fires through the Service:</p>
        <ul className="terms-list">
          <li>You agree to provide accurate information to the best of your knowledge</li>
          <li>You understand that FireTrack is not an emergency service and does not replace official emergency response systems</li>
          <li>You acknowledge that all reports will be time-stamped and associated with your account</li>
          <li>You agree not to submit false reports, as doing so may result in account termination and potential legal consequences</li>
        </ul>
        
        <h3 id="community-content" className="subsection-title">4.2 Community Content</h3>
        <p className="terms-text">When posting content in community forums or fundraiser sections:</p>
        <ul className="terms-list">
          <li>You retain ownership of your content but grant FireTrack a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content</li>
          <li>You agree not to post content that violates the rights of others, including intellectual property rights</li>
          <li>You agree not to post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
          <li>You understand that FireTrack reserves the right to remove any content that violates these Terms or that we find objectionable for any reason</li>
        </ul>
      </section>
      
      <section id="acceptable-use" className="terms-section">
        <h2 id="section-acceptable-use" className="section-title">5. Acceptable Use Policy</h2>
        <p className="terms-text">You agree not to use the Service to:</p>
        <ul className="terms-list">
          <li>Engage in any activity that violates any applicable law or regulation</li>
          <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
          <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
          <li>Collect or store personal data about other users without their consent</li>
          <li>Upload or transmit viruses, worms, or any other malicious code</li>
          <li>Attempt to probe, scan, or test the vulnerability of the system or circumvent any security measures</li>
        </ul>
      </section>
      
      <section id="intellectual-property" className="terms-section">
        <h2 id="section-intellectual-property" className="section-title">6. Intellectual Property Rights</h2>
        
        <h3 id="firetrack-content" className="subsection-title">6.1 FireTrack Content</h3>
        <p className="terms-text">
          The Service and its original content, features, and functionality are and will remain the exclusive property of 
          FireTrack and its licensors. The Service is protected by copyright, trademark, and other laws of both the United 
          States and foreign countries.
        </p>
        
        <h3 id="user-content" className="subsection-title">6.2 User Content</h3>
        <p className="terms-text">
          You retain any and all of your rights to any content you submit, post, or display on or through the Service 
          and you are responsible for protecting those rights.
        </p>
      </section>
      
      <section id="limitation-of-liability" className="terms-section">
        <h2 id="section-limitation-of-liability" className="section-title">7. Limitation of Liability</h2>
        
        <h3 id="emergency-information" className="subsection-title">7.1 Emergency Information</h3>
        <p className="terms-text">
          FireTrack is a supplementary service and is not intended to replace official emergency services. We do not 
          guarantee the accuracy, completeness, or timeliness of fire reports or other emergency information. In an 
          emergency situation, you should always contact official emergency services directly.
        </p>
        
        <h3 id="general-limitations" className="subsection-title">7.2 General Limitations</h3>
        <p className="terms-text">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FIRETRACK, ITS AFFILIATES, AGENTS, 
          DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, 
          CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, 
          DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE.
        </p>
        
        <h3 id="limitation-amount" className="subsection-title">7.3 Limitation of Liability</h3>
        <p className="terms-text">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FIRETRACK ASSUMES NO LIABILITY OR RESPONSIBILITY FOR ANY:</p>
        <ul className="terms-list">
          <li>ERRORS, MISTAKES, OR INACCURACIES OF CONTENT</li>
          <li>PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICE</li>
          <li>UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS AND/OR ANY PERSONAL INFORMATION STORED THEREIN</li>
          <li>INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICE</li>
          <li>BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE SERVICE BY ANY THIRD PARTY</li>
        </ul>
      </section>
      
      <section id="indemnification" className="terms-section">
        <h2 id="section-indemnification" className="section-title">8. Indemnification</h2>
        <p className="terms-text">
          You agree to defend, indemnify, and hold harmless FireTrack, its parent, subsidiaries, affiliates, and their 
          respective directors, officers, employees, and agents from and against all claims, damages, obligations, losses, 
          liabilities, costs, and expenses arising from:
        </p>
        <ul className="terms-list">
          <li>Your use of the Service</li>
          <li>Your violation of any term of these Terms</li>
          <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
          <li>Any claim that your user content caused damage to a third party</li>
        </ul>
        <p className="terms-text">
          This defense and indemnification obligation will survive these Terms and your use of the Service.
        </p>
      </section>
      
      <section id="termination" className="terms-section">
        <h2 id="section-termination" className="section-title">9. Termination</h2>
        <p className="terms-text">
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
          including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
        </p>
      </section>
      
      <section id="governing-law" className="terms-section">
        <h2 id="section-governing-law" className="section-title">10. Governing Law</h2>
        <p className="terms-text">
          These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its 
          conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a 
          waiver of those rights.
        </p>
      </section>
      
      <section id="changes" className="terms-section">
        <h2 id="section-changes" className="section-title">11. Changes to the Service</h2>
        <p className="terms-text">
          FireTrack reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any 
          part thereof) with or without notice. You agree that FireTrack shall not be liable to you or to any third party 
          for any modification, suspension, or discontinuance of the Service.
        </p>
      </section>
      
      <section id="dispute-resolution" className="terms-section">
        <h2 id="section-dispute-resolution" className="section-title">12. Dispute Resolution</h2>
        
        <h3 id="informal-resolution" className="subsection-title">12.1 Informal Resolution</h3>
        <p className="terms-text">
          You agree to first contact FireTrack and attempt to resolve any disputes informally before filing any formal proceedings.
        </p>
        
        <h3 id="arbitration" className="subsection-title">12.2 Arbitration</h3>
        <p className="terms-text">
          If informal resolution is unsuccessful, any dispute arising from or relating to these Terms or the Service shall 
          be finally settled by binding arbitration, conducted on a confidential basis, under the Commercial Arbitration 
          Rules of the American Arbitration Association by one arbitrator appointed in accordance with those rules. The 
          arbitration shall take place in [Your Company's Location], and the arbitration proceedings shall be conducted 
          in English. The decision of the arbitrator shall be final and binding, and judgment on the award rendered by 
          the arbitrator may be entered in any court of competent jurisdiction.
        </p>
      </section>
      
      <section id="severability" className="terms-section">
        <h2 id="section-severability" className="section-title">13. Severability</h2>
        <p className="terms-text">
          If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and 
          interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable 
          law and the remaining provisions will continue in full force and effect.
        </p>
      </section>
      
      <section id="contact" className="terms-section">
        <h2 id="section-contact" className="section-title">14. Contact Information</h2>
        <p className="terms-text">If you have any questions about these Terms, please contact us at:</p>
        <ul className="terms-list">
          <li>Email: support@firetrack.com</li>
          <li>Mailing Address: [Your Company's Address]</li>
        </ul>
        <p className="terms-text">
          By using the FireTrack Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </p>
      </section>
      
      <div className="nav-links">
        <a href="/privacy-policy" className="btn">View Privacy Policy</a>
        <a href="/" className="btn">Return to FireTrack</a>
      </div>
      
      <a 
        href="#" 
        className={`back-to-top ${isBackToTopVisible ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </a>
      
      <footer className="terms-footer">
       
        <div className="footer-links">
          <a href="/terms-of-service" className="footer-link">Terms of Service</a> |
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a> |
          <a href="/contact" className="footer-link">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default Terms;