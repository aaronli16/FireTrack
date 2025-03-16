import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';

function Terms() {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const fireTrackLogo = "../../img/FireTrack_Logo.png";
  
  // Define sections data to generate both content and TOC
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <>
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
        </>
      )
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      content: (
        <p className="terms-text">
          You must be at least 18 years old to use FireTrack. By using the Service, you represent and warrant that you are 
          at least 18 years of age and have the legal capacity to enter into these Terms. If we discover or have reason to 
          believe that you are under 18 years of age, we reserve the right to suspend or terminate your account immediately.
        </p>
      )
    },
    {
      id: "account-registration",
      title: "3. Account Registration",
      content: (
        <>
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
        </>
      )
    },
    {
      id: "user-responsibilities",
      title: "4. User Responsibilities",
      content: (
        <>
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
        </>
      )
    },
    {
      id: "acceptable-use",
      title: "5. Acceptable Use Policy",
      content: (
        <>
          <p className="terms-text">You agree not to use the Service to:</p>
          <ul className="terms-list">
            <li>Engage in any activity that violates any applicable law or regulation</li>
            <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>Collect or store personal data about other users without their consent</li>
            <li>Upload or transmit viruses, worms, or any other malicious code</li>
            <li>Attempt to probe, scan, or test the vulnerability of the system or circumvent any security measures</li>
          </ul>
        </>
      )
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      content: (
        <>
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
        </>
      )
    },
    {
      id: "limitation-of-liability",
      title: "7. Limitation of Liability",
      content: (
        <>
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
        </>
      )
    },
    {
      id: "indemnification",
      title: "8. Indemnification",
      content: (
        <>
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
        </>
      )
    },
    {
      id: "termination",
      title: "9. Termination",
      content: (
        <p className="terms-text">
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
          including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
        </p>
      )
    },
    {
      id: "governing-law",
      title: "10. Governing Law",
      content: (
        <p className="terms-text">
          These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its 
          conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a 
          waiver of those rights.
        </p>
      )
    },
    {
      id: "changes",
      title: "11. Changes to the Service",
      content: (
        <p className="terms-text">
          FireTrack reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any 
          part thereof) with or without notice. You agree that FireTrack shall not be liable to you or to any third party 
          for any modification, suspension, or discontinuance of the Service.
        </p>
      )
    },
    {
      id: "dispute-resolution",
      title: "12. Dispute Resolution",
      content: (
        <>
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
        </>
      )
    },
    {
      id: "severability",
      title: "13. Severability",
      content: (
        <p className="terms-text">
          If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and 
          interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable 
          law and the remaining provisions will continue in full force and effect.
        </p>
      )
    },
    {
      id: "contact",
      title: "14. Contact Information",
      content: (
        <>
          <p className="terms-text">If you have any questions about these Terms, please contact us at:</p>
          <ul className="terms-list">
            <li>Email: support@firetrack.com</li>
            <li>Mailing Address: [Your Company's Address]</li>
          </ul>
          <p className="terms-text">
            By using the FireTrack Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </>
      )
    }
  ];

  // Custom hook for scroll position
  const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    
    useEffect(() => {
      const handleScroll = () => {
        setScrollPosition(window.pageYOffset);
      };
      
      // Add event listener
      window.addEventListener('scroll', handleScroll);
      
      // Remove event listener on cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    return scrollPosition;
  };

  // Use the custom hook
  const scrollPosition = useScrollPosition();
  
  // Update back to top button visibility
  useEffect(() => {
    setIsBackToTopVisible(scrollPosition > 300);
  }, [scrollPosition]);
  
  // Create refs for each section for smooth scrolling
  const sectionRefs = useRef({});
  
  // Initialize refs for each section
  useEffect(() => {
    sections.forEach(section => {
      sectionRefs.current[section.id] = React.createRef();
    });
  }, []);
  
  // Smooth scroll function using refs instead of DOM queries
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    
    const sectionRef = sectionRefs.current[sectionId];
    if (sectionRef && sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  };
  
  // Scroll to top function
  const scrollToTop = (e) => {
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
      
      {/* Table of Contents - Generated from React state */}
      <div className="table-of-contents">
        <h2>Table of Contents</h2>
        <ul>
          {sections.map(section => (
            <li key={section.id}>
              <a 
                href={`#${section.id}`} 
                onClick={(e) => scrollToSection(section.id, e)}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Generate sections from the data */}
      {sections.map(section => (
        <section 
          key={section.id} 
          id={section.id} 
          className="terms-section"
          ref={sectionRefs.current[section.id]}
        >
          <h2 id={`section-${section.id}`} className="section-title">{section.title}</h2>
          {section.content}
        </section>
      ))}
      
      <div className="nav-links">
        <Link to="/privacy" className="btn">View Privacy Policy</Link>
        <Link to="/" className="btn">Return to FireTrack</Link>
      </div>
      
      <button
        className={`back-to-top ${isBackToTopVisible ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
      
      <footer className="terms-footer">
        <div className="footer-links">
          <Link to="/terms" className="footer-link">Terms of Service</Link> |
          <Link to="/privacy" className="footer-link">Privacy Policy</Link> |
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}

export default Terms;